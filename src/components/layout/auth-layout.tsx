import Image from "next/image";

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 text-white"
      style={{ fontFamily: "'Oswald', sans-serif" }}>

      <div className="relative z-[2] w-full max-w-sm">

        {/* Logo */}
        <div className="mb-9 flex justify-center">
          <Image
            src="/mmlogo.jpg"
            alt="Macho Meter AI"
            width={120}
            height={38}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="font-bold leading-[1.1]" style={{ fontSize: "32px" }}>
            {title}
          </h2>

          <p className="mt-2.5 text-sm text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
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