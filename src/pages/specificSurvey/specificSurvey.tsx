import {
  AppBar,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { surveyContext } from "../../context/surveyContext";
import { useParams } from "react-router-dom";
import { getSpecificSurvey } from "../../services/surveys.service";
import { iSurvey, iSurveyWithAsnwers } from "../../types";
import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
const SpecificSurvey = () => {
  const { id } = useParams();
  const [thisSurvey, setThisSurvey] = useState([] as iSurveyWithAsnwers[]);
  const [open, setOpen] = React.useState(true);
  const [name, setName] = useState("" as string);
  const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const getResponse = async () => {
      const response = await getSpecificSurvey(Number(id));
      setThisSurvey(response);
    };
    getResponse();
  }, []);

  return (
    <>
      <Typography variant="h1"></Typography>
      {thisSurvey.map((question) => (
        <List
          sx={{
            marginBottom: "16px",
            width: "100%",
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader>
              <Typography variant="body1">
                <strong>{question.text}</strong>
              </Typography>
              <List>
                <ListItemButton>
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary={question.department} />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <ScoreboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={question.points} />
                </ListItemButton>
              </List>
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemIcon>
              <ThumbUpAltIcon />
            </ListItemIcon>
            <ListItemText primary="Sempre" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText  primary={question.always.A.text} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText  primary={question.always.B.text} />
            </ListItemButton>
          </List>
          <ListItem>
            <ListItemIcon>
              <ThumbUpOffAltIcon />
            </ListItemIcon>
            <ListItemText primary="As vezes" />
          </ListItem>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={question.sometimes.A.text} />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText  primary={question.sometimes.B.text} />
            </ListItemButton>
          </List>
        </List>
      ))}
    </>
  );
};

export default SpecificSurvey;
