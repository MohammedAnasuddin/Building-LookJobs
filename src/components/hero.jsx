
// import "./styles.css"; // Import styles

// function Hero() {
//   return (
//     <div className="container">
//       <h1 className="hero-title">
//         <span className="hero-highlight">AI</span>-Powered Job Search Assistant
//       </h1>
//       <p className="hero-subtext">
//         Find the perfect job faster with AI-driven insights and automation.
//       </p>
//       <div className="button-container">
//         <button className="button">Book a Demo</button>
//         <button className="button primary-button">Get Started</button>
//       </div>
//     </div>
//   );
// }

// export default Hero;



import { Button, Container, Group, Text } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './Hero.module.css';

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            fully featured
          </Text>{' '}
          React components and hooks library
        </h1>

        <Text className={classes.description} color="dimmed">
          Build fully functional accessible web applications with ease – Mantine includes more than
          100 customizable components and hooks to cover you in any situation
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
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
      </Container>
    </div>
  );
}