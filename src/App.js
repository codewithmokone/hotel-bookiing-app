import AdminHome from './pages/admin/AdminHome';
import Home from './pages/Home';
import Bookings from './pages/client/Bookings'
import NoPage from './pages/NoPage';
import NewRoom from './pages/admin/NewRoom';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import ClientHome from './pages/client/ClientHome';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/context/ProtectedRoute';
import { CartContextProvider } from './components/context/CartContext';
import { UserAuthContextProvider, useUserAuth } from './components/context/UserAuthContext';
import Gallery from './pages/Gallery';
import ViewRoom from './components/ViewRoom';
import BookedRooms from './pages/admin/BookedRooms';
import UpdateRoom from './pages/admin/UpdateRoom';
import Rooms from './pages/Rooms';
import ContactUs from './pages/ContactUs';
import Profile from './pages/admin/Profile';
import ClientProfile from './pages/client/ClientProfile';
import PaymentSuccessful from './pages/client/PaymentSuccessful';
import Notify from './pages/client/Notify';

function App() {

  return (
    <UserAuthContextProvider>
      <CartContextProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/roomview" element={<ViewRoom/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/rooms' element={<Rooms/>} />
          <Route path='/contactus' element={<ContactUs/>} />

          {/* Protected Routes */}
          <Route path='/clienthome' element={<ProtectedRoute><ClientHome /></ProtectedRoute>} />
          <Route path='/clientprofile' element={<ProtectedRoute><ClientProfile /></ProtectedRoute>} />
          <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path='/payment' element={<ProtectedRoute><PaymentSuccessful /></ProtectedRoute>} />
          <Route path='/notify' element={<ProtectedRoute><Notify /></ProtectedRoute>} />
          <Route path='/roomview' element={<ProtectedRoute><ViewRoom/></ProtectedRoute>} />
          <Route path="/adminhome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path='/newroom' element={<ProtectedRoute><NewRoom /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/editroom/:id' element={<ProtectedRoute><UpdateRoom /></ProtectedRoute>} />
          <Route path='/bookedrooms' element={<BookedRooms />} />
          <Route path="*" element={<NoPage />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        </Routes>
      </CartContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;