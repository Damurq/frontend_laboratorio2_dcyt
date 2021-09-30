/* eslint-disable */
import { TextField, Button, Divider, DialogActions,Stack } from '@material-ui/core';
import React, { Component } from 'react';
import { filterDataTable, request } from '../../../utils/fetch/searchData'

class FormUpdate extends Component {
    constructor(props) {
        super(props);
        const { pk } = props;
        this.state = {
            code: "",
            name: '',
            number_semesters: 0,
            is_active:true,
        };

    }
    componentDidMount(){
        //const ac = new AbortController();
        let url = "http://127.0.0.1:8000/api/program/detail/"+ this.pk
        request(url)
            .then((response) => {
                console.log(response)
                if (response.length > 0){
                    Object.keys(response).map((name)=>{
                        this.setState({ [name]: response[name] });
                    })
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

    handleSubmit(event) {
        event.preventDefault();
        // file_pdf = document.querySelector('input[type="file"]').files[0];
        const { number_semesters } = this.state;
        console.log({ number_semesters })
        console.log("here")
        let url = "http://127.0.0.1:8000/api/pensum/create/"
        fetch(url, {
            method: 'PUT',
            body: { number_semesters },
        }).then((result) => {
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        });
    }
    render() {
        const { code, name, number_semesters, is_active } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <TextField
                        helperText=""
                        name="code"
                        id="code"
                        type="number"
                        label="Codigo"
                        value={code}
                        disabled
                    />
                    <TextField
                        helperText=""
                        name="name"
                        id="name"
                        label="Nombre"
                        value={name}
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
                    <TextField
                        helperText=""
                        name="is_active"
                        id="is_active"
                        label="Estado"
                        value={is_active}
                        disabled
                    />
                </div>
                <Divider />
                <div className="buttons-group">
                    <DialogActions>
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="error">
                                Eliminar
                            </Button>
                            <Button variant="contained" type="submit" color="success">
                                Actualizar
                            </Button>
                        </Stack>
                    </DialogActions>
                </div>
            </form>
        );
    }
}

export default FormUpdate;