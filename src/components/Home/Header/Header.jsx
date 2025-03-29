import { Button, Group, Box } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useNavigate } from 'react-router-dom';
import classes from './HeaderMegaMenu.module.css';

export default function HeaderMegaMenu() {
  const navigate = useNavigate(); // Enables navigation

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Mantine Logo */}
          <MantineLogo size={30} />

          {/* Login & Sign Up Buttons */}
          <Group>
            <Button onClick={() => navigate('/login')}>
              Login
            </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
