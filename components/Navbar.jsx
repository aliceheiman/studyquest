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
            return
        }

        // Successful
        return router.push("/dashboard");
    }

    const handleSignout = async (event) => {
        const response = await signOutGoogle();

        if (response.error) {
            return
        }

        // Successful
        return router.push("/")
    }

    return (
        <header>

            <nav class="header__nav" data-aos="fade-down">
                <div class="header__logo">
                    <Link href="/">
                        <h4 data-aos="fade-down">📚 StudyQuest</h4>
                    </Link>
                </div>

                <ul class="header__menu" data-aos="fade-down">

                    <li class="active">
                        <a href="/">About</a>
                    </li>
                    <li>
                        <a href="/quickplay">Quick Play</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>

                    {user === null ? (
                        <button onClick={handleSignin} class="study__btn bg sm">Login</button>
                    ) : (
                        <button onClick={handleSignout} class="study__btn bg sm">Logout</button>
                    )}
                </ul>

                <ul class="header__menu-mobile" data-aos="fade-down">
                    <li>
                        <img src="icon-menu.png" alt="menu" />
                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar