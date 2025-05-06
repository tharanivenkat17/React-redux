import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetField, updateField } from './formSlice';
import { RootState } from '../../app/store';
import axios from 'axios';

const Form: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { name, email, employeeID, branch, designation, error } = useSelector((state: RootState) => state.form);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const field = event.target.name as 'name' | 'email' | 'employeeID' | 'branch' | 'designation';
        const value = event.target.value;
        dispatch(updateField({ field, value }));
    }

    const checkEmployeeID = async (employeeID: string | number): Promise<boolean> => {
        try {
            const response = await axios.get(`http://localhost:5123/employeeData?employeeID=${employeeID}`);
            return response.data.length > 0;
        } catch (error) {
            console.error('Error fetching employee data', error);
            return false;
        }
    };

    const checkEmail = async (email: string): Promise<boolean> => {
        try {
            const response = await axios.get(`http://localhost:5123/employeeData?email=${email}`);
            return response.data.length > 0;
        } catch (error) {
            console.error('Error fetching employee data', error);
            return false;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const existsID = await checkEmployeeID(employeeID);
        const existsEmail = await checkEmail(email);
        if (!existsID && !existsEmail) {
            try {
                const response = await axios.post('http://localhost:5123/employeeData', { name, email, employeeID, branch, designation })
                setSubmitted(true);
                console.log(response.data)
                dispatch(resetField());
                setTimeout(() => {
                    setSubmitted(false);
                }, 2000);
                window.location.reload()
            }
            catch {
                console.error(error);
            }
        }
        else {
            alert("Email and Employee ID should not match with previous data");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {submitted && (
                <p style={{ color: 'white', backgroundColor: 'green', padding: '10px' }}>
                    Form Submitted
                </p>
            )}
            <h2 style={{ paddingLeft: '30px' }}>Employee Data</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Name: </td>
                        <td>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder='Enter Name'
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email: </td>
                        <td>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder='Enter Email'
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Employee ID: </td>
                        <td>
                            <input
                                type="text"
                                name="employeeID"
                                value={employeeID}
                                placeholder='Enter Employee ID'
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Branch: </td>
                        <td>
                            <input
                                type="text"
                                name="branch"
                                value={branch}
                                placeholder='Enter Branch'
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Designation: </td>
                        <td>
                            <input
                                type="text"
                                name="designation"
                                value={designation}
                                placeholder='Enter Designation'
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button 
                                type='submit' 
                                style={{ 
                                    marginLeft: '50px', 
                                    marginTop: '10px' 
                                }}
                            >Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}
export default Form;