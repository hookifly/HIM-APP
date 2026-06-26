"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signin, googleSignin, handleRedirectResult } from "@/services/auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import mixpanel from "@/lib/mixpanel";

export default function SignInPage() {
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

  async function handleSignin() {
  try {
    setLoading(true);
    setError("");

    const result = await signin(
      email,
      password
    );

    mixpanel.track("Sign In");

    if (result.user) {
      router.push("/dashboard");
    }
  } catch (error: any) {
    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        setError(
          "Incorrect email or password. Please try again."
        );
        break;

      default:
        setError(
          "Something went wrong. Please try again."
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
      setError("Google sign in failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Continue becoming your best self.">

      <Button type="button" onClick={handleGoogle} disabled={loading}
          className="w-full bg-white text-black hover:bg-zinc-200">
          {loading ? "Loading..." : "Sign in with Google"}
        </Button>

      <p className="pt-3 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
        OR
      </p>

      <div className="space-y-3.5">
        <Input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {error && ( <div className="rounded-[14px] border border-[#C23636]/30 bg-[#C23636]/8 px-4 py-3.5 text-[13px] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
        {error}
       </div>
       )}

        <Button type="button" onClick={handleSignin} disabled={loading} className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <p className="pt-3 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-[#7C9FC9] no-underline">Sign up</Link>
        </p>
      </div>
    </AuthLayout>
  );
}