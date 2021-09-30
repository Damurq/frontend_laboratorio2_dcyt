/* eslint-disable */
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button,Divider } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import React, { Component } from 'react';

class FormUpdate extends Component {
    constructor(props) {
        super(props);
        const { pk } = props;
        this.state = {
            code: "",
            description: "",
            file_pdf: "",
            program_code: 0,
            date_issue:"",
            expiration_date:"",
            is_active:true,
            program_name:""
        };

    }
    componentDidMount(){
        //const ac = new AbortController();
        let url = "http://127.0.0.1:8000/api/pensum/detail/"+ this.pk
        request(url)
            .then((response) => {
                console.log(response)
                if (response.length > 0){
                    Object.keys(response).map((name)=>{
                        this.setState({ [name]: response[name] });
                    })
                    url = "http://127.0.0.1:8000/api/program/detail/"+ this.state.program_code
                    request(url)
                        .then((r) => {
                            this.setState({ ["program_name"]: r["name"] });
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
    uploadFiles = (e) =>{
        this.setState({ [e.target.name]: e.target.files });
    }
    handleSubmit(event) {
        event.preventDefault();
        // file_pdf = document.querySelector('input[type="file"]').files[0];
        const { description, file_pdf, program_code } = this.state;
        console.log({ description, file_pdf, program_code })
        console.log("here")
        let url = "http://127.0.0.1:8000/api/program/create/"
        fetch(url, {
            method: 'PUT',
            body: { description, file_pdf, program_code },
        }).then((result) => {
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        });
    }
    render() {
        const { code, description, file_pdf, program_code,program_name,date_issue,expiration_date,is_active } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="modal-form">
                    <TextField
                        helperText=""
                        name="code"
                        id="code"
                        label="Codigo"
                        value={code}
                        disabled
                    />
                    <TextField
                        helperText=""
                        name="description"
                        id="description"
                        label="Descripción"
                        value={description}
                        onChange={this.onChange}
                    />
                    <label htmlFor="file_pdf">
                    <input type="file" id="file_pdf" name="file_pdf" onChange={this.uploadFiles}/>
                    </label>
                    <TextField
                        helperText=""
                        name="program_name"
                        id="program_name"
                        label="Nombre del programa"
                        value={program_name}
                        disabled
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            name="date_issue"
                            label="Fecha de expiración"
                            views={['day', 'month', 'year']}
                            value={date_issue}
                            disabled
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            name="expiration_date"
                            label="Fecha de eliminación"
                            views={['day', 'month', 'year']}
                            value={expiration_date}
                            disabled
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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