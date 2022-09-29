import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form'
import {TextField, Select, MenuItem, CircularProgress, Button, InputLabel, Alert} from '@mui/material';
import GroupService from '../../services/groupService';
import UserService from '../../services/userService';
import MultipleSelect from './MultipleSelect';


const CreateUserForm = ({handleClose, setUpdates, updates}) => {
    const { register, handleSubmit, reset} = useForm({
        defaultValues: {
            username: "",
            password: "",
            groups: ""
        }
    });
    const [groups, setGroups] = useState(null);
    const groupService = new GroupService()
    const userService = new UserService()
    const [userData, setUserData] = useState(null)
    const [alarm, setAlarm] = useState(null)
    const [selectedGroups, setSelectedGroups] = useState([])
    const firstUpdate = useRef(true);
    useEffect(() => {
        groupService.getAllGroups()
        .then(data => setGroups(data))
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {firstUpdate.current = false; return}
        console.log("runUseEffect")
        userService.createUser(userData)
        .then(data => setAlarm(data))
    }, [userData]);
    
    const onSubmit = (data) => {
        const groupsIdList = (groups.filter(group => selectedGroups.includes(group.name))).map(item => item.id)
        data['groups'] = groupsIdList
        console.log(data)
        setUserData(data)
        setTimeout(() => {
            handleClose()
            setUpdates(updates+1)
        }, 1500)
        
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
                console.log(data)
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
                <TextField {...register('password')}
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                <br />
                <MultipleSelect {...register('groups')} 
                isMulti={true}
                // data={groups.map(group => group.id) }
                data={groups}
                selectedGroups={selectedGroups}
                setSelectedGroups={setSelectedGroups}
                />
                <br />
                <Button variant="contained" type='submit'>Submit</Button>
                <p>{alarm && <Alert severity={alarm.type}>{alarm.statusText}!</Alert>}</p>
            </form>
        </div>
    );
}
}

export default CreateUserForm;
