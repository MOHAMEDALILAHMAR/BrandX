import { Container } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../hooks/useInView';

// Real project images
import img_foodApp    from '../assests/page portfolio/21093dd7282d1a4b7c2055cb31c1ddfc.jpg';
import img_flygi      from '../assests/page portfolio/418d05d642d34a91bf283f53cf777875.jpg';
import img_headphones from '../assests/page portfolio/8c55dee4be090a920e57cd9edb3885e0.jpg';
import img_jenny      from '../assests/page portfolio/58ae41761a09f68774d7308c6d6b2ce5.jpg';
import img_larca      from '../assests/page portfolio/f5a0f4acfc1a5a88aecba2f4c78e1959.jpg';
import img_zayna      from '../assests/page portfolio/536268763_1052893530346451_2447026190977594677_n.jpg';
import img_monogram   from '../assests/page portfolio/Calque 2.png';

// Client logos
import logo_fleurLys  from '../assests/page portfolio/Gemini_Generated_Image_yzw7d9yzw7d9yzw7.png';
import logo_dayoung   from '../assests/page portfolio/cc2993044a30cb0a19779b274124afda.jpg';
import logo_fitzone   from '../assests/page swipe/WhatsApp Image 2026-05-23 at 20.50.52.jpeg';
import logo_fashionStore from '../assests/page portfolio/727a6e10e2507b9aef0d8dcf17050ab2.jpg';

import classes from './Portfolio.module.css';

const PROJECTS = [
  {
    id: 1,
    title: 'Identité Visuelle — Day.Oung Coffee',
    type: 'Design Graphique / Branding',
    client: 'Day.Oung Coffee',
    desc: 'Création complète de l\'identité de marque — logotype, charte graphique et déclinaisons print pour cette enseigne de café haut de gamme.',
    tags: ['Logo', 'Branding', 'Café'],
    img: logo_dayoung,
    category: 'Branding',
  },
  {
    id: 2,
    title: 'Design UI — Casque Audio Wireless',
    type: 'UI/UX Design',
    client: 'SoundPro',
    desc: 'Landing page e-commerce premium pour une marque d\'audio haut de gamme — interface immersive et animations 3D.',
    tags: ['Web', 'UI/UX', 'E-commerce'],
    img: img_headphones,
    category: 'UI/UX Design',
  },
  {
    id: 3,
    title: 'Identité Visuelle — Flygi',
    type: 'Design Graphique / Branding',
    client: 'Flygi',
    desc: 'Création du logotype et de l\'identité visuelle pour une marque de voyage — symbole avion intégré au lettrage, déclinaisons digitales et print.',
    tags: ['Logo', 'Branding', 'Voyage'],
    img: img_flygi,
    category: 'Branding',
  },
  {
    id: 4,
    title: 'Branding — Ristorante L\'Arca',
    type: 'Branding / Print',
    client: 'L\'Arca Restaurant',
    desc: 'Identité complète pour un restaurant gastronomique — carte, QR code, supports imprimés et signalétique.',
    tags: ['Branding', 'Print', 'Restaurant'],
    img: img_larca,
    category: 'Branding',
  },
  {
    id: 5,
    title: 'Web Design — Portfolio Designer',
    type: 'Web Design / UI-UX',
    client: 'Jenny Studio',
    desc: 'Design d\'un site portfolio pour une designer produit — mise en valeur des projets, témoignages clients et parcours utilisateur fluide.',
    tags: ['Web', 'Portfolio', 'UI/UX'],
    img: img_jenny,
    category: 'Web Design',
  },
  {
    id: 6,
    title: 'Food Express — Application de Livraison',
    type: 'UI/UX Design / Mobile',
    client: 'Food Express',
    desc: 'Conception d\'une application mobile de livraison de repas — expérience utilisateur fluide, interface moderne et intuitive pour iOS et Android.',
    tags: ['Mobile', 'UI/UX', 'Food'],
    img: img_foodApp,
    category: 'UI/UX Design',
  },
  {
    id: 7,
    title: 'Identité Visuelle — Fashion & Store',
    type: 'Design Graphique / Branding',
    client: 'Fashion & Store',
    desc: 'Création du logotype F|S et de la charte graphique complète pour une enseigne de mode — typographie classique et univers visuel élégant.',
    tags: ['Logo', 'Mode', 'Branding'],
    img: logo_fashionStore,
    category: 'Branding',
  },
  {
    id: 8,
    title: 'Branding — Étiquettes Luxe',
    type: 'Design Graphique / Branding',
    client: 'Monogramme',
    desc: 'Conception d\'étiquettes de luxe avec monogramme brodé — identité visuelle raffinée pour une marque haut de gamme.',
    tags: ['Branding', 'Luxe', 'Monogramme'],
    img: img_monogram,
    category: 'Branding',
  },
];

