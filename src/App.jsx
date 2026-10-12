import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import MenuSection from './components/MenuSection.jsx'
import Footer from './components/Footer.jsx'
import { menu } from './data/menu.js'
import { location, directionsUrl, phone } from './data/contact.js'
import './App.css'

export default function App() {
  const [activeId, setActiveId] = useState(menu[0].id)
  const activeCategory = menu.find((category) => category.id === activeId)

  return (
    <div className="app">
      <header className="header" id="top">
        <div>
          <h1 className="logo">Madison fastfood</h1>
          <p className="tagline">Fresh. Fast. Tasty.</p>
        </div>

        <address className="location">
          <span>{location.street}</span>
          <span>{location.city}</span>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            Get directions →
          </a>
          <a href={`tel:${phone.tel}`}>Call {phone.display}</a>
        </address>
      </header>

      <div className="layout">
        <Sidebar categories={menu} activeId={activeId} onSelect={setActiveId} />
        <main className="content">
          {/* key resets the open pop-up when switching categories */}
          <MenuSection key={activeCategory.id} category={activeCategory} />
        </main>
      </div>

      <Footer />
    </div>
  )
}
