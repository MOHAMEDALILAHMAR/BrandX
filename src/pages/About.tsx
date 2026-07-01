import { useState, useEffect } from 'react';
import { Container } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useInView } from '../hooks/useInView';

import dashboardImg    from '../assests/page about us/WhatsApp Image 2026-05-18 at 00.28.27.jpeg';
import portraitImg     from '../assests/page about us/566.jpeg';
import avatarLea       from '../assests/personnes/images (1).jpg';
import avatarKhaled    from '../assests/personnes/istockphoto-1389348844-612x612.jpg';
import avatarSophie    from '../assests/personnes/64101bd1e383a.jpeg';
import avatarMarc      from '../assests/personnes/bel-homme-souriant-portrait-visage-heureux-se-bouchent_53876-139608.avif';
import avatarYasmine   from '../assests/personnes/decrire-une-personne-en-francais.webp';

import classes from './About.module.css';

export function About() {
  const { t } = useTranslation();
  const dashRef     = useInView(0.1);
  const missionRef  = useInView(0.1);
  const studioRef   = useInView(0.1);
  const processRef  = useInView(0.1);
  const testimRef   = useInView(0.1);

  const PROCESS = [
    { num: '01', icon: '💡', title: t('aboutPage.proc0_title'), desc: t('aboutPage.proc0_desc') },
    { num: '02', icon: '✏️', title: t('aboutPage.proc1_title'), desc: t('aboutPage.proc1_desc') },
    { num: '03', icon: '🎬', title: t('aboutPage.proc2_title'), desc: t('aboutPage.proc2_desc') },
  ];

  const TESTIMONIALS = [
    { quote: t('aboutPage.test0_quote'), name: t('aboutPage.test0_name'), role: t('aboutPage.test0_role'), img: avatarLea },
    { quote: t('aboutPage.test1_quote'), name: t('aboutPage.test1_name'), role: t('aboutPage.test1_role'), img: avatarKhaled },
    { quote: t('aboutPage.test2_quote'), name: t('aboutPage.test2_name'), role: t('aboutPage.test2_role'), img: avatarSophie },
    { quote: t('aboutPage.test3_quote'), name: t('aboutPage.test3_name'), role: t('aboutPage.test3_role'), img: avatarMarc },
    { quote: t('aboutPage.test4_quote'), name: t('aboutPage.test4_name'), role: t('aboutPage.test4_role'), img: avatarYasmine },
    { quote: t('aboutPage.test5_quote'), name: t('aboutPage.test5_name'), role: t('aboutPage.test5_role'), img: avatarKhaled },
  ];

  const STATS = [
    { num: t('aboutPage.stat0_num'), label: t('aboutPage.stat0_label') },
    { num: t('aboutPage.stat1_num'), label: t('aboutPage.stat1_label') },
    { num: t('aboutPage.stat2_num'), label: t('aboutPage.stat2_label') },
  ];

  const [testimPage, setTestimPage] = useState(0);
  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(TESTIMONIALS.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (!testimRef.inView) return;
    const id = setInterval(() => {
      setTestimPage((p) => (p + 1) % totalPages);
    }, 4500);
    return () => clearInterval(id);
  }, [testimRef.inView, totalPages]);

  return (
    <div>

      {/* ══════════════════ PAGE HERO ══════════════════ */}
      <div className={classes.pageHero}>
        <Container size="xl">
          <p className={classes.breadcrumb}>{t('aboutPage.breadcrumb_home')} &rsaquo; <span>{t('aboutPage.breadcrumb_current')}</span></p>
          <h1 className={classes.pageTitle}>{t('aboutPage.page_title')}</h1>
        </Container>
      </div>

      {/* ══════════════════ DASHBOARD IMAGE ══════════════════ */}
      <section className={classes.dashboardSection}>
        <Container size="xl">
          <div ref={dashRef.ref} className={`fadeUp ${dashRef.inView ? 'visible' : ''}`}>
            <div className={classes.dashboardMockup}>
              <img src={dashboardImg} alt="BrandX Analytics Dashboard" className={classes.dashboardImg} />
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ MISSION & VISION ══════════════════ */}
      <section className={classes.missionSection}>
        <Container size="xl">
          <div ref={missionRef.ref}>
            <div className={classes.mvRow}>
              <div className={`${classes.mvCard} ${missionRef.inView ? classes.mvCardIn : ''}`} style={{ transitionDelay: '0.1s' }}>
                <div className={classes.mvIconWrap}>
                  <span className={classes.mvIcon}>&#127919;</span>
                </div>
                <h3 className={classes.mvTitle}>{t('aboutPage.mission_title')}</h3>
                <p className={classes.mvDesc}>{t('aboutPage.mission_desc')}</p>
              </div>
              <div className={`${classes.mvCard} ${missionRef.inView ? classes.mvCardIn : ''}`} style={{ transitionDelay: '0.25s' }}>
                <div className={classes.mvIconWrap}>
                  <span className={classes.mvIcon}>&#128640;</span>
                </div>
                <h3 className={classes.mvTitle}>{t('aboutPage.vision_title')}</h3>
                <p className={classes.mvDesc}>{t('aboutPage.vision_desc')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ ABOUT STUDIO ══════════════════ */}
      <section className={classes.studioSection}>
        <Container size="xl">
          <div ref={studioRef.ref} className={`${classes.studioGlass} ${studioRef.inView ? classes.studioGlassIn : ''}`}>
            <div className={classes.studioInner}>
              <div className={classes.studioPortraitWrap}>
                <img src={portraitImg} alt="BrandX" className={classes.studioPortrait} />
              </div>
              <div className={classes.studioContent}>
                <h2 className={classes.studioTitle}>
                  {t('aboutPage.qui_prefix')} <span className={classes.studioHighlight}>{t('aboutPage.qui_brand')}</span>
                </h2>
                <p className={classes.studioText}>{t('aboutPage.qui_desc')}</p>
                <div className={classes.studioStats}>
                  {STATS.map((s) => (
                    <div key={s.label} className={classes.studioStat}>
                      <div className={classes.studioStatNum}>{s.num}</div>
                      <div className={classes.studioStatLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ PROCESS — icons + badge ──────── */}
      <section className={classes.processSection}>
        <Container size="xl">
          <div ref={processRef.ref}>
            <div className={classes.sectionHeader}>
              <div className={classes.badge}>{t('aboutPage.process_pill')}</div>
              <h2 className={classes.sectionTitle}>{t('aboutPage.process_title')}</h2>
            </div>
            <div className={classes.processRow}>
              {PROCESS.map((step, i) => (
                <div key={step.num} className={classes.processStepWrap}>
                  <div className={`${classes.processStep} ${processRef.inView ? classes.processStepIn : ''}`}
                    style={{ transitionDelay: processRef.inView ? `${i * 0.2}s` : '0s' }}>
                    <div className={classes.processIconWrap}>
                      <span className={classes.processIcon}>{step.icon}</span>
                      <div className={classes.processBadge}>{step.num}</div>
                    </div>
                    <h3 className={classes.processTitle}>{step.title}</h3>
                    <p className={classes.processDesc}>{step.desc}</p>
                  </div>
                  {i < PROCESS.length - 1 && <div className={classes.processConnector} />}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ══════════════════ TESTIMONIALS — carousel ──────── */}
      <section className={classes.testimonialsSection}>
        <Container size="xl">
          <div ref={testimRef.ref}>
            <div className={classes.sectionHeader}>
              <div className={classes.badge}>{t('aboutPage.test_pill')}</div>
              <h2 className={classes.sectionTitleWrapper}>
                <span className={classes.sectionTitleLine}>{t('aboutPage.test_title')}</span>{' '}
                <span className={classes.sectionTitlePurple}>{t('aboutPage.test_subtitle')}</span>
              </h2>
            </div>

            <div className={classes.testimCarousel}>
              <div
                className={classes.testimTrack}
                style={{ transform: `translateX(-${testimPage * 50}%)` }}
              >
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className={classes.testimSlide}>
                    <div className={classes.testimCard}>
                      <div className={classes.testimTab} />
                      <div className={classes.testimBody}>
                        <div className={classes.testimHeader}>
                          <img src={t.img} alt={t.name} className={classes.testimAvatar} />
                          <div>
                            <div className={classes.testimName}>{t.name}</div>
                            <div className={classes.testimRole}>{t.role}</div>
                          </div>
                        </div>
                        <div className={classes.testimStars}>
                          {Array.from({ length: 5 }).map((_, si) => (
                            <span key={si} className={classes.testimStar}>★</span>
                          ))}
                          <span className={classes.testimScore}>5.0</span>
                        </div>
                        <p className={classes.testimText}>{t.quote}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={classes.testimDots}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className={`${classes.testimDot} ${i === testimPage ? classes.testimDotActive : ''}`}
                  onClick={() => setTestimPage(i)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}