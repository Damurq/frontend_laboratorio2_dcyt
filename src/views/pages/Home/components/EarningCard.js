import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// material-ui
import { makeStyles } from '@material-ui/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { checkAuthenticated } from 'store/auth/auth';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// style constant
const useStyles = makeStyles((theme) => ({
    card: {
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-85px',
            right: '-95px',
            [theme.breakpoints.down('xs')]: {
                top: '-105px',
                right: '-140px'
            }
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: '210px',
            height: '210px',
            background: theme.palette.secondary[800],
            borderRadius: '50%',
            top: '-125px',
            right: '-15px',
            opacity: 0.5,
            [theme.breakpoints.down('xs')]: {
                top: '-155px',
                right: '-70px'
            }
        }
    },
    content: {
        padding: '20px !important'
    },
    avatar: {
        ...theme.typography.commonAvatar,
        ...theme.typography.largeAvatar,
        backgroundColor: theme.palette.secondary[800],
        marginTop: '8px'
    },
    avatarRight: {
        ...theme.typography.commonAvatar,
        ...theme.typography.mediumAvatar,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary[200],
        zIndex: 1
    },
    cardHeading: {
        fontSize: '1rem',
        fontWeight: 500,
        marginRight: '8px',
        marginTop: '14px',
        marginBottom: '6px'
    },
    subHeading: {
        fontSize: '.6rem',
        fontWeight: 300,
        color: theme.palette.secondary[200]
    },
    avatarCircle: {
        cursor: 'pointer',
        ...theme.typography.smallAvatar,
        backgroundColor: theme.palette.secondary[200],
        color: theme.palette.secondary.dark
    },
    circleIcon: {
        transform: 'rotate3d(1, 1, 1, 45deg)'
    },
    menuItem: {
        marginRight: '14px',
        fontSize: '1.25rem'
    }
}));

//= ==========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ checkAuthenticated, isAuthenticated, isLoading }) => {
    const classes = useStyles();
    const navegate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        checkAuthenticated();
        if (!isAuthenticated) {
            navegate('/login', { isLoading: true });
        }
    }, [checkAuthenticated, isAuthenticated]);

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <MainCard border={false} className={classes.card} contentClass={classes.content}>
                    <Grid container direction="column">
                        <Grid item>
                            <Grid container justifyContent="space-between">
                                <Grid item>
                                    <Avatar variant="rounded" className={classes.avatar}>
                                        <img src={EarningIcon} alt="Notification" />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <div className="conten-image-home">
                                        <img
                                            src="https://pbs.twimg.com/media/FATEjy_UcAc_TjX?format=jpg&name=small"
                                            alt="ucla"
                                            className="image-home"
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography className={classes.cardHeading}>
                                        <a
                                            href="https://twitter.com/Dale_Letra/status/1442493907980464128"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Dale LETRA
                                        </a>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar className={classes.avatarCircle}>
                                        <ArrowUpwardIcon fontSize="inherit" className={classes.circleIcon} />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography className={classes.subHeading}>
                                Inicia ya el primer encuentro del ciclo de recolección y sistematización de la #AgendaSocialYDeDerechos con
                                la facilitación de la Dra. Mariana Aylwin @maylwino Encuentro vía Zoom y presencial. Hoy con el sector de
                                los trabajadores
                            </Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    checkAuthenticated: PropTypes.func
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(EarningCard);
