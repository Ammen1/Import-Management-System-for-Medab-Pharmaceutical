export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('/backend/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// export function fetchItemsByUserId() {
//   return new Promise(async (resolve) => {
//     const response = await fetch('/backend/cart');
//     const data = await response.json();
//     resolve({ data });
//   });
// }
export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if the logged-in user is an admin
      const user = await fetch('/backend/users/users'); // Assuming this endpoint returns user information
      const userData = await user.json();

      if (userData.role === 'admin') {
        // If user is an admin, proceed with fetching items
        const response = await fetch('/backend/cart');
        const data = await response.json();
        resolve({ data });
      } else {
        // If user is not an admin, reject the promise with an error message
        reject({ error: 'User is not authorized to fetch items' });
      }
    } catch (error) {
      reject({ error: 'Failed to fetch items' });
    }
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/backend/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/backend/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteItemFromCart(item.id);
    }
    resolve({ status: 'success' });
  });
}
