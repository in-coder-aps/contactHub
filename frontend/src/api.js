const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return handleResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users/current`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(response);
};

export const createContact = async (token, contactData) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });
  return handleResponse(response);
};

export const getContacts = async (token) => {
  const response = await fetch(`${API_BASE_URL}/contacts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await handleResponse(response); // This will be { Contacts: [...] }

  // Extract the array from the 'Contacts' key
  if (data && Array.isArray(data.Contacts)) { // Make sure to use 'Contacts' (capital C)
    return data.Contacts;
  } else {
    console.error("Unexpected contacts response structure:", data);
    return []; // Return an empty array to prevent crashing
  }
};

export const updateContact = async (token, id, contactData) => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });
  return handleResponse(response);
};

export const deleteContact = async (token, id) => {
  const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  // No content for successful delete, so just check response.ok
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete contact');
  }
  return true; // Indicate success
};