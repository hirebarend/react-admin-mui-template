import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export function ConfirmationDialog(props: {
  // eslint-disable-next-line no-unused-vars
  onClose: (x: any) => void;
  open: boolean;
}) {
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>Are you sure you want to...</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Warning! Deleting this webhook is irreversible. The action you are
          about to take cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose(false)}>No</Button>
        <Button onClick={() => props.onClose(true)}>
          Yes, delete this webhook
        </Button>
      </DialogActions>
    </Dialog>
  );
}
