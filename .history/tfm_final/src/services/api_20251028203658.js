

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token); 
  return data;
}



export async function getCategorias() {
  const token = localStorage.getItem('token');


  const res = await fetch(`${API_URL}/categoria`, {
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

  const res = await fetch(`${API_URL}/usuario`, {
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


export async function getComentarios() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/comentario`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener los comentarios');
  }

  return res.json();
  
}

export async function getRecetas() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/recetas`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener las recetas');
  }

  return res.json();
  
}

export async function getCategoriasByID(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/categoria/${id}`, {
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

  const res = await fetch(`${API_URL}/usuario/${id}`, {
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

export async function getIngredientes() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/ingredientes`, {

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

  const res = await fetch(`${API_URL}/ingredientes/${id}`, {
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

export async function getComentariosByID(id) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/comentario/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener el comentario con ID ' + id);
  }
  
  return res.json();
}

export async function getMenus() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/menus`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener menús');
  }

  return res.json();
}

export async function getMenuByID(id) {
  const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/inventario`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener el menú con ID ' + id);
  }

  return res.json();
}

export async function getInventario() {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:8000/api/inventario', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener inventario');
  }

  return res.json();
}

export async function getInventarioByID(id) {
  const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/inventario/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Error al obtener el inventario con ID ' + id);
  }

  return res.json();
}

export async function NuevaCategoria({ nombre, descripcion }) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/categoria`, {
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

  const res = await fetch(`${API_URL}/usuario`, {
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


export async function NuevoIngrediente({ nombre, descripcion, unidad_medida }) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/ingredientes`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      unidad_medida
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el ingrediente");
  }

  return data;
}

export async function NuevoMenu({ usuario_id, nombre, fecha }) {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/menus`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario_id: usuario_id,
      nombre: nombre,
      fecha: fecha
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el menú");
  }

  return data;
}

export async function NuevoInventario({ usuario_id, ingrediente_id, cantidad }) {
  const token = localStorage.getItem('token');

    const res = await fetch(`${API_URL}/inventario`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usuario_id: usuario_id,
      ingrediente_id: ingrediente_id,
      cantidad: cantidad
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el menú");
  }

  return data;
}


export async function NuevoComentario({usuario_id,receta_id,contenido}) {


  const token = localStorage.getItem('token');

  const res = await fetch(`${API_URL}/comentario`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ usuario_id,receta_id,contenido})

  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al crear el comentario");
  }

  return data;
}



export async function actualizarItem(tipo, id, datos) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/${tipo}/${id}`, {
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
  const res = await fetch(`${API_URL}/${tipo}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error al eliminar");
  return data;
}