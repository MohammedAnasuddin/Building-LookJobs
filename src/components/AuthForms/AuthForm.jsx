import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthenticationForm() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading, error } =
    useAuth0();

  const navigate = useNavigate();

  const registerUser = async () => {
    if (!user) return;

    try {
      const response = await fetch("http://localhost:5000/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "0",
          name: user.name,
          email: user.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      registerUser();
    }
  }, [isAuthenticated]);

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <p className="text-sm text-slate-400">Signing you in…</p>
        </div>
      </div>
    );
  }

  /* ---------------- Screen ---------------- */
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 text-center text-slate-100">
        {isAuthenticated ? (
          <>
            <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>

            <p className="mt-1 text-sm text-slate-400">{user?.email}</p>

            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Welcome to LookJobs</h2>

            <p className="mt-2 text-sm text-slate-400">
              Log in or register to continue
            </p>

            {error && (
              <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error.message}
              </p>
            )}

            <button
              onClick={() => loginWithRedirect()}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Login / Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthenticationForm;
