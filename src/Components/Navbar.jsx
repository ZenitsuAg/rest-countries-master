import { useState } from "react";
import { useEffect } from "react";
import { IconContext } from "react-icons";
import { FaMoon } from "react-icons/fa6";
import { Link } from "react-router";

export default function Navbar() {
    const [dark, setDark] = useState(() => localStorage.theme == 'dark' ? true : false);

    useEffect(() => {
        if (dark) {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark")
        } 
        else {
            localStorage.theme = ''
            document.documentElement.classList.remove("dark")
        }
    }, [dark])
    console.log(`Dark state: ${dark}, localStorage: ${localStorage.theme}`)
    return (
        <IconContext.Provider value={{className: 'text-white stroke-60 stroke-black dark:bg-d-dark-blue dark:stroke-0'}}>
            <nav className="flex justify-between h-20 items-center shadow p-4 border-b border-slate-100 font-nunito bg-white dark:bg-d-dark-blue dark:border-slate-800 dark:text-white">
                <Link to={"/"}><p className="lg:ml-14 lg:text-2xl font-extrabold">Where in the world?</p></Link>                
                <button 
                    className="flex items-center justify-center gap-2 lg:mr-14 cursor-pointer" 
                    onClick={() => setDark(!dark)}>
                        <FaMoon className="bg-white" />
                        Dark Mode
                </button>
            </nav>
        </IconContext.Provider>
    )
}
