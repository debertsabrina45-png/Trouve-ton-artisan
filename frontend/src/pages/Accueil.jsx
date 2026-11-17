
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Categories from '../components/Categories'
import Artisans from '../components/Artisans'
import TrouverArtisan from '../components/TrouverArtisan'

function Accueil() {
  const [recherche, setRecherche] = useState('')
  const [termeRecherche, setTermeRecherche] = useState('')
  const [categorieRecherche, setCategorieRecherche] = useState('')

  // Référencement SEO de la page d'accueil
  useEffect(() => {
    document.title = 'Trouve ton artisan | Artisans en Auvergne-Rhône-Alpes'

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
      'Trouvez un artisan en Auvergne-Rhône-Alpes. Découvrez des professionnels du bâtiment, des services, de la fabrication et de l’alimentation.'
    )
  }, [])

  function allerAuxResultats() {
    setTimeout(() => {
      document.getElementById('resultats-recherche')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }

  function lancerRecherche(event) {
    event.preventDefault()
    setCategorieRecherche('')
    setTermeRecherche(recherche.trim())
    allerAuxResultats()
  }

  function choisirCategorie(categorie) {
    setRecherche('')
    setTermeRecherche('')
    setCategorieRecherche(categorie)
    allerAuxResultats()
  }

  return (
    <>
      <Header onChoisirCategorie={choisirCategorie} />

      <main>
        <section className="hero">
          <h1>Trouvez votre artisan en Auvergne-Rhône-Alpes</h1>

          <p>
            Découvrez les artisans près de chez vous
            et trouvez le professionnel qu'il vous faut.
          </p>

          <form onSubmit={lancerRecherche}>
            <input
              type="search"
              placeholder="Rechercher un artisan..."
              aria-label="Rechercher un artisan"
              value={recherche}
              onChange={(event) => setRecherche(event.target.value)}
            />

            <button type="submit">Rechercher</button>
          </form>
        </section>

        <TrouverArtisan />

        <Categories onChoisirCategorie={choisirCategorie} />

        <Artisans
          recherche={termeRecherche}
          categorie={categorieRecherche}
        />
      </main>

      <footer>
        <p>© 2026 Trouve ton artisan</p>
      </footer>
    </>
  )
}

export default Accueil
