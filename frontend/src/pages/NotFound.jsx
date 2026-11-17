
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  useEffect(() => {
    document.title = 'Page introuvable (404) | Trouve ton artisan'

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    )

    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute(
      'content',
      'La page que vous recherchez est introuvable. Retournez sur Trouve ton artisan pour découvrir nos professionnels.'
    )
  }, [])

  return (
    <main className="not-found">
      <img
        src="/image-404.png"
        alt="Illustration de page introuvable"
        className="not-found-image"
      />

      <h1>404</h1>
      <h2>Page introuvable</h2>

      <p>
        Désolé, la page que vous recherchez n'existe pas.
      </p>

      <Link to="/">Retour à l'accueil</Link>
    </main>
  )
}

export default NotFound
