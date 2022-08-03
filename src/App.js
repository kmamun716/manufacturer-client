import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProduct from './components/Dashboard/AddProduct';
import ManageOrder from './components/Dashboard/ManageOrder';
import Payment from './components/Dashboard/Payment';
import UploadPhoto from './components/Dashboard/UploadPhoto';
import UserOrders from './components/Dashboard/UserOrders';
import UserProfile from './components/Dashboard/UserProfile';
import UserReview from './components/Dashboard/UserReview';
import Users from './components/Dashboard/Users';
import Footer from './components/shared/Footer/Footer';
import Header from './components/shared/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import Parchage from './pages/Parchage/Parchage';
import Registration from './pages/Registration/Registration';
import RequireAuth from './pages/RequireAuth/RequireAuth';

function App() {
  return (
    <div className='container mx-auto'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/order-now/:id' element={<RequireAuth><Parchage/></RequireAuth>} />
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}>
          <Route index element={<RequireAuth><UserProfile/></RequireAuth>} />
          <Route path='my-order' element={<RequireAuth><UserOrders/></RequireAuth>} />
          <Route path='my-review' element={<RequireAuth><UserReview/></RequireAuth>} />
          <Route path='upload-photo' element={<RequireAuth><UploadPhoto/></RequireAuth>} />
          <Route path='users' element={<RequireAuth><Users/></RequireAuth>} />
          <Route path='add-product' element={<RequireAuth><AddProduct/></RequireAuth>} />
          <Route path='manage' element={<RequireAuth><ManageOrder/></RequireAuth>} />
          <Route path='payment' element={<RequireAuth><Payment/></RequireAuth>} />
        </Route>
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
      <ToastContainer/>
    </div>
  );
}

export default App;
