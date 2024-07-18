const API_URL = 'http://127.0.0.1:8000/api/';

const register = async (username, email, password) => {
  const response = await fetch(`${API_URL}register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
};

const login = async (username, password) => {
  const response = await fetch(`${API_URL}token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (data.access) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  return data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
