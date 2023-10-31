import React, { useContext, useEffect } from 'react';
import HeroSec from '../../components/HeroSec';
import Service from '../../components/Service';
import Footer from '../../components/Footer';
import { CartContext } from '../../components/context/CartContext';
import Navbar from '../../components/navbar/Navbar';

const Bookings = () => {

  const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);
  console.log('Checking ', shoppingCart);

  return (
    <div className="flex flex-col">
      <header className='flex flex-col'>
        <Navbar />
        <HeroSec />
      </header>
      <main className="m-auto w-[1024px] h-auto flex flex-col">
        <div className=" my-5">
          <h3 className="text-center text-xl font-bold">Your Reservation</h3>
        </div>
        {shoppingCart && shoppingCart.map(cart => (
          <div className="flex flex-row justify-around border items-center mb-[20px] h-[100px]" key={cart.id}>
            <div>
              <img className="w-[140px]" src={cart.roomImage} alt="not found" />
            </div>
            <div>{cart.title}</div>
            <div>{cart.description}</div>
            <div>Days selected: {cart.numberOfPeople}</div>
            <div>R {cart.price}.00</div>
            <button className="delete-btn" onClick={() => dispatch({ type: 'DELETE', id: cart.id, cart })}>Delete</button>
          </div>
        ))}
        <div className="total my-10">
          <span className="font-medium m-2">Quantity: {totalQty}</span><br />
          <span className="font-medium m-2">Total amount: R {totalPrice}.00</span><br />
          <button className="border p-1">Place order</button>
        </div>
        <div>
          <Service />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Bookings