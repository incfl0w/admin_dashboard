import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import CreateGroupForm from './form-components/createGroupForm';

export default function CreateGroupDialog({openU, handleClose}) {
  return (
    <div>
      <Dialog open={openU} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
           <CreateGroupForm handleClose={handleClose}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}