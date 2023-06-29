"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CustomButton from './CustomButton'
import { useRouter } from 'next/navigation'

import signOutGoogle from "../src/firebase/auth/signout";
import signInGooglePopup from "../src/firebase/auth/signin";
import { useAuthContext } from "../src/context/AuthContext";


const Navbar = () => {

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
        <header className="w-full z-10 border-b border-gray-100">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-center items-center">
                    <Image
                        src="./logo.svg"
                        alt="StudyQuest Logo"
                        width={118}
                        height={18}
                        className="object-contain"
                    />
                </Link>

                {
                    (user == null) ? (
                        <CustomButton
                            title="Sign in with Google"
                            btnType="button"
                            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                            handleClick={handleSignin}
                        />
                    ) : (
                        <CustomButton
                            title="Sign out"
                            btnType="button"
                            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
                            handleClick={handleSignout}
                        />
                    )
                }


            </nav>
        </header>
    )
}

export default Navbar