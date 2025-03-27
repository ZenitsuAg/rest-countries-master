import { IconContext } from "react-icons";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BackButton({ onClick }) {
    return (
        <>
            <IconContext.Provider value={{className: 'text-2xl'}}>
                <button 
                    onClick={onClick}
                    className="bg-white rounded-lg border border-gray-100 shadow-lg mb-24 py-2 px-6 hover:shadow-xl hover:shadow-gray-300 active:bg-gray-100 inline-flex justify-center items-center gap-4"
                >
                    <IoIosArrowRoundBack />
                    Back
                </button>
            </IconContext.Provider>
        </>
    )
}