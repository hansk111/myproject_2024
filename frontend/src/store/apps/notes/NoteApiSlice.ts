import { NotesType } from "@/app/(DashboardLayout)/types/apps/notes";
import { apiSlice } from "../../services/apiSlice";

const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNotes: builder.query<NotesType, void>({
      query: () => ({
        url: `/note/`,
        method: "GET",
      }),
      providesTags: ['Notes']
    }),
    fetchNote: builder.query<NotesType, number>({
      query: (id) => ({
        url: `/note/${id}/`,
        method: "GET",
      }),
      providesTags: ['Notes']
    }),
    addNote: builder.mutation({
      query: (data) => ({
        url: `/note/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Notes']
    }),
    updateNote: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/note/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Notes']
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/note/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Notes']
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `/upload-noteimage/`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { 
    useFetchNotesQuery,
    useFetchNoteQuery,
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
    useUploadImageMutation,
} = noteApiSlice;