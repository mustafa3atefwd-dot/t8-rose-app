"use client";

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Triggers the authorize method in your nextauth config
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false, // Prevents sudden page flashes so we can see the results
      });

      if (result?.error) {
        console.log("erooor"+result.error)
        setError(result.error);
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "50px auto", padding: "20px", fontFamily: "sans-serif", border: "1px solid #ccc", borderRadius: "8px" }}>
      {/* 1. SESSION STATUS STATE BAR */}
      <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
        <strong>Session Status:</strong> {status.toUpperCase()}
      </div>

      {/* 2. AUTHENTICATED STATE VIEW */}
      {status === "authenticated" ? (
        <div>
          <h2 style={{ color: "green" }}>✅ Login Successful!</h2>
          <div style={{ backgroundColor: "#eefbee", padding: "15px", borderRadius: "4px", marginBottom: "15px" }}>
            <p><strong>Welcome,</strong> {session?.user?.firstName || "User"} {session?.user?.lastName || ""}</p>
            <p><strong>Email:</strong> {session?.user?.email}</p>
            <p><strong>Role:</strong> {session?.user?.role}</p>
          </div>
          <button 
            onClick={() => signOut()} 
            style={{ width: "100%", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Log Out
          </button>
        </div>
      ) : (
        /* 3. SIGN-IN FORM STATE VIEW */
        <form onSubmit={handleSubmit}>
          <h2>Test Login Form</h2>
          
          {error && (
            <div style={{ color: "red", backgroundColor: "#fde8e8", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}>
              ❌ {error}
            </div>
          )}

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. johndoe"
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || status === "loading"}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "#ccc" : "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}