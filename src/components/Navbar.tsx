import { useEffect, useState, useMemo } from 'react';
import { Container, Menu, ActionIcon } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconWorld } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import logoImg from '../assests/logo finnale BrandX.png';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${classes.header} ${scrolled ? classes.headerScrolled : ''}`}>
      <Container size="xl" className={classes.inner}>

        <div className={classes.logo} onClick={() => navigate('/')}>
          <img src={logoImg} alt="BrandX" className={classes.logoImg} />
        </div>

        <div className={classes.pill}>
          <nav className={classes.nav}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                className={`${classes.navLink} ${location.pathname === link.path ? classes.navLinkActive : ''}`}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </nav>

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
