import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form'
import { TextField, CircularProgress, Button, Alert } from '@mui/material';

import UserService from '../../services/userService';
import { Stack } from '@mui/system';
import MultipleSelect from './MultipleSelect';


const EditUserForm = ({ id, setUpdates, setOpen, updates, username, groups, setGroups, defaultSelectedGroups }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            username: username,

        }
    });


    const userService = new UserService()
    const [selectedGroups, setSelectedGroups] = useState([defaultSelectedGroups])
    const [userData, setUserData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (groups) {
            const groupsNames = (groups.filter(group => defaultSelectedGroups.includes(group.id))).map(item => item.name)
            setSelectedGroups(groupsNames)
        }
    }, [groups])

    useEffect(() => {
        if (firstUpdate.current) { firstUpdate.current = false; return }

        userService.updateUser(userData)
            .then(data => setAlarm(data))
    }, [userData]);

    const onSubmit = (data) => {
        data["id"] = id
        const groupsIdList = (groups.filter(group => selectedGroups.includes(group.name))).map(item => item.id)
        data["groups"] = groupsIdList
        setUserData(data)
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
                        <MultipleSelect
                            isMulti={true}

                            // data={groups.map(group => group.id) }
                            data={groups}
                            selectedGroups={selectedGroups}
                            setSelectedGroups={setSelectedGroups}
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

export default EditUserForm;
