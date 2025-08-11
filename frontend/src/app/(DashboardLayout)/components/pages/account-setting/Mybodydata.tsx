import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box } from '@mui/material';
// components
import BlankCard from '../../shared/BlankCard';
import { Stack } from '@mui/system';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons-react';
import Mybodydatatable from '../../tables/Mybodydatatable';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import { useCreateweightMutation } from '@/store/apps/weight/WeightApiSlice';
import { toast } from "react-toastify";

interface WeightType {
    weight: string;
    height: string;
    smi: string;
    bodyfat: string;
    bodywater: string;
  }

const INITIAL_VALUES: WeightType = {
    weight: "71",
    height: "172",
    smi: "28",
    bodyfat: "18",
    bodywater: "40",
};  

const MybodydataTab = () => {
  const [open, setOpen] = React.useState(false);
  const [createweight] = useCreateweightMutation();
  const [values, setValues] = useState(INITIAL_VALUES);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (name: any, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDataChange = (event: any) => {
    const { name, value } = event.target;
    handleChange(name, value);
    console.log("aaa-----------------", name, values);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    const formData = new FormData();
    formData.append("weight", values.weight);
    formData.append("height", values.height);
    formData.append("smi", values.smi);
    formData.append("bodyfat", values.bodyfat);
    formData.append("bodywater", values.bodywater);
    createweight(formData)
      .unwrap()
      .then(() => {
        toast.success("Post created");
     
      }) 
      .catch(() => {
        toast.error("Failde to create post");
      });
    setOpen(false);
    setValues(INITIAL_VALUES);  
  };


  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} lg={12}>
          <BlankCard>
            <Grid item xs={12}>
            <Box>
              <Mybodydatatable />
            </Box>
            </Grid>
          </BlankCard>
        </Grid>
      
      </Grid>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
        <Button size="large" variant="contained" color="primary" onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Body Data</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    데이터를 측정하여 입력 하세요.
                </DialogContentText>
                <Box mt={2}>
                    <Grid container spacing={3} mb={3}>
                        <Grid item lg={6} md={12} sm={12}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="weight"
                                name="weight"
                                label="weight"
                                value={values.weight}
                                type=""
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={6} md={12} sm={12}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="height"
                                name="height"
                                label="height"
                                value={values.height}
                                type=""
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <Grid container spacing={3} mb={3}>
                        <Grid item lg={4} md={12} sm={12}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="smi"
                                name="smi"
                                label="smi"
                                value={values.smi}
                                type=""
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="bodyfat"
                                name="bodyfat"
                                label="bodyfat"
                                value={values.bodyfat}
                                type=""
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="bodywater"
                                name="bodywater"
                                label="bodywater"
                                value={values.bodywater}
                                type=""
                                onChange={handleDataChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>취소</Button>
                <Button onClick={handleOnClick}>저장</Button>
            </DialogActions>
        </Dialog>
        <Button size="large" variant="text" color="error" disabled={true}>
          Cancel
        </Button>
      </Stack>
    </>
  );
};

export default MybodydataTab;
