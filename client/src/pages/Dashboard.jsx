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
import ProductForm from '../features/admin/components/ProductForm';
import Signup from '../features/auth/components/Signup';
import ProductList from '../features/product/components/ProductList';
import UserOrdersPage from './UserOrdersPage';
import SuppliersAndDistributers from '../Components/SuppliersAndDistributers';
import DashSuppliers from '../Components/DashSuppliers';
import Generating from "../Components/Generating"
import CreateBrand from '../Components/CreateBrand';
import CreateCategory from '../Components/CreateCategory';
import DashMessage from '../Components/DashMessage';
import DashMessageD from '../Components/DashMessageD';
import DashMessageDs from '../Components/DashMessageDs';

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
      {tab=== 'addusers' && <AddUsers />}
      {tab=== 'add-product' && <AddProduct />}
      {tab=== 'productable' && <ProductTable />}
      {tab=== 'add-users' && <AddUsers/>}
      {tab=== 'list-product' && <ProductList/>}
      {tab=== 'my-orders' && <UserOrdersPage/>}
      {tab=== 'suppliers-and-distributers' && <SuppliersAndDistributers />}
      {tab=== 'manage' && <DashSuppliers />}
      {tab=== 'table-product' && <ProductTable />}
      {tab === 'generate' && <Generating />}
      {tab === 'add-brand' && <CreateBrand />}
      {tab === 'add-category' && <CreateCategory />}
      {tab === 'messages' && <DashMessage />}
      {tab === 'messagesd' && <DashMessageD />}
      {tab === 'messagesds' && <DashMessageDs />}
    </div>
  );
}
