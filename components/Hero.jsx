"use client";

import React from 'react'
import Image from 'next/image'
import { CustomButton, VideoBackground } from '.'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link';

import { useAuthContext } from "../src/context/AuthContext";


const Hero = () => {

    const { user } = useAuthContext()

    return (
        <div className="hero">
            <div className="flex-1 pt-24 pb-24 padding-x">

                <h1 className='hero__title'>
                    Make studying an adventure!
                </h1>

                <p className="hero__subtitle">StudyQuest lets you study and explore your surroundings at the same time.</p>

                <div className="flex gap-5">
                    <Link href="/quickplay">
                        <CustomButton
                            title="Quick Play"
                            containerStyles="bg-primary-blue text-white rounded-full mt-6"
                        />
                    </Link>

                    {(user != null) ? (
                        <Link href="/profile">
                            <CustomButton
                                title="Custom Decks"
                                containerStyles="border-2 border-blue-500 rounded-full mt-6"
                            />
                        </Link>
                    ) : (
                        <CustomButton
                            title="Sign in for custom decks"
                            containerStyles="border-2 border-blue-500 rounded-full mt-6"
                        />
                    )}
                </div>

            </div>

            <VideoBackground />
        </div>
    )
}

export default Hero