import BackButton from "./BackButton";
import BorderButtons from "./BorderButtons";
import { useNavigate } from "react-router";

export default function CountryDetail({ flagSrc, flagAlt, countryName, nativeName, population, region, subregion, capital, tld, currencies, languages, borders }) {
    let navigate = useNavigate();

    return (
        <>
            <div className="text-l-very-dark-blue font-nunito p-7 lg:px-18 lg:py-20 text-base lg:grid lg:grid-cols-2 gap-32 min-w-[375px] dark:bg-d-very-dark-blue dark:text-white">
                <div>
                    <BackButton onClick={() => navigate(-1)} />
                    <div>
                        <img src={flagSrc} alt={flagAlt} />
                    </div>
                </div>
                <ul className="self-center">
                    <li className="mb-8 mt-10 lg:mt-0 text-3xl font-extrabold">{countryName}</li>
                    
                    <div className="lg:flex lg:justify-between lg:items-start">
                        <div className="flex flex-col gap-3 mb-3">
                            <li><span className="font-semibold">Native Name: </span>
                                {nativeName}
                            </li>
                            <li>
                                <span className="font-semibold">Population: </span>
                                {population.toLocaleString()}
                            </li>
                            <li>
                                <span className="font-semibold">Region: </span>
                                {region}
                            </li>
                            <li>
                                <span className="font-semibold">Sub Region: </span>
                                {subregion}
                            </li>
                            <li>
                                <span className="font-semibold">Capital: </span>
                                {capital + ''} {/* for countries like South Africa which have more than 1 capital */}
                            </li>
                        </div>
                        
                        <div className="flex flex-col gap-3 mb-3 mt-9">
                            <li>
                                <span className="font-semibold">Top Level Domain: </span>
                                {tld}
                            </li>
                            <li>
                                <span className="font-semibold">Currencies: </span>
                                {currencies}
                            </li>
                            <li>
                                <span className="font-semibold">Languages: </span>
                                {languages}
                            </li>
                        </div>
                    </div>
                    
                    <div className="lg:flex lg:gap-3 lg:items-baseline">
                        <p className="mb-4 font-semibold text-nowrap">Border Countries: </p>
                        <div className="flex gap-x-1 gap-y-3 flex-wrap lg:inline-flex">
                            <BorderButtons borders={borders} />
                        </div>
                    </div>
                </ul>
            </div>
        </>
    )
}