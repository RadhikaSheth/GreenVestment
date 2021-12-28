import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, IconButton, Button, InputBase, TextField, CircularProgress, Input, Paper, Link, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Header from '../components/Header';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import DataTable from '../components/DataTable';
import Axios from 'axios';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "sandbox_c6v9maaad3i9k7i771jg";
const finnhubClient = new finnhub.DefaultApi();

const StyledCard = styled(Grid)(({ theme }) => ({
    height: '80px',
    paddingLeft: '30px',
    paddingRight: '30px',

}));

const StyledGrid = styled(Grid)(() => ({
    // width: '100vw',
    display: 'flex',
    paddingLeft: '5vw',
    // paddingTop: '8vh'
}))

const CardCard = styled(Card)(() => ({
    backgroundColor: "#F5F5F5",
    height: '80px',
    width: '100%',
    borderRadius: '10px',
    marginTop: '7px',
}))

export default function InvestmentDetail() {
    const [esgData, setesgData] = useState();
    const [companyData, setcompanyData] = useState();
    const { symbol } = useParams();
    const [arr, setArray] = useState([]);
    const [esg, setEsg] = useState();
    const [price, setPrice] = useState();
    const [priceData, setPriceData] = useState([]);
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);
    const [alternative1, setA1Length] = useState([]);
    const [alternative2, setA2Length] = useState([]);


    useEffect(() => {
        setLoading(true);
        Axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=c6v9maaad3i9k7i771j0`)
            .then((response) => {
                setcompanyData(response.data);
            })

        Axios.get('http://127.0.0.1:8000/api/getPrice/')
            .then((response) => {
                setPriceData(response.data);
                var thisEsg;
                var thisCategory;
                var thisPrice;
                response.data.map((item) => {
                    if (item.symbol == symbol) {
                        thisEsg = item.totalEsg;
                        setEsg(item.totalEsg);
                        thisCategory = item.category;
                        setPrice(item.priceDiff);
                        thisPrice = item.priceDiff;
                        setCategory(item.category);
                    }
                })
                var betterAlternatives = [];
                {
                    response.data.map((item) => {
                        if (item.symbol != symbol && (item.category == thisCategory && (parseInt(item.priceDiff) > parseInt(thisPrice) && parseInt(item.totalEsg) > parseInt(thisEsg)))) {
                            console.log(parseInt(item.priceDiff) > parseInt(thisPrice))
                            betterAlternatives.push(item);
                        }
                    })
                }
                var similarAlternatives = [];
                {
                    response.data.map((item) => {
                        if (item.symbol != symbol && (item.category == thisCategory && (parseInt(item.totalEsg) > parseInt(thisEsg) && parseInt(item.priceDiff) <= parseInt(thisPrice)))) {
                            similarAlternatives.push(item);
                        }
                    })
                }
                setA1Length(betterAlternatives);
                setA2Length(similarAlternatives);

            })
        setLoading(false);
    }, [])

    return (
        <>
            <Header />
            {!companyData ? (
                <Grid width="100vw" height="80vh" container justifyContent="center" alignItems="center">
                    <CircularProgress color="inherit" size={20} />
                </Grid>

            ) :
                <Grid container>
                    <Grid item xs={7}>
                        <>
                            <StyledGrid container direction="row" alignItems="center" pt={6}>
                                <Grid item>
                                    <img src={companyData.logo} height='20px' />
                                </Grid>
                                <Grid item mt={2} ml={2} pr={17}>
                                    <>
                                        <Typography variant="h5">&nbsp; {companyData.name}</Typography>
                                        <Typography variant="caption" > &nbsp; &nbsp;<Link href={companyData.weburl}>{companyData.weburl}</Link></Typography>
                                    </>
                                </Grid>
                                <Typography variant="h6">Return: {parseInt(price).toFixed(2)}</Typography>
                                <Typography variant="h6" pl={3}>ESG: {esg}</Typography>

                            </StyledGrid>
                            <StyledGrid>

                            </StyledGrid>
                        </>
                        <StyledGrid pt={5}>
                            <Typography variant="h5">Alternatives</Typography>
                        </StyledGrid>
                        <Grid container direction="column" pl={8} pt={5}>
                            <Typography>Better ESG and Better Profit:</Typography>
                            {alternative1.map((item) => {
                                return (
                                    <CardCard>
                                        <CardActionArea href={`/${item.symbol}`}>
                                            <StyledCard container justifyContent="space-between" alignContent="center" >
                                                <Typography>
                                                    {item.symbol}
                                                </Typography>
                                                <Typography>
                                                    Return: {parseInt(item.priceDiff).toFixed(2)}
                                                </Typography>
                                                <Typography>
                                                    ESG: {item.totalEsg}
                                                </Typography>
                                            </StyledCard>
                                        </CardActionArea>
                                    </CardCard>
                                )
                            })}
                            {alternative1.length == 0 ?
                                <Typography color="#696969">No alternatives present</Typography>
                                :
                                null
                            }
                        </Grid>
                        <Grid container direction="column" pl={8} pt={5}>
                            <Typography>Better ESG and Similiar Profit:</Typography>
                            {alternative2.map((item) => {
                                return (
                                    <CardCard>
                                        <CardActionArea href={`/${item.symbol}`}>
                                            <StyledCard container justifyContent="space-between" alignContent="center" >
                                                <Typography>
                                                    {item.symbol}
                                                </Typography>
                                                <Typography>
                                                    Return: {parseInt(item.priceDiff).toFixed(2)}
                                                </Typography>
                                                <Typography>
                                                    ESG: {item.totalEsg}
                                                </Typography>
                                            </StyledCard>
                                        </CardActionArea>
                                    </CardCard>
                                )
                            })}
                            {alternative2.length == 0 ?
                                <Typography color="#696969">No alternatives present</Typography>
                                :
                                null
                            }
                        </Grid>
                    </Grid>
                    <StyledGrid item xs={5} pl={5}>
                        <DataTable symbol={symbol} />
                    </StyledGrid>
                </Grid>

            }
        </>
    )
}