import { Button, Group, Box } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useNavigate } from 'react-router-dom';
import classes from './HeaderMegaMenu.module.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function HeaderMegaMenu() {
  const navigate = useNavigate();
   const { logout} = useAuth0(); // Enables navigation

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Mantine Logo */}
      

          {/* Login & Sign Up Buttons */}
          <Group>
          <Button color="red" mt="md" onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
