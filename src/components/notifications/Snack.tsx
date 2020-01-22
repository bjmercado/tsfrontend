import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide  from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  }),
);

interface SnackProps{
    data: {open: boolean, message: string, color: string};
    onClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void;
}

const slideDirection = (props: TransitionProps): JSX.Element => {
    return(
        <Slide {...props} direction="left"/>
    );
}


const Snack: React.FunctionComponent<SnackProps> = (props: SnackProps): JSX.Element => {
  const classes = useStyles();

  return (
      
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={props.data.open}
        autoHideDuration={1000}
        onClose={props.onClose}
        TransitionComponent={slideDirection}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
      >

    <SnackbarContent 
      style={{ backgroundColor: `${props.data.color}`}}
      message={<span id="client-snackbar">{props.data.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
      </Snackbar>
    </div>
  );
}

export default Snack;
