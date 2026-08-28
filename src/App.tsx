import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowRight, CalendarDays, ChevronRight, Facebook, Heart, Instagram,
  Menu, Play, Search, Send, ShoppingBag, X, Youtube,
} from 'lucide-react'

type Article = {
  title: string
  category: string
  date: string
  image: string
  href: string
}

const site = 'https://www.caballo.tv/v2'

const articles: Article[] = [
  {
    title: 'Lazada 11.5 Carmelo Loya Memorial 2025, Santa Isabel Chihuahua.',
    category: 'FOTOS', date: '16 FEB 2025',
    image: `${site}/wp-content/uploads/2025/02/1O2A9790-copy.jpg`,
    href: `${site}/lazada-11-5-carmelo-loya-memorial-2025-santa-isabel-chihuahua/`,
  },
  {
    title: 'Lazada 11.5 Carmelo Loya Memorial, Arena Dos Potrillos',
    category: 'FOTOS', date: '16 FEB 2025',
    image: `${site}/wp-content/uploads/2025/02/1O2A9572-copy.jpg`,
    href: `${site}/lazada-11-5-carmelo-loya-memorial-arena-dos-potrillos/`,
  },
  {
    title: 'El desfile en el Rodeo de Promotora de Rodeos.',
    category: 'RODEO', date: '23 ABR 2024',
    image: `${site}/wp-content/uploads/2024/04/DSC_3212-copy.jpg`,
    href: `${site}/el-desfile-en-el-rodeo-de-primavera-2024-de-promotora-de-rodeos/`,
  },
  {
    title: 'La gente en el Rodeo de la Primavera 2024 de Promotora de Rodeos',
    category: 'COMUNIDAD', date: '22 ABR 2024',
    image: `${site}/wp-content/uploads/2024/04/DSC_2974-copy.jpg`,
    href: `${site}/la-gente-en-el-rodeo-de-la-primavera-2024-de-promotora-de-rodeos-parte-1/`,
  },
]

const events = [
  ['07', 'SEP', 'Festival ecuestre del norte', 'Chihuahua, Chih.'],
  ['21', 'SEP', 'Circuito regional de barriles', 'Cd. Guerrero, Chih.'],
  ['12', 'OCT', 'Rodeo con causa', 'Delicias, Chih.'],
]

const nav = ['Inicio', 'Revista', 'Fotos', 'Videos', 'Cartones', 'Clasificado']

