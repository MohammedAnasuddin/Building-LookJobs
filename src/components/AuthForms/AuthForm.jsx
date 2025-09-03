import { Button, Paper, Text, Container, Loader, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook

function AuthenticationForm() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } = useAuth0();
  const navigate = useNavigate(); // ✅ Initialize navigation

  const registerUser = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:5000/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "0", name: user.name, email: user.email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User registered:", data.user);
        navigate("/dashboard"); // ✅ Redirect to dashboard after successful login
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      registerUser();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Container size="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loader size="lg" />
      </Container>
    );
  }

  return (
    <Container size="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper withBorder shadow="md" p={30} radius="md" style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
        {isAuthenticated ? (
          <>
            <Text size="lg" fw={500}>Welcome, {user?.name}!</Text>
            <Text color="dimmed" size="sm" mt="xs">{user?.email}</Text>
            <Group mt="md">
              <Button fullWidth color="red" onClick={() => logout({ returnTo: window.location.origin })}>
                Logout
              </Button>
            </Group>
          </>
        ) : (
          <>
            <Text size="lg" fw={500}>Welcome to LookJobs</Text>
            <Text color="dimmed" size="sm" mt="xs">Please log in or register to continue</Text>
            {error && <Text color="red" size="sm" mt="md">{error.message}</Text>}
            <Button fullWidth mt="md" onClick={() => loginWithRedirect()}>Login / Register</Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default AuthenticationForm;
