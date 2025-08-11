import Image from "next/image";
import { Box, CardContent, Grid, Typography } from "@mui/material";

import icon1 from "public/images/svgs/bmr.jpg";
import icon2 from "public/images/svgs/weight.png";
import icon3 from "public/images/svgs/height.png";
import icon4 from "public/images/svgs/bmi.png";
import icon5 from "public/images/svgs/bodyfat.png";
import icon6 from "public/images/svgs/bodywater.png";
import { useGetAllweightQuery } from "@/store/apps/weight/WeightApiSlice";

// const topcards = [
//   {
//     icon: icon2,
//     title: "Employees",
//     digits: "96",
//     bgcolor: "primary",
//   },
//   {
//     icon: icon3,
//     title: "Clients",
//     digits: "3,650",
//     bgcolor: "warning",
//   },
//   {
//     icon: icon4,
//     title: "Projects",
//     digits: "356",
//     bgcolor: "secondary",
//   },
//   {
//     icon: icon5,
//     title: "Events",
//     digits: "696",
//     bgcolor: "error",
//   },
//   {
//     icon: icon6,
//     title: "Payroll",
//     digits: "$96k",
//     bgcolor: "success",
//   },
//   {
//     icon: icon1,
//     title: "Reports",
//     digits: "59",
//     bgcolor: "info",
//   },
// ];


const TopCards = () => {
  
  const {data: weightData} = useGetAllweightQuery();
  const newItems = weightData?.map((item: any) => {
    const { weight, height, smi, bodyfat, bodywater, bmr, bmi, createdAt } = item;
    return { weight, height, smi, bodyfat, bodywater, bmr, bmi, createdAt };
  });
  const latestData: any  = newItems?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  console.log(latestData);

  const topcards = [
    {
      icon: icon2,
      title: "몸무게",
      digits: latestData?.weight,
      bgcolor: "primary",
    },
    {
      icon: icon3,
      title: "키",
      digits: latestData?.height,
      bgcolor: "warning",
    },
    {
      icon: icon4,
      title: "BMI",
      digits: latestData?.bmi,
      bgcolor: "secondary",
    },
    {
      icon: icon5,
      title: "체지방률",
      digits:  ((latestData?.bodyfat/latestData?.weight) * 100).toFixed(1),
      bgcolor: "error",
    },
    {
      icon: icon6,
      title: "체수분량",
      digits: latestData?.bodywater,
      bgcolor: "success",
    },
    {
      icon: icon1,
      title: "기초대사량",
      digits: latestData?.bmr,
      bgcolor: "info",
    },
  ];

  return (
    <Grid container spacing={3} mt={1}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + ".light"} textAlign="center">
            <CardContent>
              <Image
                src={topcard.icon}
                alt={"topcard.icon"}
                width="50"
                height="50"
              />
              <Typography
                color={topcard.bgcolor + ".main"}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography
                color={topcard.bgcolor + ".main"}
                variant="h4"
                fontWeight={600}
              >
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
