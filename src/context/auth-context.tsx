// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import {
//   onAuthStateChanged,
//   User,
// } from "firebase/auth";

// import {
//   doc,
//   getDoc,
// } from "firebase/firestore";

// import {
//   auth,
//   db,
// } from "@/lib/firebase";

// import {
//   useScanStore,
// } from "@/stores/scanstore";

// type AuthContextType = {
//   user: User | null;
//   loading: boolean;
//   isAdmin: boolean;
// };

// const AuthContext =
//   createContext<AuthContextType>({
//     user: null,
//     loading: true,
//     isAdmin: false,
//   });

// export function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] =
//     useState<User | null>(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [isAdmin, setIsAdmin] =
//   useState(false);

//   useEffect(() => {
//     const unsubscribe =
//       onAuthStateChanged(
//         auth,
//         async (
//           firebaseUser
//         ) => {
//           setUser(
//             firebaseUser
//           );

//           if (
//             firebaseUser
//           ) {
//             try {
//               const snapshot =
//                 await getDoc(
//                   doc(
//                     db,
//                     "users",
//                     firebaseUser.uid
//                   )
//                 );

//               if (
//                 snapshot.exists()
//               ) {
//                 const data =
//                   snapshot.data();

//                 if (
//                   data.analysis
//                 ) {
//                   useScanStore
//                     .getState()
//                     .setAnalysis(
//                       data.analysis
//                     );
//                 }

//                 if (data.imageUrls) 
//                   {
//                     useScanStore
//                     .getState()
//                     .setImageUrls(
//                     data.imageUrls
//                  );
//               }

//                 useScanStore
//                   .getState()
//                   .setPurchased(
//                     data.hasPurchased ||
//                       false
//                   );

//                   setIsAdmin(
//   data.isAdmin || false
// );
//               }
//             } catch (
//               error
//             ) {
//               console.error(
//                 "Failed to restore user data:",
//                 error
//               );
//             }
//           } else {
//             useScanStore
//               .getState()
//               .setPurchased(
//                 false
//               );

//             useScanStore
//               .getState()
//               .setAnalysis(
//                 null as any
//               );

//               setIsAdmin(false);
//           }

//           setLoading(false);
//         }
//       );

//     return () =>
//       unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth =
//   () =>
//     useContext(
//       AuthContext
//     );

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
};

const AuthContext =
  createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
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

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (firebaseUser) => {
          setUser(firebaseUser);

          if (firebaseUser) {
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
            useScanStore
              .getState()
              .setPurchased(false);

            useScanStore
              .getState()
              .setAnalysis(
                null as any
              );

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);