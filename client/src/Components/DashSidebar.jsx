import { Sidebar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiPlus,
  HiUserGroup,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../features/user/userSlice';
import Header from './Header';
import Logout from '../features/auth/components/Logout';
import { selectLoggedInUser, signOutAsync } from '../features/auth/authSlice';

export default function DashSidebar() {
  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to render sidebar items based on user's role
  const renderSidebarItems = () => {
    if (!userInfo) return null;

    const role = userInfo.role;

    switch (role) {
      case 'admin':
        return (
          <>
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label='Admin'
                labelColor='dark'
                as='div'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=add-users'>
              <Sidebar.Item
                active={tab === 'add-users'}
                icon={HiPlus}
                as='div'
              >
                Create Account
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiUserGroup}
                as='div'
              >
               Manage
              </Sidebar.Item>
            </Link>
           
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiAnnotation}
                as='div'
              >
                Message 
              </Sidebar.Item>
            </Link>
                       
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiPlus}
                as='div'
              >
                Message 
              </Sidebar.Item>
            </Link>
          </>
        );
      case 'manager':
        return (
          <>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label='Manager'
                labelColor='dark'
                as='div'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=my-orders'>
              <Sidebar.Item
                active={tab === 'my-orders'}
                icon={HiAnnotation}
                as='div'
              >
               Order item
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=add-brand'>
              <Sidebar.Item
                active={tab === 'add-brand'}
                icon={HiPlus}
                as='div'
              >
                Add Brand 
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=add-category'>
              <Sidebar.Item
                active={tab === 'add-category'}
                icon={HiPlus}
                as='div'
              >
                Add Category 
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=add-product'>
              <Sidebar.Item
                active={tab === 'add-product'}
                icon={HiPlus}
                as='div'
              >
                Add Product 
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=suppliers-and-distributers'>
              <Sidebar.Item
                active={tab === 'suppliers-and-distributers'}
                icon={HiPlus}
                as='div'
              >
              Add Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=list-product'>
              <Sidebar.Item
                active={tab === 'list-product'}
                icon={HiAnnotation}
                as='div'
              >
               View product
              </Sidebar.Item>
            </Link>
           
            <Link to='/dashboard?tab=manage'>
              <Sidebar.Item
                active={tab === 'manage'}
                icon={HiAnnotation}
                as='div'
              >
                Manage Users
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=generate'>
              <Sidebar.Item
                active={tab === 'generate'}
                icon={HiAnnotation}
                as='div'
              >
              Generate report
              </Sidebar.Item>
            </Link>
          </>
        );
      case 'distributor':
        return (
          <>
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label='Distrubutor'
                labelColor='dark'
                as='div'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=my-orders'>
              <Sidebar.Item
                active={tab === 'my-orders'}
                icon={HiAnnotation}
                as='div'
              >
               Order item
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=list-product'>
              <Sidebar.Item
                active={tab === 'list-product'}
                icon={HiAnnotation}
                as='div'
              >
               View product
              </Sidebar.Item>
            </Link>
           
            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiAnnotation}
                as='div'
              >
                View massage
              </Sidebar.Item>
            </Link>
          </>
        );  

      case 'supplier':
        return (
          <>
            <Link to='/dashboard?tab=profile'>
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                label='Supplier'
                labelColor='dark'
                as='div'
              >
                Profile
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=add-product'>
              <Sidebar.Item
                active={tab === 'add-product'}
                icon={HiAnnotation}
                as='div'
              >
                Add Product 
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=products'>
              <Sidebar.Item
                active={tab === 'products'}
                icon={HiAnnotation}
                as='div'
              >
                Product 
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=message'>
              <Sidebar.Item
                active={tab === 'message'}
                icon={HiAnnotation}
                as='div'
              >
                View message
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=orders'>
              <Sidebar.Item
                active={tab === 'orders'}
                icon={HiAnnotation}
                as='div'
              >
              View order
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=table-product'>
              <Sidebar.Item
                active={tab === 'table-product'}
                icon={HiAnnotation}
                as='div'
              >
               View product
              </Sidebar.Item>
            </Link>
        
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className=' w-screen -translate-x-4 fixed '><Header /></div>
      <Sidebar className='w-full md:w-56 lg:fixed mt-16 '>
        <Sidebar.Items>
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {/* Render sidebar items based on user's role */}
            {renderSidebarItems()}
            <Sidebar.Item>
            <Link to="/logout"
              icon={HiArrowSmRight}
              className='cursor-pointer'
            >
              Sign Out
            </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
