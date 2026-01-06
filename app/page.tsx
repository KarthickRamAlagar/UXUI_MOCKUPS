import Header from "./_shared/Header";
import Hero from "./_shared/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-gray-50 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Gradient Background Blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-400/20 blur-[120px]" />

      <div className="pointer-events-none absolute top-20 right-[-200px] h-[500px] w-[500px] rounded-full bg-pink-400/20 blur-[120px]" />

      <div className="pointer-events-none absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />

      <div className="pointer-events-none absolute top-[200px] left-1/2 h-[500px] w-[500px] rounded-full bg-sky-400/20 blur-[120px]" />
    </main>
  )
}
