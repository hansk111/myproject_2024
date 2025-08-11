"use client"
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import React, { useEffect, useState } from "react";
import { useGetAllweightQuery } from "@/store/apps/weight/WeightApiSlice";
import { set } from "lodash";
import { format } from "date-fns";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Mybody Chart',
  },
];

const WeightChart = () => {

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const {data: weightData, isLoading} = useGetAllweightQuery();

  const weight:any = weightData?.map((item: any) => item.weight) || [];   
  const date = weightData?.map((item: any) => format(new Date(item.createdAt), "yy/MM/dd")) || [];
  const smi = weightData?.map((item: any) => item.smi) || [];
  const bodyfat = weightData?.map((item: any) => item.bodyfat) || [];
  const bodywater = weightData?.map((item: any) => item.bodywater) || [];
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  const optionsgredientchart: any = {
    chart: {
      height: 350,
      type: 'line',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
      },
      dropShadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.2)',
        top: 12,
        left: 4,
        blur: 3,
        opacity: 0.4,
      },
    },
    stroke: {
      width: 7,
      curve: 'smooth',
    },

    xaxis: {
      type: 'date',
      categories: date,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [primary],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100, 100, 100],
      },
    },
    markers: {
      size: 4,
      opacity: 0.9,
      colors: [primary],
      strokeColor: '#fff',
      strokeWidth: 2,

      hover: {
        size: 7,
      },
    },
    yaxis: {
      min: 0,
      max: 75,
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      show: false,
    },
  };
  const seriesgredientchart: any = [
    {
      name: 'Weight',
      // data: [71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5],
      data: weight,
    },
    {
      name: 'smi',
      // data: [28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1],
      data: smi,
    },
    {
      name: 'bodyfat',
      // data: [18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0],
      data: bodyfat,
    },
    {
      name: 'bodywater',
      // data: [39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3],
      data: bodywater,
    },
  ];

  return (
      <ParentCard title='My body Chart'>
        <Chart
          options={optionsgredientchart}
          series={seriesgredientchart}
          type="bar"
          height="300px"
          width={"100%"}
        />
      </ParentCard>
  );
};

export default WeightChart;
