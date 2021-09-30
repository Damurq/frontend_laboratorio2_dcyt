/* eslint-disable */
import * as React from 'react';
import {
    Box, Button, Typography, Modal, Divider, Stack, Dialog, DialogTitle, IconButton, DialogActions, DialogContent
} from '@material-ui/core';
import forms from '../../data/forms'
import GenerateInputs from '../GenerateInputs/GenerateInputs'
import './ModalForm.css'
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { styled } from '@material-ui/styles';
import { useEffect, useState } from 'react'
import FormAdd from '../../components/forms/pensum/FormAdd'

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

const ModalForm = ({schema, type}) => {
    const [open, setOpen] = useState(false);
    //const [comboBox, setComboBox] = useState(schema==="program"?true:false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let form = forms[schema]

    const handleSubmit = event => {
        // const f=document.getElementById("form")
        event.preventDefault();
        const data = new FormData(event.target);
        //console.log(event)
        //console.log(data)
    };

    return (
        <div>
            {String.prototype.toString(form["form"])}
            <Button onClick={handleOpen}  variant="contained" color="success">Añadir</Button>
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
                        <form id="form" onSubmit={handleSubmit} >
                            {type=="add" && form["form"].filter( objInput => objInput.create ).map((input, i) => {
                                return (<div key={"i" + i} className="input">
                                    <GenerateInputs type={input["type"]} data={input["data"]} />
                                </div>)
                            })}
                        <Divider />
                        <div className="buttons-group">
                        {type=="add" && 
                            <DialogActions>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="error" onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" type="submit" color="success">
                                        Añadir
                                    </Button>
                                </Stack>
                            </DialogActions>}
                        </div>
                        </form>
                    </DialogContent>
                </BootstrapDialog>
            </Modal>
        </div>
    );
}

export default ModalForm;