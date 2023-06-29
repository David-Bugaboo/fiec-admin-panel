import { createContext, useContext, useEffect, useState } from "react";
import { getUsersService } from "../services/users.service";
import { iChildren, iUserArray, iUserContext } from "../types";



export const userContext = createContext({} as iUserContext)



export const UserProvider = ({children}:iChildren) => {

    
    const [users, setUsers] = useState({} as iUserArray)
   
    
    const populateUsers = async() =>{
       const response =  await getUsersService()
       setUsers(response.data.users)
    }

    return ( 
        <userContext.Provider value={{users, setUsers, populateUsers}}>
                {children}
        </userContext.Provider>
     );
}
 
