export default function CountryTile({
    countryName,
    population,
    region,
    capital,
    flag,
}) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-100 hover:shadow-xl h-80 grid grid-rows-2 dark:bg-d-dark-blue dark:border-slate-800">
            <div className="w-full flex justify-center items-center">
                <img src={flag} alt={`${countryName}'s flag`} className="h-full w-full object-fill"/>
            </div>
            <div className="p-5">
                <h1 className="font-bold text-lg mb-2">
                    {countryName}
                </h1>
                <p>
                    <span className="font-semibold">Population:</span> {population.toLocaleString()}
                </p>
                <p>
                    <span className="font-semibold">Region:</span> {region}
                </p>
                <p>
                    <span className="font-semibold">Capital:</span> {capital}
                </p>
            </div>
        </div>
    );
}
