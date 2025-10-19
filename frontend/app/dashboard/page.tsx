import Link from 'next/link';
import styles from './styles.module.css';

const mockCampaigns = [
  {
    id: '1',
    title: 'Shadows of the Astral Sea',
    system: 'dnd-5e',
    nextSession: '2024-06-18T19:00:00Z',
  },
  {
    id: '2',
    title: 'Edge of the Empire',
    system: 'swrpg',
    nextSession: '2024-06-22T17:30:00Z',
  },
];

export default function DashboardPage() {
  return (
    <div className={styles.grid}>
      <section className="card">
        <h2>Your Campaigns</h2>
        <ul className={styles.list}>
          {mockCampaigns.map((campaign) => (
            <li key={campaign.id}>
              <div>
                <h3>{campaign.title}</h3>
                <p>System: {campaign.system}</p>
                <p>Next session: {new Date(campaign.nextSession).toLocaleString()}</p>
              </div>
              <Link href={`/dashboard/campaigns/${campaign.id}`}>Open table</Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Plugin Systems</h2>
        <p>Manage supported rulesets and community plugins.</p>
        <Link href="/dashboard/plugins">View plugin manager</Link>
      </section>
    </div>
  );
}
