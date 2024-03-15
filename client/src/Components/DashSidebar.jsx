import { Sidebar, Navbar } from 'flowbite-react';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth//authSlice';
import { selectUserInfo } from '../features/user/userSlice';
import Header from './Header';


export default function DashSidebar() {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [tab, setTab] = useState('');

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

  return (
    <>
    <div className=' w-screen -translate-x-4 fixed '><Header /></div>
    
    <Sidebar className='w-full md:w-56 lg:fixed mt-16 '>

      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {userInfo && userInfo.role === 'admin' &&  (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={(userInfo && userInfo.role === 'admin') ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {(userInfo && userInfo.role === 'admin') && (
            <>
              <Link to='/dashboard?tab=productable'>
                <Sidebar.Item
                  active={tab === 'productable'}
                  icon={HiDocumentText}
                  as='div'
                >
                Products Table
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=addusers'>
                <Sidebar.Item
                  active={tab === 'addusers'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                Add Users
                </Sidebar.Item>
              </Link>
              <Link to='/dashboard?tab=orders'>
                <Sidebar.Item
                  active={tab === 'orders'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Order 
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
              <Link to='/dashboard?tab=add-product'>
                <Sidebar.Item
                  active={tab === 'add-product'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Add Product 
                </Sidebar.Item>
                
              </Link>
              <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                   Content 
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </>
  );
}
