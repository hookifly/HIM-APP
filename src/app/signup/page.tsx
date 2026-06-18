"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup, googleSignin, handleRedirectResult } from "@/services/auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkRedirect() {
      try {
        const result = await handleRedirectResult();
        if (result?.user) router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
    checkRedirect();
  }, []); // ← empty, not [router]

  async function handleSignup() {
  try {
    setLoading(true);
    setError("");

    await signup(
      email,
      password
    );

    router.push("/dashboard");
  } catch (error: any) {
    switch (error.code) {
      case "auth/email-already-in-use":
        setError(
          "An account with this email already exists."
        );
        break;

      case "auth/weak-password":
        setError(
          "Password should be at least 6 characters."
        );
        break;

      case "auth/invalid-email":
        setError(
          "Please enter a valid email address."
        );
        break;

      default:
        setError(
          "Unable to create account. Please try again."
        );
    }
  } finally {
    setLoading(false);
  }
}

  async function handleGoogle() {
    try {
      setLoading(true);
      const result = await googleSignin();
      if (result?.user) router.push("/dashboard");
    } catch (error: any) {
      setError("Google sign up failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Start your transformation today.">
      <div className="space-y-3.5">
        <Input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

          {error && (
       <div className="rounded-[14px] border border-[#C23636]/30 bg-[#C23636]/8 px-4 py-3.5 text-[13px] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
          {error}
       </div>
       )}

        <Button onClick={handleSignup} disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <Button type="button" onClick={handleGoogle} disabled={loading}
          className="w-full bg-white text-black hover:bg-zinc-200">
          {loading ? "Loading..." : "Continue with Google"}
        </Button>

        <p className="pt-3 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-[#7C9FC9] no-underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}