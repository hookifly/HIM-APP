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
  isAdmin: boolean;
  hasAnalysis: boolean;
  setHasAnalysis: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  signOut: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    hasAnalysis: false,
    setHasAnalysis: () => {},
    signOut: async () => {},
  });

const signOut = async () => {
  await auth.signOut();
};

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [isAdmin, setIsAdmin] =
    useState(false);
  
  const [hasAnalysis, setHasAnalysis] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          setUser(firebaseUser);    

          if (firebaseUser) {

            const store = useScanStore.getState();

              store.setAnalysis(null as any);
              store.setImageUrls([]);
              store.setImages([]);
              store.setPurchased(false);

            try {
              const snapshot =
                await getDoc(
                  doc(
                    db,
                    "users",
                    firebaseUser.uid
                  )
                );

              if (snapshot.exists()) {
                const data =
                  snapshot.data();
              
              setHasAnalysis(!!data.analysis);

                if (data.analysis) {
                  useScanStore
                    .getState()
                    .setAnalysis(
                      data.analysis
                    );
                }

                if (data.imageUrls) {
                  useScanStore
                    .getState()
                    .setImageUrls(
                      data.imageUrls
                    );
                }

                useScanStore
                  .getState()
                  .setPurchased(
                    data.hasPurchased ||
                      false
                  );

                setIsAdmin(
                  data.isAdmin || false
                );
              }
            } catch (error) {
              console.error(
                "Failed to restore user data:",
                error
              );
            }
          } else {
            setHasAnalysis(false);
            const store = useScanStore.getState();

  store.setPurchased(false);
  store.setAnalysis(null as any);
  store.setImageUrls([]);
  store.setImages([]);

  setIsAdmin(false);
}
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
value={{
  user,
  loading,
  isAdmin,
  hasAnalysis,
  setHasAnalysis,
  signOut,
}}
>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);