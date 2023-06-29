import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../dashboard/Title";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import BlockIcon from "@mui/icons-material/Block";
import { surveyContext } from "../../context/surveyContext";
import { useNavigate } from "react-router-dom";
import QuizIcon from '@mui/icons-material/Quiz';


export default function Surveys() {
  const { populateSurveys, surveys } = React.useContext(surveyContext);
  const navigate = useNavigate() 

  return (
    <React.Fragment>
      <Button startIcon={<QuizIcon/>} style={{marginBottom:'18px',width:'100%'}} variant='contained'>Novo Questionário</Button>
      {
        <Table size="small" >
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#0097EB" }}>Id</TableCell>
              <TableCell style={{ color: "#0097EB" }}>Nome</TableCell>
              <TableCell style={{ color: "#0097EB" }}>Dimensões</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {Object.keys(surveys).length > 0 ? (
            <TableBody>
              {surveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell  style={{borderBottom:"none"}}>{survey.id}</TableCell>
                    <TableCell  style={{borderBottom:"none"}} 
                    >
                      {survey.name}
                    </TableCell >
                    <TableCell style={{borderBottom:"none"}}  >
                        <ul>
                            {survey.dimensions.map((dimension)=><li><Typography>{dimension.name}</Typography></li>)}
                        </ul>
                    </TableCell>
                    <TableCell style={{borderBottom:"none"}}>
                      <IconButton onClick={()=>navigate(`${survey.id}`)}>
                        <ModeEditIcon/>
                      </IconButton>
                      
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <CircularProgress />
          )}
        </Table>
      }
    </React.Fragment>
  );
}
