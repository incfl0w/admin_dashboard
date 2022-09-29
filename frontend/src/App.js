// import Button from '@mui/material/Button';
import {Tabs, Tab, Box} from '@mui/material'
import  TabPanel from './components/tabPanel'
import { AccountCircle, Group} from '@mui/icons-material';
import Main from './pages/main';


function App() {
  const handleButtonClick = (e) =>{
    e.preventDefault();
    console.log("Prevented") 
  }
  return (
    <div className="App">
      <Main></Main>
    </div>
  );
}
export default App;
