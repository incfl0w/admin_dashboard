import * as React from 'react';
import PropTypes from 'prop-types';
import {Tab, Tabs, Box, Typography, Button} from '@mui/material';
import UserTable from '../components/userTable';
import GroupTable from '../components/groupTable';
import CreateUserDialog from '../components/createUserDialog';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openU, setOpenU] = React.useState(false);

  const handleClickOpen = () => {
    setOpenU(true);
  };

  const handleClose = () => {
    setOpenU(false);
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
        <Button variant="outlined" onClick={handleClickOpen}>Create User</Button>
        <CreateUserDialog openU={openU} handleClose={handleClose}/>
        <UserTable/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GroupTable/>
      </TabPanel>
    </Box>
  );
}