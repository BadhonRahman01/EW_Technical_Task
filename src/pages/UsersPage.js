import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import UserList from '../components/Users/UserList';

const UsersPage = () => {
const location = useLocation();
    
    return (
        <div>
            <h6>{`EasyWasteOyTestApp${location.pathname}`}</h6>
            <div className="container">

    <UserList />

            </div>
        </div>

    );
}
export default  UsersPage;