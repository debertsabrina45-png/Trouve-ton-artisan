
function Categories({ onChoisirCategorie }) {
  const categories = [
    { id: 'batiment', nom: 'Bâtiment' },
    { id: 'services', nom: 'Services' },
    { id: 'fabrication', nom: 'Fabrication' },
    { id: 'alimentation', nom: 'Alimentation' }
  ]

  return (
    <section className="categories">
      <h2>Nos catégories</h2>

      <div className="category-list">
        {categories.map((categorie) => (
          <button
            type="button"
            className="category-card"
            key={categorie.id}
            onClick={() => onChoisirCategorie(categorie.nom)}
          >
            {categorie.nom}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Categories
