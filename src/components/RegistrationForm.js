import { useState } from 'react';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSignupUserMutation } from '../redux/userApi';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function RegistrationForm() {
    const classes = useStyles();

    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [createUser] = useSignupUserMutation();

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'name':
                return setName(value);
            case 'email':
                return setEmail(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();

        createUser({ name, email, password })
            .unwrap()
            .then(() => {
                toast.success('Registration is successes! Now LogIn');

                setInterval(() => {
                    history.push('/login');
                }, 2000);
            })
            .catch(() => {
                toast.error(`Bad Request or user ${name} is already exist!`);
            });

        reset();
    };

    return (
        <>
            <ToastContainer />
            <h2 >Please, sign up</h2>
            <div >
                <form
                   className={classes.root}

                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField

                        required
                        id="required-name"
                        label="Your Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        variant="filled"
                    />

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

                    <div >
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}