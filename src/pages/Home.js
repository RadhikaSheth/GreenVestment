import React from 'react';
import Header from '../components/Header';
import InvestmentList from '../components/InvestmentList';
import AddInvestment from '../components/AddInvestment';
import { Grid, Typography } from '@mui/material';

export default function Home() {
    return (
        <>  
            <Header />
            <Grid container>
                <Grid item xs={9}>
                    <InvestmentList />
                </Grid>
                <Grid item xs={3}>
                    <AddInvestment />
                </Grid>
            </Grid>
        </>

    )
}