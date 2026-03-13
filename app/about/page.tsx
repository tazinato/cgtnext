import Link from 'next/link';

export const metadata = {
  title: 'About | Profiles App',
};

export default function AboutPage() {
  return (
    <div className="about">
      <h1>About Profiles App</h1>
      <p>This is a Next.js application that demonstrates server components, URL search parameters, dynamic routing, and Vercel deployment.</p>
      <p>Features include profile filtering, search, and individual profile details pages.</p>
      <Link href="/">← Back to Profiles</Link>
    </div>
  );
}
