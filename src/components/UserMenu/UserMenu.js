import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName, removeCredentials } from '../../redux/authSlice';
import { useLogoutUserMutation } from '../../redux/userApi';
import styles from './UserMenu.module.css'

export default function UserMenu() {
    const dispatch = useDispatch();
    const name = useSelector(getUserName);
    const [logOut] = useLogoutUserMutation();

    const handleBtnClick = () => {
        logOut();
        dispatch(removeCredentials());
    };

    return (
        <div >
            <span className={styles.span}>Welcome, {name}</span>
            <Button
                variant="contained"
                color="secondary"
                type="button"
                size="small"
                onClick={handleBtnClick}
            >
                Log Out
            </Button>
        </div>
    );
}