import React, { useState } from 'react';


import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Box, FormControlLabel } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';

import SkeletonRevenueUpdatesTwoCard from '../skeleton/RevenueUpdatesTwoCard';
import { Map, MapMarker, MapTypeId, useKakaoLoader, ZoomControl } from 'react-kakao-maps-sdk';
import { useGetLocationQuery } from '@/store/apps/location/LocationApiSlice';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';


interface RevenueupdatestwoCardProps {
  isLoading: boolean;
}
interface Data {
  latitude: number;
  longitude: number;
}

const KakaoMap = ({ isLoading }: RevenueupdatestwoCardProps) => {
  const [month, setMonth] = React.useState('1');
  const {data:location} = useGetLocationQuery();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };
  
  const [ loading, error ] = useKakaoLoader({
    appkey: "38bf3783a685752ad3a649fc447ef74b", // 발급 받은 APPKEY

  })

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const { kakao } = window;
  const [overlayMapTypeId, setOverlayMapTypeId] = useState({
    TRAFFIC: false,
    BICYCLE: false,
    TERRAIN: false,
    USE_DISTRICT: false,
  })

  const [result, setResult] = useState("")

  return (
    <>
      {
        isLoading ? (
          <SkeletonRevenueUpdatesTwoCard />
        ) : (
          <DashboardCard
            title="Map"
            subtitle="kakao"
            // action={
            //   <CustomSelect
            //     labelId="month-dd"
            //     id="month-dd"
            //     size="small"
            //     value={month}
            //     onChange={handleChange}
            //   >
            //     <MenuItem value={1}>March 2023</MenuItem>
            //     <MenuItem value={2}>April 2023</MenuItem>
            //     <MenuItem value={3}>May 2023</MenuItem>
            //   </CustomSelect>
            // }
          >
            <Grid container spacing={3}>
              {/* column */}
              <Grid item xs={12} sm={9}>
                <Box className="rounded-bars">
                {location && (
                  <Map
                    id="map" 
                    center={{ lat: location.latitude, lng: location.longitude }} 
                    style={{ width: '100%', height: '30vh' }} 
                    level={7}  // 지도의 확대 레벨
                    onZoomChanged={(map) => {
                      const level = map.getLevel()
                      setResult(`${level}`)
                    }}
                  >
                  {overlayMapTypeId.TRAFFIC && <MapTypeId type={"TRAFFIC"} />}
                  {overlayMapTypeId.BICYCLE && <MapTypeId type={"BICYCLE"} />}
                  {overlayMapTypeId.TERRAIN && <MapTypeId type={"TERRAIN"} />}
                  {overlayMapTypeId.USE_DISTRICT && <MapTypeId type={"USE_DISTRICT"} />}
                  <ZoomControl /> 
                  <MapMarker position={{ lat: location.latitude, lng: location.longitude }} />
                  </Map>
                  
                )}
                </Box>
              </Grid>
              {/* column */}
              <Grid item xs={12} sm={3}>
                <Stack spacing={1} mt={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* <Box
                      width={40}
                      height={40}
                      bgcolor="primary.light"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography color="primary" variant="h6" display="flex">
                        <IconGridDots size={24} />
                      </Typography>
                    </Box> */}
                    <Box>
                      <Typography variant="h5" fontWeight="700">
                        지도레벨
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {result}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
                <Stack spacing={0} my={5}>
                  <Stack direction="row" spacing={0}>
                    <FormControlLabel
                      control={
                        <CustomCheckbox
                          // defaultChecked
                          color="secondary"
                          // inputProps={{ 'aria-label': 'checkbox with default color' }}
                          onChange={(e) =>
                            setOverlayMapTypeId((p) => ({
                              ...p,
                              BICYCLE: e.target.checked,
                            }))
                          }
                        />
                      }
                      label="자전거도로"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0}>
                    <FormControlLabel
                        control={
                        <CustomCheckbox
                          // defaultChecked
                          color="secondary"
                          // inputProps={{ 'aria-label': 'checkbox with default color' }}
                          onChange={(e) =>
                            setOverlayMapTypeId((p) => ({ ...p, TRAFFIC: e.target.checked }))
                          }
                        />
                      }
                      label="교통정보"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0}>
                    <FormControlLabel
                      control={
                        <CustomCheckbox
                          // defaultChecked
                          color="secondary"
                          // inputProps={{ 'aria-label': 'checkbox with default color' }}
                          onChange={(e) =>
                            setOverlayMapTypeId((p) => ({ ...p, TERRAIN: e.target.checked }))
                          }                       
                        />
                      }
                      label="지형정보"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0}>
                    <FormControlLabel
                        control={
                        <CustomCheckbox
                          // defaultChecked
                          color="secondary"
                          // inputProps={{ 'aria-label': 'checkbox with default color' }}
                          onChange={(e) =>
                            setOverlayMapTypeId((p) => ({
                              ...p,
                              USE_DISTRICT: e.target.checked,
                            }))
                          }
                        />
                      }
                      label="지적편집도"
                    />
                  </Stack>
                </Stack>
                {/* <Button color="primary" variant="contained" fullWidth>
                  View Full Report
                </Button> */}
              </Grid>
            </Grid>
          </DashboardCard>
        )}


    </>
  );
};

export default KakaoMap;
