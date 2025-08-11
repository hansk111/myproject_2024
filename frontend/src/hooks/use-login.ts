import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "@/store/hooks";
import { useLoginMutation } from "@/store/auth/authApiSlice";
import { setAuth } from "@/store/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        console.log("logged in");
        toast.success("Logged in");
        router.push("/");
      })
      .catch(() => {
        toast.error("Failde to login");
      });
  };

  return {
    email,
    password,
    isLoading,
    onChange,
    onSubmit,
  };
}
