import { useParams } from "react-router";
import useSWR from "swr";
import BorderButtons from "../Components/BorderButtons";
import leftArrow from "../../left-arrow-svgrepo-com.svg"
import { useNavigate } from "react-router";

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
    let navigate = useNavigate();
    let { countryName } = useParams();

    const { user, isLoading, isError } = useCountry(countryName);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Unable to retrieve data</p>;
    console.log(user) 
    const countries = Array.isArray(user) ? user : [user];
    // convert the object into an array because the first call return an array while the second one
    // returns an object 

    return (
        <>
            
            {user.status == 404 ? <h1>The requested country doesn't exist :)</h1>
            :
            countries.map(country => (
                <div key={country.name.common}>
                    <button onClick={() => navigate(-1)}>
                        {/* <img src={leftArrow} alt="leftArrow" /> */}
                        Back
                    </button> <br />

                    <img src={country.flags.svg} alt={country.flags.alt} width={300} />
                    <ul>
                        <h1>{country.name.common}</h1>
                        <li><strong>Native Name: </strong>
                            {Object.values(country.name.nativeName)[0].common}
                        </li>
                        <li>
                            <strong>Population: </strong>
                            {country.population.toLocaleString()}
                        </li>
                        <li>
                            <strong>Region: </strong>
                            {country.region}
                        </li>
                        <li>
                            <strong>Sub Region: </strong>
                            {country.subregion}
                        </li>
                        <li>
                            <strong>Capital: </strong>
                            {country.capital + ''} {/* for countries like South Africa which have more than 1 capital */}
                        </li>
                        <br />
                        <li>
                            <strong>Top Level Domain: </strong>
                            {country.tld}
                        </li>
                        <li>
                            <strong>Currencies: </strong>
                            {Object.values(country.currencies)[0].name}
                        </li>
                        <li>
                            <strong>Languages: </strong>
                            {Object.values(country.languages)[0]}
                        </li>
                    </ul>
                    <p><strong>Border countries:</strong></p>
                    <BorderButtons borders={country.borders} />
                </div>
            ))}
        </>
    )
}
