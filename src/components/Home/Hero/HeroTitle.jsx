import { Button, Container, Group, Text } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import classes from "./HeroTitle.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function HeroTitle() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  // 🔁 Redirect logged-in users to dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return null;

  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title}>
          A{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Revolution
          </Text>{" "}
          In the Modern World Job Hunt
        </h1>

        <Text className={classes.description} color="dimmed">
          All your new job opportunities on a single screen.
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            onClick={() => navigate("/login")}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/MohammedAnasuddin/Building-LookJobs"
            size="xl"
            variant="default"
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
