/* eslint-disable */
import React from 'react';
import { useEffect, useState } from 'react'

// material-ui
import { Typography } from '@material-ui/core';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@material-ui/lab';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { filterDataTable, request } from '../../utils/fetch/searchData'

const GenerateInputs = ({ type, data, database = null, update = true }) => {
    const [comboBox, setComboBox] = useState(data.val);

    useEffect(() => {
        if (type === "combobox") {
            const ac = new AbortController();
            if (data.name == "program_code") {
                let url = "http://127.0.0.1:8000" + "/api/" + "program" + "/list/"
                request(url)
                    .then((response) => {
                        if (response.results.length > 0) {
                            let fdt = filterDataTable(["code", "name"], response.results);
                            setComboBox(fdt)
                        }
                    })
            }
            return () => ac.abort();
        }
    }, []);

    switch (type) {
        case 'date':
            const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
            return (!!(update) ? 
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        name={data.name}
                        label={data.label}
                        views={['day', 'month', 'year']}
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params}
                            />}
                    />
                </LocalizationProvider> : 
                <TextField
                    helperText=" "
                    name={data.name}
                    id={data.name}
                    label={data.label}
                    defaultValue={database ? database : ""}
                    InputProps={{
                        readOnly: !(update),
                    }}
                />
            );
        case 'number':
            const minValue = 0  //Or whichever number you want
            const maxValue = 10
            const [number, setNumber] = useState(database ? database : 0);
            //Executes when the value changes
            const handle = (e) => {
                const newValue = Math.min(Math.max(e.target.value, minValue), maxValue)
                setNumber(data.name === "number_semesters" ? newValue : e.target.value)
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
                    InputProps={{
                        readOnly: !(update),
                    }}
                />
            );
        case "text":
            database = ((data.name === "status") || (data.name === "is_active")) ? database ? "Activo" : "Inactivo" : database
            return (
                <TextField
                    helperText=" "
                    name={data.name}
                    id={data.name}
                    label={data.label}
                    defaultValue={database ? database : ""}
                    InputProps={{
                        readOnly: !(update),
                    }}
                />
            );
        case "combobox":
            const [program, setProgram] = useState('');
            const handleChange = (event) => {
                setProgram(event.target.value);
            };
            return ( 
                <FormControl sx={{ m: 1, width: 200 }}>
                    <InputLabel id={data.name}>{data.label}</InputLabel>
                    <Select
                        name={data.name}
                        id={data.name}
                        value={database ? database : program}
                        label={data.label}
                        onChange={handleChange}
                    >
                        {comboBox.map((obj, i) => { return (<MenuItem key={"combobox-" + data.name + i} value={obj.code}>{obj.name}</MenuItem>) })}
                    </Select>
                </FormControl>
            );
        case "file":
            return (<Button
                variant="contained"
                component="label"
            >
               { !(database) ? "Subir ":"Actualizar " }{ data.label }
                <input
                    id={data.name}
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
                defaultValue={database ? database : ""}
                InputProps={{
                    readOnly: !(update),
                }}
            />)
        case "password":
            return (<TextField
                id={data.name}
                label={data.label}
                type="password"
                autoComplete="current-password"
                defaultValue={database ? database : ""}
                InputProps={{
                    readOnly: !(update),
                }}
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