import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink, Navigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './components/AuthWrapper1';
import AuthCardWrapper from './components/AuthCardWrapper';
import FormLogin from './components/FormLogin';
import Logo from 'ui-component/Logo';
import Foam from 'ui-component/Background/Foam/Foam';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { checkAuthenticated } from 'store/auth/auth';

//= ===============================|| AUTH3 - LOGIN ||================================//

const Login = ({ isAuthenticated, checkAuthenticated }) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        checkAuthenticated();
    }, [isAuthenticated]);
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Foam />
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <RouterLink to="#">
                                            <Logo />
                                        </RouterLink>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hola, Bienvenido de vuelta
                                                    </Typography>
                                                    <Typography
                                                        color={theme.palette.grey.grey900}
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : ''}
                                                    >
                                                        Introduce tus credenciales para continuar
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLogin login={3} />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(Login);
