import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../components/ExampleCarouselImage';

const ViewRoom = ({ data }) => {

    const [room, setRoom] = useState(data);

    // const [rooms, setRooms] = useState();

    const [index, setIndex] = useState(0);

    console.log("View Room", data)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // const getRooms = async () => {
    //     try {
    //         const data = await getDocs(hotelRoomsRef);

    //         const filteredData = data.docs.map((doc) => ({
    //             ...doc.data(), id: doc.id,
    //         }));

    //         setRooms(filteredData);

    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        
        // getRooms();

    }, []);

    return (
        <div className="room-view-container h-[100vh] m-auto fixed inset-0 bg-black 
        bg-opacity-50 backdrop-blur-sm flex justify-center items-center ">
            <div className="bg-white h-[900px] w-[960px] rounded">
            <div className="carousel mt-10 w-[800px] flex justify-center items-center">
                <Carousel activeIndex={index} onSelect={handleSelect} className="w-[900px] h-[500px] border flex justify-center items-center">
                    <Carousel.Item>
                        <ExampleCarouselImage text="First slide" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Second slide" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <ExampleCarouselImage text="Third slide" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="room-details">
                <div>
                    <p>{console.log(room.address)}</p>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ViewRoom