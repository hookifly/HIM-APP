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
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-black tracking-[0.3em]">
            HIM
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold">
            {title}
          </h2>

          <p className="mt-3 text-white/60">
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