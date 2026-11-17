
import { Link, useNavigate } from 'react-router-dom'

function Header({ onChoisirCategorie }) {
  const navigate = useNavigate()

  const categories = [
    { id: 'batiment', nom: 'Bâtiment' },
    { id: 'services', nom: 'Services' },
    { id: 'fabrication', nom: 'Fabrication' },
    { id: 'alimentation', nom: 'Alimentation' }
  ]

  function gererClicCategorie(event, nom) {
    if (onChoisirCategorie) {
      event.preventDefault()
      onChoisirCategorie(nom)
    } else {
      event.preventDefault()
      navigate('/')
    }
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        Trouve ton artisan
      </Link>

      <nav>
        {categories.map((categorie) => (
          <a
            key={categorie.id}
            href="/#resultats-recherche"
            onClick={(event) =>
              gererClicCategorie(event, categorie.nom)
            }
          >
            {categorie.nom}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Header

