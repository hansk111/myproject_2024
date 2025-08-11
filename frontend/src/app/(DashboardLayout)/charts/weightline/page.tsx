"use client"
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import React from "react";
import { useGetAllweightQuery } from "@/store/apps/weight/WeightApiSlice";
import { format } from "date-fns";
import { AddAlarmRounded, AddAlarmSharp } from "@mui/icons-material";
import DashboardCard from "../../components/shared/DashboardCard";
import { MenuItem, Grid, Stack, Typography, Button, Avatar, Box } from '@mui/material';
import CustomSelect from "../../components/forms/theme-elements/CustomSelect";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "My body Chart",
  },
];

const LineChartWeight = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const error = theme.palette.error.main;
  const warning = theme.palette.warning.main;
  const info = theme.palette.info.main;
  const aaa = "#FF0000"
 

  const {data: weightData, isLoading} = useGetAllweightQuery();

  const weight:any = weightData?.map((item: any) => item.weight) || [];   
  const date = weightData?.map((item: any) => format(new Date(item.createdAt), "yy/MM/dd")) || [];
  const smi = weightData?.map((item: any) => item.smi) || [];
  const bodyfat = weightData?.map((item: any) => item.bodyfat) || [];
  const bodywater = weightData?.map((item: any) => item.bodywater) || [];
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const optionslinechart: any = {
    chart: {
      height: 350,
      type: "line",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        show: true,
      },
      shadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
    },
    xaxis: {
      type: 'date',
      categories: date,
    },
    grid: {
      show: false,
    },
    colors: [primary, secondary, error, success],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      width: "2",
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: true,
      offsetY: -35,
      offsetX: 0,
    },
    tooltip: {
      theme: "dark",
    },
  };

  let serieslinechart;

  if (value === "1") {
    serieslinechart= [
      {
        name: '몸무게',
        // data: [71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5],
        data: weight,
      },
      {
        name: '골격근',
        // data: [28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1],
        data: smi,
      },
      {
        name: '체지방',
        // data: [18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0],
        data: bodyfat,
      },
      {
        name: '체수분',
        // data: [39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3],
        data: bodywater,
      },    
    ];
  } else if (value === "2") {
    serieslinechart= [
      {
        name: '몸무게',
        // data: [71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5, 71.5],
        data: weight,
      },
    ];
  } else if (value === "3") {
    serieslinechart= [
      {
        name: '골격근',
        // data: [28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1, 28.1],
        data: smi,
      },
    ];
  } else if (value === "4") {
    serieslinechart= [
      {
        name: '체지방',
        // data: [18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0],
        data: bodyfat,
      },
    ];
  } else if (value === "5") {
    serieslinechart= [
      {
        name: '체수분',
        // data: [39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3, 39.3],
        data: bodywater,
      },
    ];
  }

  return (
    <>
      <DashboardCard
        title="My body chart"
        subtitle=""
        action={
          <CustomSelect
            labelId="month-dd"
            id="month-dd"
            size="small"
            value={value}
            onChange={handleChange}
          >
            <MenuItem value={"1"}>전체</MenuItem>
            <MenuItem value={"2"}>몸무게</MenuItem>
            <MenuItem value={"3"}>골격근</MenuItem>
            <MenuItem value={"4"}>체지방</MenuItem>
            <MenuItem value={"5"}>체수분</MenuItem>
          </CustomSelect>
        }
      >
        <Grid item xs={12} sm={12}>
          {/* column */}
          <Chart
          options={optionslinechart}
          series={serieslinechart}
          type="line"
          height="308px"
          width={"100%"}
        />
        </Grid>
      </DashboardCard>
      {/* <ParentCard title="My body chart">
        <Chart
          options={optionslinechart}
          series={serieslinechart}
          type="line"
          height="308px"
          width={"90%"}
        />
      </ParentCard> */}
    </>
  );
};

export default LineChartWeight;
