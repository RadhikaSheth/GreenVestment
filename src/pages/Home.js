import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import InvestmentList from '../components/InvestmentList';
import AddInvestment from '../components/AddInvestment';
import { Grid, Typography } from '@mui/material';
import Axios from 'axios'
export default function Home() {
    const [investments, setList] = useState([]);
    const [options, setOptions] = useState([]);
    const [esg, setEsg] = useState([]);

    const AppendInvestment = (value) => {
        // setList(investments => [...investments, value])
        addValue(value);
    }

    useEffect(() => {
        getList();
    }, [])

    function getList() {
        Axios.get('http://127.0.0.1:8000/api/getInv/')
            .then((response) => {
                var tickerList = [];
                response.data.map((item) => {
                    tickerList.push(item.symbol)
                })
                setList(tickerList);
                console.log("get");
            })
    }
    function addValue(value) {
        Axios.post('http://127.0.0.1:8000/api/addInv/', { "symbol": value, "esg": 0 })
            .then((response) => {
                console.log("post")
                getList();
            })
    }
    return (
        <>
            {/* {score && console.log(score)} */}
            {/* {console.log(options)} */}
            <Header />
            <Grid container>
                <Grid item xs={9}>
                    <InvestmentList Investments={investments} Length={investments.length}/>
                </Grid>
                <Grid item xs={3}>
                    <AddInvestment AppendInvestment={AppendInvestment} Options={options} />
                </Grid>
            </Grid>
        </>

    )
}