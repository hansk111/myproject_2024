"use client";

import { redirect } from "next/navigation";
import { useSelector } from "@/store/hooks";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner lg />
      </div>
    );
  }

  if (!isAuthenticated) {
    // toast.error('You must be logged in to access this page');
    redirect("/auth/auth2/login");
  }

  return <>{children}</>;
}
