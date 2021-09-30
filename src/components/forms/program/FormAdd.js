/* eslint-disable */
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import React, { Component } from 'react';

class FormAdd extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            number_semesters: 0,
        };
    }
    onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        // fetch('/api/form-submit-url', {
        //     method: 'POST',
        //     body: data,
        // });
    }
    render() {
        const { name, number_semesters } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <TextField
                        helperText=""
                        name="name"
                        id="name"
                        label="Nombre"
                        value={name}
                        onChange={this.onChange}
                    />
                    <TextField
                        id="number_semesters"
                        name="number_semesters"
                        label="Cantidad de semestre"
                        type="number"
                        variant="outlined"
                        value={number_semesters}
                        onChange={this.onChange}
                    />
                </div>
                <Divider />
                <div className="buttons-group">
                    <DialogActions>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="error" onClick={handleClose}>
                                Cancelar
                            </Button>
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