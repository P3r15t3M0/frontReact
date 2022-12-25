import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contex/AuthContext';

export const Auth = () => {
    const { user, logout } = useContext(AuthContext);

    return user ? (
        <>
            <p>
                Logged in as <Link to={'/user'}>{user.info[0].email}</Link>
            </p>
            <button onClick={() => logout()}>LogOut</button>
        </>
     ) : (
        <ul>
            <li>
                <Link to={'/register'}>Register</Link>
            </li>
            <li>
                <Link to={'/login'}>Login</Link>
            </li>
        </ul>
    );
};