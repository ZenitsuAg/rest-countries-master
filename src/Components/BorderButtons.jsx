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
    });
  }
  
  return {
    borderNames,
    isLoading: shouldFetch && !error && !data,
    isError: error
  };
}

function BorderButtons({ borders }) {
  const { borderNames, isLoading } = useBorderNames(borders);
  
  return borders?.map(code => (
    <button key={code} >
        <NavLink to={`/${code}`} className='bg-white rounded border border-gray-100 shadow py-1 px-4 hover:shadow-lg hover:shadow-gray-300 active:bg-gray-100 dark:text-white dark:bg-d-dark-blue dark:border-slate-800 dark:hover:shadow-gray-900/60 dark:active:bg-gray-700'>
            {borderNames[code] || code}
        </NavLink>
    </button>
  ));
}

export default BorderButtons;