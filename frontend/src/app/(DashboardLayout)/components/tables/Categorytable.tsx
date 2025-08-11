import React, { useState } from 'react';
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


const Categorytable = () => {
  const dispatch = useDispatch();
  const { data: categories_list, isLoading, error } = useGetCategoriesQuery();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const [text, setText] = useState("");
  const [updateCategory] = useUpdateCategoryMutation();

  const handleChange = (e:any) => {
    setText( e.target.value);  
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    setAnchorEl(null);
    setEdit(!edit);
    const formData = new FormData();
    formData.append("name", text);
    updateCategory({id, formData})
      .unwrap()
      .then(() => {
        toast.success("Post created");

      }) 
      .catch(() => {
        toast.error("Failed to update category");
      });
  };

  const handleOnClick = (event:any) => {
    setEdit(!edit);
    setText(event.currentTarget.name)
    setId(event.currentTarget.id);
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
                <Typography variant="h6">카테고리</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">수정</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories_list && categories_list.length > 0 ? (
              categories_list.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Button
                    id={row.id}
                    name={row.name}
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
                  {edit  && id==row.id ? (
                    <CustomTextField
                      id={row.id}
                      helperText="Category를 추가 할려면 hardcoding된 리스트를 수정해야 함"
                      variant="outlined"
                      value={text}
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography variant="subtitle1" color="textSecondary">
                      {row.name}
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
                    <MenuItem disabled={true} onClick={handleClose}>
                      <ListItemIcon>
                        <IconPlus width={18} />
                      </ListItemIcon>
                      Add
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <IconEdit width={18} />
                      </ListItemIcon>
                      수정하기
                    </MenuItem>
                    <MenuItem disabled={true} onClick={handleClose}>
                      <ListItemIcon>
                        <IconTrash width={18} />
                      </ListItemIcon>
                      Delete
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

export default Categorytable;
