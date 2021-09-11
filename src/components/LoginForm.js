import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import { setCredentials } from '../redux/authSlice';
import { useLoginUserMutation } from '../redux/userApi';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function LoginForm() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser] = useLoginUserMutation();

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const { data } = await loginUser({ email, password });
            dispatch(setCredentials(data));
        } catch (error) {
            alert(`${error.message}`);
        }
        reset();
    }

    function reset() {
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <h2 >LogIn for using your personal phonebook</h2>
            <div >
                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        required
                        id="filled-required"
                        label="E-mail"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        variant="filled"
                    />

                    <TextField
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        variant="filled"
                    />

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                        >
                            Log In
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}