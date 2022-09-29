import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { TextField, MenuItem, CircularProgress, Button,  Alert } from '@mui/material';
import GroupService from '../../services/groupService';
import { Stack } from '@mui/system';


const EditGroupForm = ({ id, setUpdates, setOpen, updates, name, description }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: name,
            description: description
        }
    });
    const [groups, setGroups] = useState(null);
    const groupService = new GroupService()
    const [groupData, setGroupData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const firstUpdate = useRef(true);
    useEffect(() => {
        groupService.getAllGroups()
            .then(data => setGroups(data))
    }, []);

    useEffect(() => {
        if (firstUpdate.current) { firstUpdate.current = false; return }

        groupService.updateGroup(groupData)
            .then(data => setAlarm(data))
    }, [groupData]);

    const onSubmit = (data) => {
        data["id"] = id
        console.log(data)
        setGroupData(data)

        setTimeout(() => {
            setUpdates(updates + 1)
            setOpen(false)
        }, 1500)

    }
    const generateSelectOptions = () => {
        return groups.map((group) => {
            return (
                <MenuItem key={group.id} value={group.id}>
                    {group.name}
                </MenuItem>
            )
        })
    }
    if (!groups) {
        return <CircularProgress />
    }
    else {
        return (
            <div>
                <form onSubmit={handleSubmit((data) => {
                    onSubmit(data)
                    reset()
                    // Here is Error in dom
                })}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 10 }}
                        justifyContent="center"
                        alignItems="center"

                    >

                        <TextField {...register('name')}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"

                            variant="standard"
                        />
                        <TextField {...register('description')}
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            variant="standard"
                        />
                        <br />
                        <Button variant="contained" type='submit'>Update</Button>
                        <div>{alarm && <Alert severity={alarm.type}>{alarm.statusText}!</Alert>}</div>
                    </Stack>
                </form>
            </div>
        );
    }
}

export default EditGroupForm;
