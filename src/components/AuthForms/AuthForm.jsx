import { Button, Paper, Text, Container, Loader, Group } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function AuthenticationForm() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } = useAuth0();

  // Function to call backend API to store user data
  const registerUser = async () => {
    if (!user) return; // Avoid running if user is not defined

    try {
      const response = await fetch("http://localhost:5000/api/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.sub, // ✅ Fix: Send 'user.sub' as 'userId'
          name: user.name,
          email: user.email,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Failed to register user:", data.message);
      } else {
        console.log("User registered successfully:", data.user);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Call registerUser() when the user logs in
  useEffect(() => {
    if (isAuthenticated) {
      registerUser();
    }
  }, [isAuthenticated]); // Runs when `isAuthenticated` changes

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
            <Text size="lg" fw={500}>
              Welcome, {user?.name}!
            </Text>
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
            <Button fullWidth mt="md" onClick={() => loginWithRedirect()}>
              Login / Register
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default AuthenticationForm;
