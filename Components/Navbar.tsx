"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverlay from './MenuOverlay';
import NavLinks from './NavLinks';

const navLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Your Blogs",
        path: "/blogs",
    },
    {
        title: "Post a Blog",
        path: "/post",
    },
]

const NavBar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const pathname = usePathname(); // Get the current route

    // bg-[#121212]
    return (
        <nav className='top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100'>
            <div className='flex items-center justify-between mx-auto px-12 py-4'>
                <div className='flex-grow'>
                    <Link href={"/"} className='text-2xl md:text-5xl text-white font-semiBold'>
                        Nikhil
                    </Link>
                </div>
                <div className='mobile-menu block md:hidden'>
                    {
                        !navbarOpen ? (
                            <button onClick={() => setNavbarOpen(true)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                                <Bars3Icon className='h-5 w-5' />
                            </button>
                        ) : (
                            <button onClick={() => setNavbarOpen(false)} className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'>
                                <XMarkIcon className='h-5 w-5' />
                            </button>
                        )
                    }
                </div>
                <div className='menu hidden md:block md:w-auto' id='navBar'>
                    <ul className='flex p-4 gap-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLinks 
                                    href={link.path} 
                                    title={link.title}
                                    className={`text-white ${pathname === link.path ? ' underline font-bold ' : ''}  hover:underline`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
        </nav>
    )
}

export default NavBar
