import React, { ChangeEvent, useState } from 'react';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  TableHead,
  Button,
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { IconDots, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useGetCategoriesQuery, useUpdateCategoryMutation } from '@/store/apps/blog/BlogApiSlice';
import CustomTextField from '../forms/theme-elements/CustomTextField';
import { toast } from "react-toastify";
import { useDispatch } from "@/store/hooks";
import { getPosts } from '@/store/apps/blog/BlogSlice';
import { useDeleteweightMutation, useGetAllweightQuery, useGetweightQuery, useUpdateweightMutation } from '@/store/apps/weight/WeightApiSlice';
import { format } from "date-fns";


const Mybodydatatable = () => {
  const dispatch = useDispatch();
  const { data: weights_list } = useGetAllweightQuery();
  const [deleteweight] = useDeleteweightMutation();
  const [updateweight] = useUpdateweightMutation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(1);
  const [weightText, setWeightText] = useState('72');
  const [heightText, setHeightText] = useState('172');
  const [smiText, setSmiText] = useState('27');
  const [bodyfatText, setBodyfatText] = useState('20');
  const [bodywaterText, setBodywaterText] = useState('40');
//   const [weight, setWeight] = useState<WeightType>(INITIAL_VALUES);


//   const handleChangeMydata = (name:string, value:number) => {
//     setWeight((prevValues) => ({
//         ...prevValues,
//         [name]: value,
//       }));
//   }

  const handleChange1 = (e:any) => {
    console.log("weight value===", e.target.value)
    setWeightText(e.target.value);
  };
  const handleChange2 = (e:any) => {
    console.log("height value===", e.target.value)
    setHeightText(e.target.value);

  };

  const handleChange3 = (e:any) => {
    console.log("smi value===", e.target.value)
    setSmiText(e.target.value);
  };

  const handleChange4 = (e:any) => {
    console.log("bodyfat value===", e.target.value)
    setBodyfatText(e.target.value);
  };

  const handleChange5 = (e:any) => {
    console.log("bodywater value===", e.target.value)
    setBodywaterText(e.target.value);
  };

  const handleshow = () => {
    console.log(weightText, heightText, smiText, bodyfatText, bodywaterText)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);  
  }

  const handleDelete = () => {
    setAnchorEl(null);
    deleteweight(id)
      .unwrap()
      .then(() => {
        toast.success("Weight deleted");        
      })
      .catch(() => {
        toast.error("Failed to delete weight");
      });
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setEdit(!edit);
    const formData = new FormData();
    formData.append("weight", weightText);
    formData.append("height", heightText);
    formData.append("smi", smiText);
    formData.append("bodyfat", bodyfatText);
    formData.append("bodywater", bodywaterText);
    
    console.log("weight", formData.get("weight"))
    console.log("height", formData.get("height"))
    console.log("smi", formData.get("smi"))
    console.log("bodyfat", formData.get("bodyfat"))
    console.log("bodywater", formData.get("bodywater"))    
    
    updateweight({id, formData})
      .unwrap()
      .then(() => {
        toast.success("weight update success");
 
      }) 
      .catch((e) => {
        toast.error("Failed to update weight");
        toast.error(e.message)
      });
  };

  const handleOnClick = (event:any) => {
    setEdit(!edit);
    setWeightText(event.currentTarget.name)
    setHeightText(event.currentTarget.dataset.height)
    setSmiText(event.currentTarget.dataset.smi)
    setBodyfatText(event.currentTarget.dataset.bodyfat)
    setBodywaterText(event.currentTarget.dataset.bodywater)
    setId(event.currentTarget.id);
    console.log("id", event.currentTarget.id)
  };



   return (
    <BlankCard>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">CreatedAt</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Weight</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Height</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">smi</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">bodyfat</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">bodywater</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">수정</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weights_list && weights_list.length > 0 ? (
              weights_list.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Button
                    id={row.id}
                    name={row.weight}
                    data-height={row.height}
                    data-smi={row.smi}
                    data-bodyfat={row.bodyfat}
                    data-bodywater={row.bodywater}
                    variant="outlined"
                    color="error"
                    startIcon={<IconEdit width={18} />}
                    onClick={handleOnClick}
                  >
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.id}
                    </Typography>
                  </Button>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" color="textSecondary">
                    {format(new Date(row.createdAt), "yy/MM/dd")}
                  </Typography>
                </TableCell>
                <TableCell>
                  {edit  && id==Number(row.id) ? (
                    <CustomTextField
                      id={String(row.id)}
                      helperText=""
                      variant="outlined"
                      value={weightText}
                      onChange={handleChange1}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.weight}
                    </Typography>
                  )} 
                </TableCell>
                <TableCell>
                  {edit  && id==Number(row.id) ? (
                    <CustomTextField
                      id={String(row.id)}
                      helperText=""
                      variant="outlined"
                      value={heightText}
                      onChange={handleChange2}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.height}
                    </Typography>
                  )} 
                </TableCell>
                <TableCell>
                  {edit  && id==Number(row.id) ? (
                    <CustomTextField
                      id={String(row.id)}
                      helperText=""
                      variant="outlined"
                      value={smiText}
                      onChange={handleChange3}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.smi}
                    </Typography>
                  )} 
                </TableCell>
                <TableCell>
                  {edit  && id==Number(row.id) ? (
                    <CustomTextField
                      id={String(row.id)}
                      helperText=""
                      variant="outlined"
                      value={bodyfatText}
                      onChange={handleChange4}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.bodyfat}
                    </Typography>
                  )} 
                </TableCell>
                <TableCell>
                  {edit  && id==Number(row.id) ? (
                    <CustomTextField
                      id={String(row.id)}
                      helperText=""
                      variant="outlined"
                      value={bodywaterText}
                      onChange={handleChange5}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.bodywater}
                    </Typography>
                  )} 
                </TableCell>
                <TableCell>
                  <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    <IconDots width={18} />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem disabled={false} onClick={handleshow}>
                      <ListItemIcon>
                        <IconPlus width={18} />
                      </ListItemIcon>
                      Show
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <IconEdit width={18} />
                      </ListItemIcon>
                      수정
                    </MenuItem>
                    <MenuItem disabled={false} onClick={handleDelete}>
                      <ListItemIcon>
                        <IconTrash width={18} />
                      </ListItemIcon>
                      삭제
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default Mybodydatatable;
