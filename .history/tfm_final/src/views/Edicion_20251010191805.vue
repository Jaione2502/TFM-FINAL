<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
      <!-- Categorias -->
      <template v-if="tipo === 'categorias'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>
      </template>

      <!-- Perfiles -->
      <template v-if="tipo === 'perfiles'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Email:</label>
          <input v-model="form.email" type="email" />
        </div>
      </template>

      <!-- Comentarios -->
      <template v-if="tipo === 'comentarios'">
        <div>
          <label>Titulo receta:</label>
          <input v-model="form.receta" type="text" disabled />
        </div>

        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Comentario:</label>
          <textarea v-model="form.contenido"></textarea>
        </div>
      </template>

      <!-- Ingredientes -->
      <template v-if="tipo === 'ingredientes'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>

        <div>
          <label>Unidad de Medida:</label>
          <input v-model="form.unidad_medida" type="text" />
        </div>
      </template>

      <!-- Menus -->
      <template v-if="tipo === 'menus'">
        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Fecha:</label>
          <input type="date" v-model="form.fecha" required />
        </div>
      </template>

      <!-- Inventario -->
      <template v-if="tipo === 'inventario'">
        <div>
          <label>Usuario:</label>
          <!-- mostramos el nombre del usuario, solo lectura -->
          <input v-model="form.usuario" disabled />
        </div>

        <div>
          <label>Ingrediente:</label>
          <select v-model.number="form.ingrediente_id" required :disabled="loading">
            <option value="" disabled>Selecciona un ingrediente</option>
            <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
              {{ ing.nombre ?? ing.titulo ?? `Ingrediente #${ing.id}` }}
            </option>
          </select>
          <p v-if="errores.ingrediente_id" class="error">{{ errores.ingrediente_id }}</p>
