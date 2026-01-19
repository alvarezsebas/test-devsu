
# Proyecto CRUD de Productos – Angular 19 -  Test Devsu

Este proyecto corresponde a un **CRUD de productos** desarrollado en **Angular 19**, utilizando **componentes standalone**, **Reactive Forms**, validaciones personalizadas y **pruebas unitarias con Jest** como parte del test para el puesto de desarrollador frontend para la empresa devsu

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- **Node.js** v18 o superior
- **Angular CLI** v19
- **npm** v9 o superior

Para verificar:

```bash
node -v
npm -v
ng version
```

---

## 🚀 Instalación del proyecto

1. Clona el repositorio o descarga el proyecto
2. Instala las dependencias:

```bash
npm install
```

---

## ▶️ Ejecución del proyecto

Para iniciar la aplicación:

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

---

## 🔗 Backend

La aplicación consume un backend REST el cual es suministrado por la empresa para realizar su test y estara disponible en:

```
http://localhost:3002/bp
```

⚠️ Asegúrate de que el backend esté levantado antes de usar la aplicación.

---

## 🧪 Pruebas unitarias (Jest)

Este proyecto utiliza **Jest** como framework de pruebas unitarias.

### Ejecutar todas las pruebas

```bash
npm run test
```

El reporte se genera en:

```
coverage/
```

---

## 🧪 Elementos testeados

Se incluyen pruebas unitarias para:

- ✅ Servicios (`ProductService`)
- ✅ Componentes con lógica:
  - Listado de productos
  - Formulario de productos
- ✅ Validadores personalizados:
  - Fecha de lanzamiento
  - Fecha de revisión (+1 año)
- ❌ Componentes puramente presentacionales (no testeados)

### Criterio aplicado
> Solo se prueban componentes y servicios con lógica de negocio para evitar tests redundantes.

---


---

## 👨‍💻 Autor

Proyecto desarrollado por Sebastian Alvarez Lopera como actividad técnica para la aplicación de puesto desarrolador frontend.
