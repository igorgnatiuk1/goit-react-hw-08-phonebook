import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, setCurrentUser } from '../redux/authSlice';
import { useGetCurrentUserQuery } from '../redux/userApi';

import AuthNav from './AuthNav/AuthNav';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';

import { getIsLogedIn } from '../redux/authSlice';



export default function AppBar() {
    const isLoggedIn = useSelector(getIsLogedIn);
    const dispatch = useDispatch();
    const isToken = useSelector(getToken);
    const { data: user } = useGetCurrentUserQuery(isToken);

    useEffect(() => {
        if (isToken === null) return;
        dispatch(setCurrentUser(user));
    }, [isToken, dispatch, user]);

    return (
        <header >
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
}