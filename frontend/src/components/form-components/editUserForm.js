import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form'
import {TextField, Select, MenuItem, CircularProgress, Button, InputLabel, Alert} from '@mui/material';
import GroupService from '../../services/groupService';
import UserService from '../../services/userService';


const EditUserForm = ({id, setUpdates,setOpen, updates , username}) => {
    const { register, handleSubmit, reset} = useForm({
        defaultValues: {
            username: username,
            groups: ""
        }
    });
    const [groups, setGroups] = useState(null);
    const groupService = new GroupService()
    const userService = new UserService()
    const [userData, setUserData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const firstUpdate = useRef(true);
    useEffect(() => {
        groupService.getAllGroups()
        .then(data => setGroups(data))
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {firstUpdate.current = false; return}
        
        userService.updateUser(userData)
        .then(data => setAlarm(data))
    }, [userData]);
    
    const onSubmit = (data) => {
        data["id"] = id
        console.log(data)
        setUserData(data)
        
        setTimeout(() => {
            setUpdates(updates+1)
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
    if (!groups){
        return <CircularProgress />
    }
    else{
    return (
        <div>
            <form onSubmit={handleSubmit((data) => {
                onSubmit(data)
                reset()
                // Here is Error in dom
            })}>
                <TextField {...register('username')}
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                
                <InputLabel id="group-select-label">Groups</InputLabel>
                <Select labelId="group-select-label" label="Age" {...register('group')}>
                { generateSelectOptions()}
                </Select>
                <br />
                <Button variant="contained" type='submit'>Submit</Button>
                <p>{alarm && <Alert severity={alarm.type}>{alarm.statusText}!</Alert>}</p>
            </form>
        </div>
    );
}
}

export default EditUserForm;
