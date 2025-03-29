// Courtesy of https://cssfx.netlify.app/ Check out their website for more awesome CSS Effects

import Navbar from "./Navbar"

export default function Loading() {
    return (
        <div className="h-screen bg-l-light-gray dark:bg-d-very-dark-blue">
            <Navbar />
            <div className="h-3/4 flex items-center justify-center ">
                <div 
                    className="flex w-[3.5em] h-[3.5em] border-3 border-transparent border-solid border-y-[#3cefff] rounded-[50%] animate-[spin_1.5s_linear_infinite] before:content-[''] before:block before:m-auto before:w-[0.75em] before:h-[0.75em] before:border-3 before:border-solid before:border-[#3cefff] before:rounded-[50%] before:duration-1000 before:ease-in-out before:animate-[pulse_1s_alternate_ease-in-out_infinite] ">
                </div>
            </div>
        </div>
    )
}