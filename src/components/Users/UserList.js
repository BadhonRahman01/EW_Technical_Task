import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/masterClient';

const UserList = () => {
    const [users, setUsers] = useState([]);

    // useEffect hook to fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch users from the API
    const fetchUsers = async () => {
        const response = await getUsers();
        setUsers(response.data);
    };

    return (
        <div>
            <h2>Users List</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{users.indexOf(user) + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            {/* <td>
                    <button class="btn btn-outline-warning m-2" >Edit</button>
                    <button class="btn btn-outline-danger m-2" >Delete</button>
                    </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
