# Proyecto de React - Login User

## _Gallery Elements_

El proyecto fue desarrollado con ReactJS, Manejo de estilos con Tailwind CSS e
implementación del código con el lenguaje TypeScript. Básicamente es un sistema
que simula un inicio de sesión (mediante un Login) con un formulario que captura
una dirección de correo electónico y un password.

El objetivo de la funcionalidad es validar que, en el evento del inicio de
sesión, el estado se capture en la aplicación, se use para generar un token,
almacenarlo en memoria (localStorage) y tener rutas protegidas (privadas) para
la navegación del usuario; cuando se verifique que la sesión no dispone de un
token, el usuario será redirigido a la página del login.

Igualmente el formulario, tiene validaciones para el correcto formato del correo
electrónico y que la contraseña cumpla con una especificación definida.

## Inicializar la app

Para que la aplicación pueda ser transpilada en entorno local, se deben instalar
las dependencias correspondientes y luego ejecutar el comando para levantar el
proyecto en el local server pre configurado.

1. Comando para la instalación de dependencias:

```sh
npm install
```

2. Comando para desplegar el proyecto en servidor local:

```sh
npm run dev
```

## 🏗️ Estrategia para el contexto público y privado del proyecto

Este proyecto sigue una arquitectura basada en **Domain-Driven Design (DDD)**,
organizando el código en **módulos independientes** según su dominio funcional.
Separamos la lógica de negocio de la UI, facilitando **escalabilidad**,
**mantenibilidad** y **reutilización**.

Para garantizar una estructura modular y escalable, el proyecto define dos
contextos principales:

### 🔓 Contexto Público (Login)

- Contiene las vistas y componentes accesibles sin autenticación, ubicados en
  `public-modules/`.
- Maneja la autenticación a través de `context/auth-context/`.
- Implementa validaciones y gestión de formularios en
  `hooks/validation-regex-hook/`.

### 🔒 Contexto Privado (Home y demás módulos)

- Accesible solo para usuarios autenticados, con rutas protegidas en
  `core/guard/`.
- Organizado en `private-modules/`, donde cada módulo privado se maneja de forma
  independiente.
- Utiliza `services/` para las llamadas a API y `hooks/auth-hook/` para
  gestionar la sesión.

Esta estructura permite que el proyecto **crezca fácilmente** con nuevos módulos
privados y públicos sin comprometer la mantenibilidad. 🚀

## Organización del proyecto

La estructura del proyecto de forma visual tiene la siguiente estructura:

```
LOGIN-APP
│── node_modules/         # Dependencias del proyecto
│── public/               # Archivos estáticos públicos
│── src/                  # Código fuente principal
│   ├── assets/           # Recursos estáticos (imágenes, íconos, etc.)
│   │   └── react.svg
│   ├── components/       # Componentes reutilizables
│   │   ├── private-modules/dashboard/
│   │   │   └── dashboard.tsx
│   │   ├── public-modules/login/
│   │   │   ├── login.tsx
│   │   │   └── login.css
│   ├── shared/           # Componentes compartidos
│   │   ├── floating-button/
│   │   ├── header/
│   │   ├── modal/
│   │   └── paginator/
│   ├── context/          # Context API para manejo de estado global
│   │   └── auth-context/
│   │       └── auth-context.tsx
│   ├── core/             # Lógica central del proyecto
│   │   ├── guard/        # Protecciones de rutas
│   │   │   ├── redirect-guard.tsx
│   │   │   └── router-guard.tsx
│   │   ├── model/        # Definiciones de modelos de datos
│   │   ├── services/     # Servicios y llamadas a APIs
│   ├── utils/            # Funciones y herramientas reutilizables
│   │   ├── axios/
│   │   ├── functions/
│   │   └── token/
│   ├── hooks/            # Custom Hooks
│   │   ├── auth-hook/
│   │   ├── records-hook/
│   │   └── validation-regex-hook/
│   ├── App.tsx           # Componente principal
│   └── App.css           # Estilos globales
│── package.json          # Configuración de dependencias y scripts
│── README.md             # Documentación del proyecto
```

## 🚪 Estrategia del Logout de la APP

La estrategia utilizada para cerrar sesión es **"Logout basado en limpieza de
sesión (Token Clearing Strategy)"**, asegurando que la autenticación del usuario
sea eliminada de forma segura.

### 🔹 Funcionamiento:

1. Al hacer logout, se elimina el token de sesión almacenado en `localStorage`.
2. Se limpia cualquier estado global relacionado con el usuario dentro de
   `context/auth-context/`.
3. Se redirige automáticamente al usuario a la página de login
   (`public-modules/login/`).

Este enfoque garantiza que, después del logout, el usuario no pueda acceder a
rutas privadas sin volver a autenticarse. 🚀

## Estrategia de Paginación

En este proyecto se implementó una paginación para manejar la visualización de
un conjunto de **2000 elementos**, dividiéndolos en páginas con un **límite de
48 elementos por página**. La paginación está inspirada en el patrón de
paginación utilizado por plataformas como Mercado Libre, y se implementó con un
componente React reutilizable.

### Lógica de Paginación

- **Límite de elementos por página**: Se establece un máximo de **48 elementos
  por página**.
- **Total de elementos**: El sistema maneja un total de **2000 elementos**, que
  se distribuyen en **42 páginas**.
- **Paginación en bloques**: La interfaz de usuario muestra un número limitado
  de botones de página (máximo de **6 botones visibles**), similar a la
  estrategia de paginación "en bloque" utilizada en plataformas de gran escala.
