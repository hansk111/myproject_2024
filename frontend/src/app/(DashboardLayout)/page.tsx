'use client'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import TopCards from '@/app/(DashboardLayout)/components/dashboards/modern/TopCards';
import LineChartWeight from './charts/weightline/page';
import Weather from './components/dashboards/modern/Weather';
import KakaoMap from './components/dashboards/modern/KakaoMap';

export default function Dashboard (){
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
      <Grid container spacing={3}>
          
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
          
          <Grid item xs={12} lg={12}>
            <LineChartWeight/>
          </Grid>         
          <Grid item xs={12} sm={12} lg={8}>
            <KakaoMap isLoading={isLoading} />
          </Grid>
          
          <Grid item xs={12} sm={12} lg={4}>
            <Weather />           
          </Grid>
          
          {/* <Grid item xs={12} lg={4}>
            <EmployeeSalary isLoading={isLoading} />
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <WeeklyStats isLoading={isLoading} />
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  )
}