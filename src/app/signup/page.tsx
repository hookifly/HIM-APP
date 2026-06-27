"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup, googleSignin, handleRedirectResult } from "@/services/auth";
import { AuthLayout } from "@/components/layout/auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import mixpanel from "@/lib/mixpanel";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {
  setError("Please enter a valid email address.");
  return;
}

const commonTypos: Record<string, string> = {
  "gnail.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmial.com": "gmail.com",
  "hotnail.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "yaho.com": "yahoo.com",
};

const domain = email.split("@")[1]?.toLowerCase();

if (domain && commonTypos[domain]) {
  setError(
    `Did you mean ${email.split("@")[0]}@${commonTypos[domain]}?`
  );
  return;
}



  try {

    setLoading(true);
    setError("");

    await signup(
      email,
      password
    );

    mixpanel.track("Sign Up");

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
    <AuthLayout title="Create Account" subtitle="Takes less than a minute">

      <Button
  type="button"
  onClick={handleGoogle}
  disabled={loading}
  className="flex w-full items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200"
>
  {!loading && (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-4.1 5.7-8 5.7-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.6 16.3 44 24 44c11.1 0 20-8.9 20-20 0-1.3-.1-2.3-.4-3.5z"/>
    </svg>
  )}

  {loading ? "Loading..." : "Create Account with Google"}
</Button>

      <p className="pt-3 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
        OR
      </p>

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

        <p className="pt-3 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-[#7C9FC9] no-underline">Sign in</Link>
        </p>
      </div>
    </AuthLayout>
  );
}