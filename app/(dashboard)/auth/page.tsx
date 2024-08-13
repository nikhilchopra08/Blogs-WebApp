"use client"

import { useCallback, useState } from "react";

const Auth = () => {
    const [variant , setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'logout' : 'login')
    } , [])

    return(
        <div className="relative bg-slate-50 h-[100vh] w-[100vw]">
            <div className="bg-slate-600 lg:opacity-55 w-full h-full">
                <nav className="px-12 py-14">
                    <div className="h-12">NAV</div>
                </nav>

                <div className="flex justify-center">
                    <div className="bg-white bg-opacity-100 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h1 className="text-black">
                            {variant == 'login' ? 'login' : 'logout'}
                        </h1>
                        <button className="bg-green-500" onClick={toggleVariant}>Toggle</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;