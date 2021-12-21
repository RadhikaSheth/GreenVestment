import React from 'react';
import {Grid, Typography} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const StyledGrid = styled(Grid)(() => ({
    // width: '100vw',
    display: 'flex',
    paddingLeft: '5vw',
    paddingTop: '5vh'
}))

export default function InvestmentList(){
    return(
        <StyledGrid container direction="column" alignItems="flex-start">
            <div>hey</div>
        </StyledGrid>
    )
}