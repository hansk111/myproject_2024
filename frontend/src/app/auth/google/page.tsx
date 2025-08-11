'use client';

import { useSocialAuthenticateMutation } from "@/store/auth/authApiSlice";
import { useSocialAuth } from "@/hooks";
import Spinner from "@/app/(DashboardLayout)/ui-components/common/Spinner";


export default function Page() {
    const [googleAuthenticate] = useSocialAuthenticateMutation();
    useSocialAuth(googleAuthenticate, 'google-oauth2');

    return (
        <div className='my-8'>
            <Spinner lg />
        </div>
    );
}