import React, {useState, useEffect} from 'react';
import UserService from '../services/userService';


const Users = () => {
    const userService =  new UserService()
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAllUsers()
        .then(data=>setUsers(data))
    }, []);
    console.log(users)
    return (
        <div>
            
        </div>
    );
}

export default Users;
