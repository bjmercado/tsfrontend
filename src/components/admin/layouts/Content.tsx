import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

const Content: React.FunctionComponent = (props: React.PropsWithChildren<React.ReactNode>): JSX.Element => {
    const classes = useStyles();
    return(
     <div className={classes.root}>
        <Header/>
        <Sidebar/>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
        </main>
      </div>
    );
}

export default Content;