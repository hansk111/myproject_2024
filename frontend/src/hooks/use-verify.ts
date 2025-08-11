import { useEffect, useRef } from "react";
import { useDispatch } from "@/store/hooks";
import { setAuth, finishInitialLoad } from "@/store/auth/authSlice";
import { useVerifyMutation } from "@/store/auth/authApiSlice";

export default function useVerify() {
  const dispatch = useDispatch();
  const [verify] = useVerifyMutation();
  const effectRan = useRef(false);

    useEffect(() => {

      if (!effectRan.current) {
        verify(undefined)
          .unwrap()
          .then(() => {
            dispatch(setAuth());
          })
          .finally(() => {
            dispatch(finishInitialLoad());
          });
      }
      
      return () => {
        effectRan.current = true;
      }

    }, [dispatch, verify]);
}
