import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

import { selectUserInfo, selectUsers } from '../features/user/userSlice';
import { fetchAllUsersAsync } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashUsers() {
  const userInfo = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false); // Define showModal state
  const dispatch = useDispatch();
  const users = useSelector(selectUsers) 
  const [sort, setSort] = useState({});

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  // Function to handle user deletion
  const handleDeleteUser = () => {
    // Implement logic to delete the user
    // Once the user is deleted, you may want to close the modal
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch, page, sort]);

  return (
    <div className='table-auto lg:mt-20 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {userInfo && userInfo.role === 'admin' ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>addresses</Table.HeadCell>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {Array.isArray(users) && users.length > 0 && users.map((user) => (
              <Table.Body className='divide-y' key={user.id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    {user.addresses.map((address, index) => (
                      <div key={index}>
                        <p>Name: {address.name}</p>
                        <p>Email: {address.email}</p>
                        <p>Phone: {address.phone}</p>
                        <p>Street: {address.street}</p>
                        <p>City: {address.city}</p>
                      </div>
                    ))}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.role === 'admin' ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => setShowModal(true)}
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this user?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}> {/* Call handleDeleteUser function */}
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
