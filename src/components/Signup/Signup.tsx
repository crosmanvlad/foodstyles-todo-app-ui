import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  IconButton,
  OutlinedInput,
  TextField,
  InputAdornment,
  Button,
  InputLabel,
  FormControl
} from '@mui/material';
import AuthService from '../../services/AuthService';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const submitSignup = async () => {
    setShowError(false);
    const accessToken = await AuthService.signup(name, email, password);
    if (accessToken) {
      navigate('/login');
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="signup-container">
        <div className="input-container">
        <TextField
            className="name input"
            id="outline-name"
            variant="outlined"
            label="Name"
            type="text"
            value={name}
            onChange={handleChangeName}
            error={showError}
          />
          <TextField
            className="email input"
            id="outline-email"
            variant="outlined"
            label="Username"
            type="text"
            value={email}
            onChange={handleChangeEmail}
            error={showError}
          />
          <FormControl className="password input" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChangePassword}
              error={showError}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label={"toggle password visibility"}
                    onClick={handleClickShowPassword}
                    edge={"end"}
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button className="login-button" variant="contained" onClick={submitSignup}>
            Sign Up
          </Button>
          <div className='login-link'>
            <Link to="/login">Already have an account? Go to Login</Link>
          </div>
        </div>
      </div>
  );
};

export default Signup;
