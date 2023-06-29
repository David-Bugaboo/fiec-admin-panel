
import { IconProps } from "@mui/material";

import { iChildren, iUserFilter } from "../types";
import { createContext, useState } from "react";


export const filterUserContext = createContext({} as iUserFilter)


export const FilterUserContextProvider = ({children}:iChildren) => {
    
    const [filterUser, setFilterUser] = useState("")
    
    return (  
        <filterUserContext.Provider value={{filterUser,setFilterUser}}>
            {children}
        </filterUserContext.Provider>

    );
}
 

