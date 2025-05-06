import React, { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { resetLogin, updateLogin } from "./loginadminSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Fetch.css';

const LoginAdmin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email, password, error } = useSelector((state: RootState) => state.login);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as 'email' | 'password';
        const value = event.target.value;
        dispatch(updateLogin({ field, value }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5123/loginAdmin?email=${email}&password=${password}`);
            console.log("Login response:", response.data);
            if (response.data.length > 0) {
                alert("Login Successful");
                dispatch(resetLogin());
                navigate('/employees')
            }
            else {
                alert(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error('Error fetching employee data', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login to View the Employee Data</h1>
                <table>
                    <tbody>
                        <tr>
                            <td> Email: </td>
                            <td>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter Email"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td> Password: </td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit"> Login </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
    )
}
export default LoginAdmin;