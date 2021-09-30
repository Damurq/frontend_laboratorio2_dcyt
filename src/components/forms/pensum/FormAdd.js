/* eslint-disable */
// react import
import React, { Component } from 'react';

// third party
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Button,
    Divider, 
    DialogActions, 
    DialogContent, 
    Stack
} from '@material-ui/core';

// project imports
import { filterDataTable, request } from '../../../utils/fetch/searchData'


class FormAdd extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            file_pdf: "",
            program_code: 0,
            comboBox: [{
                "code": 0,
                "name": "------------"
            }]
        };
    }
    componentDidMount() {
        // const ac = new AbortController();
        let url = "http://127.0.0.1:8000/api/program/list/"
        request(url)
            .then((response) => {
                if (response.length > 0) {
                    let fdt = filterDataTable(["code", "name"], response);
                    this.setState({ ["comboBox"]: fdt });
                    console.log(fdt)
                }
            })
        // return () => ac.abort();
    }

    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }
    uploadFiles = (e) => {
        this.setState({ [e.target.name]: e.target.files });
    }
    handleSubmit(event) {
        event.preventDefault();
        // file_pdf = document.querySelector('input[type="file"]').files[0];
        const { description, file_pdf, program_code } = this.state;
        console.log({ description, file_pdf, program_code })
        console.log("here")
        let url = "http://127.0.0.1:8000/api/pensum/create/"
        fetch(url, {
            method: 'POST',
            body: { description, file_pdf, program_code },
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        const { description, file_pdf, program_code, comboBox } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <TextField
                        helperText=""
                        name="description"
                        id="description"
                        label="Descripción"
                        value={description}
                        onChange={this.onChange}
                    />
                    <label htmlFor="file_pdf">
                        <input type="file" id="file_pdf" name="file_pdf" onChange={this.uploadFiles} />
                    </label>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel id="program_code">Programs</InputLabel>
                        <Select
                            name="Programa"
                            labelId="program_code"
                            id="program_code"
                            value={program_code}
                            label="program_code"
                            onChange={this.onChange}
                        >
                            {comboBox.map((obj) => { return (<MenuItem value={obj.code}>{obj.name}</MenuItem>) })}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </div>
                <Divider />
                <div className="buttons-group">
                    <DialogActions>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" type="submit" color="success">
                                Añadir
                            </Button>
                        </Stack>
                    </DialogActions>
                </div>
            </form>
        );
    }
}

export default FormAdd;