import React from 'react';
import {Grid, Typography} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const HeaderGrid = styled(Grid)(() => ({
    width: '100vw',
    display: 'flex',
    paddingLeft: '5vw',
    paddingTop: '5vh'
}))

const StyledTitle = styled(Typography)(() => ({
    color: '#009e60'
}))
export default function Header(){
    return(
        <HeaderGrid>
            <StyledTitle variant="h4" gutterBottom>GreenVestments</StyledTitle>
        </HeaderGrid>
    )
}