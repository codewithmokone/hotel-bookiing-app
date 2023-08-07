import React from 'react'

// Images
import fimage1 from '../images/home-images/Feat-room1.jpg'
import fimage2 from '../images/home-images/Feat-room2.jpg'
import fimage3 from '../images/home-images/Feat-room3.jpg'

const FeaturedRooms = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[350px]">
            <div className="heading flex justify-center">
                <h2 className=" text-xl font-bold mt-2 text-sky-600 border-b-2 border-sky-600 mb-8">Featured Rooms</h2>
            </div>
            <div className="flex flex-row justify-evenly items-center">
                <div className="h-[230px] w-[300px] bg-sky-800  rounded-md ">
                    <img className="w-[300px] h-[200px]" src={fimage1} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Family Deluxe</p>
                </div>
                <div className="h-[230px] w-[300px] bg-sky-800  mx-10  rounded-md ">
                    <img className="w-[300px] h-[200px]" src={fimage2} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Standard Deluxe</p>
                </div>
                <div className="h-[230px] w-[300px] bg-sky-800  rounded-md">
                    <img className="w-[300px] h-[200px]" src={fimage3} alt="" />
                    <p className="text-center text-white font-semibold mt-1">Couples Deluxe</p>
                </div>
            </div>
        </div>
    )
}

export default FeaturedRooms