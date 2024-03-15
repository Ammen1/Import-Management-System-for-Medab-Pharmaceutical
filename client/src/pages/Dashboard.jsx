import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../Components/DashProfile';
import DashPosts from '../Components/DashPosts';
import DashUsers from '../Components/DashUsers';
import DashboardComp from '../Components/DashboardComp';
import DashSidebar from '../Components/DashSidebar';
import Products from '../Components/Products';
import Orders from '../Components/Orders';
import AddUsers from '../Components/AddUsers';
import AddProduct from '../Components/AddProduct';
import ProductTable from '../Components/ProductTable';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row  '>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
   
      {tab === 'profile' && <DashProfile />}
      {tab === 'posts' && <DashPosts />}
      {tab === 'users' && <DashUsers />}  
      {tab === 'dash' && <DashboardComp />}
      {tab === 'products' && <Products />}
      {tab === 'orders' && <Orders />}
      {tab==='addusers' && <AddUsers />}
      {tab==='add-product' && <AddProduct />}
      {tab==='productable' && <ProductTable />}
      
    </div>
  );
}
