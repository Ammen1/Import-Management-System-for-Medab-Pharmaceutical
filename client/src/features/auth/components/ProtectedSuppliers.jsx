import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { selectUserInfo } from '../../user/userSlice';

function ProtectedSuppliers({ children }) {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  if (userInfo && userInfo.role!=='supplier' || userInfo !== 'manager') {
    return <Navigate to="/" replace={true}></Navigate>;
  }
  
  return children;
}

export default ProtectedSuppliers;
