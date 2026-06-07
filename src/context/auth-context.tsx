"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/lib/firebase";

import {
  useScanStore,
} from "@/stores/scanstore";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
  });

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (
          firebaseUser
        ) => {
          setUser(
            firebaseUser
          );

          if (
            firebaseUser
          ) {
            try {
              const snapshot =
                await getDoc(
                  doc(
                    db,
                    "users",
                    firebaseUser.uid
                  )
                );

              if (
                snapshot.exists()
              ) {
                const data =
                  snapshot.data();

                if (
                  data.analysis
                ) {
                  useScanStore
                    .getState()
                    .setAnalysis(
                      data.analysis
                    );
                }

                useScanStore
                  .getState()
                  .setPurchased(
                    data.hasPurchased ||
                      false
                  );
              }
            } catch (
              error
            ) {
              console.error(
                "Failed to restore user data:",
                error
              );
            }
          } else {
            useScanStore
              .getState()
              .setPurchased(
                false
              );

            useScanStore
              .getState()
              .setAnalysis(
                null as any
              );
          }

          setLoading(false);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  () =>
    useContext(
      AuthContext
    );