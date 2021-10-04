/* eslint-disable */
import React from 'react';
import { useEffect, useState } from 'react'

// material-ui
import { Typography } from '@material-ui/core';

import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import { filterDataTable, request } from '../../utils/fetch/searchData'

const GenerateInputs = ({ type, data }) => {
    const [comboBox, setComboBox] = useState(data.val);

    useEffect(() => {
        if (type === "combobox") {
            const ac = new AbortController();
            let url = "http://127.0.0.1:8000" + "/api/" + "program" + "/list/"
            request(url)
                .then((response) => {
                    if (response.length > 0) {
                        let fdt = filterDataTable(["code", "name"], response);
                        setComboBox(fdt)
                        console.log(comboBox)
                    }
                })
            return () => ac.abort();
        }
    }, []);

    switch (type) {
        case 'date':
            const [value, setValue] = useState(null);
            return (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        name={data.name}
                        label={data.label}
                        views={['day', 'month', 'year']}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            );
        case 'number':
            const minValue = 0  //Or whichever number you want
            const maxValue = 10
            const [number, setNumber] = useState(0);
            //Executes when the value changes
            const handle = (e) => {
                const newValue = Math.min(Math.max(e.target.value, minValue), maxValue)
                setNumber(newValue)
            }
            return (
                <TextField
                    id={data.name}
                    name={data.name}
                    label={data.label}
                    type="number"
                    variant="outlined"
                    onChange={e => handle(e)}
                    value={number}
                />
            );
        case "text":
            return (
                <TextField
                    helperText=" "
                    name={data.name}
                    id="demo-helper-text-aligned-no-helper"
                    label={data.label}
                />
            );
        case "combobox":
            const [program, setProgram] = useState('');
            const handleChange = (event) => {
                setProgram(event.target.value);
            };
            return (
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id={data.name}>Programs</InputLabel>
                    <Select
                        name={data.name}
                        labelId={data.name}
                        id={data.name}
                        value={program}
                        label={data.label}
                        onChange={handleChange}
                    >
                        {comboBox.map((obj) => { return (<MenuItem value={obj.code}>{obj.name}</MenuItem>) })}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
            );
        case "file":
            return (<Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    hidden
                />
            </Button>);
        case "email":
            return (<TextField
                id={data.name}
                type="email"
                label={data.label}
                name={data.name}
            />)
        case "password":
            return (<TextField
                id={data.name}
                label={data.label}
                type="password"
                autoComplete="current-password"
            />)
        default:
            return (
                <Typography key={item.id} variant="h6" color="error" align="center">
                    input Error
                </Typography>
            );
    }
};

export default GenerateInputs;