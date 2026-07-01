import { Container, Title, Text, Button, Stack, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import classes from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box className={classes.hero}>
      <Container size="lg" className={classes.container}>
        <Stack gap={30} align="center" justify="center" style={{ textAlign: 'center' }}>
          <div>
            <Title order={1} className={classes.title} size={80} fw={700} lh={1.1}>
              {t('hero.title')}
            </Title>
          </div>

          <Text size="xl" c="dimmed" maw={600}>
            {t('hero.subtitle')}
          </Text>

          <Button
            size="lg"
            className={classes.cta}
            onClick={() => navigate('/portfolio')}
          >
            {t('hero.cta')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
