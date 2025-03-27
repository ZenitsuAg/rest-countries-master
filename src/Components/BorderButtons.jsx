import { NavLink } from 'react-router';
import useSWR from 'swr';

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
  };

function useBorderNames(borderCodes) {
  const shouldFetch = borderCodes && borderCodes.length > 0;
  const { data, error } = useSWR(
    shouldFetch ? `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(',')}&fields=name,cca3` : null,
    fetcher
  );
  
  const borderNames = {};
  const officialNames = {};
  if (data) {
    data.forEach(country => {
      borderNames[country.cca3] = country.name.common;
      officialNames[country.cca3] = country.name?.official;
    });
  }
  
  return {
    borderNames,
    officialNames,
    isLoading: shouldFetch && !error && !data,
    isError: error
  };
}

function BorderButtons({ borders }) {
  const { borderNames, officialNames, isLoading } = useBorderNames(borders);
  
  return borders?.map(code => (
    <button key={code} className='bg-white rounded border border-gray-100 shadow mb-24 py-2 px-6 hover:shadow-xl hover:shadow-gray-300 active:bg-gray-100'>
        <NavLink to={`/country/${officialNames[code]}`}>
            {borderNames[code] || code}
        </NavLink>
    </button>
  ));
}

export default BorderButtons;