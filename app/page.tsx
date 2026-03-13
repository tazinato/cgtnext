import Link from 'next/link';

async function fetchProfiles({ title, search }: { title?: string; search?: string }) {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (search) params.set('search', search);
  
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?${params}`);
  if (!res.ok) throw new Error('Failed to fetch');
  
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: { title?: string; search?: string } }) {
  const title = searchParams.title || '';
  const search = searchParams.search || '';
  
  const profiles = await fetchProfiles({ title, search });

  return (
    <div className="home">
      <h1>Developer Profiles</h1>
      
      <form className="filters" action="/" method="GET">
        <div>
          <label>Title:</label>
          <input name="title" defaultValue={title} placeholder="developer" />
        </div>
        <div>
          <label>Search:</label>
          <input name="search" defaultValue={search} placeholder="John" />
        </div>
        <button type="submit">Filter</button>
      </form>

      <div className="profiles-grid">
        {profiles.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          profiles.map((profile: any) => (
            <div key={profile.id} className="profile-card">
              <h3>{profile.name}</h3>
              <p className="title">{profile.company?.name || 'N/A'}</p>
              <p className="email">{profile.email}</p>
              <Link href={`/profiles/${profile.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
