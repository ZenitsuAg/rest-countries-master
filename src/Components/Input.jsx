import { FaSearch } from "react-icons/fa";

export default function Input({ type, placeholder, onChange}) {
    return (
        <div className="flex justify-center items-center gap-2 p-3 bg-white shadow w-full lg:max-w-80 rounded-lg mb-9 border border-gray-50 lg:ml-14 dark:bg-d-dark-blue dark:border-slate-800 dark:placeholder:text-white">
            <FaSearch />   
            <input 
                type={type} 
                placeholder={placeholder}
                onChange={onChange}
                className="outline-none p-1 w-full"
            />
        </div>
    )   
}