import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Axios from 'axios'
const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    paddingLeft: '5vw',
    paddingTop: '5vh'
}))

const StyledCard = styled(Grid)(({ theme }) => ({
    height: '100px',
    paddingLeft: '30px',
    paddingRight: '30px',

}));

const CardCard = styled(Card)(() => ({
    backgroundColor: "#F5F5F5",
    height: '100px',
    width: '80%',
    borderRadius: '10px',
    marginTop: '7px',
}))
var score = 30;

export default function InvestmentList({ Investments, Length }) {

    const [list, setList] = useState([]);
    const [price, setPriceData] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/getPrice/')
            .then((response) => {
                setPriceData(response.data);
            })
    }, [])
    useEffect(() => {
        Length && setLoading(true);
    }, [Length])

    return (
        <StyledGrid container direction="column" alignItems="flex-start">
            {loading &&
                <>
                    {Length > 0 ? null :
                        <Grid container justifyContent="center" alignItems="center" style={{ width: "80%", height: "55vh" }}>
                            <Typography variant="h5" color="#A0A0A0">Add your Investments!</Typography>
                        </Grid>
                    }
                    {Investments &&
                        Investments.map((item) => {
                            var thisPrice;
                            return (
                                <CardCard>
                                    <CardActionArea href={`/${item}`}>
                                        <StyledCard container justifyContent="space-between" alignContent="center" >
                                            <Typography variant="body">
                                                {item}
                                            </Typography>
                                            {price.map((i) => {
                                                if (item == i.symbol) {
                                                    thisPrice= i.totalEsg;
                                                }
                                            })}
                                            <>
                                                {console.log(thisPrice)}
                                                {(parseInt(thisPrice) >= 50) ?
                                                    <Typography variant="subscript" color="#696969"><Typography variant="body" fontWeight="bold" color="#00695C"> {thisPrice}</Typography> ESG</Typography>
                                                    : null
                                                }
                                                {(parseInt(thisPrice) >= 25 && parseInt(thisPrice) < 50) ?
                                                    <Typography variant="subscript" color="#696969"><Typography variant="body" fontWeight="bold" color="#FFAE42"> {thisPrice}</Typography> ESG</Typography>
                                                    : null
                                                }
                                                {(parseInt(thisPrice) < 25) ?
                                                    <Typography variant="subscript" color="#696969"><Typography variant="body" fontWeight="bold" color="#F4511E"> {thisPrice}</Typography> ESG</Typography>
                                                    : null
                                                }
                                            </>

                                        </StyledCard>
                                    </CardActionArea>
                                </CardCard>
                            )
                        })
                    }
                </>

            }

        </StyledGrid >
    )
}