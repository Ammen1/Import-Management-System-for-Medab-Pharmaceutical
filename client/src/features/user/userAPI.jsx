export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/backend/orders/own/') 
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/backend/users/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/backend/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllUsers() {
   return new Promise(async (resolve) => {
     const response = await fetch(
       '/backend/users/users'
     );
     const data = await response.json();
     console.log(data);
     resolve({data});
   });
 }
 

 export function deleteUser(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `/backend/users/users${userId}`,
        {
          method: 'DELETE'
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }

      resolve({ message: 'User deleted successfully' });
    } catch (error) {
      reject({ error: error.message });
    }
  });
}
