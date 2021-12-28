import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import InvestmentList from '../components/InvestmentList';
import AddInvestment from '../components/AddInvestment';
import { Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios'

export default function Home({ symbol }) {

    const [stockData, setData] = useState([]);
    const [price, setPrice] = useState();

    useEffect(() => {

        Axios.get('http://127.0.0.1:8000/api/getData/')
            .then((response) => {
                response.data.map((item) => {
                    if (item.symbol == symbol) {
                        setData(item);
                    }
                })
            })
        Axios.get('http://127.0.0.1:8000/api/getPrice/')
            .then((response) => {
                response.data.map((item) => {
                    if (item.symbol == symbol) {
                        setPrice(item.priceDiff);
                    }
                })

            })

    }, [])

    return (
        <Grid container direction="column" pl={5} pt={5}>
            <TableContainer component={Paper} style={{ width: '75%' }}>
                <Table aria-label="simple table"  >
                    <TableBody >
                        <TableRow hover >
                            <TableCell align="left"><Typography>Ticker</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.symbol}</Typography></TableCell>
                        </TableRow>
                        <TableRow hover >
                            <TableCell align="left" ><Typography>Category</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.category}</Typography></TableCell>
                        </TableRow>
                        <TableRow hover >
                            <TableCell align="left" ><Typography>Environmental Score</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.environmentScore}</Typography></TableCell>
                        </TableRow><TableRow hover>
                            <TableCell align="left"><Typography>Governance Score</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.governanceScore}</Typography></TableCell>
                        </TableRow><TableRow hover>
                            <TableCell align="left"><Typography>Social Score</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.socialScore}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <br />
            <Typography variant="h6" paddingLeft={2}>Involvement Area</Typography>
            <br />
            <TableContainer component={Paper} style={{ width: '75%' }}>
                <Table aria-label="simple table"  >
                    <TableBody >
                        <TableRow hover >
                            <TableCell align="left" ><Typography>Controversial Weapons</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.controversialWeapons}</Typography></TableCell>
                        </TableRow><TableRow hover>
                            <TableCell align="left"><Typography>Gambling</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.gambling}</Typography></TableCell>
                        </TableRow><TableRow hover>
                            <TableCell align="left"><Typography>Nuclear Equipments</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.nuclear}</Typography></TableCell>
                        </TableRow><TableRow hover>
                            <TableCell align="left"><Typography>Fur Leather</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.furLeather}</Typography></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell align="left"><Typography>Alchoholic Substance</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.alchoholic}</Typography></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell align="left"><Typography>Animal Testing</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.animalTesting}</Typography></TableCell>
                        </TableRow>
                        <TableRow hover>
                            <TableCell align="left"><Typography>Tobacco Products</Typography></TableCell>
                            <TableCell align="right"><Typography>{stockData.tobacco}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Grid>
    )
}