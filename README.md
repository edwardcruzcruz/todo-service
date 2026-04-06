# 🚀 ToDo API
<p>
<strong>ToDo API</strong> es el núcleo de servicios para la gestión de tareas de la plataforma Ecotec.
Este servicio ha sido desarrollado siguiendo los principios de <strong>Clean Architecture</strong> para garantizar un código altamente desacoplable, testeable y escalable.
</p>

## 🛠 Tech Stack

- Runtime: Node.js v22 (LTS)

- Framework: Fastify (High performance)

- Lenguaje: TypeScript

- ORM: Prisma 6

- Base de Datos: PostgreSQL (via Prisma)

- Autenticación: JWT (JSON Web Tokens) & bcrypt

- Herramientas: tsx (watch mode), dotenv


## 🧱 Arquitectura del Proyecto

El proyecto implementa Clean Architecture, dividiendo las responsabilidades en capas concéntricas:

- **Domain:** Contiene las entidades de negocio y las interfaces de los repositorios. Es la capa más interna y no tiene dependencias externas.

- **Application (Use Cases)**: Implementa la lógica de negocio específica de la aplicación (ej. LoginUser, CreateUser).

- **Infrastructure:** Contiene las implementaciones externas como la configuración de la base de datos (Prisma) y repositorios concretos.

- **Interfaces (HTTP):**x Controladores y rutas que manejan la comunicación con el mundo exterior.

## 📁 Estructura de Carpetas

```bash
src/
 ├── application/               # Casos de uso (Lógica de aplicación)
 │    └── use-cases/            # CreateUser.ts, LoginUser.ts
 ├── domain/                    # Entidades e interfaces del dominio
 ├── infrastructure/            # Implementaciones (DB, Repositorios)
 │    ├── repositories/         # UserRepository
 │    └── database/             # Cliente de Prisma
 ├── interfaces/                # Capa de entrada (HTTP)
 │    └── http/                 # Controladores
 │          ├── controllers/    # AuthController 
 │          ├── middlewares/    # manejo de errores AppError
 │          ├── routes/         # rutas
 │          └── schemas/        # esquema create-user
 ├── utils/                     # Utilidades globales (JWT)
 └── app.ts                     # Punto de entrada de Fastify
prisma/
 └── schema.prisma                  # Definición del modelo de datos
```
## 🔑 Endpoints de Autenticación
### 1. Registro de Usuario
```
POST /api/v1/auth/register
```
Crea una nueva cuenta de usuario.

Hash de contraseña automático con bcrypt.

Body (JSON):

```json
{
  "name": "Tu Nombre",
  "email": "example@extension.com",
  "password": "password123"
}
```

### 2. Inicio de Sesión
```
POST /api/v1/auth/login
```
Valida credenciales y retorna un JWT.

Body (JSON):

```json
{
  "email": "example@extension.com",
  "password": "password123"
}
```

### 3. listar tares usuario autenticado
```
GET /api/v1/tasks
```
Valida existencia y validez del token, listando las tareas del usuario autenticado.

### 4. Obtener tarea por Id
```
GEY /api/v1/tasks/:id
```
Valida existencia y validez del token, obtiene tarea por id

### 5. Crear tarea
```
POST /api/v1/tasks
```
Valida existencia y validez del token, crea tarea

Body (JSON):

```json
{
    "title": "task - 1",
    "description": "task 1",
    "completed": false,
    "user_id": "6cc240d4-94bc-40b1-818c-2d9c38dc851c"
}
```

### 6. Actualizar tarea
```
PUT /api/v1/tasks/:id
```
Valida existencia y validez del token, actualiza tarea

Body (JSON):

```json
{
    "title": "task - 2",
    "description": null,
    "completed": false
}
```

### 7. Eliminar tarea
```
DELETE /api/v1/tasks/:id
```
Valida existencia y validez del token, elimina tarea


## ⚙️ Instalación y Uso

### 1. Clonar el repositorio

```Bash
git clone <tu-repositorio-url>
cd backend
```

### 2. Instalar dependencias

```Bash
npm install
```

### 4. Configurar variables de entorno

Crea un archivo .env en la raíz con el siguiente contenido:

Fragmento de código

```
PORT=3000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=todo

#URL de conexión para Prisma (usada por la app para conectar al contenedor 'db')
DATABASE_URL="postgresql://postgres:password@db:5432/todo?schema=public"

JWT_SECRECT=SECRET_CODE_HERE
EXPIRESIN=1h
FRONTEND_URL=http://localhost:5173
```

### 3. Ejecución con Docker (Recomendado 🚀)
La forma más rápida de iniciar el proyecto es utilizando Docker Compose. Esto levantará automáticamente la base de datos PostgreSQL y la API de Fastify.

```bash
# Construir e iniciar los servicios
docker-compose up --build
```
Nota: El contenedor de la API ejecutará automáticamente npx prisma migrate deploy al iniciar para asegurar que la base de datos esté actualizada.

### 4. Alternativa: Ejecución Local (Desarrollo)
Si prefieres ejecutar solo la base de datos en Docker y la aplicación en tu entorno local para debuguear:

#### 1. Levantar solo la DB:

```bash
# Solo iniciar la base PostgreSQL
docker-compose up db -d
```

#### 2. Actualizar DATABASE_URL

Cambia db por localhost en tu archivo .env:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/todo?schema=public"
```

#### 3. Preparar y Sincronizar:

```bash
npx prisma generate
npx prisma migrate deploy
```

#### 4. Correr servidor:

```bash
npm run dev
```

## 📌 Autor
**Edward Cruz**

Backend Developer 