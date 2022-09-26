import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import GroupService from '../services/groupService';
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'permissions', headerName: 'Permissions', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'number',
    width: 90,
  }
];
const groupService = new GroupService()

export default function GroupTable() {
    const [groups, setGroups] = useState({});

useEffect(() => {
  groupService.getAllGroups()
    .then(data => setGroups(data))
}, [])
console.log(groups)
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={groups}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}