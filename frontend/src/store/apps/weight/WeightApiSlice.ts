import { BlogPostType } from "@/app/(DashboardLayout)/types/apps/blog";
import { apiSlice } from "@/store/services/apiSlice";

interface WeightType {
  id: string;
  weight: string;
  height: string;
  smi: string;
  bodyfat: string;
  bodywater: string;
  createdAt: string;
}

const weightAipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createweight: builder.mutation({
      query: (formData) => ({
        url: "/weight/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ['Weight']
    }),
    updateweight: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/weight/${id}/`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ['Weight']
    }),
    deleteweight: builder.mutation({
      query: (id) => ({
        url: `/weight/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Weight']
    }),
    getweight: builder.query({
      query: (id) => `/weight/${id}/`,
    }),
    getAllweight: builder.query<WeightType[], void>({
      query: () => `/weight/`,
      providesTags: ['Weight'],
    }),
  }),
});


export const {
  useCreateweightMutation,
  useUpdateweightMutation,
  useDeleteweightMutation,
  useGetweightQuery,
  useGetAllweightQuery  
} = weightAipSlice;
