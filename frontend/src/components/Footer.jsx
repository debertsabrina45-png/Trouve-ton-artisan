
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>Trouve ton artisan</h3>
          <p>Retrouvez les artisans près de chez vous.</p>
        </div>

        <div>
          <h3>Informations légales</h3>
          <nav className="footer-links">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/donnees-personnelles">Données personnelles</Link>
            <Link to="/accessibilite">Accessibilité</Link>
            <Link to="/cookies">Cookies</Link>
          </nav>
        </div>

        <div>
          <h3>Nous contacter</h3>
          <p>101 cours Charlemagne</p>
          <p>CS 20033</p>
          <p>69269 LYON CEDEX 02</p>
          <p>France</p>
          <p>+33 (0)4 26 73 40 00</p>
        </div>
      </div>

      <p className="footer-bottom">
        © 2026 Trouve ton artisan
      </p>
    </footer>
  )
}

export default Footer
