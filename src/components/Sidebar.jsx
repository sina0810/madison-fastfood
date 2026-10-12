import { hours } from '../data/hours.js'

export default function Sidebar({ categories, activeId, onSelect }) {
  return (
    <aside className="sidebar">
      <nav aria-label="Menu categories">
        <h2 className="sidebar-title">Menu</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={category.id === activeId ? 'sidebar-link active' : 'sidebar-link'}
                aria-current={category.id === activeId ? 'true' : undefined}
                onClick={() => onSelect(category.id)}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="hours" aria-labelledby="hours-title">
        <h2 id="hours-title" className="sidebar-title">Hours</h2>
        <dl>
          {hours.map((row) => (
            <div key={row.days} className="hours-row">
              <dt>{row.days}</dt>
              <dd>{row.time}</dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  )
}
