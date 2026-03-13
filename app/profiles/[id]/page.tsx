import Link from 'next/link';
import { notFound } from 'next/navigation';

async function fetchProfile(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const profile = await fetchProfile(params.id);
  if (!profile) return { title: 'Profile Not Found' };
  
  return {
    title: `${profile.name} | Profiles App`,
  };
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const profile = await fetchProfile(params.id);
  
  if (!profile) notFound();

  return (
    <div className="profile-detail">
      <Link href="/" className="back-link">← Back to Profiles</Link>
      
      <div className="profile-header">
        <h1>{profile.name}</h1>
        <p className="title">{profile.company?.name}</p>
      </div>
      
      <div className="profile-info">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Website:</strong> {profile.website}</p>
        <p><strong>Address:</strong> {profile.address?.city}, {profile.address?.street}</p>
      </div>
    </div>
  );
}
