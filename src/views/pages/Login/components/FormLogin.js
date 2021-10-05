import React from 'react';
import { useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { loginUser, checkAuthenticated } from 'store/auth/auth';
import CSRFToken from 'components/CSRFToken/CSRFToken';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: `${theme.palette.grey[100]} !important`,
        color: `${theme.palette.grey[900]}!important`,
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//= ===========================|| FIREBASE - LOGIN ||============================//

const FormLogin = ({ loginUser, isAuthenticated, checkAuthenticated, ...others }) => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const navegate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [formData, setFormData] = React.useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // eslint-disable-next-line consistent-return
    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(username, password);
    };

    React.useEffect(() => {
        checkAuthenticated();
        if (isAuthenticated) {
            navegate('/');
        }
    }, [isAuthenticated]);

    return (
        <>
            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Debe ser un email valido').max(255).required('El email es requerido'),
                    password: Yup.string().max(255).required('La contraseña es requerida')
                })}
            >
                {({ errors, handleBlur, isSubmitting, touched, values }) => (
                    <form onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} className={classes.loginInput}>
                            <InputLabel htmlFor="username">Email</InputLabel>
                            <OutlinedInput
                                id="username"
                                type="email"
                                value={username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {' '}
                                    {errors.email}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.password && errors.password)} className={classes.loginInput}>
                            <InputLabel htmlFor="password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Contraseña"
                                inputProps={{
                                    classes: {
                                        notchedOutline: classes.notchedOutline
                                    }
                                }}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {' '}
                                    {errors.password}{' '}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {errors.submit && (
                            <Box
                                sx={{
                                    mt: 3
                                }}
                            >
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box
                            sx={{
                                mt: 2
                            }}
                        >
                            <AnimateButton>
                                <Button fullWidth size="large" type="submit" variant="contained" color="secondary">
                                    Iniciar sesión
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser, checkAuthenticated })(FormLogin);
