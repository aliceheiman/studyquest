'use client'

import React from "react";
import signOutGoogle from "../src/firebase/auth/signout";
import signInGooglePopup from "../src/firebase/auth/signin";
import { useAuthContext } from "../src/context/AuthContext";
import { useRouter } from 'next/navigation'

function Page() {
  const { user } = useAuthContext()
  const router = useRouter()

  const handleSignin = async (event) => {
    const response = await signInGooglePopup();

    if (response.error) {
      return console.log(response.error);
    }

    // Successful
    console.log(response.user)
    return router.push("/admin");
  }

  const handleSignout = async (event) => {
    const response = await signOutGoogle();

    // DEBUG
    if (response.error) {
      return console.log(result.error);
    }

    // Successful
    return router.push("/")
  }

  return (
    <main>
      <h1>Study Quest</h1>
      {
        (user == null) ? (
          <button onClick={handleSignin}>Sign in with google</button>
        ) : (
          <button onClick={handleSignout}>Sign out</button>
        )
      }
    </main>
  )
}

export default Page;