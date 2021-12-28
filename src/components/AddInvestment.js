import React, { useState, useCallback, useEffect } from 'react';
import { Grid, IconButton, Button, InputBase, TextField, Input, Paper, List, ListItem, Autocomplete, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "sandbox_c6v9maaad3i9k7i771jg";
const finnhubClient = new finnhub.DefaultApi();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 370,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '30px'

};

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    paddingTop: '25vh',
}))

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    borderRadius:'30px',
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[800],
    },
}));


export default function AddInvestment({AppendInvestment}) {
    const [modal, setmodal] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [amount, setAmount] = useState(0);
    const [investments,setList] = useState([]);
    const [selectedInv, setInv] = useState();
    const [data, setData] = useState([]);
    const loading = open && options.length === 0;

    const ChangeInvestment = () =>{
        AppendInvestment(selectedInv);
        handleClose();
    }
    function debounce(func, wait, immediate) {
        var timeout;
        return (...args) => {
            var context = this;
            var later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/getData/')
        .then((response)=>{
            var tickerList = []
            response.data.map((item)=>{
                tickerList.push(item.symbol);
            })
            setData(response.data);
            setOptions(tickerList);
        })
        finnhubClient.stockCandles("RELIANCE.NS", "W", parseInt((new Date('2020.12.27').getTime() / 1000).toFixed(0)), parseInt((new Date('2021.12.27').getTime() / 1000).toFixed(0)), (error, data, response) => {
            console.log(data.c)
            var diff = data.c[data.c.length - 1] - data.c[0]
            console.log(diff)
        });
        
    }, [])

    const handleOpen = () => setmodal(true);
    const handleClose = () => setmodal(false);

    return (
        <StyledGrid container direction="column" alignItems="flex-start">
            <IconButton style={{ height: '100px', width: '100px' }} onClick={handleOpen}>
                <FontAwesomeIcon icon={faPlusCircle} size="2x" color="#49796b" />
            </IconButton>
            {investments.map((item)=>{
                return(
                    <div>{item}</div>
                )
            })}
            <Modal
                open={modal}
                onClose={handleClose}
            >
                <Grid container direction="column" justifyContent="space-around" sx={style}>
                    <Autocomplete
                        id="asynchronous-demo"
                        style={{ width: "100%" }}
                        open={open}

                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        onChange={(event, value) => setInv(value)}
                        getOptionSelected={(option) => option}
                        getOptionLabel={option => option}
                        options={options}
                        loading={loading}
                        renderInput={params => (
                            <TextField
                                {...params}
                                style={{ color: "black" }}
                                label="Add you investments"
                                variant="outlined"
                                color="success"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    )
                                }}
                            />
                        )}
                    />
                    <ColorButton variant="contained" onClick={ChangeInvestment}>
                        Add
                    </ColorButton>
                </Grid>
            </Modal>
        </StyledGrid>
    )
}