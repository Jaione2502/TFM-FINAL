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

export async function getCategoriasByID(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8000/api/categoria/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener la categoría con ID ' + id);
  }
  
  return res.json();
}


export async function getIngredientes() {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/ingredientes', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener ingredientes');
  }

  return res.json();
}

export async function getIngredientesByID(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8000/api/ingredientes/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener el ingrediente con ID ' + id);
  }
  
  return res.json();
}


export async function NuevaCategoria({ nombre, descripcion }) {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/categoria', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear la categoría");
  }

  return data; // <-- devuelve la respuesta del backend
}

// Nuevo Ingrediente

export async function NuevoIngrediente({ nombre, descripcion }) {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/ingredientes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: nombre,
      descripcion: descripcion
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el ingrediente");
  }

  return data; // <-- devuelve la respuesta del backend
}

// Actualizar

export async function actualizarItem(tipo, id, datos) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/api/${tipo}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al guardar");
  return data;
}

export async function eliminarItem(tipo, id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/api/${tipo}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar");
  return data;
}
