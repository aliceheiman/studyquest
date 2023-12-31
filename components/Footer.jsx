"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from "@/constants"

const Footer = () => {
    return (
        <footer className="flex flex-col text-black-100 mt-2 border-t border-gray-100">
            <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
                <div className="flex flex-col justify-start items-start gap-6">
                    <h3 className="font-bold text-white">📚 StudyQuest</h3>
                    <p className='text-base text-white opacity-50'>
                        StudyQuest 2023 <br />
                        All rights reserved &copy;
                    </p>
                </div>

                <div className="footer__links">
                    {footerLinks.map((link) => (
                        <div key={link.title} className="footer__link">
                            <h3 className="font-bold text-white opacity-70">{link.title}</h3>

                            {link.links.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.url}
                                    className="text-white opacity-50"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer