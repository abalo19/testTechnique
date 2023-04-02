import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Box, Typography } from '@material-ui/core';

function createData(
id: number,
date: string,
action: string,
name: string,
prixunitaire: string,
nombreaction: string,
total: string,
portefeuille: string,
) {
  return { id, date, action, name, prixunitaire, nombreaction, total, portefeuille };
}

const rows = [
  createData(1, '01/01/2022', 'ACHAT', 'AMAZON', '1350.98', '4', '5403.92', '94596.08'),
  createData(2, '01/01/2022', 'ACHAT', 'GOOGLE', '1951.77', '4', '3903.54', '90692.54'),
  createData(3, '01/01/2022', 'VENTE', 'AMAZON', '1350.98', '4', '5403.92', '96132.42'),
  createData(4, '01/01/2022', 'ACHAT', 'XXXXXX', 'XXXX,XX', 'XX', '5403.92', 'XXXX,XX'),
  createData(5, '01/01/2022', 'VENTE', 'XXXXXX', 'XXXX,XX', 'XX', '5403.92', 'XXXX,XX'),
  createData(5, '01/01/2022', 'VENTE', 'XXXXXX', 'XXXX,XX', 'XX', '5403.92', 'XXXX,XX'),
];

const MeilleurMoment = () => {
  const [dataTable, setDataTable] = useState([]);

  const retrieveDetails = () => {
    
        axios.get(`http://localhost:5000/DataGraph/FindAllTable`)
          .then(response => {
            
            const InitialArray = response.data.updatedDatagraphs;
            let id = 1;
            const productsWithId = InitialArray.map(product => {
            return { ...product, id: id++ };
          });

            setDataTable(productsWithId);
            
          })
          .catch(e => {
            console.log(e);
          });
  };

  useEffect(() => {
    retrieveDetails();
  }, []);

  return (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
    <Grid item xs={8} style={{paddingTop: "50px"}}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>DATE</TableCell>
                <TableCell align="right">ACTION</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">PRIX UNITAIRE</TableCell>
                <TableCell align="right">NOMBRE ACTION</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PORTEFEUILLE</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {dataTable.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                {row.timestamp.split('T')[0].split('-').reverse().join('-')}
                </TableCell>
                <TableCell align="right" style={{ color: row.action === 'vente' ? 'red' : 'green' }}>{row.action.toUpperCase()}</TableCell>
                <TableCell align="right">{row.type.toUpperCase()}</TableCell>
                <TableCell align="right">{row.action === 'vente' ? row.highestPriceOfTheDay : row.lowestPriceOfTheDay} €</TableCell>
                <TableCell align="right">Nombre d'Action</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Portefeuille</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Grid>
            
            <Grid item xs={8} style={{paddingTop: "50px"}}>
              
                <Box p={2} display="flex" alignItems="center">
                  <Box flexGrow={1}>
                      <Typography variant="h7" align="center">Temps total d'execution : xx minutes et xx secondes</Typography>
                  </Box>
                </Box>
            </Grid>
     </Grid>
  );
};

export default MeilleurMoment;