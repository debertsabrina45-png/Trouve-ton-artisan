
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtisanDetail() {
  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [erreur, setErreur] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [objet, setObjet] = useState('')
  const [message, setMessage] = useState('')

  // Récupérer les informations de l'artisan
  useEffect(() => {
    setArtisan(null)
    setErreur('')

    fetch(`http://localhost:3000/api/artisans/${id}`)
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error('Artisan introuvable.')
        }
        return reponse.json()
      })
      .then((donnees) => setArtisan(donnees))
      .catch(() => setErreur('Impossible de charger cet artisan.'))
  }, [id])

  // Référencement SEO de la fiche artisan
  useEffect(() => {
    if (artisan) {
      document.title = `${artisan.nom} | Trouve ton artisan`

      const description = `Découvrez ${artisan.nom}, spécialiste en ${artisan.specialite} à ${artisan.ville}. Retrouvez ses informations et contactez-le.`

      let metaDescription = document.querySelector(
        'meta[name="description"]'
      )

      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.name = 'description'
        document.head.appendChild(metaDescription)
      }

      metaDescription.setAttribute('content', description)
    }
  }, [artisan])

  // Envoyer un message à l'artisan
  function envoyerMessage(event) {
    event.preventDefault()

    alert('Le bouton fonctionne !')

    if (!artisan.email) {
      setErreur('Cet artisan ne possède pas d’adresse e-mail renseignée.')
      return
    }

    const sujet = encodeURIComponent(objet)
    const contenu = encodeURIComponent(
      `Nom : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`
    )

    window.location.href = `mailto:${artisan.email}?subject=${sujet}&body=${contenu}`
  }

  // Afficher les erreurs
  if (erreur) {
    return (
      <main className="artisan-detail">
        <p>{erreur}</p>
        <Link to="/">Retour à l'accueil</Link>
      </main>
    )
  }

  // Afficher le chargement
  if (!artisan) {
    return <p>Chargement de l'artisan...</p>
  }

  return (
    <main className="artisan-detail">
      <Link to="/">← Retour à l'accueil</Link>

      <h1>{artisan.nom}</h1>

      {artisan.image_url && (
        <img
          src={artisan.image_url}
          alt={`Photo de ${artisan.nom}`}
          className="artisan-image"
        />
      )}

      <p><strong>Spécialité :</strong> {artisan.specialite}</p>
      <p><strong>Ville :</strong> {artisan.ville}</p>
      <p><strong>Note :</strong> {artisan.note}/5</p>

      <h2>À propos</h2>
      <p>{artisan.a_propos || 'Présentation non renseignée.'}</p>

      <h2>Contacter cet artisan</h2>

      <p>
        <strong>Email :</strong>{' '}
        {artisan.email ? (
          <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
        ) : (
          'Non renseigné'
        )}
      </p>

      {artisan.site_web && (
        <p>
          <a href={artisan.site_web} target="_blank" rel="noreferrer">
            Visiter le site web
          </a>
        </p>
      )}

      <form className="contact-form" onSubmit={envoyerMessage}>
        <div>
          <label htmlFor="nom">Votre nom</label>
          <input
            id="nom"
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
            minLength="2"
          />
        </div>

        <div>
          <label htmlFor="email">Votre adresse e-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="objet">Objet</label>
          <input
            id="objet"
            type="text"
            value={objet}
            onChange={(event) => setObjet(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Votre message</label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength="10"
            rows="5"
          />
        </div>

        <button type="submit">Envoyer le message</button>
      </form>
    </main>
  )
}

export default ArtisanDetail

