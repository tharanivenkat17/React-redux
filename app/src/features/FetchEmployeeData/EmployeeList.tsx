import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchData } from "./fetchdataSlice";
import { useNavigate } from "react-router-dom";

const EmployeeList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector((state: RootState) => state.fetchUserData);
  
    useEffect(() => {
      dispatch(fetchData());
    }, [dispatch]);

    const handleLogout = () =>{
      navigate('/loginadmin');
    }
  
    if (status === 'loading') return <p>Loading users...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
  
    return (
      <div>
        <button onClick={handleLogout} style={{marginBottom: '10px', marginLeft: '520px'}}> Logout </button>
        <h1 style={{marginLeft: '170px'}}>Employee Data </h1>
        <table border={1} style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Name</td>
              <td>Email</td>
              <td>Employee ID</td>
              <td>Branch</td>
              <td>Designation</td>
            </tr>
          </thead>
          <tbody>
            {data.map(employeedata => (
              <tr key={employeedata.id}>
                <td>{employeedata.id}</td>
                <td>{employeedata.name}</td>
                <td>{employeedata.email}</td>
                <td>{employeedata.employeeID}</td>
                <td>{employeedata.branch}</td>
                <td>{employeedata.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default EmployeeList;