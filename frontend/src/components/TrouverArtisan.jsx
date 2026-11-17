
function TrouverArtisan() {
  const etapes = [
    {
      numero: 1,
      titre: 'Choisissez une catégorie',
      description: 'Sélectionnez le domaine qui correspond à votre besoin.'
    },
    {
      numero: 2,
      titre: 'Recherchez un artisan',
      description: 'Découvrez les professionnels disponibles dans votre région.'
    },
    {
      numero: 3,
      titre: 'Consultez son profil',
      description: 'Découvrez sa spécialité, ses informations et ses avis.'
    },
    {
      numero: 4,
      titre: 'Contactez votre artisan',
      description: 'Prenez contact avec le professionnel de votre choix.'
    }
  ]

  return (
    <section className="trouver-artisan">
      <h2>Comment trouver mon artisan ?</h2>

      <div className="etapes">
        {etapes.map((etape) => (
          <article className="etape" key={etape.numero}>
            <span className="numero-etape">{etape.numero}</span>
            <h3>{etape.titre}</h3>
            <p>{etape.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrouverArtisan
