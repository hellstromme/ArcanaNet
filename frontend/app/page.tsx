import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section className="card">
        <h2>Welcome Adventurers</h2>
        <p>
          ArcanaNet is your collaborative space for running tabletop role-playing games online. Create
          campaigns, manage character sheets, and roll dice in real-time.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link href="/dashboard">Go to Dashboard</Link>
          <Link href="/dice">Launch Dice Roller</Link>
        </div>
      </section>
    </div>
  );
}
