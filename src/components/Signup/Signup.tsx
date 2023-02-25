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
  const [verifyPassword, setVerifyPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeVerifyPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPassword(event.target.value);
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
    if (password !== verifyPassword) {
      setShowError(true);
      return;
    }
    setShowError(false);
    const user = await AuthService.signup(name, email, password);
    if (user) {
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
          <TextField
            className="password input"
            id="outline-password"
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            error={showError}
          />
          <TextField
            className="verify-password input"
            id="outline-verify-password"
            variant="outlined"
            label="Verify Password"
            type="password"
            value={verifyPassword}
            onChange={handleChangeVerifyPassword}
            error={showError}
          />
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
