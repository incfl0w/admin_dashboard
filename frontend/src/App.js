// import Button from '@mui/material/Button';
import {Tabs, Tab, Box} from '@mui/material'
import  TabPanel from './components/tabPanel'
import { AccountCircle, Group} from '@mui/icons-material';
import BasicTabs from './pages/main';

import Users from './pages/users';

function App() {


  const handleButtonClick = (e) =>{
    e.preventDefault();
    console.log("Prevented") 
  }

  
  return (

    <div className="App">
      <BasicTabs></BasicTabs>
    </div>
  );
}

export default App;
