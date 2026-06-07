import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const provider = new GoogleAuthProvider();

export async function signup(
  email: string,
  password: string
) {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function signin(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function googleSignin() {
  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    return signInWithRedirect(
      auth,
      provider
    );
  }

  return signInWithPopup(
    auth,
    provider
  );
}

export async function handleRedirectResult() {
  return getRedirectResult(auth);
}