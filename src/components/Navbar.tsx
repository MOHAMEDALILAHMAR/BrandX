import { useEffect, useState, useMemo } from 'react';
import { Container, Menu, ActionIcon } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import GooeyNav from './GooeyNav';
import classes from './Navbar.module.css';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const NAV_LINKS = useMemo(() => [
    { path: '/',          label: t('nav.home') },
    { path: '/about',     label: t('nav.about') },
    { path: '/swipe',     label: t('nav.swipe') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/contact',   label: t('nav.contact') },
  ], [t]);

  const initialIndex = useMemo(() => {
    const idx = NAV_LINKS.findIndex(l => l.path === location.pathname);
    return idx >= 0 ? idx : 0;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${classes.header} ${scrolled ? classes.headerScrolled : ''}`}>
      <Container size="xl" className={classes.inner}>

        {/* Logo — outside the pill, left side */}
        <div className={classes.logo} onClick={() => navigate('/')}>
          Brand<span className={classes.logoX}>X</span>
        </div>

        {/* Pill container — GooeyNav + language switcher */}
        <div className={classes.pill}>

          <GooeyNav
            key={location.pathname}
            items={NAV_LINKS.map(l => ({ label: l.label, href: l.path }))}
            initialActiveIndex={initialIndex}
            onItemClick={(item) => navigate(item.href || '/')}
            particleCount={12}
            particleDistances={[80, 8]}
            particleR={80}
            animationTime={500}
            timeVariance={250}
            colors={[1, 2, 3, 4]}
          />

          {/* Language switcher */}
          <Menu shadow="md" width={140}>
            <Menu.Target>
              <ActionIcon className={classes.iconBtn} size="md" variant="subtle">
                <IconWorld size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown style={{ background: '#1A0D30', border: '1px solid rgba(124,58,237,0.3)' }}>
              <Menu.Item style={{ color: 'white' }} onClick={() => { i18n.changeLanguage('fr'); localStorage.setItem('language', 'fr'); }}>
                Français
              </Menu.Item>
              <Menu.Item style={{ color: 'white' }} onClick={() => { i18n.changeLanguage('en'); localStorage.setItem('language', 'en'); }}>
                English
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </div>
      </Container>
    </header>
  );
}
