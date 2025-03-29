import Navbar from "./Navbar";

export default function Unable () {
    return (
        <div className="h-screen font-nunito bg-l-light-gray dark:bg-d-very-dark-blue dark:text-white">
            <Navbar />
            <div className="text-3xl h-3/4 flex items-center justify-center" >
                <p>Unable to retrieve data :(</p>
            </div>
        </div>
    )
}