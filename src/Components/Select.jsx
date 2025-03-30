export default function Select({ onChange}) {
    return (
        <div className="lg:mr-14">
            <select name="region" id="region" 
                onChange={onChange}
                className="outline-none border border-gray-100 shadow rounded-lg cursor-pointer bg-white grid p-3 leading-tight mb-4 w-1/2 lg:max-w-40 lg:w-full dark:bg-d-dark-blue dark:border-slate-800"
            >
                
                <option value="">Filter by region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
    )
}