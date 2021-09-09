import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsLogedIn } from '../redux/authSlice';

export default function PrivateRoute({
                                         children,
                                         redirectTo = '/',
                                         ...routeProps
                                     }) {
    const isLogedIn = useSelector(getIsLogedIn);
    return (
        <Route {...routeProps}>
            {isLogedIn ? children : <Redirect to={redirectTo} />}
        </Route>
    );
}