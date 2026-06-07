"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signin, googleSignin, handleRedirectResult } from "@/services/auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      const result = await signin(email, password);
      if (result.user) router.push("/dashboard");
    } catch (error: any) {
      alert(error?.message || "Signin failed");
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
      alert(error?.message || "Google signin failed");
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Continue becoming your best self.">
      <div className="space-y-4">
        <Input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} />

        <Button type="button" onClick={handleSignin} disabled={loading} className="w-full">
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Button type="button" onClick={handleGoogle} disabled={loading}
          className="w-full bg-white text-black hover:bg-zinc-200">
          {loading ? "Loading..." : "Continue with Google"}
        </Button>

        <p className="pt-4 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-white">Sign up</Link>
        </p>
      </div>
    </AuthLayout>
  );
}