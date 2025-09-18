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

export async function getUsuarios() {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/usuario', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener los perfiles');
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


export async function getUsuarioByID(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8000/api/usuario/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener el usuario con ID ' + id);
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

  return data; 
}

export async function NuevoUsuario({ name, email, password }) {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/usuario', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el usuario");
  }

  return data; 
}




export async function actualizarItem(tipo, id, datos) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`http://localhost:8000/api/${tipo}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json", 
      },
      body: JSON.stringify(datos),
    });

 
    const texto = await res.text();
    let data;

    try {
      data = JSON.parse(texto);
    } catch {
      data = { message: texto }; 
    }

    if (!res.ok) {
      throw new Error(data.message || "Error en la respuesta del servidor");
    }

    return data;
  } catch (error) {
    console.error("Error en actualizarItem:", error);
    throw error;
  }
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