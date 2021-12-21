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
    height: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '15px'

};

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    paddingTop: '25vh',
}))

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[800],
    },
}));


export default function AddInvestment() {
    const [modal, setmodal] = useState(false);
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [amount, setAmount] = useState(0);
    const [investments,setList] = useState([]);
    const [selectedInv, setInv] = useState();
    const loading = open && options.length === 0;

    const onChangeHandle = async value => {
        api(value);
    };

    const onChangeAmount = async value => {
        setAmount(value);
    }

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const ChangeInvestment = () =>{
        investments.push(selectedInv);
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

    const api = useCallback(
        debounce((value) => {
            finnhubClient.symbolSearch(value, (error, data, response) => {
                console.log("here")
                var array = [];
                data.result.map((item) => {
                    array.push(item.symbol);
                })
                setOptions(array);
            });
        }, 200),
        []
    );

    useEffect(() => {
        finnhubClient.symbolSearch("", (error, data, response) => {
            var array = [];
            data.result.map((item) => {
                array.push(item.symbol);
            })
            setOptions(array);
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
                                onChange={ev => {
                                    if (ev.target.value !== "" || ev.target.value !== null) {
                                        onChangeHandle(ev.target.value);
                                    }
                                }}
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
                    <TextField
                        label="Add amount"
                        variant="outlined"
                        color="success"
                        style={{ width: "100%" }}
                        onChange={ev => {
                            if (ev.target.value !== "" || ev.target.value !== null) {
                                onChangeAmount(ev.target.value);
                            }
                        }}
                    />
                    <ColorButton variant="contained" onClick={ChangeInvestment}>
                        Add
                    </ColorButton>
                </Grid>
            </Modal>
        </StyledGrid>
    )
}