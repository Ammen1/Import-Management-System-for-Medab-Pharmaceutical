import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiArrowUp,
  HiBookOpen,
  HiChartSquareBar,
  HiChevronDoubleDown,
  HiOutlineUsers,
  HiQrcode,

} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';;
import { selectUserInfo } from '../features/user/userSlice';

export default function DashboardComp() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [thisMonthUsers, setThisMonthUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [thisMonthOrders, setThisMonthOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [thisProducts, setThisTotalProducts] = useState(0);
  const [lastProducts, setLastTotalProducts] = useState(0);
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {
    if (userInfo.role === 'manager') {
      const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:8080/count/users');
          const data = await res.json();
          if (res.ok) {
            setTotalUsers(data.totalUsers);
            setLastMonthUsers(data.totalUsersLastMonth);
            setThisMonthUsers(data.totalUsersThisMonth);
          } else {
            console.error('Failed to fetch users:', data.error);
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [userInfo.role]);

  useEffect(() => {
    if (userInfo.role === 'manager') {
      const fetchProduct = async () => {
        try {
          const res = await fetch('http://localhost:8080/count/products');
          const data = await res.json();
          if (res.ok) {
            setTotalProducts(data.totalProducts);
            setThisTotalProducts(data.totalProductsThisMonth);
            setLastTotalProducts(data.totalProductsLastMonth);
          } else {
            console.error('Failed to fetch products:', data.error);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProduct();
    }
  }, [userInfo.role]);

  useEffect(() => {
    if (userInfo.role === 'manager') {
      const fetchOrder = async () => {
        try {
          const res = await fetch('http://localhost:8080/count/orders');
          const data = await res.json();
          if (res.ok) {
            setTotalOrders(data.totalOrders);
            setLastMonthOrders(data.totalOrdersLastMonth);
            setThisMonthOrders(data.totalOrdersThisMonth);
          } else {
            console.error('Failed to fetch products:', data.error);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchOrder(); 
    }
  }, [userInfo.role]);

  
  return (
    <div className='p-3 md:mx-auto mt-20 space-y-5  '>
      <div className='flex-wrap flex gap-4 justify-center '>
        <div className='flex flex-col p-3  bg-gradient-to-br from-rose-900 to-green-900 via-slate-900 hover:bg-gradient-to-r hover:from-emerald-800 hover:to-neutral-400 hover:via-slate-950 gap-4 md:w-72 w-full rounded-lg shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-md text-white '>Total Users</h3>
              <p className='text-2xl text-white'>{totalUsers}</p>
            </div>
            <HiOutlineUsers className='bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <p className='text-sm text-white '>This month users < br />
          <span className='text-sm text-white mt-2 ml-1'>{thisMonthUsers }</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
            <p className='text-sm text-white '>Last month users < br />
          <span className='text-sm text-white mt-2 ml-1'>{lastMonthUsers}</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
        </div>
        <div className='flex flex-col  p-3 bg-gradient-to-r from-pink-950 to-green-950 via-slate-800 gap-4 md:w-72 w-full hover:bg-gradient-to-br hover:from-emerald-800 hover:to-neutral-400 hover:via-slate-950  rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-md text-white'>
                Total Product
              </h3>
              <p className='text-2xl text-white'>{totalProducts}</p>
            </div>
            <HiBookOpen className=' bg-gradient-to-bl from-pink-600 to-green-500   text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <p className='text-sm text-white '>This Month Products < br />
          <span className='text-sm text-white mt-2 ml-1'>{thisProducts}</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
            <p className='text-sm text-white '>Last Month Products < br />
          <span className='text-sm text-white mt-2 ml-1'>{lastProducts}</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
        </div>
        <div className='flex flex-col p-2   bg-gradient-to-br from-indigo-600 to-pink-600 via-gray-900  md:w-72 w-full rounded-md shadow-md hover:bg-gradient-to-bl hover:from-emerald-800 hover:to-neutral-400 hover:via-slate-950 '>
          <div className='flex justify-between gap-6'>
            <div className=' gap-8'>
              <h3 className='text-sm text-white'>
                Total order
              </h3>
              <p className='text-2xl text-white '>{totalOrders}</p>
              <p className='text-sm text-white mt-5 '>This Month Orders< br />
             <span className='text-sm text-white mt-5 ml-1'>{thisMonthOrders}</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
            <p className='text-sm text-white mt-4 '>Last Month Orders < br />
          <span className='text-sm text-white mt-2 ml-1'>{lastMonthOrders}</span>
            <HiArrowUp className='text-white font-extrabold' />
            </p>
            </div>
            <HiQrcode className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
      </div>   
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent users</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=manage'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell><HiOutlineUsers/>Users</Table.HeadCell>
            </Table.Head>
           
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Products</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=list-product'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell><HiChartSquareBar />Product content</Table.HeadCell>
            </Table.Head>
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Orders</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=my-orders'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell><HiChevronDoubleDown />My Orders</Table.HeadCell>
            </Table.Head>         
          </Table>
        </div>
      </div>
    </div>
  );
}
