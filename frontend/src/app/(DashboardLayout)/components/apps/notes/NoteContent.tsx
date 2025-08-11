"use client"
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '@/store/hooks';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { IconCheck, IconMenu2 } from '@tabler/icons-react';
import Button from '@mui/material/Button';
// import { UpdateNote } from '@/store/apps/notes/NotesSlice';
import AddNotes from './AddNotes';
import { NotesType } from '../../../types/apps/notes';
import {  useFetchNoteQuery,useUpdateNoteMutation} from '@/store/apps/notes/NoteApiSlice';
import { set } from 'lodash';
import { toast } from "react-toastify";
import QuillEditor from './quill';
import { FormControlLabel } from '@mui/material';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';


interface colorsType {
  lineColor: string;
  disp: string | any;
  id: number;
}

interface Props {
  
  // toggleNoteSidebar: func,

  toggleNoteSidebar: (event: React.MouseEvent<HTMLElement>) => void,
}

const NoteContent = ({ toggleNoteSidebar }: Props) => {
  const dispatch = useDispatch();
  const noteContent:number = useSelector((state) => state.notes.notesContent)
  const { data:notedata } = useFetchNoteQuery(noteContent);
  const [updateNote] = useUpdateNoteMutation();
  const [readOnly, setReadOnly] = useState(false);
  // console.log("notecontent rendering-------------------")
  // console.log("notedata=======", notedata);
  const [note, setNote] = useState(notedata)
  useEffect(() => {
    return setNote(notedata);
  }, [notedata])
 
  const theme = useTheme();
  
  const handleCheckboxChange = (event: any) => {
    setReadOnly(event.target.checked);
  };
  
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNote({ ...note, content: event.target.value });
  // };

  const handleOnClick = () => {
    updateNote(note)
      .unwrap()
      .then(() => {
        toast.success("Success update note");
      })
      .catch(() => {
        toast.error("failed update note");
      });
  }

  // console.log("note========", note);
  const colorvariation: colorsType[] = [
    {
      id: 1,
      lineColor: theme.palette.warning.main,
      disp: 'warning',
    },
    {
      id: 2,
      lineColor: theme.palette.info.main,
      disp: 'info',
    },
    {
      id: 3,
      lineColor: theme.palette.error.main,
      disp: 'error',
    },
    {
      id: 4,
      lineColor: theme.palette.success.main,
      disp: 'success',
    },
    {
      id: 5,
      lineColor: theme.palette.primary.main,
      disp: 'primary',
    },
  ];

  return (
    <Box sx={{ height: { lg: 'calc(100vh - 250px)', sm: '100vh' }, maxHeight: '700px' }}>
      {/* ------------------------------------------- */}
      {/* Header Part */}
      {/* ------------------------------------------- */}
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <IconButton onClick={toggleNoteSidebar}>
          <IconMenu2 stroke={1.5} />
        </IconButton>
        <Button variant="contained" disableElevation color="primary" onClick={handleOnClick} >
          Update Note
        </Button>
        {/* <AddNotes colors={colorvariation} /> */}
      </Box>
      <Divider />
      {/* ------------------------------------------- */}
      {/* Edit notes */}
      {/* ------------------------------------------- */}
      {note && note.deleted === false ? (
        <Box p={3}>
          <FormLabel htmlFor="outlined-multiline-static">
            {/* <Typography variant="h6" mb={2} fontWeight={600} color="text.primary">
              {note.title} Edit Note
            </Typography> */}
          </FormLabel>

          {/* <TextField
            id="outlined-multiline-static"
            placeholder="Edit Note"
            multiline
            fullWidth
            rows={10}
            variant="outlined"
            value={note.content}
            // onChange={(e) => dispatch(UpdateNote(note.id, 'title', e.target.value))}
            onChange={handleChange}
          />
          <br /> */}
          <QuillEditor note = {note} setNote= {setNote} readOnly={readOnly} >
            
          </QuillEditor>
          <FormControlLabel
            control={
              <CustomCheckbox
                name="Read-only"
                checked={readOnly}
                color="secondary"
                onChange={handleCheckboxChange}
              />
            }
            label="수정할려면 체크를 해제하세요."
          />
          <Typography variant="h6" mt={3} mb={2} fontWeight={600}>
            Change Note Color
          </Typography>

          {colorvariation.map((color1) => (
            <Fab
              sx={{
                marginRight: '3px',
                boxShadow: 'none',
                transition: '0.1s ease-in',
                scale: note.color === color1.disp ? '0.9' : '0.7',
              }}
              size="small"
              key={color1.id}
              color={color1?.disp}
              // onClick={() => dispatch(UpdateNote(noteDetails.id, 'color', color1.disp))}
              onClick={() => {
                setNote({ ...note, color: color1.disp });
              }}
            >
              {note.color === color1.disp ? <IconCheck width="16" /> : ''}
            </Fab>
          ))}
          {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" disableElevation color="primary" onClick={handleOnClick} >
              Update Note
            </Button>
          </div> */}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', fontSize: '24px', mt: 2 }}>Select a Note</Box>
      )}
    </Box>
    
  );
};


export default NoteContent;
