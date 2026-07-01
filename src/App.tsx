import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Swipe } from './pages/Swipe';
import { Contact } from './pages/Contact';
import './i18n';
import '@mantine/core/styles.css';
import './styles/tokens.css';
import './styles/global.css';

function App() {
  return (
    <Router>
      <MantineProvider
        defaultColorScheme="dark"
        theme={{
          primaryColor: 'violet',
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
          defaultRadius: 'md',
          breakpoints: {
            xs: '36em',
            sm: '48em',
            md: '62em',
            lg: '75em',
            xl: '88em',
          },
          colors: {
            dark: [
              '#C1C2C5',
              '#A6A7AB',
              '#909296',
              '#5c5f66',
              '#373A40',
              '#2C2E33',
              '#1A0D30',
              '#120828',
              '#0D0618',
              '#080312',
            ],
          },
        }}
      >
        <ColorSchemeScript defaultColorScheme="dark" />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/swipe" element={<Swipe />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </MantineProvider>
    </Router>
  );
}

export default App;
