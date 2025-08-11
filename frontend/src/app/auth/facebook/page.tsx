'use client';

import { useSocialAuthenticateMutation } from "@/store/auth/authApiSlice";
import { useSocialAuth } from "@/hooks";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";


export default function Page() {
    const [facebookAuthenticate] = useSocialAuthenticateMutation();
    useSocialAuth(facebookAuthenticate, 'facebook');

    return (
        <div className='my-8'>
            <Spinner lg />
        </div>
    );
}