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
import { ModeEdit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import avatar from "../../assets/Frame 91.svg";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MyModal from "../../components/modals/registerUserModal/registerUserModal";
import { usersmock } from "../../mockdata/users";
import { userContext } from "../../context/usersContext";
import { iUser } from "../../types";
import { searchUserContext } from "../../context/searchUserContext";
import { filterUserContext } from "../../context/filterUserContext";
import {
  BlockUserService,
  RegisterUserService,
} from "../../services/users.service";
import UpdateModal from "../../components/updateUserModal/updateUserModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

function createData(
  id: number,
  name: string,
  email: string,
  position: string,
  company: string
) {
  return { id, name, email, position, company };
}

const rows = [
  createData(0, "Rogério Barrosa", "gerinhob@gmail.com", "Gestor", "FIEC"),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function User() {
  const { populateUsers, users } = React.useContext(userContext);
  const { searchUser, setSearchUser } = React.useContext(searchUserContext);
  const [updatedUser, setUpdateduser] = React.useState({});
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(
    false as boolean
  );

  const onClose = () => {
    setCreateModalOpen(false);
  };

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  return (
    <React.Fragment>
      <TextField
        onChange={(e) => setSearchUser(e.target.value)}
        variant="outlined"
        placeholder="pesquise um nome cargo ou empresa"
        fullWidth
        InputProps={{
          style: { color: "#0097EB", opacity: "1" },
          startAdornment: (
            <InputAdornment position="start">
              <IconButton style={{ color: "#0097EB" }}>
                <PersonSearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: "16px", backgroundColor: "#FCFCFF" }}
      />
      <MyModal open={createModalOpen} onClose={onClose} />
      <UpdateModal
        open={updateModalOpen}
        onClose={onCloseUpdateModal}
        user={updatedUser}
      />
      <Button
      onClick={()=>setCreateModalOpen(true)}
        startIcon={<PersonAddIcon />}
        style={{ marginBottom: "18px", width: "100%" }}
        variant="contained"
      >
        Novo Usuário
      </Button>
      {
        <Table size="small">
          <TableHead>
            <TableRow>
              
              <TableCell style={{ color: "#0097EB" }}>Nome</TableCell>
              <TableCell style={{ color: "#0097EB" }}>Função</TableCell>
              <TableCell style={{ color: "#0097EB" }}>Empresa</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {Object.keys(users).length > 0 ? (
            <TableBody>
              {users.manager
                .filter((user) => user.blocked === false)
                .filter((user) => user.fullName.includes(searchUser))
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        borderBottom: "none",
                      }}
                    >
                      <Avatar src={avatar} />
                      <div>
                        <Typography variant="h6">{user.username} - {user.fullName}</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                      </div>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                      {user.role}
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                      {user.business}
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }}>
                      <IconButton
                        onClick={() => {
                          setUpdateduser(user);
                          setUpdateModalOpen(true);
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          await BlockUserService(user);
                          populateUsers();
                        }}
                      >
                        <BlockIcon />
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
