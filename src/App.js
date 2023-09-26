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
import { UserAuthContextProvider } from './components/context/UserAuthContext';
import ViewRoomDetails from './pages/client/ViewRoomDetails';
import Gallery from './pages/Gallery';
import ViewRoom from './components/ViewRoom';
import BookedRooms from './pages/admin/BookedRooms';
import UpdateRoom from './pages/admin/UpdateRoom';

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

          {/* Protected Routes */}
          <Route path='/clienthome' element={<ProtectedRoute><ClientHome /></ProtectedRoute>} />
          <Route path='/bookings' element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path='/viewroomdetails' element={<ProtectedRoute><ViewRoomDetails /></ProtectedRoute>} />
          <Route path="/adminhome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
          <Route path='/newroom' element={<ProtectedRoute><NewRoom /></ProtectedRoute>} />
          <Route path='/editroom/:id' element={<ProtectedRoute><UpdateRoom /></ProtectedRoute>} />
          <Route path='/bookedrooms' element={<BookedRooms />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </CartContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;