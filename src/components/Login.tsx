import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snack from './notifications/Snack';

import { inject, observer } from 'mobx-react';

import { UserProps } from '../props/UserProps';
import history from '../history';

const Copyright = (): JSX.Element => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/uploads/1413387158190559d80f7/6108b580?ixlib=rb-1.2.1&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login: React.FunctionComponent<UserProps> = (props): JSX.Element => {   
    const classes = useStyles();
    const [data, setData] = React.useState({
      open: false,
      message: '',
      color: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        switch (e.currentTarget.name) {
            case 'email':
                props.userStore!.email = e.currentTarget.value;
                break;
            case 'password':
                props.userStore!.password = e.currentTarget.value;
                break;
            default:
                break;
        }
    }

    const login = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const result = await props.userStore!.login();
        props.userStore!.isAuthenticated = result;
        if(props.userStore!.isAuthenticated){
          setData({open: true, message: 'Successful Validation', color: '#43a047'});
          setTimeout(() => {
            history.push('/admin/');
          }, 1500)
        }else{
          setData({open: true, message: 'Invalid Credentials', color: '#d32f2f'});
        }
    }

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
      if (reason === 'clickaway') {
        return;
      }
      setData({open: false, message: '', color: ''});
    };

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={(e) => login(e)} autoComplete="off">
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleChange(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
        <Snack
          data={data}
          onClose={handleClose}/>
      </Grid>

      
    );
}


export default inject('userStore')(observer(Login));
