// Login
export async function login(email, password) {
  const res = await fetch("http://localhost:8000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token); // Guardar token
  return data;
}


// Obtener categorías (requiere token)
export async function getCategorias() {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/categoria', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener categorías');
  }

  return res.json();
}
