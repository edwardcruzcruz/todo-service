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

### 3. Configurar infraestructura de Base de Datos (Docker)

Antes de ejecutar la aplicación, es necesario levantar el motor de base de datos. Para este proyecto, utilizamos PostgreSQL mediante un contenedor de Docker para asegurar un entorno aislado y controlado.

#### Levantar el contenedor:

Ejecuta el siguiente comando en tu terminal para crear e iniciar la base de datos:

```Bash
docker run --name fastify-postgres \
  -e POSTGRES_PASSWORD=secret_password_here \
  -e POSTGRES_DB=task_manager_db \
  -p 5432:5432 \
  -d postgres
```

**Nota de seguridad:** El parámetro POSTGRES_PASSWORD define la contraseña del usuario root de la base de datos. Asegúrate de cambiar secret_password_here por una cadena segura en entornos que no sean de prueba local.


### 4. Configurar variables de entorno

Crea un archivo .env en la raíz con el siguiente contenido:

Fragmento de código

```
PORT=3000
# URL de conexión para Prisma 7
# Estructura: protocolo://usuario:contraseña@host:puerto/nombre_db?schema=public
DATABASE_URL="postgresql://postgres:secret_password_here@localhost:5432/task_manager_db?schema=public"
JWT_SECRET=tu_secreto_super_seguro
EXPIRESIN=tu_duracion_token
```

### 5. Inicializar Prisma

```Bash
npx prisma generate
npx prisma migrate deploy
```

### 6. Correr en modo desarrollo

```Bash
npm run dev
```

## 📌 Autor
**Edward Cruz**

Backend Developer 