import React, { useState, useEffect } from 'react';

const ConfirmBooking = ({ selectedRoom, checkInDate, checkOutDate }) => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    // Calculate the total cost or other booking details based on the selected room, check-in, and check-out dates
    const totalCost = calculateTotalCost(selectedRoom, checkInDate, checkOutDate);

    // Set the booking details
    setBookingDetails({
      room: selectedRoom.name,
      checkInDate,
      checkOutDate,
      totalCost,
      // Other relevant booking details
    });
  }, [selectedRoom, checkInDate, checkOutDate]);

  const confirmBooking = () => {
    // You can implement the booking confirmation logic here, e.g., send data to a server

    // Set the booking confirmation status
    setIsBookingConfirmed(true);
  };

  return (
    <div className="confirm-booking-container">
      <h1>Confirm Your Booking</h1>

      {isBookingConfirmed ? (
        <div>
          <p>Your booking has been confirmed! Thank you for choosing our hotel.</p>
          {/* Display booking details */}
          <div>
            <h2>Booking Details</h2>
            <p>Room: {bookingDetails.room}</p>
            <p>Check-In Date: {bookingDetails.checkInDate}</p>
            <p>Check-Out Date: {bookingDetails.checkOutDate}</p>
            <p>Total Cost: ${bookingDetails.totalCost}</p>
            {/* Display other booking details */}
          </div>
        </div>
      ) : (
        <div>
          {/* Display booking details for review */}
          <h2>Review Your Booking</h2>
          <p>Room: {bookingDetails.room}</p>
          <p>Check-In Date: {bookingDetails.checkInDate}</p>
          <p>Check-Out Date: {bookingDetails.checkOutDate}</p>
          <p>Total Cost: ${bookingDetails.totalCost}</p>
          {/* Display other booking details for review */}
          <button onClick={confirmBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default ConfirmBooking;
