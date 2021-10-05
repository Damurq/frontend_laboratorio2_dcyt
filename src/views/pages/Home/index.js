import React, { useEffect, useState } from 'react';

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

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Home = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;
