import { NavLink } from 'react-router'
import { useState } from 'react'
import CountryTile from './Components/CountryTile'
import useSWR from "swr";
import Navbar from './Components/Navbar';
import Input from './Components/Input';
import Select from './Components/Select';
import Loading from './Components/Loading';
import Unable from './Components/Unable';

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
    if (isLoading) return <Loading />;
    if (isError) return <Unable />;

    return (
        <>
            <Navbar />
            <main className='bg-l-light-gray p-4 min-h-[100vh] font-nunito text-[14px] dark:bg-d-very-dark-blue text-l-very-dark-blue dark:text-white'>
                
                <div className="lg:flex justify-between">
                    <Input 
                        type={"text"}
                        placeholder={"Search for a country..."}
                        onChange={e => setSearchCountry(e.target.value)}
                    />

                    <Select onChange={(e) => setRegion(e.target.value)} />
                </div>

                <div className="content px-10 lg:px-14">
                    <div className='grid sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 gap-y-10 lg:gap-13'>
                        {data && (searchCountry || region) ? (
                            // Block 1 - If country or region is available
                            searchCountry ? (
                                data.filter(searchFilter).map(country => (
                                    <NavLink to={`/${country.cca3}`} key={country.name.common}>
                                        <CountryTile 
                                            countryName={country.name.common}
                                            population={country.population}
                                            region={country.region}
                                            capital={country.capital}
                                            flag={country.flags.png}
                                        />
                                    </NavLink>              
                                ))
                            ) : (
                                data.filter(regionFilter).map(country => (
                                    <NavLink to={`/${country.cca3}`} key={country.name.common}>
                                        <CountryTile 
                                            countryName={country.name.common}
                                            population={country.population}
                                            region={country.region}
                                            capital={country.capital}
                                            flag={country.flags.png}
                                        />
                                    </NavLink>                
                                ))
                            )) : (
                                // Block 2 - else do this
                                data.map(country => (
                                    <NavLink to={`/${country.cca3}`} key={country.name.common}>
                                        <CountryTile 
                                            countryName={country.name.common}
                                            population={country.population}
                                            region={country.region}
                                            capital={country.capital}
                                            flag={country.flags.png}
                                        />
                                    </NavLink>
                                ))
                            )
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
