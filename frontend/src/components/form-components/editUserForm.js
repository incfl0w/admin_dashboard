import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { TextField, Select, MenuItem, CircularProgress, Button, InputLabel, Alert, Grid } from '@mui/material';
import GroupService from '../../services/groupService';
import UserService from '../../services/userService';
import { Stack } from '@mui/system';
import MultipleSelect from './MultipleSelect';


const EditUserForm = ({ id, setUpdates, setOpen, updates, username }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            username: username,
            groups: ""
        }
    });
    const [groups, setGroups] = useState(null);
    const groupService = new GroupService()
    const userService = new UserService()
    const [selectedGroups, setSelectedGroups] = useState([])
    const [userData, setUserData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const firstUpdate = useRef(true);
    useEffect(() => {
        groupService.getAllGroups()
            .then(data => setGroups(data))
    }, []);

    useEffect(() => {
        if (firstUpdate.current) { firstUpdate.current = false; return }

        userService.updateUser(userData)
            .then(data => setAlarm(data))
    }, [userData]);

    const onSubmit = (data) => {
        data["id"] = id
        const groupsIdList = (groups.filter(group => selectedGroups.includes(group.name))).map(item => item.id)
        // data['groups'] = groupsIdList
        setUserData(data)
        console.log(data)
        setTimeout(() => {
            setUpdates(updates + 1)
            setOpen(false)
        }, 1500)

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
                        <TextField {...register('username')}
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Username"
                            type="text"

                            variant="standard"
                        />
                        <MultipleSelect {...register('groups')}
                            isMulti={true}
                            // data={groups.map(group => group.id) }
                            data={groups}
                            selectedGroups={selectedGroups}
                            setSelectedGroups={setSelectedGroups}
                        />
                        <br />
                        <Button variant="contained" type='submit'>Update</Button>
                        <p>{alarm && <Alert severity={alarm.type}>{alarm.statusText}!</Alert>}</p>
                    </Stack>
                </form>
            </div>
        );
    }
}

export default EditUserForm;
