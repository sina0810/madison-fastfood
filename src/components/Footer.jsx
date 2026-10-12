import { hours } from '../data/hours.js'
import { location, directionsUrl, phone, social } from '../data/contact.js'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <p className="footer-brand">Madison fastfood</p>
          <p className="footer-muted">Fresh. Fast. Tasty.</p>
          <ul className="footer-social" aria-label="Social media">
            {social.map((site) => (
              <li key={site.name}>
                <a href={site.url} target="_blank" rel="noreferrer">
                  {site.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Visit us</h2>
          <address>
            {location.street}
            <br />
            {location.city}
          </address>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            Get directions →
          </a>
        </div>

        <div>
          <h2 className="footer-title">Hours</h2>
          {hours.map((row) => (
            <p key={row.days}>
              <span className="footer-muted">{row.days}:</span> {row.time}
            </p>
          ))}
        </div>

        <div>
          <h2 className="footer-title">Contact</h2>
          <a href={`tel:${phone.tel}`}>{phone.display}</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} Madison fastfood. All rights reserved.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
