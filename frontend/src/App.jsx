
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom'

import './App.css'
import Accueil from './pages/Accueil'
import ArtisanDetail from './pages/ArtisanDetail'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

function PageLegale({ titre }) {
  return (
    <main className="legal-page">
      <h1>{titre}</h1>
      <p>Page en construction.</p>
      <Link to="/">Retour à l'accueil</Link>
    </main>
  )
}

function Layout() {
  const location = useLocation()

  return (
    <>
      {location.pathname !== '/' && <Header />}

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />

        <Route
          path="/mentions-legales"
          element={<PageLegale titre="Mentions légales" />}
        />

        <Route
          path="/donnees-personnelles"
          element={<PageLegale titre="Données personnelles" />}
        />

        <Route
          path="/accessibilite"
          element={<PageLegale titre="Accessibilité" />}
        />

        <Route
          path="/cookies"
          element={<PageLegale titre="Cookies" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
