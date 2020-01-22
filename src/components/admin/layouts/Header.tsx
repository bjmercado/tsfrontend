import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }),
);

const Header: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();
    return(
        <div>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <Typography variant="h6" noWrap>
                    ADMIN PANEL
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;