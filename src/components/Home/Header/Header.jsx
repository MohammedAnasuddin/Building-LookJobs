import { Button, Group, Box } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderMegaMenu.module.css';

export default function HeaderMegaMenu() {
  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Mantine Logo */}
          <MantineLogo size={30} />

          {/* Login & Sign Up Buttons */}
          <Group>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
