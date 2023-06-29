import { IconProps } from "@mui/material";

import { iChildren, iUserSearch } from "../types";
import { createContext, useState } from "react";


export const searchUserContext = createContext({} as iUserSearch)


export const SearchUserContextProvider = ({children}:iChildren) => {
    
    const [searchUser, setSearchUser] = useState("")
    
    return (  
        <searchUserContext.Provider value={{searchUser, setSearchUser}}>
            {children}
        </searchUserContext.Provider>

    );
}
 
