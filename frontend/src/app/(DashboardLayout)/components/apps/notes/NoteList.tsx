import React, { useEffect } from "react";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Fab, Tooltip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "@/store/hooks";
import Scrollbar from "../../custom-scroll/Scrollbar";
import {
  // fetchNotes,
  SelectNote,
  // DeleteNote,
  SearchNotes,
} from "@/store/apps/notes/NotesSlice";
import { IconTrash } from "@tabler/icons-react";
import { NotesType } from "../../../types/apps/notes";
import { useDeleteNoteMutation, useFetchNotesQuery } from "@/store/apps/notes/NoteApiSlice";
import AddNotes from "./AddNotes";
import { useTheme } from '@mui/material/styles';
import { IconPlus } from '@tabler/icons-react';

interface colorsType {
  lineColor: string;
  disp: string | any;
  id: number;
}

const NoteList = ({notess}:any) => {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.notes.notesContent);
  const searchTerm = useSelector((state) => state.notes.noteSearch);
  
  // const { data: notess } = useFetchNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();
  // console.log("notelist rendering---------------------")
  // useEffect(() => {
  //   dispatch(fetchNotes());
  // }, [dispatch]);
  const theme = useTheme();
  const filterNotes = (notess: any, nSearch: string) => {
    if (nSearch !== "")
      return notess.filter(
        (t: any) =>
          !t.deleted &&
          t.title
            .toLocaleLowerCase()
            .concat(" ")
            .includes(nSearch.toLocaleLowerCase())
      );

    // return notess.filter((t:any) => !t.deleted);
    return notess
  };
  
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

  const notes:any = useSelector((state) =>
    filterNotes(notess, searchTerm)
  );

  return (
    <>
      <Box p={3} px={2}>
        <TextField
          id="search"
          value={searchTerm}
          placeholder="Search Notes"
          inputProps={{ "aria-label": "Search Notes" }}
          size="small"
          type="search"
          variant="outlined"
          fullWidth
          onChange={(e) => dispatch(SearchNotes(e.target.value))}
        />
        <Box display="flex" justifyContent='space-between'>
          { notes && notes.length ? (
          <Typography variant="h6" mb={0} mt={4} pl={1}>
            { notes.length }개의 노트가 있습니다.
          </Typography>
          ) : null}
          <AddNotes colors={colorvariation} />
        </Box> 
      </Box>
      <Box>
        <Scrollbar
          sx={{
            height: { lg: "calc(100vh - 300px)", sm: "100vh" },
            maxHeight: "700px",
          }}
        >
          {notes && notes.length ? (
            notes.map((note:any) => (
              <Box key={note.id} px={2}>
                <Box
                  p={2}
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    mb: 1,
                    transition: "0.1s ease-in",
                    transform:
                      activeNote === note.id ? "scale(1)" : "scale(0.95)",
                    backgroundColor: `${note.color}.light`,
                  }}
                  onClick={() => dispatch(SelectNote(note.id))}
                >
                  <Typography variant="h6" noWrap color={note.color + ".main"}>
                    {note.title}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="caption">
                      {new Date(note.created_at).toLocaleDateString()}
                    </Typography>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                          deleteNote(note.id)
                            .unwrap()
                            .then(() => {
                              dispatch(SelectNote(1))
                            })
                            .catch((error) => {
                              console.error("Error deleting note:", error);
                            })
                        }}
                      >
                        <IconTrash width={18} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Box>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: "white" }}>
                No Notes Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </Box>
    </>
  );
};

export default NoteList;
