import { useState, useEffect, useRef } from 'react';
import { Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconStar, IconHeadphones, IconCheck, IconMedal } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useInView } from '../hooks/useInView';
import { HeroCanvas } from '../components/HeroCanvas';
import FallingText from '../components/FallingText';
import CurvedLoop from '../components/CurvedLoop';

import brandLogoImg   from '../assests/Page Acceuil/IMG_0101 (1).png';
import teamImg        from '../assests/Page Acceuil/WhatsApp Image 2026-05-15 at 15.25.36.png';
import dashboardImg   from '../assests/page about us/WhatsApp Image 2026-05-18 at 00.28.27.jpeg';
import img_foodApp    from '../assests/page portfolio/21093dd7282d1a4b7c2055cb31c1ddfc.jpg';
import img_headphones from '../assests/page portfolio/8c55dee4be090a920e57cd9edb3885e0.jpg';
import img_jenny      from '../assests/page portfolio/58ae41761a09f68774d7308c6d6b2ce5.jpg';

import classes from './Home.module.css';

const FEATURE_ICONS = [IconStar, IconHeadphones, IconCheck, IconMedal];

interface Skill { text: string; type: 'ghost' | 'filled'; rotate: number; pad: string; mt: number; ml: number }
const SKILLS: Skill[] = [
  { text: 'Design Web',             type: 'ghost',  rotate: 12,  pad: '12px 20px', mt: 8,   ml: 0  },
  { text: 'Prototype',              type: 'filled', rotate: 15,  pad: '12px 28px', mt: -24, ml: 0  },
  { text: 'Illustration',           type: 'filled', rotate: -18, pad: '12px 28px', mt: 32,  ml: 0  },
  { text: 'Tableau de Bord',        type: 'filled', rotate: -15, pad: '12px 20px', mt: -8,  ml: 0  },
  { text: 'Design Produit',         type: 'ghost',  rotate: -8,  pad: '12px 20px', mt: 0,   ml: 16 },
  { text: 'Identité visuelle',      type: 'ghost',  rotate: -12, pad: '12px 20px', mt: 16,  ml: 0  },
  { text: 'Identité de Marque',     type: 'filled', rotate: 8,   pad: '12px 20px', mt: 0,   ml: -16},
  { text: "Design d'app Mobile",    type: 'filled', rotate: 18,  pad: '12px 16px', mt: 0,   ml: 8  },
  { text: 'Maquette',               type: 'ghost',  rotate: 6,   pad: '12px 24px', mt: -16, ml: 0  },
  { text: 'Identité visuelle',      type: 'filled', rotate: -4,  pad: '12px 20px', mt: 0,   ml: 8  },
  { text: 'UX/UI Design',           type: 'ghost',  rotate: 0,   pad: '12px 24px', mt: 8,   ml: 0  },
  { text: "Page d'atterrissage",    type: 'ghost',  rotate: 0,   pad: '12px 20px', mt: 0,   ml: 0  },
];

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeProj, setActiveProj] = useState(0);
  const [activeSvc, setActiveSvc] = useState(0);
  const [svcEntered, setSvcEntered] = useState(false);
  const svcRefs = useRef<(HTMLDivElement|null)[]>([]);

  const FEATURES = [
    { icon: FEATURE_ICONS[0], title: t('home.feat0_title'), desc: t('home.feat0_desc') },
    { icon: FEATURE_ICONS[1], title: t('home.feat1_title'), desc: t('home.feat1_desc') },
    { icon: FEATURE_ICONS[2], title: t('home.feat2_title'), desc: t('home.feat2_desc') },
    { icon: FEATURE_ICONS[3], title: t('home.feat3_title'), desc: t('home.feat3_desc') },
  ];

  const SERVICES = [
    { num: '01', title: t('home.svc0_title'), desc: t('home.svc0_desc') },
    { num: '02', title: t('home.svc1_title'), desc: t('home.svc1_desc') },
    { num: '03', title: t('home.svc2_title'), desc: t('home.svc2_desc') },
  ];

  const PROJECTS = [
    { title: t('home.proj0_title'), type: t('home.proj0_type'), client: t('home.proj0_client'), img: img_foodApp, tags: ['Mobile', 'UI/UX', 'Food'] },
    { title: t('home.proj1_title'), type: t('home.proj1_type'), client: t('home.proj1_client'), img: img_headphones, tags: ['Web', 'UI/UX', 'Audio'] },
    { title: t('home.proj2_title'), type: t('home.proj2_type'), client: t('home.proj2_client'), img: img_jenny, tags: ['Web', 'Portfolio', 'UI/UX'] },
  ];

  const heroRef  = useInView(0.05);
  const featRef  = useInView(0.2);
  const aboutRef = useInView(0.1);
  const svcRef   = useInView(0.1);
  const projRef  = useInView(0.1);
  const ctaRef   = useInView(0.1);

  // Services auto-loop
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSvc(prev => (prev + 1) % SERVICES.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Clear stagger delay after entrance so cycling is instant
  useEffect(() => {
    if (svcRef.inView && !svcEntered) {
      const id = setTimeout(() => setSvcEntered(true), 1200);
      return () => clearTimeout(id);
    }
  }, [svcRef.inView]);

  // Parallax hero background
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--hero-parallax', `${window.scrollY * 0.32}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 3D tilt on service cards
  const handleSvcMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const el = svcRefs.current[i];
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 14;
    const y = ((e.clientY - top)  / height - 0.5) * -14;
    el.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
  };
  const handleSvcLeave = (i: number) => {
    const el = svcRefs.current[i];
    if (el) el.style.transform = '';
  };

  const prevProj = () => { setActiveProj((p) => (p - 1 + PROJECTS.length) % PROJECTS.length); };
  const nextProj = () => { setActiveProj((p) => (p + 1) % PROJECTS.length); };

  return (
    <div>

      {/* ══════════════════ 1. HERO — photo bg + interactive shader canvas ══════════════════ */}
      <section
        className={classes.hero}
        style={{ backgroundImage: 'none', background: '#050208' }}
      >
        <img src={brandLogoImg} alt="" className={classes.heroBgLogo} aria-hidden="true" />
        <div className={classes.heroOverlay} />
        <HeroCanvas className={classes.heroCanvas} />
        <Container size="xl" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
          <div ref={heroRef.ref} className={classes.heroContent}>

            <h1 className={classes.heroTitle}>
              {[t('home.word1'), t('home.word2'), t('home.word3')].map((word, i) => (
                <span
                  key={i}
                  className={classes.word}
                  style={{
                    animationName: heroRef.inView ? 'wordReveal' : 'none',
                    animationDuration: '0.85s',
                    animationTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                    animationFillMode: 'both',
                    animationDelay: `${0.25 + i * 0.15}s`,
                    marginRight: '0.22em',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <p
              className={classes.heroSubtitle}
              style={{
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? 'translateY(0)' : 'translateY(22px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.68s, transform 0.8s 0.68s',
              }}
            >
              {t('home.subtitle')}
            </p>

            <button
              className={classes.heroCta}
              onClick={() => navigate('/swipe')}
              style={{
                opacity: heroRef.inView ? 1 : 0,
                transform: heroRef.inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.88s, transform 0.8s 0.88s',
              }}
            >
              {t('home.cta')}
            </button>

          </div>
        </Container>
      </section>

      {/* ══════════════════ 2. FEATURES BAR ══════════════════ */}
      <div className={classes.featuresSection}>
        <Container size="xl">
          <div ref={featRef.ref} className={classes.featuresCard}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`${classes.featureItem} ${featRef.inView ? classes.featureIn : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={classes.featureIcon}>
                  <f.icon size={22} color="rgba(168,95,245,1)" stroke={2} />
                </div>
                <div>
                  <div className={classes.featureTitle}>{f.title}</div>
                  <div className={classes.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ══════════════════ 3. À PROPOS + MISSION ══════════════════ */}
      <section className={classes.aboutSection}>
        <Container size="xl">
          <div ref={aboutRef.ref}
            style={{
              opacity: aboutRef.inView ? 1 : 0,
              transform: aboutRef.inView ? 'translateY(0)' : 'translateY(48px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s',
            }}
          >
            <h2 className={classes.aboutSectionHeading}>{t('home.about_heading')}</h2>

            <div className={classes.aboutImgRow}>
              <img src={teamImg}      alt="BrandX — Équipe"     className={classes.aboutImgLeft} />
              <img src={dashboardImg} alt="BrandX — Dashboard" className={classes.aboutImgRight} />
            </div>

            <div className={classes.aboutMissionRow}>
              <h3 className={classes.aboutMissionTitle}>{t('home.mission_title')}</h3>
              <p className={classes.aboutDesc}>{t('home.mission_desc')}</p>
              <button className={classes.btnDark} onClick={() => navigate('/about')}>
                {t('home.mission_btn')}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ 4. SERVICES — scroll spotlight, center card grows ══════════════════ */}
      <section className={classes.servicesSection}>
        <Container size="xl">
          <div ref={svcRef.ref} style={{ textAlign: 'center' }}>
            <div className={classes.servicesPill}>{t('home.services_pill')}</div>
            <div className={classes.servicesStack}>
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.num}
                  ref={el => { svcRefs.current[i] = el; }}
                  className={[
                    classes.svcCard,
                    svcRef.inView ? classes.svcCardIn : '',
                    i === activeSvc ? classes.svcCardCenter : '',
                  ].join(' ')}
                  style={{ transitionDelay: svcEntered ? '0ms' : `${i * 160}ms` }}
                  onMouseMove={e => handleSvcMove(e, i)}
                  onMouseLeave={() => handleSvcLeave(i)}
                >
                  <span className={classes.svcNum}>{svc.num}</span>
                  <div>
                    <div className={classes.svcTitle}>{svc.title}</div>
                    <div className={classes.svcDesc}>{svc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ 5. MARQUEE #1 — CurvedLoop ══════════════════ */}
      <div className={classes.marqueeWrap1}>
        <div className={classes.marqueeBar1}>
          <CurvedLoop
            marqueeText="Design   ✦  Tableau de Bord   ✦  Branding     ✦    Identité Visuelle   ✦   Prototypage  ✦  Expériance Utilisateur  ✦  Design  ✦  Branding  ✦  Identité Visuelle  Prototypage"
            speed={3}
            curveAmount={10}
            direction="right"
            interactive={true}
            className="curved-marquee-text"
          />
        </div>
      </div>

      {/* ══════════════════ 6. RÉALISATIONS — Figma carousel ══════════════════ */}
      <section className={classes.realizSection}>
        <Container size="xl">
          <div ref={projRef.ref} className={`${classes.realizCard} ${projRef.inView ? classes.realizIn : ''}`}>

            {/* Title — "Nos Réalisations" two-tone */}
            <div className={classes.realizTitleRow}>
              <span className={classes.realizTitleNos}>Nos</span>{' '}
              <span className={classes.realizTitlePurple}>Réalisations</span>
            </div>

            {/* Carousel with single preview image */}
            <div className={classes.realizCarouselWrap}>
              <div key={activeProj} className={classes.realizPreviewCard}>
                <img src={PROJECTS[activeProj].img} alt={PROJECTS[activeProj].title} className={classes.realizPreviewImg} />
              </div>

              <button className={classes.realizArrowLeft} onClick={prevProj} aria-label="Précédent">‹</button>
              <button className={classes.realizArrowRight} onClick={nextProj} aria-label="Suivant">›</button>
            </div>

            {/* Tag pills */}
            <div className={classes.realizTagsRow}>
              {PROJECTS[activeProj].tags.map((tag) => (
                <span key={tag} className={classes.realizTag}>{tag}</span>
              ))}
            </div>

            {/* Title + ↗ */}
            <div className={classes.realizProjTitleRow}>
              <h3 className={classes.realizProjTitle}>{PROJECTS[activeProj].title}</h3>
              <button className={classes.realizProjArrow} onClick={() => navigate('/portfolio')}>↗</button>
            </div>

            {/* Description */}
            <p className={classes.realizProjDesc}>{t(`home.proj${activeProj}_desc`)}</p>

          </div>
        </Container>
      </section>

      {/* ══════════════════ 7. CTA HEADING ══════════════════ */}
      <section className={classes.ctaSection}>
        <div
          ref={ctaRef.ref}
          className={classes.ctaFull}
          style={{
            opacity: ctaRef.inView ? 1 : 0,
            transform: ctaRef.inView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s',
          }}
        >
          <FallingText
            text={`${t('home.cta_line1')} ${t('home.cta_line2')} ${t('home.cta_highlight')}`}
            highlightWords={[t('home.cta_highlight')]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="48px"
            mouseConstraintStiffness={0.9}
          />
        </div>
      </section>

      {/* ══════════════════ 8. SKILL PILLS ══════════════════ */}
      <section className={classes.pillsSection}>
        <div className={classes.ctaPillsLayer}>
          {SKILLS.map((skill, i) => (
            <span
              key={skill.text}
              className={`${classes.skillPill} ${skill.type === 'filled' ? classes.skillFilled : classes.skillGhost} ${ctaRef.inView ? classes.pillDropIn : ''}`}
              style={{
                rotate: `${skill.rotate}deg`,
                padding: skill.pad,
                marginTop: skill.mt,
                marginLeft: skill.ml,
                transitionDelay: `${0.08 + i * 0.06}s`,
              }}
            >
              {skill.text}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════ 9. MARQUEE #2 — CurvedLoop ══════════════════ */}
      <div className={classes.marqueeWrap2}>
        <div className={classes.marqueeBar2}>
          <CurvedLoop
            marqueeText="Design   ✦  Tableau de Bord   ✦  Branding     ✦    Identité Visuelle   ✦   Prototypage  ✦  Expériance Utilisateur  ✦  Design  ✦  Branding  ✦  Identité Visuelle  Prototypage"
            speed={3}
            curveAmount={10}
            direction="right"
            interactive={true}
            className="curved-marquee-text"
          />
        </div>
      </div>

      {/* ══════════════════ 10. CONTACT STRIP ══════════════════ */}
      <section className={classes.contactStrip}>
        <Container size="xl">
          <div className={classes.contactStripRow}>
            <span className={classes.contactStripLabel}>{t('home.contact_label')}</span>
            <div className={classes.contactStripBtnWrap}>
              <button className={classes.contactStripBtn} onClick={() => navigate('/contact')}>
                {t('home.contact_btn')}
              </button>
              <div className={classes.contactStripCircle} onClick={() => navigate('/contact')}>→</div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
