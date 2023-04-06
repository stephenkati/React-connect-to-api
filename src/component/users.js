import { useDispatch, useSelector } from 'react-redux';
import SingleUser from './singleUser';
import { useEffect } from 'react';
import { getUsers } from '../users/usersSlice';


const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.users);
  
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div className="loading">
        <h1>Request failed</h1>
      </div>
    );
  }
  return (
    <div>
      <ul>
        {
          users.map((user) => {
            return <SingleUser key={user.id} {...user} />
          })
        }
      </ul>
    </div>
  );  
};

export default Users;
