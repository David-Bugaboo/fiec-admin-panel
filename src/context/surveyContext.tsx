import { createContext, useState } from "react";
import { iChildren, iSurvey, iSurveyContext } from "../types";
import { getAllSurveys } from "../services/surveys.service";



export const surveyContext =  createContext({} as iSurveyContext)

const SurveyProvider = ({children}:iChildren) => {
    const [surveys, setSurveys] = useState([] as iSurvey[])
    const [survey, setSurvey] = useState({} as iSurvey)
    const populateSurveys = async () => {
        const response = await getAllSurveys()
        setSurveys(response)
    }

    return ( 
        <surveyContext.Provider value={{surveys, setSurveys, populateSurveys, survey, setSurvey }}>
                {children}
        </surveyContext.Provider>

     );
}
 
export default SurveyProvider;