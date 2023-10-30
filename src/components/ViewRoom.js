import React, { useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
import { CartContext } from '../../src/components/context/CartContext';
import { faBed, faUserGroup, faPhone, faHouse, faLocationDot }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const ViewRoom = ({ data, setOpenModal }) => {

    const [room, setRoom] = useState(data);
    const [index, setIndex] = useState(0);

    const { dispatch } = useContext(CartContext);

    // const navigate = useNavigate()

    const closeModal = () => {
        setOpenModal(false)
      }

    // const handleSelect = (selectedIndex) => {
    //     setIndex(selectedIndex);
    // };

    return (
        <div className="room-view-container h-[100vh] m-auto fixed inset-0 bg-black 
            bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
            <div className="bg-white h-[900px] w-[960px] rounded">
                <div className='roomHearding'>
                    <p className='mt-6 ml-8 mb-[5px] font-extrabold text-lg'>{room.hotel}</p>
                    <p className='mt-2 ml-8 mb-[5px] font-bold text-lg'>{room.description}</p>
                    <p className='ml-8 mb-[-35px]'> <FontAwesomeIcon icon={faLocationDot} className=" text-[#0088a9] text-lg font-bold" /> {room.address}</p>
                </div>
                <div className="carousel mt-10 w-[900px] flex justify-center items-center">
                    <Carousel slide={false} data-bs-theme="dark" className="w-[1024px] h-[500px] border flex justify-center items-center">
                        <Carousel.Item>
                            <CarouselImage text="First slide" images={room.roomImage} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="room-details flex mb-36">
                    <div className='flex flex-row items-center'>
                        <p className='ml-8 mt-6'><FontAwesomeIcon icon={faHouse} className=" text-[#0088a9] text-lg font-bold" /> : {room.roomType}</p>
                        <p className='ml-8 mt-6'><FontAwesomeIcon icon={faBed} className=" text-[#0088a9] text-lg font-bold" /> : {room.bedType}</p>
                        <p className='ml-8 mt-6'><FontAwesomeIcon icon={faUserGroup} className=" text-[#0088a9] text-lg font-bold" /> : {room.numberOfPeople}</p>
                        <p className='ml-8 mt-6'><FontAwesomeIcon icon={faPhone} className=" text-[#0088a9] text-lg font-bold" /> : {room.contact}</p>
                    </div>
                </div>
                <div className=' flex flex-row mr-8 justify-end items-center '>
                    <p className='mr-6 mt-6 font-bold '><FontAwesomeIcon icon={faBed} className=" text-[#0088a9] text-lg font-bold" /> : {room.price}</p>
                    <button className='bg-[#0088a9] text-white w-[140px] h-[25px] rounded' onClick={() => { dispatch({ type: 'ADD_TO_CART', id: room.id, room }) }}>Reserve Room</button>
                    <button className='bg-[#0088a9] text-white w-[140px] h-[25px] rounded ml-6' onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ViewRoom