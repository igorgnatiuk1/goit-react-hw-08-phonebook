import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getIsLogedIn } from '../redux/authSlice';

export default function PublicRoute({
                                        children,
                                        restricted = false,
                                        redirectTo = '/',
                                        ...routProps
                                    }) {
    const isLogedIn = useSelector(getIsLogedIn);
    const renderFlag = isLogedIn && restricted;
    return (
        <Route {...routProps}>
            {renderFlag ? <Redirect to={redirectTo} /> : children}
        </Route>
    );
}