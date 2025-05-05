"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import FormContainer from "@/components/pages/FormContainer";
import Container from "@/components/shared/Container";
import QBank from "@/components/pages/qbank";
import TOS from "@/components/pages/tos";

export default function Navbar() {
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (user) {
      console.log("User is logged in:", user);
      const fetchUserName = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User data fetched:", userData);
            setUserName(`${userData.firstName} ${userData.lastName}`);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };
      fetchUserName();
    } else {
      console.log("No user is logged in, redirecting to sign-up");
      router.push("/sign-up");
    }
  }, [user, router]);

  useEffect(() => {
    console.log("UserName state updated:", userName);
  }, [userName]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <div className="flex">
      <nav className="fixed w-64 h-screen bg-gray-800 text-white flex flex-col p-4 justify-between">
        <div>
          <p className="mb-4">Welcome, {userName}</p>
          {/* Create TOS button now comes first */}
          <button
            onClick={() => setActiveComponent(<TOS />)}
            className="mb-4 p-2 bg-indigo-600 rounded hover:bg-indigo-500 w-full"
          >
            Create TOS
          </button>
          <button
            onClick={() => setActiveComponent(
              <main className="relative">
                <Container className="m-0" />
                <FormContainer />
              </main>
            )}
            className="mb-4 p-2 bg-indigo-600 rounded hover:bg-indigo-500 w-full"
          >
            Create Test
          </button>
          <button
            onClick={() => setActiveComponent(<QBank />)}
            className="mb-4 p-2 bg-indigo-600 rounded hover:bg-indigo-500 w-full"
          >
            Question Bank
          </button>
        </div>
        <button
          onClick={handleSignOut}
          className="p-2 bg-red-600 rounded hover:bg-red-500"
        >
          Sign Out
        </button>
      </nav>
      <div className="flex-1 ml-64">
        {activeComponent}
      </div>
    </div>
  );
}