import { useState } from 'react'
import ItemDetails from './ItemDetails.jsx'

export default function MenuSection({ category }) {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <section className="menu-section">
      <h2 className="menu-section-title">{category.label}</h2>
      {category.note && <p className="menu-note">{category.note}</p>}

      {category.items.length === 0 ? (
        <p className="menu-empty">Menu coming soon.</p>
      ) : (
        <ul className="menu-grid">
          {category.items.map((item) => (
            <li key={item.name} className="menu-card">
              {item.image && <img className="menu-card-image" src={item.image} alt={item.name} loading="lazy" />}
              <div className="menu-card-body">
                <div className="menu-card-top">
                  <h3>
                    {/* The button stretches over the whole card, so clicking anywhere on it opens the details. */}
                    <button className="menu-card-button" onClick={() => setSelectedItem(item)}>
                      {item.name}
                    </button>
                  </h3>
                  <span className="menu-price">${item.price.toFixed(2)}</span>
                </div>
                {item.description && <p>{item.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}

      <ItemDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  )
}
