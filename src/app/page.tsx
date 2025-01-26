'use client'
import FormContainer from "@/components/pages/FormContainer";
import Container from "@/components/shared/Container";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { signOut } from 'firebase/auth';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user')

  if (!user && !userSession) {
    router.push('/sign-up')
  }

  return (
    <main className="relative">
      <Container className="m-0">
      </Container>
      <FormContainer />
    </main>
  );
}
