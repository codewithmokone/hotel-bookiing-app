import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { faBed, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';


const Search = ({ search }) => {

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false)

    const fetchData = async () => {
        
        const q = query(
            collectRoom,
            where('price', '>=', parseInt(minPrice)),
            where('price', '<=', parseInt(minPrice))
        );

        const querySnapshot = await getDocs(q);
        const filteredData = querySnapshot.docs.map((doc) => doc.data());

        console.log("filtered", filteredData);

        setFilteredResults(filteredData)
    };



    return (
        <div className="search-section rounded w-[900px] h-[40px] flex items-center justify-between border p-[10px] bg-white">
            <div className="m-3 flex flex-row items-center">
                <FontAwesomeIcon icon={faBed} className="headerIcon m-1 text-sky-800 " />
                <input type="text" placeholder="Search rooms...." onChange={(e) => setSearchInput(e.target.value)} className="SearchInput m-1 outline-none" />
            </div>
            {/* <div className="m-3 flex flex-row items-center ml-[-30px]">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon m-1 text-sky-800" />
                <span onClick={() => setOpenDate(!openDate)} className="cursor-pointer" >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && <DateRange
                    editableDateInputs={true}
                    onChange={item => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="	position: absolute bottom-[132px]"
                    minDate={new Date()}
                />}
            </div> */}
            <div className="m-3 flex flex-row items-center">
                {/* <FontAwesomeIcon icon={faPerson} className="headerIcon m-1 text-sky-800" />
                <span onClick={() => setOpenOptions(!openOptions)}>select option</span>
                {openOptions &&
                    <select>
                        <option>Adult</option>
                        <option>2 Adult</option>
                        <option>Family</option>
                    </select>
                } */}
                <input 
                    placeholder='Enter minimum price'
                    type="number"
                    onChange={fetchData}
                />
                <input 
                placeholder='Enter maximum price'
                    type="number"
                    onChange={fetchData}
                />
            </div>
            <div>
                <button className="bg-[#0088a9] text-white p-1 mr-[-7px] rounded" onClick={fetchData}>Search</button>
            </div>

        </div>
    )
}

export default Search