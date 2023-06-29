import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Avatar, IconButton, Paper, Typography } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ModeEdit, Title } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import avatar from "../../assets/Frame 91.svg"

// Generate Order Data
function createData(
  id:number,
  name:string,
  email:string,
  cnpj:string,
) {
  return { id,name, cnpj, email};
}

const rows = [
  createData(
    0,
    "FIEC",
    "FIECb@gmail.com",
    "000.000.000/000"
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Companies() {
  return (
    <React.Fragment>
      <Paper>
       
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Funções</TableCell>    
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div>
                    <Typography variant="body1">{row.name}</Typography>
                    <Typography variant="body2">{row.email}</Typography>
                  </div>
                </TableCell>
                <TableCell>{row.cnpj}</TableCell>
                <TableCell>
                  <IconButton>
                    <ModeEditIcon/>
                  </IconButton>
                  <IconButton>
                    <DeleteIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}



