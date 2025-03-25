import { IconContext } from "react-icons";
import { FaMoon } from "react-icons/fa6";

export default function Navbar() {
    return (
        <IconContext.Provider value={{className: 'text-white stroke-60 stroke-black'}}>
            <nav className="flex justify-between h-24 items-center shadow p-4">
                <p><strong>Where in the world?</strong></p>
                <button className="flex items-center justify-center gap-2"><FaMoon className="bg-white"/> Dark Mode</button>
            </nav>
        </IconContext.Provider>
    )
}
