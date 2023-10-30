import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';


const Search = ({ searchResults }) => {

    // State variables
    const [searchInput, setSearchInput] = useState('');
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [searchResults, setSearchResults] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    // Function to fetch data based on the specified criteria
    const fetchData = async () => {
        
         // Define a Firestore query based on price filters
        const searchQuery = await getDocs(query(collection(db, "hotelRooms"),
            where('price', '>=', parseInt(minPrice)),
            where('price', '<=', parseInt(maxPrice))
        ));

        // Fetch data based on the query
        const querySnapshot = await getDocs(searchQuery);
        const filteredData = querySnapshot.docs.map((doc) => doc.data());

        // Filter the data based on price range
        const filteredResults = filteredData.filter((room) => {
            const roomPrice = room.price;
            return roomPrice >= parseInt(minPrice) && roomPrice <= parseInt(maxPrice);
          });

        console.log("filtered: ", filteredResults);

        // Update the search results state
        setSearchResults(filteredData)
    };

    return (
        <div className="search-section rounded w-[900px] h-[40px] flex items-center justify-between border p-[10px] bg-white">
            <div className="m-3 flex flex-row items-center">
                <FontAwesomeIcon icon={faBed} className="headerIcon m-1 text-sky-800 " />
                <input type="text" placeholder="Search rooms...." onChange={(e) => setSearchInput(e.target.value)} className="SearchInput m-1 outline-none" />
            </div>
            <div className="m-3 flex flex-row items-center">
                <input 
                    placeholder='Enter minimum price'
                    type="number"
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input 
                placeholder='Enter maximum price'
                    type="number"
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>
            <div>
                <button className="bg-[#0088a9] text-white p-1 mr-[-7px] rounded" onClick={fetchData}>Search</button>
            </div>

        </div>
    )
}

export default Search