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

### 3. Configurar variables de entorno

Crea un archivo .env en la raíz con el siguiente contenido:

Fragmento de código
```PORT=3000
DATABASE_URL="file:./dev.db" # Ejemplo para SQLite
JWT_SECRET=tu_secreto_super_seguro
EXPIRESIN=tu_duracion_token
```

### 4. Inicializar Prisma

```Bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Correr en modo desarrollo

```Bash
npm run dev
```

## 📌 Autor
**Edward Cruz**

Backend Developer 