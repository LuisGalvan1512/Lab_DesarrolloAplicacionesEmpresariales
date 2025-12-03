🚀 Plantilla Rápida para Examen - React + API
Te doy la plantilla más simple y rápida para completar en 75 minutos:

📦 Setup Inicial (5 minutos)
bash
# 1. Crear proyecto
npm create vite@latest my-exam-app -- --template react
cd my-exam-app

# 2. Instalar dependencias
npm install
npm install zustand react-router-dom bootstrap

# 3. Abrir en VSCode
code .
🔧 Configuración Base

Agrega estos estilos en src/index.css:
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




1. src/main.jsx
jsx
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
2. src/store/store.js (Zustand)
jsx
import { create } from 'zustand';

export const useStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
3. src/App.jsx (Router)
jsx
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
🧩 Componentes
4. src/components/Header.jsx
jsx
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
5. src/components/Footer.jsx
jsx
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© 2025 MyApp - Examen Final</p>
    </footer>
  );
};

export default Footer;
6. src/components/Card.jsx
jsx
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
7. src/components/CardList.jsx
jsx
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
📄 Layout
8. src/layouts/RootLayout.jsx
jsx
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
🎨 Páginas
9. src/pages/Home.jsx
jsx
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
10. src/pages/Entities.jsx
jsx
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
11. src/pages/Contact.jsx
jsx
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
📝 README.md
text
# MyApp - Examen Final

Aplicación SPA con React + Vite consumiendo Rick and Morty API

## 🛠️ Stack
- React + Vite
- Zustand (estado global)
- React Router
- Bootstrap

## 🚀 Instalación
npm install
npm run dev

## 🌐 Deploy
[Link al deploy aquí]

## 📦 Repositorio
[Link a GitHub aquí]








🎌 API de Banderas (REST Countries)
URL: https://restcountries.com/v3.1/all

Cambios en el fetch:
jsx
const response = await fetch('https://restcountries.com/v3.1/all');
const data = await response.json();
setItems(data.slice(0, 20)); // No tiene .results
Cambios en Card.jsx:
jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.flags.png} 
          className="card-img-top" 
          alt={item.name.common}
          style={{height: '150px', objectFit: 'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name.common}</h5>
          <p className="card-text">Capital: {item.capital?.[0] || 'N/A'}</p>
          <p className="card-text">Population: {item.population.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
🐉 API Dragon Ball
URL: https://dragonball-api.com/api/characters

Cambios en el fetch:
jsx
const response = await fetch('https://dragonball-api.com/api/characters?limit=20');
const data = await response.json();
setItems(data.items); // Usa .items
Cambios en Card.jsx:
jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.image} 
          className="card-img-top" 
          alt={item.name}
          style={{height: '250px', objectFit: 'cover'}}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Race: {item.race}</p>
          <p className="card-text">Ki: {item.ki}</p>
        </div>
      </div>
    </div>
  );
};
🐱 API de Pokémon
URL: https://pokeapi.co/api/v2/pokemon?limit=20

Cambios en el fetch (requiere doble fetch):
jsx
const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
const data = await response.json();

const detailed = await Promise.all(
  data.results.map(async (p) => {
    const res = await fetch(p.url);
    return res.json();
  })
);
setItems(detailed);
Cambios en Card.jsx:
jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.sprites.front_default} 
          className="card-img-top bg-light" 
          alt={item.name}
          style={{height: '200px', objectFit: 'contain'}}
        />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{item.name}</h5>
          <p className="card-text">Type: {item.types[0].type.name}</p>
          <p className="card-text">Height: {item.height}</p>
        </div>
      </div>
    </div>
  );
};
🍺 API de Cervezas
URL: https://api.punkapicom/v2/beers

Cambios en el fetch:
jsx
const response = await fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20');
const data = await response.json();
setItems(data); // Es array directo
Cambios en Card.jsx:
jsx
const Card = ({ item }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img 
          src={item.image_url} 
          className="card-img-top p-3" 
          alt={item.name}
          style={{height: '200px', objectFit: 'contain'}}
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.tagline}</p>
          <p className="card-text">ABV: {item.abv}%</p>
        </div>
      </div>
    </div>
  );
};