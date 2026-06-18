// type AuthLayoutProps = {
//   title: string;
//   subtitle: string;
//   children: React.ReactNode;
// };

// export function AuthLayout({
//   title,
//   subtitle,
//   children,
// }: AuthLayoutProps) {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
//       <div className="w-full max-w-sm">
//         {/* Logo */}
//         <div className="mb-10 text-center">
//           <h1 className="text-5xl font-black tracking-[0.3em]">
//             HIM
//           </h1>
//         </div>

//         {/* Heading */}
//         <div className="mb-10 text-center">
//           <h2 className="text-4xl font-bold">
//             {title}
//           </h2>

//           <p className="mt-3 text-white/60">
//             {subtitle}
//           </p>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           {children}
//         </div>
//       </div>
//     </main>
//   );
// }

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-white"
      style={{ background: "radial-gradient(circle at 30% 0%, #0A2C47 0%, #000 55%)" }}>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-[280px] w-[280px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(136,8,8,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-[2] w-full max-w-sm">
        {/* Logo */}
        <div className="mb-9 flex items-center justify-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#880808]/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8857F" strokeWidth="1.8">
              <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold uppercase tracking-[0.1em]" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Macho Meter AI
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-bold leading-[1.1]" style={{ fontSize: "32px", fontFamily: "'Oswald', sans-serif" }}>
            {title}
          </h2>

          <p className="mt-2.5 text-sm text-white/45">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </main>
  );
}