// // import { useCreateMutation } from "@/store/apps/blog/BlogApiSlice";

// import { useRouter } from "next/navigation";
// import { useState, ChangeEvent, FormEvent } from "react";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "@/store/hooks";

// interface FormData {
//   title: string;
//   content: string;
// }

// export default function usePostCreate() {
//   console.log("usePostCreate");
//   const router = useRouter();
//   const dispatch = useDispatch();
//   // const [createPost, { isLoading}] = useCreateMutation();
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     view: 0,
//     featured: false,
//     category: "",
//     like: 0,
//   });

//   const { title, content, view, featured, category, like } = formData;

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//     console.log("formData=", formData);
//   };

//   const onSubmit = async (formData: FormData) => {
//     dispatch(createPost(formData));
//   };

//   return {
//     title,
//     content,
//     view,
//     featured,
//     category,
//     like,
//     // isLoading,
//     onChange,
//     onSubmit,
//   };
// }
