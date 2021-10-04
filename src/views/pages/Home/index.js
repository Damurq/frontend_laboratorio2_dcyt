import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

// material-ui
import { Grid } from '@material-ui/core';

// project imports
import EarningCard from './components/EarningCard';
import PopularCard from './components/PopularCard';
import TotalOrderLineChartCard from './components/TotalOrderLineChartCard';
import TotalIncomeDarkCard from './components/TotalIncomeDarkCard';
import TotalIncomeLightCard from './components/TotalIncomeLightCard';
import TotalGrowthBarChart from './components/TotalGrowthBarChart';
import { gridSpacing } from 'store/theme/constant';
import { checkAuthenticated } from 'store/auth/auth';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Home = ({ checkAuthenticated, isAuthenticated }) => {
    const [isLoading, setLoading] = useState(true);
    const navegate = useNavigate();
    useEffect(() => {
        setLoading(false);
        checkAuthenticated();
        // if (!isAuthenticated) {
        //     navegate('login', { isLoading: true });
        // }
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthenticated })(Home);
