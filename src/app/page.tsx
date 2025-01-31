'use client'
import FormContainer from "@/components/pages/FormContainer";
import Container from "@/components/shared/Container";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import Navbar from "@/components/global/navbar";

export default function Home() {

  return (
    <main className="relative">
      <Navbar />
    </main>
  );
}