const FILTER_VALUES = ['Tous', 'UI/UX Design', 'Branding', 'Web Design', 'Design'];

const CLIENT_LOGOS = [
  { name: 'Fleur de Lys', img: logo_fleurLys },
  { name: 'Day.Oung',     img: logo_dayoung },
  { name: 'FitZone Gym',  img: logo_fitzone },
  { name: 'ZAYNA Bijoux', img: img_zayna },
  { name: 'Monogramme',   img: img_monogram },
];

export function Portfolio() {
  const { t } = useTranslation();
  const [active, setActive] = useState('Tous');
  const listRef  = useInView(0.05);
  const logosRef = useInView();

  const FILTERS = FILTER_VALUES.map((v, i) => ({
    value: v,
    label: i === 0 ? t('portfolioPage.filter_all') : v,
  }));

  const filtered = active === 'Tous' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <div>

      {/* ══════════════════ PAGE HERO ══════════════════ */}
      <div className={classes.pageHero}>
        <Container size="xl">
          <p className={classes.breadcrumb}>{t('portfolioPage.breadcrumb_home')} &rsaquo; <span>{t('portfolioPage.breadcrumb_current')}</span></p>
          <h1 className={classes.pageTitle}>{t('portfolioPage.page_title')}</h1>
        </Container>
      </div>

      {/* ══════════════════ FILTERS ══════════════════ */}
      <div className={classes.filtersSection}>
        <Container size="xl">
          <div className={classes.filters}>
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`${classes.filterBtn} ${active === f.value ? classes.filterBtnActive : ''}`}
                onClick={() => setActive(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ══════════════════ SECTION TITLE ══════════════════ */}
      <div className={classes.sectionTitleRow}>
        <h2 className={classes.sectionTitle}>
          <span className={classes.sectionTitleWhite}>Découvrez</span>{' '}
          <span className={classes.sectionTitlePurple}>Notre Portfolio</span>
        </h2>
      </div>

      {/* ══════════════════ PROJECT LIST — Figma cards ══════════════════ */}
      <section className={classes.projectsSection}>
        <Container size="xl">
          <div ref={listRef.ref} className={classes.projectList}>
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`${classes.portfolioCard} ${listRef.inView ? classes.cardIn : ''}`}
                style={{ transitionDelay: listRef.inView ? `${i * 100}ms` : '0ms' }}
              >
                <div className={classes.cardImgWrap}>
                  <img src={project.img} alt={project.title} className={classes.cardImg} />
                </div>

                <div className={classes.cardContent}>
                  <h3 className={classes.cardTitle}>{project.title}</h3>

                  <div className={classes.cardInfo}>
                    <span className={classes.cardInfoLabel}>{t('portfolioPage.type_label')} <span className={classes.cardInfoValue}>{project.type}</span></span>
                    <span className={classes.cardInfoLabel}>{t('portfolioPage.client_label')} <span className={classes.cardInfoValue}>{project.client}</span></span>
                  </div>

                  <button className={classes.cardArrow}>↗</button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════ CLIENT LOGOS ══════════════════ */}
      <section className={classes.logosSection}>
        <Container size="xl">
          <div ref={logosRef.ref} className={`fadeUp ${logosRef.inView ? 'visible' : ''}`}>
            <p className={classes.logosTitle}>{t('portfolioPage.clients_title')}</p>
            <div className={classes.logosRow}>
              {CLIENT_LOGOS.map((logo) => (
                <div key={logo.name} className={classes.logoItem}>
                  <img src={logo.img} alt={logo.name} className={classes.logoImg} />
                </div>
              ))}
              {['Flygi', 'L\'Arca'].map((name) => (
                <div key={name} className={classes.logoItemText}>{name}</div>
              ))}
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
