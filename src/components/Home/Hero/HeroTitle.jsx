import { Button, Container, Group, Text } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './HeroTitle.module.css'
import { useNavigate } from "react-router-dom";
import Card_grids from '../../Dashboard/cards_grid';
import JobFormModal from '../../Dashboard/Job_Form';



export default  function HeroTitle() {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            Revolution
          </Text>{' '}
          In the Modern World Job Hunt
        </h1>

        <Text className={classes.description} color="dimmed">
          All your new job opportunities on a single Screen.
        </Text>

        <Group className={classes.controls}>
        <Button
  size="xl"
  className={classes.control}
  variant="gradient"
  gradient={{ from: 'blue', to: 'cyan' }}
  onClick={() => navigate("/login")}
>
  Get started
</Button>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      <JobFormModal></JobFormModal>
      </Container>
        
    </div>
  );
}