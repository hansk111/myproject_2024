import axios from "../../../utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store/store";

interface StateType {
  blogposts: any[];
  recentPosts: any[];
  blogSearch: string;
  sortBy: string;
  selectedPost: any;
  isChangePost: any;
}

// interface ChangeState {
//   isChangePost: boolean;
// }

const initialState = {
  blogposts: [],
  recentPosts: [],
  blogSearch: "",
  sortBy: "newest",
  selectedPost: null,
  isChangePost: false,
} as StateType;

export const BlogSlice = createSlice({
  name: "Blog",
  initialState,
  reducers: {
    getPosts: (state: StateType, action) => {
      state.blogposts = action.payload;
    },
    getPost: (state: StateType, action) => {
      state.selectedPost = action.payload;
    },
    setChangePost: (state) => {
      state.isChangePost = true;
    },
    changePostDone: (state) => {
      state.isChangePost = false;
    },
  },
});

export const { getPosts, getPost, setChangePost, changePostDone } =
  BlogSlice.actions;

// export const fetchBlogPosts = () => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.get("/post/");
//     dispatch(getPosts(response.data));
//   } catch (err) {
//     throw new Error();
//   }
// };

// export const addComment =
//   (postId: number, comment: any) => async (dispatch: AppDispatch) => {
//     try {
//       const response = await axios.post(`/comment/`, comment);
//       dispatch(getPosts(response.data.posts));
//     } catch (err: any) {
//       throw new Error(err);
//     }
//   };

// export const createPost = (post: any) => async (dispatch: AppDispatch) => {
//   try {
//     const response = await axios.post("/post/", post);
//     dispatch(getPost(response.data));
//   } catch (err: any) {
//     throw new Error(err);
//   }
// };

export const addReply =
  (commentId: number, reply: any) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(`/reply/`, reply);
      dispatch(getPosts(response.data.posts));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchBlogPostwithoutViewUpdate =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await axios.get(`/post/${id}/`);
      console.log("response_data", response.data);
      dispatch(getPost(response.data));
    } catch (err: any) {
      throw new Error(err);
    }
  };

export const fetchBlogPost = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`/post/${id}/increase_views/`);
    console.log("response_data", response.data);
    dispatch(getPost(response.data));
  } catch (err: any) {
    throw new Error(err);
  }
};

export default BlogSlice.reducer;
