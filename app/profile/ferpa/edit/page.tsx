'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/profile/ferpa'); // Replace with your target path
  }, [router]);

  return null; // Or you could return a loading spinner if desired
};

export default RedirectPage;