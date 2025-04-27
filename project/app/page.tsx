import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { GithubForm } from '@/components/github-form';
import { ParticleBackground } from '@/components/particle-background';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <GithubForm />
        <Features />
        <Footer />
      </div>
    </main>
  );
}