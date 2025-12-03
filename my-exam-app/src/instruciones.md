# 🚀 Plantilla de Examen React + Vite + API

Guía paso a paso para crear una aplicación React completa en 75 minutos con Zustand, React Router y Bootstrap.

---

## 📋 Tabla de Contenidos

1. [Setup Inicial](#setup-inicial)
2. [Configuración Base](#configuración-base)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Componentes](#componentes)
5. [Páginas](#páginas)
6. [Configuración de APIs](#configuración-de-apis)

---

## 🛠️ Setup Inicial

### Paso 1: Crear el Proyecto (5 minutos)

```bash
# Crear proyecto con Vite
npm create vite@latest my-exam-app -- --template react
cd my-exam-app
```

### Paso 2: Instalar Dependencias

```bash
# Instalar todas las dependencias necesarias
npm install
npm install zustand react-router-dom bootstrap
```

### Paso 3: Abrir en Editor

```bash
# Abrir en VSCode
code .
```

---

## ⚙️ Configuración Base

### Paso 4: Configurar Estilos Globales

Edita `src/index.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  min-height: 100vh;
}

body {
  overflow-x: hidden;
}
```

### Paso 5: Configurar Entry Point

Edita `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 📂 Estructura de Archivos

Crea la siguiente estructura de carpetas:

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Card.jsx
│   └── CardList.jsx
├── layouts/
│   └── RootLayout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Entities.jsx
│   └── Contact.jsx
├── store/
│   └── store.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🗂️ Store y Router

### Paso 6: Configurar Zustand Store

Crea `src/store/store.js`:

```jsx
import { create } from 'zustand';

export const useStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
```

### Paso 7: Configurar React Router

Edita `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Entities from './pages/Entities';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="entities" element={<Entities />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🧩 Componentes

### Paso 8: Crear Header

Crea `src/components/Header.jsx`:

```jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MyApp</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/entities">Entities</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
```

### Paso 9: Crear Footer

Crea `src/components/Footer.jsx`:

```jsx
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© 2025 MyApp - Examen Final</p>
    </footer>
  );
};

export default Footer;
```

### Paso 10: Crear Card Component

Crea `src/components/Card.jsx`:

```jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.image || item.thumbnail || 'https://via.placeholder.com/300'} 
          className="card-img-top" 
          alt={item.name || item.title}
          style={{height: '200px', objectFit: 'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name || item.title}</h5>
          <p className="card-text">{item.description || item.status || 'No description'}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
```

### Paso 11: Crear CardList Component

Crea `src/components/CardList.jsx`:

```jsx
import Card from './Card';

const CardList = ({ items }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CardList;
```

---

## 📐 Layout

### Paso 12: Crear Root Layout

Crea `src/layouts/RootLayout.jsx`:

```jsx
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-vh-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
```

---

## 📄 Páginas

### Paso 13: Crear Home Page

Crea `src/pages/Home.jsx`:

```jsx
import { useEffect } from 'react';
import { useStore } from '../store/store';
import CardList from '../components/CardList';

const Home = () => {
  const { items, setItems } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setItems(data.results.slice(0, 6));
    };
    if (items.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to MyApp</h1>
        <p className="lead">Consuming API with React + Zustand</p>
      </div>
      <CardList items={items} />
    </div>
  );
};

export default Home;
```

### Paso 14: Crear Entities Page

Crea `src/pages/Entities.jsx`:

```jsx
import { useState, useEffect } from 'react';
import { useStore } from '../store/store';
import CardList from '../components/CardList';

const Entities = () => {
  const { items, setItems } = useStore();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setItems(data.results);
    };
    fetchData();
  }, [page]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Entities</h2>
      <CardList items={items} />

      <div className="d-flex justify-content-center gap-2 mt-4">
        <button 
          className="btn btn-primary" 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="btn btn-outline-secondary disabled">Page {page}</span>
        <button 
          className="btn btn-primary" 
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Entities;
```

### Paso 15: Crear Contact Page

Crea `src/pages/Contact.jsx`:

```jsx
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Contact Us</h2>

          {success && (
            <div className="alert alert-success">Message sent successfully!</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message *</label>
              <textarea
                className="form-control"
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
```

---

## 🔄 Configuración de APIs

### Opción 1: Rick and Morty API (Por Defecto)

**URL Base:** `https://rickandmortyapi.com/api/character`

**Estructura de respuesta:**
```json
{
  "results": [...]
}
```

**Archivos que usan esta API:**
- `src/pages/Home.jsx` (línea del fetch)
- `src/pages/Entities.jsx` (línea del fetch)
- `src/components/Card.jsx` (campos: `name`, `image`, `status`)

---

### Opción 2: Dragon Ball API

**URL Base:** `https://dragonball-api.com/api/characters`

**Estructura de respuesta:**
```json
{
  "items": [...],
  "meta": {...},
  "links": {...}
}
```

#### Cambios Necesarios para Dragon Ball API

##### 1. `src/pages/Home.jsx`

**Cambiar:**
```jsx
const response = await fetch('https://rickandmortyapi.com/api/character');
const data = await response.json();
setItems(data.results.slice(0, 6));
```

**Por:**
```jsx
const response = await fetch('https://dragonball-api.com/api/characters?page=1&limit=6');
const data = await response.json();
setItems(data.items); // ⚠️ Cambiar results por items
```

##### 2. `src/pages/Entities.jsx`

**Cambiar:**
```jsx
const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
const data = await response.json();
setItems(data.results);
```

**Por:**
```jsx
const limit = 12;
const url = `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`;
const response = await fetch(url);
const data = await response.json();

if (Array.isArray(data.items)) {
  setItems(data.items); // ⚠️ Cambiar results por items
} else {
  setItems([]);
}
```

##### 3. `src/components/Card.jsx`

**Reemplazar todo el archivo por:**
```jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={item.image}
          alt={item.name}
          className="card-img-top"
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text mb-1">
            <strong>Race:</strong> {item.race}
          </p>
          <p className="card-text mb-1">
            <strong>Ki:</strong> {item.ki}
          </p>
          <p className="card-text mb-0">
            <strong>Gender:</strong> {item.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
```

##### 4. Actualizar el título en `src/pages/Home.jsx`

**Cambiar:**
```jsx
<h1 className="display-4">Welcome to MyApp</h1>
<p className="lead">Consuming API with React + Zustand</p>
```

**Por:**
```jsx
<h1 className="display-4">Dragon Ball App</h1>
<p className="lead">Consuming Dragon Ball API with Zustand</p>
```





