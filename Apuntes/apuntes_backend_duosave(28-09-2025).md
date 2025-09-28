# 📘 Apuntes – Backend DuoSave (NestJS + MySQL sin Prisma)

### 1. DTOs (Data Transfer Objects)
- Creamos `CreateUserDto` y `UpdateUserDto` para validar y tipar los datos de entrada.  
- Usamos **class-validator** (`@IsString`, `@IsEmail`, `@MinLength`) para validar automáticamente los campos.  

---

### 2. UsersService (Lógica de negocio)
- Primero lo hicimos con **Prisma**, pero lo eliminamos porque preferimos diseñar la base directamente en MySQL.  
- Lo rehicimos con **mysql2/promise**, conectándonos a la DB y ejecutando queries SQL (`INSERT`, `SELECT`, `UPDATE`, `DELETE`).  
- Ahora `UsersService` habla directo con la tabla `users`.  

---

### 3. UsersController (Endpoints REST)
- Creamos endpoints en `/users` con NestJS:  
  - `POST /users` → Crear usuario  
  - `GET /users` → Listar todos  
  - `GET /users/:id` → Buscar por id  
  - `PATCH /users/:id` → Actualizar  
  - `DELETE /users/:id` → Eliminar  
- Cada endpoint llama a su método en `UsersService`.  

---

### 4. Base de datos MySQL
- Al inicio la DB tenía varias tablas creadas por Prisma (`profile`, `savingsentry`, `_userprofiles`).  
- Decidimos **borrar todas las tablas** y quedarnos solo con `users`.  
- Creamos la tabla `users` con:
  - `id` (INT, PK, AUTO_INCREMENT)  
  - `username` (VARCHAR)  
  - `email` (VARCHAR, UNIQUE)  
  - `password` (VARCHAR)  

---

### 5. Postman (pruebas de API)
- Probamos la API con **Postman** enviando JSON en el body.  
- Ejemplo de creación de usuario:

```json
{
  "username": "Ana",
  "email": "ana@example.com",
  "password": "SuperSegura123"
}
```

- Verificamos que los endpoints devuelven respuestas correctas y los datos se guardan en MySQL.  

---

✅ Con esto ya tenés tu **módulo de usuarios completo** en NestJS, con conexión a MySQL sin usar Prisma, y tu tabla `users` funcionando.  
