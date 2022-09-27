import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import {TextField, Select, MenuItem, CircularProgress, Button, InputLabel} from '@mui/material';
import GroupService from '../../services/groupService';

const CreateGroupForm = () => {
    const { register, handleSubmit } = useForm();
    const [groups, setGroups] = useState(null);
    const groupService = new GroupService()
    useEffect(() => {
        groupService.getAllGroups()
        .then(data => setGroups(data))
    }, []);
    
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
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                <InputLabel id="group-select-label">Groups</InputLabel>
                <Select labelId="group-select-label" label="Age" {...register('group')}>
                { generateSelectOptions()}
                </Select>
                <br />
                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    );
}
}

export default CreateUserForm;

const a = {}

if(a){
    console.log("heh")
}