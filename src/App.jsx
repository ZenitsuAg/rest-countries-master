import { NavLink } from 'react-router'
import { useState } from 'react'
import CountryTile from './Components/CountryTile'
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useCountry() {
    const { data, error, isLoading } = useSWR(
        `https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3`, fetcher
    );

    return {
        data,
        isLoading,
        isError: error,
    };
}

function App() {
    const [searchCountry, setSearchCountry] = useState('')  
    const [region, setRegion] = useState('')

    function searchFilter(item) {
        if (item.name.common.toLowerCase().includes(searchCountry.toLowerCase()) || Object.values(item.name?.nativeName)[0]?.common.toLowerCase().includes(searchCountry.toLowerCase())) return true
    }

    function regionFilter(item) {
        if (item.region == region) return true
    }

    const { data, isLoading, isError } = useCountry();
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Unable to retrieve data</p>;

    return (
        <>
            <input 
                type="text" 
                placeholder='Search for a country...' 
                onChange={e => setSearchCountry(e.target.value)}
            />

            <select name="region" id="region" onChange={(e) => setRegion(e.target.value)} >
                <option value="">Filter by region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>

            <div>
                {data && (searchCountry || region) ? (
                    // Block 1 - If country or region is available
                    searchCountry ? (
                        data.filter(searchFilter).map(country => (
                            <NavLink to={`/country/${country.cca3}`} key={country.name.common}>
                                <CountryTile 
                                    countryName={country.name.common}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    flag={country.flags.svg}
                                />
                            </NavLink>              
                        ))
                    ) : (
                        data.filter(regionFilter).map(country => (
                            <NavLink to={`/country/${country.cca3}`} key={country.name.common}>
                                <CountryTile 
                                    countryName={country.name.common}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    flag={country.flags.svg}
                                />
                            </NavLink>                
                        ))
                    )) : (
                        // Block 2 - else do this
                        data.map(country => (
                            <NavLink to={`/country/${country.cca3}`} key={country.name.common}>
                                <CountryTile 
                                    countryName={country.name.common}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    flag={country.flags.svg}
                                />
                            </NavLink>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default App
