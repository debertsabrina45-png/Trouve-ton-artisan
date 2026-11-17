
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Artisans({ recherche, categorie }) {
  const [artisans, setArtisans] = useState([])
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    fetch('https://trouve-ton-artisan-704z.onrender.com/api/artisans')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error('Impossible de récupérer les artisans.')
        }
        return reponse.json()
      })
      .then((donnees) => setArtisans(donnees))
      .catch(() => setErreur('Impossible de charger les artisans.'))
  }, [])

  const artisansFiltres = artisans.filter((artisan) => {
    const nom = artisan.nom || ''
    const specialite = artisan.specialite || ''
    const categorieArtisan = artisan.Categorie?.nom || ''

    const correspondRecherche =
      !recherche ||
      nom.toLowerCase().includes(recherche.toLowerCase()) ||
      specialite.toLowerCase().includes(recherche.toLowerCase())

    const correspondCategorie =
      !categorie ||
      categorieArtisan.toLowerCase() === categorie.toLowerCase()

    return correspondRecherche && correspondCategorie
  })

  const titre = recherche
    ? 'Résultats de recherche'
    : categorie
      ? `Artisans : ${categorie}`
      : 'Nos artisans du mois'

  return (
    <section className="artisans" id="resultats-recherche">
      <h2>{titre}</h2>

      {erreur && <p>{erreur}</p>}

      {!erreur && artisansFiltres.length === 0 && (
        <p>Aucun artisan trouvé.</p>
      )}

      <div className="artisan-list">
        {artisansFiltres.map((artisan) => (
          <Link
            to={`/artisan/${artisan.id}`}
            className="artisan-card"
            key={artisan.id}
          >
            {artisan.image_url && (
              <img
                src={artisan.image_url}
                alt={`Photo de ${artisan.nom}`}
                className="artisan-image"
              />
            )}

            <h3>{artisan.nom}</h3>
            <p>{artisan.specialite}</p>
            <p>{artisan.ville}</p>
            <p>Note : {artisan.note}/5</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Artisans



