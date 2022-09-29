import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Box, Button} from '@mui/material';
import UserTable from '../components/userTable';
import GroupTable from '../components/groupTable';
import CreateUserDialog from '../components/createUserDialog';
import CreateGroupDialog from '../components/createGroupDialog';
import TabPanel from '../components/tabPanel';



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Main() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openU, setOpenU] = useState(false);
  const [openG, setOpenG] = useState(false);
  const [updatesU, setUpdatesU] = useState(1)
  const [updatesG, setUpdatesG] = useState(1)

  const handleClickOpen = (e) => {
    if (e.target.id === 'add-user'){
      setOpenU(true);
    }
    if (e.target.id === 'add-group'){
      setOpenG(true);
    }
    
  };

  const handleClose = () => {
    setOpenU(false);
    setOpenG(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Groups" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Button id="add-user" variant="outlined" onClick={e => handleClickOpen(e)}>Create User</Button>
        <CreateUserDialog openU={openU} handleClose={handleClose} updates={updatesU} setUpdates={setUpdatesU}/>
        <UserTable updates={updatesU} setUpdates={setUpdatesU}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Button id="add-group" variant="outlined" onClick={e => handleClickOpen(e)}>Create Group</Button>
        <CreateGroupDialog openU={openG}  handleClose={handleClose} updates={updatesG} setUpdates={setUpdatesG}/>
        <GroupTable updates={updatesG} setUpdates={setUpdatesG}/>
      </TabPanel>
    </Box>
  );
}