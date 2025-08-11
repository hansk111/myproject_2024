import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, Button } from '@mui/material';


import DashboardCard from '../../shared/DashboardCard';
import SkeletonYearlyBreakupCard from "../skeleton/YearlyBreakupCard";

import { useGetLocationQuery } from "@/store/apps/location/LocationApiSlice";
import { useGet4WeatherByCoordinatesQuery, useGetWeatherByCoordinatesQuery } from "@/store/services/weatherService";
import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { IconDroplet, IconPercentage,IconTemperature, IconTemperatureCelsius, IconWaterpolo } from "@tabler/icons-react";


import BlankCard from "../../shared/BlankCard";


interface WeatherProps {
  isLoading: boolean;
}

interface WeatherType {
  temp: number;
  temp_max: number;
  temp_min: number;
  humidity: number;
  desc: string;
  icon: string;
  loading: boolean;
  city: string;
}

const initialState = {
  temp: 0,
  temp_max: 0,
  temp_min: 0,
  humidity: 0,
  desc: '',
  icon: '',
  loading: true,
  city: '',
} as WeatherType;

const CoverBox = styled(Box)({
  top: 0,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
});

const CoverImgStyle = styled(CardContent)({
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: 1,
  width: "100%",
  height: "100%",
  color: "white",
});


const Weather = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const successlight = theme.palette.success.light;
  const info = theme.palette.info.main;
  

  const {data, isLoading, error} = useGetLocationQuery();
  
  const {data:weatherdata } = useGetWeatherByCoordinatesQuery(data || { latitude: 0, longitude: 0 });
  const {data:weather4data, refetch } = useGet4WeatherByCoordinatesQuery(data || { latitude: 0, longitude: 0 });
  const [weather, setWeather] = useState(initialState);
  const [weather4, setWeather4] = useState();

  const handleClick = () => {
    console.log("리프레시");
    refetch();
  }

  useEffect(() => {
    if (weatherdata) {
      setWeather(({
        temp: weatherdata.main.temp,
        temp_max: weatherdata.main.temp_max,
        temp_min: weatherdata.main.temp_min,
        humidity: weatherdata.main.humidity,
        desc: weatherdata.weather[0].description,
        icon: weatherdata.weather[0].icon,
        loading: false,
        city: weatherdata.name,
      }));
    }
  }, [weatherdata])

  useEffect(() => {
    if (weather4data) {
      // setWeather4(({
        console.log(weather4data)
      // }));
    }
  }, [weather4data])
  // console.log("weather", weather);
  
  const imgSrc = `https://openweathermap.com/img/w/${weather.icon}.png`;
  const CoverImgBg = styled(BlankCard)({
    p: 0,
    height: "300px",
    position: "relative",
    // background: `url(${process.env.NEXT_PUBLIC_HOST}/media/${coverImg}) no-repeat center`,
    background: weather ? `url(${imgSrc}) no-repeat center` : `url(/images/default.jpg) no-repeat center` ,

    backgroundSize: "cover",
  });

  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {
        isLoading ? (
          <SkeletonYearlyBreakupCard />
        ) : (
          <DashboardCard
            title="Weather"
            subtitle={time}
            action={
              <Button
                color="secondary" 
                variant="contained" 
                // fullWidth
                onClick={handleClick}
              >
                새로고침
              </Button>
            }>
            <Grid container spacing={3}>
              {/* column */}
              <Grid item xs={12} sm={12}>
                  <CoverImgBg className="hoverCard">
                <>
                  <Typography
                  >
                    <CoverBox
                      sx={{
                        backgroundColor: (theme) =>
                          alpha(theme.palette.grey[900], 0.5),
                      }}
                    />
                  </Typography>
                  <CoverImgStyle>
                    <Box
                      height={"100%"}
                      display={"flex"}
                      justifyContent="space-between"
                      flexDirection="column"
                    >
                      <Box>
                        <Stack direction="row">                          
                          <Avatar
                            aria-label="recipe"
                            src = {imgSrc}
                            sx={{ width: 100, height: 100 }}
                          ></Avatar>                        
                          <Typography variant="h5" component="div" align="justify">
                            {weather.desc}
                          </Typography>
                          <Chip
                            sx={{ marginLeft: "auto" }}
                            label={weather.city}
                            color="error"
                          ></Chip>                         
                        </Stack>
                      </Box>
                      <Box>
                        <Box my={3} display="flex" alignItems="center" justifyContent="center">
                          <Typography >
                            온도 : {weather.temp} <IconTemperatureCelsius size="18" />
                          </Typography>
                        </Box>
                        <Stack direction="row" gap={1} alignItems="center">
                          <Stack direction="row" gap={1} alignItems="center">
                            <IconTemperature size="18" />저:{weather.temp_min}<IconTemperatureCelsius size="18" />
                          </Stack>
                          <Stack direction="row" gap={1} alignItems="center">
                            <IconTemperature size="18" />고:{weather.temp_max}<IconTemperatureCelsius size="18" />
                          </Stack>

                          <Stack direction="row" ml="auto" alignItems="center">
                          <IconDroplet size="16" strokeWidth={2} />{weather.humidity}<IconPercentage size="16" />
                          </Stack>
                        </Stack>
                      </Box>
                    </Box>
                  </CoverImgStyle>
                </>
              </CoverImgBg>
              </Grid>
            </Grid>
          </DashboardCard>
        )}
    </>

  );
};

export default Weather;