function Wordmark() {
  return <a href="#inicio" className="wordmark" aria-label="Caballo TV, inicio"><span>caballo</span><b>.tv</b></a>
}

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return <div className="section-head">
    <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
    {action && <a className="text-link" href="#explorar">{action}<ArrowRight size={16} /></a>}
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, searchOpen])

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice('¡Listo! Muy pronto recibirás historias que valen la pena contar.')
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(query ? `Buscaremos “${query}” en Caballo TV.` : 'Escribe algo para buscar.')
    setSearchOpen(false)
  }

  return <div className="site-shell" id="inicio">
    <div className="topline"><div className="wrap topline-inner"><span>La comunidad ecuestre más grande en español</span><div><a href="#anunciate">Anúnciate</a><span className="dot" /> <a href="#contacto">Contacto</a></div></div></div>

    <header className="header">
      <div className="wrap header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {nav.map((item, i) => <a href={i === 0 ? '#inicio' : '#explorar'} className={i === 0 ? 'active' : ''} key={item}>{item}</a>)}
        </nav>
        <div className="nav-actions"><button onClick={() => setSearchOpen(true)} aria-label="Buscar"><Search size={20} /></button><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={23} /></button></div>
      </div>
    </header>

    <main>
      <section className="hero wrap">
        <article className="hero-main">
          <img src={articles[0].image} alt="Jinete participando en una lazada" />
          <div className="hero-shade" />
          <div className="hero-copy"><p className="tag">{articles[0].category}</p><h1>Historias que nos llevan a vivir el caballo.</h1><p className="hero-summary">La emoción de la pista, el orgullo de la tradición y las personas que hacen comunidad.</p><a href={articles[0].href} target="_blank" rel="noreferrer" className="button button-light">Ver historia <ArrowRight size={18} /></a></div>
        </article>
        <aside className="hero-side">
          <p className="eyebrow">EN PORTADA</p>
          {articles.slice(1, 3).map(article => <a className="side-story" href={article.href} target="_blank" rel="noreferrer" key={article.title}><img src={article.image} alt="" /><div><p className="tag dark">{article.category}</p><h3>{article.title}</h3><span>{article.date}</span></div><ChevronRight size={18} /></a>)}
          <a className="side-cta" href="#explorar"><span>Explora la revista</span><ArrowRight size={18} /></a>
        </aside>
      </section>

      <section className="quick-links wrap" aria-label="Explora Caballo TV">
        <a href="#explorar"><span className="quick-number">01</span><span>Noticias<br />y reportajes</span><ArrowRight size={18} /></a>
        <a href="#video"><span className="quick-number">02</span><span>Video<br />en movimiento</span><Play size={16} fill="currentColor" /></a>
        <a href="#clasificados"><span className="quick-number">03</span><span>Mercado<br />ecuestre</span><ShoppingBag size={18} /></a>
      </section>

      <section className="content-section wrap" id="explorar">
        <SectionHead eyebrow="LO MÁS RECIENTE" title="La vida ecuestre, al día." action="Ver todas las historias" />
        <div className="article-grid">
          {articles.map((article, i) => <a href={article.href} target="_blank" rel="noreferrer" className={`article-card card-${i + 1}`} key={article.title}>
            <div className="image-wrap"><img src={article.image} alt="" /><span className="tag image-tag">{article.category}</span></div>
            <p className="card-date">{article.date}</p><h3>{article.title}</h3><span className="read-more">Leer historia <ArrowRight size={15} /></span>
          </a>)}
        </div>
      </section>

      <section className="video-section" id="video"><div className="wrap video-grid">
        <div className="video-copy"><p className="eyebrow light">CABALLO TV EN VIDEO</p><h2>La pasión se ve mejor en movimiento.</h2><p>Entrevistas, competencias, recorridos y momentos que solo entiendes cuando amas los caballos.</p><a href="https://www.youtube.com/user/caballotv" target="_blank" rel="noreferrer" className="button button-gold"><Youtube size={18} /> Ir al canal</a></div>
        <a href="https://www.youtube.com/user/caballotv" target="_blank" rel="noreferrer" className="video-frame" aria-label="Ver videos de Caballo TV"><img src={`${site}/wp-content/uploads/2024/04/DSC_2662-copy.jpg`} alt="Competencia ecuestre" /><span className="play-button"><Play fill="currentColor" size={25} /></span><span className="video-caption">VER ÚLTIMO VIDEO</span></a>
      </div></section>

      <section className="content-section wrap agenda-section">
        <SectionHead eyebrow="AGENDA ECUESTRE" title="Nos vemos en la pista." action="Ver calendario" />
        <div className="agenda-layout"><div className="agenda-list">{events.map(([day, month, title, location]) => <a href="#contacto" className="event" key={title}><div className="event-date"><b>{day}</b><span>{month}</span></div><div><h3>{title}</h3><p>{location}</p></div><ChevronRight size={19} /></a>)}</div><div className="agenda-note"><CalendarDays size={28} /><p className="eyebrow">¿ORGANIZAS UN EVENTO?</p><h3>Tu evento merece estar en la agenda de todos.</h3><a href="#contacto" className="text-link">Publicarlo aquí <ArrowRight size={16} /></a></div></div>
      </section>

      <section className="market-section" id="clasificados"><div className="wrap market-grid"><div><p className="eyebrow">CLASIFICADOS</p><h2>Todo lo que el mundo ecuestre está buscando.</h2><p>Caballos, equipo y servicios. Un espacio cuidado para conectar a compradores y vendedores de la comunidad.</p><a href="#contacto" className="button button-dark">Explorar clasificados <ArrowRight size={18} /></a></div><div className="market-stats"><div><b>+15</b><span>años documentando<br />la cultura ecuestre</span></div><div><b>01</b><span>comunidad que<br />habla tu idioma</span></div></div></div></section>

      <section className="newsletter wrap" id="contacto"><div><p className="eyebrow">LA VUELTA SEMANAL</p><h2>Historias para quienes nacieron para montar.</h2></div><form onSubmit={handleSubscribe}><label htmlFor="email" className="sr-only">Tu correo electrónico</label><div className="input-row"><input id="email" type="email" required placeholder="Tu correo electrónico" /><button type="submit" aria-label="Suscribirme"><Send size={19} /></button></div><p>Una selección semanal. Sin ruido, solo lo que importa.</p></form></section>
      {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Cerrar">×</button></div>}
    </main>

    <footer><div className="wrap footer-main"><div><Wordmark /><p>El sitio de caballos más visitado del mundo de habla hispana. Gracias por ser parte del camino.</p></div><div><p className="footer-label">EXPLORA</p>{nav.slice(1).map(item => <a href="#explorar" key={item}>{item}</a>)}</div><div id="anunciate"><p className="footer-label">COLABOREMOS</p><a href="mailto:caballo.tv@gmail.com">caballo.tv@gmail.com</a><a href="#anunciate">Anúnciate con nosotros</a></div><div><p className="footer-label">SÍGUENOS</p><div className="socials"><a href="https://www.facebook.com/facecaballo.tv/" aria-label="Facebook"><Facebook size={18} /></a><a href="https://www.instagram.com/caballo.tv/" aria-label="Instagram"><Instagram size={18} /></a><a href="https://www.youtube.com/user/caballotv" aria-label="YouTube"><Youtube size={18} /></a></div></div></div><div className="wrap footer-bottom"><span>© 2026 Caballo TV</span><span>Hecho para la comunidad ecuestre</span></div></footer>

    {menuOpen && <div className="overlay-menu"><div className="overlay-top"><Wordmark /><button onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={26} /></button></div><nav>{nav.map((item, i) => <a onClick={() => setMenuOpen(false)} href={i === 0 ? '#inicio' : '#explorar'} key={item}>{item}<ArrowRight size={21} /></a>)}</nav><p>La comunidad ecuestre más grande en español.</p></div>}
    {searchOpen && <div className="search-layer"><button className="close-search" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X size={25} /></button><form onSubmit={submitSearch}><p className="eyebrow">BUSCAR EN CABALLO TV</p><label htmlFor="search">¿Qué estás buscando?</label><div><Search size={24} /><input autoFocus id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rodeo, fotos, razas..." /><button type="submit">Buscar</button></div></form></div>}
  </div>
}

export default App
