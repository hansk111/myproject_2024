import { apiSlice } from "../../services/apiSlice";

interface Chat {
  map: any;
  id: number;
  user: string;
  message: string;
  response: string;
  session: string;
  created_at: string;
}

interface Sessions {
    map: any;
    length: Sessions | undefined;
    id: number;
    user: string;
    session: string;
    created_at: string;
  }

const chatApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({
    getChats: builder.query<Chat, void>({
      query: () => ({
        url: `/chat/`,
        method: "GET",
      }),
    }),
    getSessions: builder.query<Sessions, void>({
        query: () => ({
          url: `/session/`,
          method: "GET",          
        }),
        providesTags: ['Sessions']
      }),
    getSessionChat: builder.query<Chat[], void>({
        query: (session) => ({
          url: `/chat/?session=${session}`,
          method: "GET",
        }),
        providesTags: ['SessionChat']
      }),
    newChat: builder.mutation({
      query: (session) => ({
        url: `/session/`,
        method: "POST",
        // body: { session },
      }),
      invalidatesTags: ['Sessions']
    }),
    deleteChat: builder.mutation({
      query: (id) => ({
        url: `/session/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Sessions']
    }),
    sendMessages: builder.mutation({
      query: ({ session, msg }) => ({        
        url: `/chat/?session=${session}&message=${msg}`,
        method: "POST",
        // body: { session, message },
      }),
      invalidatesTags: ['SessionChat']
    }),    
  }),
});

export const { 
    useGetChatsQuery,
    useGetSessionsQuery,
    useGetSessionChatQuery,
    useNewChatMutation,
    useDeleteChatMutation,
    useSendMessagesMutation,  
} = chatApiSlice;