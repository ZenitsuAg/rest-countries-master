import { useParams } from "react-router";
import useSWR from "swr";
import Navbar from "../Components/Navbar"
import CountryDetail from "../Components/CountryDetail";
import Loading from "../Components/Loading";
import Unable from "../Components/Unable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Custom hook
function useCountry(countryName) {
    let fields = 'flags,name,nativeName,population,region,subregion,capital,tld,currencies,languages,borders'
    const { data, error, isLoading } = useSWR(
        countryName.length > 3 ?    `https://restcountries.com/v3.1/name/${countryName}?fields=${fields}` : `https://restcountries.com/v3.1/alpha/${countryName}?fields=${fields}`, fetcher
    ); // This makes it possible to search for country by their name or cca3

    return {
        user: data,
        isLoading,
        isError: error,
    };
}

export default function Country() {
    let { countryName } = useParams();

    const { user, isLoading, isError } = useCountry(countryName);
    if (isLoading) return <Loading />;
    if (isError) return <Unable />;
    console.log(user) 
    const countries = Array.isArray(user) ? user : [user];
    // convert the object into an array because the first call return an array while the second one
    // returns an object 

    return (
        <div className="min-h-[100vh] bg-l-light-gray">
            <Navbar />
            {user.status == 404 ? <h1>The requested country doesn't exist :)</h1>
            :
            countries.map(country => (
                <CountryDetail 
                    key={country.name.common}
                    flagSrc={country.flags.svg}
                    flagAlt={country.flags.alt}
                    countryName={country.name.common}
                    nativeName={Object.values(country.name.nativeName)[0]?.common}
                    population={country.population}
                    region={country.region}
                    subregion={country.subregion}
                    capital={country.capital}
                    tld={country.tld}
                    currencies={Object.values(country.currencies)[0]?.name}
                    languages={Object.values(country.languages)[0]}
                    borders={country.borders}
                />
            ))}
        </div>
    )
}
