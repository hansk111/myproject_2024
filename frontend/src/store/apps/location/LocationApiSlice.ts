import { apiSlice } from "@/store/services/apiSlice";
import { use } from "react";
import { useGetweightQuery } from "../weight/WeightApiSlice";

interface Location {
  latitude: number;
  longitude: number;
}

const locationAipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query<Location, void>({
      queryFn: async () => {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            }
          );
          return {
            data: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
        } catch (error: any) {
          return { error: error.message };
        }
      },
    }),
    getWeather: builder.query({
      query: ({lat, lon}) =>`/post/?lat=${lat}&lon=${lon}`,
    }),
  }),
});


export const {
  useGetLocationQuery,
  useGetWeatherQuery,
} = locationAipSlice;
