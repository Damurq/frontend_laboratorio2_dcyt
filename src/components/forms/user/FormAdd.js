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
            first_name: '',
            last_name: '',
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
        const { first_name, last_name } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <TextField
                        name="first_name"
                        id="first_name"
                        label="Nombre"
                        value={first_name}
                        onChange={this.onChange}
                    />
                    <TextField
                        name="last_name"
                        id="last_name"
                        label="Apellido"
                        value={last_name}
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