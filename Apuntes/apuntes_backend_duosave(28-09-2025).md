📘 Apuntes – Backend DuoSave (NestJS + MySQL sin Prisma)
1. DTOs (Data Transfer Objects)

Creamos CreateUserDto y UpdateUserDto para validar y tipar los datos de entrada.

Usamos class-validator (@IsString, @IsEmail, @MinLength) para validar automáticamente los campos.

2. UsersService (Lógica de negocio)

Primero lo hicimos con Prisma, pero lo eliminamos porque preferimos diseñar la base directamente en MySQL.

Lo rehicimos con mysql2/promise, conectándonos a la DB y ejecutando queries SQL (INSERT, SELECT, UPDATE, DELETE).

Ahora UsersService habla directo con la tabla users.

3. UsersController (Endpoints REST)

Creamos endpoints en /users con NestJS:

POST /users → Crear usuario

GET /users → Listar todos

GET /users/:id → Buscar por id

PATCH /users/:id → Actualizar

DELETE /users/:id → Eliminar

Cada endpoint llama a su método en UsersService.

4. Base de datos MySQL

Al inicio la DB tenía varias tablas creadas por Prisma (profile, savingsentry, _userprofiles).

Decidimos borrar todas las tablas y quedarnos solo con users.

Creamos la tabla users con:

id (INT, PK, AUTO_INCREMENT)

username (VARCHAR)

email (VARCHAR, UNIQUE)

password (VARCHAR)

5. Postman (pruebas de API)

Probamos la API con Postman enviando JSON en el body.

Ejemplo de creación de usuario:

{
  "username": "Ana",
  "email": "ana@example.com",
  "password": "SuperSegura123"
}


Verificamos que los endpoints devuelven respuestas correctas y los datos se guardan en MySQL.

6. Login y Register (seguridad con bcrypt)

Añadimos bcrypt para hashear contraseñas al crear usuarios.

En UsersService:

create() → guarda la contraseña hasheada.

validateUser(email, password) → compara la contraseña con el hash guardado.

En UsersController añadimos:

@Post('login')
async login(@Body() body: { email: string; password: string }) {
  const user = await this.usersService.validateUser(body.email, body.password);
  if (!user) {
    return { error: 'Credenciales incorrectas' };
  }
  return user; // en un futuro se devolverá un JWT
}

7. Frontend (React + Tailwind)

Estructuramos el frontend con Vite (React + TS).

Creamos services/api.ts para centralizar las llamadas al backend (register, login, getUsers...).

🔑 Register

Página con formulario que hace POST /users.

Si el registro es correcto → redirige a Login.

🔑 Login

Página que hace POST /users/login.

Si el login es correcto → guarda el usuario en localStorage y redirige a Dashboard.

📊 Dashboard

Pantalla privada que lee el usuario desde localStorage y muestra datos básicos (username, email).

Sirve para comprobar que el login funciona.

8. Virtual Host (para el frontend)

Para no depender de la IP/puerto que asigne Vite cada vez, puedes crear un Virtual Host y un dominio local fijo.

Edita el archivo de hosts (Windows: C:\Windows\System32\drivers\etc\hosts | Linux/Mac: /etc/hosts) y añade:

127.0.0.1   duosave.local


En tu vite.config.ts, configura el servidor:

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "duosave.local",
    port: 5173, // fijo, no aleatorio
  },
});


Ahora podrás abrir tu frontend en:
👉 http://duosave.local:5173

✅ Con esto ya tienes:

Backend con usuarios y login seguro.

Frontend con registro/login/dashboard.

Virtual Host para un acceso fijo al frontend.