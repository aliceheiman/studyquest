"use client";

import React from 'react'
import Image from 'next/image'

const CustomButton = ({ title, containerStyles, btnType, handleClick }) => {
    return (
        <button
            disabled={false}
            type={btnType}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
        >
            <span className={`flex-1`}>
                {title}
            </span>
        </button>
    )
}

export default CustomButton