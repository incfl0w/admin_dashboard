import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Username', width: 130 },
  { field: 'created', headerName: 'Created', width: 130 },
  { field: 'groups', headerName: 'Groups', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'number',
    width: 90,
  }
];
const userService = new UserService()


export default function UserTable() {
    const [users, setUsers] = useState(null);

useEffect(() => {
    userService.getAllUsers()
    .then(data => setUsers(data))
}, [])
console.log(users)
if (!users) {
  return <CircularProgress />
}
else{
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
  
}