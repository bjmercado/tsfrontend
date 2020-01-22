import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface ModalProps{
    open: boolean;
    close: () => void;
    description: string;
    content: () => any;
}

const Modal: React.FunctionComponent<ModalProps> = (props): JSX.Element => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">READ ME</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.description}
          </DialogContentText>
            {props.content()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal;
