import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUsers, setAdmin } from "./usersSlice";


const UsersList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error, admin } = useSelector((state: RootState) => state.users);
  
    useEffect(() => {
      dispatch(fetchUsers());
      dispatch(setAdmin(status ? 'success' : 'failed'));
    }, [dispatch]);
  
    if (status === 'loading') return <p>Loading users...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;
  
    return (
      <div>
        Admin{admin ? ' Present' :  '  Not Present'}
        <table border={1} style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <td>S.No</td>
              <td>Name</td>
              <td>Email</td>
            </tr>
          </thead>
          <tbody>
            {data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default UsersList;