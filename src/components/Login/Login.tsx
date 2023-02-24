import React, { useState, useContext } from 'react';
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
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { setCookie } from '../../utils/cookie-handler';
import { TOKEN } from '../../utils/constants';
import AuthService from '../../services/AuthService';
import UserContext from '../../context/UserContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitLogin = async () => {
    setShowError(false);
    const accessToken = await AuthService.login(email, password);
    if (accessToken) {
      user.updateToken(accessToken);
      setCookie(TOKEN, accessToken);
      navigate('/home');
    } else {
      setShowError(true);
    }
  };

  return (
      <div className="login-container">
        <div className="input-container">
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
          <Button className="login-button" variant="contained" onClick={submitLogin}>
            Login
          </Button>
          <div className='signup-link'>
            <Link to="/signup">You don't have an account? Create account</Link>
          </div>
        </div>
      </div>
  );
};

export default Login;
