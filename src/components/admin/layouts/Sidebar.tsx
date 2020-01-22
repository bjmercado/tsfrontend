import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Link} from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import DashboardIcon from '@material-ui/icons/Dashboard';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
  }),
);


const Sidebar: React.FunctionComponent = (): JSX.Element => {
    const classes = useStyles();

    return(
        <div>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem component={Link} to="/admin/" button>
                      <ListItemIcon><DashboardIcon/></ListItemIcon>
                      <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/admin/users" button>
                      <ListItemIcon><GroupIcon/></ListItemIcon>
                      <ListItemText primary="Users" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}

export default Sidebar;