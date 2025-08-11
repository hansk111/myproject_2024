import * as React from 'react';
// import { addNote } from '@/store/apps/notes/NotesSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from '@/store/hooks';
import { IconCheck } from '@tabler/icons-react';
import { useAddNoteMutation, useFetchNotesQuery } from '@/store/apps/notes/NoteApiSlice';
import { IconPlus } from '@tabler/icons-react';
import { Fab, Tooltip, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { IconTrash } from "@tabler/icons-react";
import {
  SelectNote,
} from "@/store/apps/notes/NotesSlice";

interface Props {
  colors: any[];
}

const AddNotes = ({ colors }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [scolor, setScolor] = React.useState<string>('primary');
  const { data:notes} = useFetchNotesQuery()
  const id =  1;
  const [title, setTitle] = React.useState('');
  // console.log("addnotes rendering-------------------------")
  const setColor = (e: string) => {
    setScolor(e);
  };
  const [addNote] = useAddNoteMutation();
  // const  data = {title, scolor}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  interface dataType {
    title: string;
    scolor: string;
  }

  const data:dataType = {'title':title, 'scolor':scolor};

  return (
    <>
      {/* <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
        Add Note
      </Button> */}
      {/* <Tooltip title="Add Note" style={{ float: 'right' }}>
        <Fab color="primary" aria-label="plus">
          <IconPlus width={40} onClick={handleClickOpen} />
        </Fab>
      </Tooltip> */}
      <Tooltip title="Add Note">
        <IconButton
          aria-label="add note"
          size="small"
          onClick={handleClickOpen}
        >
          <IconPlus width={18} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            새로운 노트 만들기
          </Typography>
          <DialogContentText>
            노트를 추가하실려면 노트목을 적어 주시고, 노트색깔을 선택하고 생성 버튼을 클릭핫요.
          </DialogContentText>
          <TextField
            multiline
            rows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            id="description"
            label="노트 ㅈ목 입력"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          <Typography variant="h6" my={2}>
            색깔 선택
          </Typography>
          {colors.map((color) => (
            <Fab
              color={color.disp}
              sx={{
                marginRight: '3px',
                transition: '0.1s ease-in',
                scale: scolor === color.disp ? '0.9' : '0.7',
              }}
              size="small"
              key={color.disp}
              onClick={() => setColor(color.disp)}
            >
              {scolor === color.disp ? <IconCheck /> : ''}
            </Fab>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            disabled={title === ''}
            onClick={(e) => {
              e.preventDefault();
              // console.log('-------------------------')
              // console.log(title, scolor);
              addNote(data)
                .unwrap()
                  .then((data)=> {
                    dispatch(SelectNote(data.id))
                })
              setOpen(false);
              setTitle('');
            }}
            variant="contained"
          >
            만들기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNotes;
