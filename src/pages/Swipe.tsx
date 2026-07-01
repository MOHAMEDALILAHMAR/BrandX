import { Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInView } from '../hooks/useInView';

import fitZoneImg from '../assests/page swipe/WhatsApp Image 2026-05-23 at 20.50.52.jpeg';
import classes from './Swipe.module.css';

export function Swipe() {
  const navigate  = useNavigate();
  const { t } = useTranslation();
  const heroRef   = useInView();
  const howRef    = useInView(0.1);
  const statsRef  = useInView(0.3);
  const ctaRef    = useInView();

  const HOW_STEPS = [
    { num: t('swipePage.step0_num'), title: t('swipePage.step0_title'), desc: t('swipePage.step0_desc') },
    { num: t('swipePage.step1_num'), title: t('swipePage.step1_title'), desc: t('swipePage.step1_desc') },
    { num: t('swipePage.step2_num'), title: t('swipePage.step2_title'), desc: t('swipePage.step2_desc') },
    { num: t('swipePage.step3_num'), title: t('swipePage.step3_title'), desc: t('swipePage.step3_desc') },
  ];

  const STATS = [
    { number: t('swipePage.stat0_num'), label: t('swipePage.stat0_label'), accent: false },
    { number: t('swipePage.stat1_num'), label: t('swipePage.stat1_label'), accent: true },
    { number: t('swipePage.stat2_num'), label: t('swipePage.stat2_label'), accent: false },
    { number: t('swipePage.stat3_num'), label: t('swipePage.stat3_label'), accent: true },
  ];

  return (
    <div className={classes.page}>

      {/* ══════════════════ PAGE HEADER ══════════════════ */}
      <div className={classes.pageHero}>
        <Container size="xl">
          <p className={classes.breadcrumb}>{t('swipePage.breadcrumb_home')} &rsaquo; <span>{t('swipePage.breadcrumb_current')}</span></p>
          <h1 className={classes.pageTitle}>{t('swipePage.page_title')}</h1>
        </Container>
      </div>

      {/* ══════════════════ HERO MATCH SECTION ══════════════════ */}
      <section className={classes.heroSection}>
        <Container size="xl">
          <div
            ref={heroRef.ref}
            className={`${classes.heroGrid} fadeUp ${heroRef.inView ? 'visible' : ''}`}
          >
            {/* Left — copy */}
            <div className={classes.heroLeft}>
              <h2 className={classes.heroTitle}>
                {t('swipePage.hero_title1')}<br />
                <span className={classes.heroGradient}>{t('swipePage.hero_gradient')}</span><br />
                {t('swipePage.hero_title2')}
              </h2>
              <p className={classes.heroSubtitle}>{t('swipePage.hero_subtitle')}</p>
              <div className={classes.heroBtns}>
                <button className={classes.btnPrimary} onClick={() => navigate('/contact')}>
                  {t('swipePage.hero_btn1')}
                </button>
                <button className={classes.btnOutline} onClick={() => {
                  document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  {t('swipePage.hero_btn2')}
                </button>
              </div>
            </div>

            {/* Right — swipe profile card stack */}
            <div className={classes.heroRight}>
              <div className={classes.cardStack}>
                <div className={`${classes.cardBehind} ${classes.cardBehind1}`} />
                <div className={`${classes.cardBehind} ${classes.cardBehind2}`} />
                <div className={classes.swipeCard}>
                  <div className={classes.cardImgWrap}>
                    <img src={fitZoneImg} alt="FitZone Gym" className={classes.cardImg} />
                  </div>
                  <div className={classes.cardBody}>
                    <h3 className={classes.cardName}>{t('swipePage.card_name')}</h3>
                    <p className={classes.cardMeta}>{t('swipePage.card_loc')}</p>
                    <p className={classes.cardMeta}>{t('swipePage.card_followers')}</p>
                    <p className={classes.cardMeta}>{t('swipePage.card_industry')}</p>
                    <p className={classes.cardObjectif}><strong>{t('swipePage.card_obj_label')}</strong></p>
                    <p className={classes.cardObjectifText}>{t('swipePage.card_obj_text')}</p>
                  </div>
                  <div className={classes.cardActions}>
                    <button className={classes.swipeNo}>✕</button>
                    <button className={classes.swipeYes}>♥</button>
                  </div>
                </div>
              </div>
              <div className={classes.phoneGlow} />
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section id="how" className={classes.howSection}>
        <Container size="xl">
          <h2 className={classes.sectionTitle}>{t('swipePage.how_title')}</h2>

          <div ref={howRef.ref} className={classes.howGrid}>
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${classes.howStep} ${howRef.inView ? classes.howStepIn : ''}`}
                style={{ transitionDelay: howRef.inView ? `${i * 150}ms` : '0ms' }}
              >
                <span className={classes.howStepBadge}>{step.num}</span>
                <h3 className={classes.howStepTitle}>{step.title}</h3>
                <p className={classes.howStepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ══════════════════ STATS ══════════════════ */}
      <section className={classes.statsSection}>
        <Container size="xl">
          <div ref={statsRef.ref} className={`fadeUp ${statsRef.inView ? 'visible' : ''}`}>
            <div className={classes.statsRow}>
              {STATS.map((s) => (
                <div key={s.label} className={classes.statItem}>
                  <span className={s.accent ? classes.statNumberAccent : classes.statNumber}>{s.number}</span>
                  <span className={classes.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <hr className={classes.pageDivider} />

      {/* ══════════════════ CTA ══════════════════ */}
      <section className={classes.ctaSection}>
        <Container size="xl">
          <div ref={ctaRef.ref} className={`fadeUp ${ctaRef.inView ? 'visible' : ''}`}>
            <h2 className={classes.ctaTitle}>{t('swipePage.cta_title')}</h2>
            <p className={classes.ctaSubtitle}>{t('swipePage.cta_subtitle')}</p>
            <button className={classes.ctaBtn} onClick={() => navigate('/contact')}>
              {t('swipePage.cta_btn')}
            </button>
          </div>
        </Container>
      </section>

    </div>
  );
}
