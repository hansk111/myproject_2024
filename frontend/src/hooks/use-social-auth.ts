import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setAuth } from "@/store/auth/authSlice";
import { useDispatch } from "@/store/hooks";
import { toast } from "react-toastify";

export default function useSocialAuth(authenticate: any, provider: string) {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const effectRan = useRef(false);
  console.log("social auth start");

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success("Successfully logged in");
          router.push("/");
        })
        .catch(() => {
          toast.error("Something went wrong");
          router.push("/auth/auth2/login");
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, [authenticate, provider, dispatch, router, searchParams]);
}
