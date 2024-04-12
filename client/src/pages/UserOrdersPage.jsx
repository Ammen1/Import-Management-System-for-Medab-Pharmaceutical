import NavBar from '../features/navbar/Navbar';
import UserOrders from '../features/user/components/UserOrders';

function UserOrdersPage() {
  return (
    <div>

        <h1 className='mx-auto text-2xl'>My Orders</h1>
        <UserOrders></UserOrders>
      
    </div>
  );
}

export default UserOrdersPage;
