import React from 'react'

function filterRoom() {

    const [filterResults, setFilterResults] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    return (
        <div className="search-section rounded w-[600px] h-[40px] flex justify-between items-center border bg-white">
            <div>
                <input
                    className=' ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                    type="number"
                    value={minPrice}
                    placeholder='Enter minimum amount'
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    className='ml-[40px] border-[#0088a9] rounded focus:outline-none focus:ring focus:ring-[#0088a9] w-[205px]'
                    type="number"
                    value={maxPrice}
                    placeholder='Enter maximum amount'
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button
                    className="bg-[#0088a9] text-white p-1 rounded ml-[45px]"
                    onClick={filterRoom}>Search</button>
            </div>
        </div>
    )
}

export default filterRoom