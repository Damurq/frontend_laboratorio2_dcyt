/* eslint-disable */
import { TextField, Button, Divider, Dialog, DialogTitle, IconButton, DialogActions, DialogContent, Stack } from '@material-ui/core';
import React, { Component } from 'react';

class FormAdd extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
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
        console.log(nombre.value)
        console.log(number_semesters.value)
        let url = "http://127.0.0.1:8000/api/program/create/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: nombre.value, number_semesters: number_semesters.value }),
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        });

        // const config = {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': Cookies.get('csrftoken')
        //     }
        // };
        // const body = JSON.stringify({ username, password, re_password });
        // try {
        //     const res = await axios.post("http://127.0.0.1:8000/api/program/create/", body, config);
        //     if (res.data.error) {
        //         console.log(res)
        //     } else {
        //         console.log(res)
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
    }
    render() {
        const { nombre, number_semesters } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <div className="input">
                        <TextField
                            helperText=""
                            name="nombre"
                            id="nombre"
                            label="Nombre"
                            value={nombre}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="input">
                        <TextField
                            id="number_semesters"
                            label="Cantidad de semestre"
                            type="number"
                            name="number_semesters"
                            variant="outlined"
                            value={number_semesters}
                            onChange={this.onChange}
                        />
                    </div>
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