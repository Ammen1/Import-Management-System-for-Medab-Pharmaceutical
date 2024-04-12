import { Modal, Table, Button, TextInput, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { deleteUserAsync, fetchAllUsersAsync, selectUserInfo, selectUsers, updateUserAsync } from '../features/user/userSlice';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function DashUsers() {
  const userInfo = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editedUser, setEditedUser] = useState(null); // State to store the edited user
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [sort, setSort] = useState({});

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAsync(id));
    setShowModal(false); // Close the modal after deleting the user
  };

  const handleEditUser = (user) => {
    setEditedUser(user); // Set the selected user for editing
    setShowModal(true); // Open the modal for editing
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUserAsync(editedUser));
    setShowModal(false); // Close the modal after updating the user
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
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell> {/* Add Action column for edit and delete buttons */}
            </Table.Head>
            <Table.Body>
              {Array.isArray(users) && users.length > 0 && users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {user.addresses.map((address, index) => (
                      <div key={index}>
                        <ul>
                          <li>City: {address.city}</li>
                        </ul>
                      </div>
                    ))}
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <div className='flex items-center space-x-2'>
                      <Button color='success' onClick={() => handleEditUser(user)}>
                        Edit
                      </Button>
                      <Button color='failure' onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      {editedUser && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Edit User
              </h3>
              <form onSubmit={handleUpdateUser}>
                <TextInput
                  type='text'
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
                <TextInput
                  type='email'
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
                <Select
                  value={editedUser.role}
                  onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                >
                  <option value="distributer">distributer</option>
                  <option value="manager">manager</option>
                  <option value="supplier">supplier</option>
                </Select>
                <div className='flex justify-center gap-4'>
                  <Button color='success' type='submit'>
                    Update
                  </Button>
                  <Button color='gray' onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
