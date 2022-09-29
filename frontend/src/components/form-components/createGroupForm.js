import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form'
import {TextField,  CircularProgress, Button, Alert} from '@mui/material';
import GroupService from '../../services/groupService';

const CreateGroupForm = ({handleClose}) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues:{
            username: "",
            description: ""
        }
    });
    const groupService = new GroupService();
    const [groupData, setGroupData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const firstUpdate = useRef(true);
    const onSubmit = (data) => {
        setGroupData(data)
        setTimeout(() => {
            handleClose()
        }, 1500)
    }

    useEffect(() => {
        if (firstUpdate.current) {firstUpdate.current = false; return}
        console.log("runUseEffect")
        groupService.createGroup(groupData)
        .then(data => setAlarm(data))
    }, [groupData]);

    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
              onSubmit(data)
              reset()
             
            })}>
                <TextField {...register('name')}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField {...register('description')}
                    autoFocus
                    margin="dense"
                    id="description"
                    label="description"
                    type="text"
                    fullWidth
                    multiline
                    rows={5}
                    variant="standard"
                />
                
                <br />
                <Button variant="contained" type='submit'>Submit</Button>
                <p>{alarm && <Alert severity={alarm.type}>{alarm.statusText}!</Alert>}</p>
            </form>
        </div>
    );
}


export default CreateGroupForm;