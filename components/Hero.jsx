"use client";

import React from 'react'
import Image from 'next/image'
import { CustomButton } from '.'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Link from 'next/link';

const Hero = () => {

    const MySwal = withReactContent(Swal)

    const showPopup = () => {
        MySwal.fire({
            title: <p>Hello World</p>
        })
    }

    return (
        <div className="hero">
            <div className="flex-1 pt-32 padding-x">

                <h1 className='hero__title'>
                    Make studying an adventure!
                </h1>

                <p className="hero__subtitle">StudyQuest lets you study and explore your surroundings at the same time.</p>

                <Link href="/quickplay">
                    <CustomButton
                        title="Quick Play"
                        containerStyles="bg-primary-blue text-white rounded-full mt-6"
                    />
                </Link>



            </div>


        </div>
    )
}

export default Hero