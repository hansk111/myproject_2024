// src/services/weatherService.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEXT_PUBLIC_OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
console.log("OPENWEATHER_API_KEY", NEXT_PUBLIC_OPENWEATHER_API_KEY);
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.openweathermap.org/data/2.5' }),
  endpoints: (builder) => ({
    getWeatherByCoordinates: builder.query<any, { latitude: number; longitude: number }>({
      query: ({ latitude, longitude }) => {
        return {
          url: '/weather',
          params: {
            lat: latitude,
            lon: longitude,
            lang:'kr',
            appid: NEXT_PUBLIC_OPENWEATHER_API_KEY,
            units: 'metric', // 섭씨 온도로 설정
          },
        };
      },
    }),
    get4WeatherByCoordinates: builder.query<any, { latitude: number; longitude: number }>({
        query: ({ latitude, longitude }) => {
          return {
            url: '/forecast',
            params: {
              lat: latitude,
              lon: longitude,
              lang:'kr',
              appid: NEXT_PUBLIC_OPENWEATHER_API_KEY,
              units: 'metric', // 섭씨 온도로 설정
            },
          };
        },
      }),
  }),
});

export const { useGetWeatherByCoordinatesQuery, useGet4WeatherByCoordinatesQuery  } = weatherApi;

