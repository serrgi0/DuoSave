const API_URL = "http://localhost:3000"; //URL del backend

// --- Helpers ---

export async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return res.json();
}

// --- Auth ---

export async function login(email: string, password: string) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(username: string, email: string, password: string) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}

// --- Users ---

export async function getUsers() {
  return request("/users", { method: "GET" });
}

export async function getUserById(id: number) {
  return request(`/users/${id}`, { method: "GET" });
}

export async function updateUser(
  id: number,
  user: { username?: string; email?: string; password?: string }
) {
  return request(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id: number) {
  return request(`/users/${id}`, { method: "DELETE" });
}