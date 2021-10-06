/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Modal, Divider, Dialog, DialogTitle, IconButton, DialogActions, DialogContent, Stack } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import GenerateInputs from '../GenerateInputs/GenerateInputs'

import forms from '../../data/forms';
import DraggableDialog from '../Alerts/DraggableDialog'
import { requestDB } from '../../utils/requestDB'
import { request } from '../../utils/fetch/searchData'
import './ModalForm.css'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: '#ffffff',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4,
};

const ModalForm = ({ obj, setOpen, open, change, setChange }) => {
    
    let form = forms[obj.schema]
    
    const [values, setvalues] = useState(null)
    const [openAlert, setOpenAlert] = useState(false);
    const [alert, setAlert] = useState({ title: "", content: "" })

    const handleClose = () => setOpen(false);

    function handleSubmit(event) {
        event.preventDefault();
        let url = obj.type === "add" ? `${process.env.REACT_APP_API_URL}/api/${obj.schema}/list/` : `${process.env.REACT_APP_API_URL}/api/${obj.schema}/detail/${obj.code}/`
        let body = {}
        switch (obj.schema) {
            case "pensum":
                body = {
                    program_code: program_code[1].nextSibling.value,
                    file_pdf: file_pdf.files[0],
                    description: description.value
                }
                break;
            case "program":
                body = {
                    name: name_program.value,
                    number_semesters: number_semesters.value
                }
                break;
            case "user":
                body = obj.type === "add" ? {
                    username: username.value,
                    password: password.value,
                    password_repeat: password_repeat.value,
                    program_code: program_code[1].nextSibling.value,
                    first_name: first_name.value,
                    last_name: last_name.value,
                    role: role[1].nextSibling.value,
                    address: address.value,
                    phone: phone.value,
                    photo: photo.files[0]
                } :
                    {
                        role: role[1].nextSibling.value,
                        address: address.value,
                        phone: phone.value,
                        photo: photo.files[0]
                    }
                break;
            case "commission":
                body = {
                    name: name_commission.value,
                    description: description.value
                }
                break;
            default:
                break;
        }
        console.log(body)
        requestDB(obj.type === "add" ? "POST" : "PUT", url, body)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    setAlert({ ["title"]: "Exito", ["content"]: "La operación se completo satisfactoriamente" })
                    setOpenAlert(true)
                    setChange(change?false:true)
                    setOpen(false)
                }
                else {
                    setAlert({ ["title"]: "Fallo", ["content"]: "Ocurrio un error y la información no se puede procesar" })
                    setOpenAlert(true)
                }
            })
    }

    useEffect(() => {
        if (obj.type === "update") {
            const ac = new AbortController();
            let url = `${process.env.REACT_APP_API_URL}/api/${obj.schema}/detail/${obj.code}`
            request(url)
                .then((response) => {
                    setvalues(response)
                    setOpen(true)
                })
            return () => ac.abort();
        }
    }, [])

    return (
        <div>
            {String.prototype.toString(form["form"])}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {form.title}
                    </BootstrapDialogTitle>
                    <Divider />
                    <DialogContent>
                        {/* {jsx()} */}
                        {<form id="form" onSubmit={handleSubmit} >
                            <div className="modal-form">
                                {obj.type === "add" && form["form"].filter(objInput => objInput.create).map((input, i) => {
                                    return (<div key={"i-" + input["data"].name + obj.schema + i} className="input">
                                        <GenerateInputs type={input["type"]} data={input["data"]} />
                                    </div>)
                                })}
                                {((obj.type === "update") && (values !== null)) && form["form"].filter((d)=>!(["password", "password_repeat"].includes(d["data"]["name"]))).map((input, i) => {
                                    let currentTag = input["data"]["name"]
                                    let listName = ["name_program", "name_commission"]
                                    return (<div key={"input-" + input["data"].name + obj.schema} className="input">
                                        <GenerateInputs
                                            type={input["type"]}
                                            data={input["data"]}
                                            database={values[listName.includes(currentTag) ? "name" : currentTag]}
                                            update={input["update"]}
                                        />
                                    </div>)
                                })}
                            </div>
                            <Divider />
                            <div className="buttons-group">
                                <DialogActions>
                                    <Stack direction="row" spacing={2}>
                                        <Button variant="contained" color="error" onClick={handleClose}>
                                            Cancelar
                                        </Button>
                                        <Button variant="contained" type="submit" color="success">
                                            {obj.type === "add" ? "Añadir" : "Actualizar"}
                                        </Button>
                                    </Stack>
                                </DialogActions>
                            </div>
                        </form>}
                        {openAlert && <DraggableDialog info={alert} setOpen={setOpenAlert} open={openAlert} />}
                    </DialogContent>
                </BootstrapDialog>
            </Modal>
        </div>
    );
}

export default ModalForm;