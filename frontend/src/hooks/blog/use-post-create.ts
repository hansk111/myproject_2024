// import { useRouter } from "next/navigation";
// import { useState, ChangeEvent, FormEvent } from "react";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "@/store/hooks";
// import { useCreateMutation } from "@/store/apps/blog/BlogApiSlice";

// interface FormData {
//   title: string;
//   content: string;
// }

// export default function usePostCreate() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [create, { isLoading }] = useCreateMutation();
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     featured: false,
//     categories: [1],
//   });

//   const { title, content, featured, categories } = formData;

//   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     console.log("🚀 ~ onChange ~ value:", value);
//     console.log("🚀 ~ onChange ~ name:", name);
//     setFormData({ ...formData, [name]: value });
//     console.log("🚀 ~ onChange ~ formData:", formData);
//   };

//   const onSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log("formData=", formData);
//     // create(formData)
//     //   .unwrap()
//     //   .then(() => {
//     //     toast.success("Post created");
//     //     router.push("/apps/blog/post/");
//     //   })
//     //   .catch(() => {
//     //     toast.error("Failde to create post");
//     //   });

//     // setFormData({
//     //   title: "",
//     //   content: "",
//     //   featured: false,
//     //   category: 1,
//     // });
//   };

//   return {
//     title,
//     content,
//     featured,
//     categories,
//     isLoading,
//     onChange,
//     onSubmit,
//   };
// }
