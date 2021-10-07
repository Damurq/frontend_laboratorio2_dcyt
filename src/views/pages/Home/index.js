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
                    <div className="presentation">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Rectorado_de_la_UCLA.jpg/800px-Rectorado_de_la_UCLA.jpg"
                            alt="ucla_rectorado"
                            className="cover"
                        />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Home;
