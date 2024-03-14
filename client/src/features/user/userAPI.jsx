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


export function fetchAllUsers(sort, pagination) {
  let queryString = '';
 
  for (let key in sort) {
   queryString += `${key}=${sort[key]}&`;
 }
   for (let key in pagination) {
     queryString += `${key}=${pagination[key]}&`;
   }
 
   return new Promise(async (resolve) => {
     const response = await fetch(
       '/backend/users/users?' + queryString
     );
     const data = await response.json();
     console.log(data);
     const totalUsers = await response.headers.get('X-Total-Count');
     resolve({ data: { users: data, totalUsers: +totalUsers } });
   });
 }
 