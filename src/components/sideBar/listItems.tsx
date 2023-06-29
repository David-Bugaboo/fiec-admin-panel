import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SettingsIcon from '@mui/icons-material/Settings';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button } from '@mui/material';
import { userContext } from '../../context/usersContext';
import { surveyContext } from '../../context/surveyContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../services/users.service';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuizIcon from '@mui/icons-material/Quiz';

interface listItemsProps{
  open:boolean
}

const handleNavigate = (route:string) =>{

  return <Navigate to={`\${route}`}/>

}



export const MainListItems = ({open}:listItemsProps) => 
{
  const [numberUsers, setNumberUsers] = React.useState(0)
  const {populateUsers,users} = React.useContext(userContext)
  const {populateSurveys, surveys} = React.useContext(surveyContext)
  const [numberSurveys, setNumberSurveys] = React.useState(0)
  const location = useLocation()
  
  
  

  React.useEffect(()=>{

    if (Object.keys(users).length>0){
      setNumberUsers(users.manager.filter(user=>user.blocked===false).length)
    }
    else{
      setNumberUsers(0)
    }
    setNumberSurveys(surveys.length)

  },[users, surveys])



  const navigate = useNavigate()

return (
  <React.Fragment> 
    <ListItemButton onClick={()=>navigate("users")}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
      {open&&<Badge badgeContent={numberUsers} color="primary"/>}
    </ListItemButton>
    <ListItemButton disabled onClick={()=>navigate("companies")}>
      <ListItemIcon>
        <BusinessIcon/>
      </ListItemIcon>
      <ListItemText primary="Empresas" />
      {/*open&&<Badge badgeContent={"off"} color="primary"/>*/}
    </ListItemButton>
    <ListItemButton onClick={()=>navigate("surveys")}>
      <ListItemIcon>
        
        <ContactSupportIcon/>
      </ListItemIcon>
      <ListItemText primary="Questionários" />
      {open&&<Badge badgeContent={numberSurveys} color="primary"/>}
    </ListItemButton>
    <ListItemButton onClick={()=>{
      logout()
      navigate("/")
    }}>
      <ListItemIcon>
        <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItemButton>
  </React.Fragment>
);}


