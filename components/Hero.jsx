"use client";

import React from 'react'
import Image from 'next/image'
import { CustomButton } from '.'

const Hero = () => {

    return (
        <div className="hero">
            <div className="flex-1 pt-36 padding-x">
                <h1 className='hero__title'>
                    Make studying an adventure!
                </h1>

                <p className="hero__subtitle">StudyQuest lets you study and explore your surroundings at the same time.</p>

                <CustomButton
                    title="Quick Play"
                    containerStyles="bg-primary-blue text-white rounded-full mt-10"
                />
            </div>
        </div>
    )
}

export default Hero