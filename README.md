<h1 align="center">  Web Recetas Creativas y Saludables </h1>

Este proyecto está compuesto por dos aplicaciones principales:

- **Frontend:** tfm_final desarrollado con **Vue.js**  
- **Backend:** recetas_api desarrollado con **Laravel**, utilizando **Apache** y **MySQL** (a través de **XAMPP**)

El objetivo del proyecto es ofrecer una plataforma completa para gestionar y compartir recetas, con autenticación de usuarios, creación, edición y visualización de recetas.


# Estructura del proyecto:
recetas_api (Backend)

tfm_final (Frontend)

# Tecnologías utilizadas:

  ## Frontend (tfm_final)
    - Vue.js 3 (Composition API)
    - Vue Router
    - Bootstrap + CSS
    - Vite

  ## Backend (recetas_api)
    - Laravel 10+
    - PHP 8+
    - MySQL
    - Apache (XAMPP)
    - Composer

# Instalación y ejecución:
1. Clonar el repositorio
2. Configurar el backend

   cd recetas_api > composer install > crear archivo .env > generar clave aplicación > ejecutar migraciones (y seeders) > inicializar con php artisan serve
4. Configurar el frontend
 
   cd tfm_final > npm install > crear archivo .env > agregar ruta API > npm run dev


# Testing
- Backend:
  php artisan test

- Frontend:
  npm run test


---

# Autores:
Jaione Aldaregia Erro

José Miguel Salinas Nicolás

Inés Marroquí Franco
  
