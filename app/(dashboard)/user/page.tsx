"use client"

import React from 'react';
import useCurrentUser from '@/hooks/useCurrentUser'; // Adjust the import path as needed
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';

const UserProfile = () => {
    const session = useSession();
    
    return (
        <div>
            {session.data?.user?.name}
        </div>
    )
}

export default UserProfile;
