import { PluginCard } from '@/app/components/PluginCard';

const mockPlugins = [
  {
    id: 'dnd-5e',
    name: 'Dungeons & Dragons 5e',
    version: '0.1.0',
    description: 'Official support for the D&D 5th Edition ruleset and character sheets.',
  },
  {
    id: 'pf2e',
    name: 'Pathfinder 2e',
    version: '0.1.0',
    description: 'Community-maintained Pathfinder second edition plugin.',
  },
];

export default function PluginManagerPage() {
  return (
    <section className="card">
      <h2>Plugin Manager</h2>
      <p>Installed systems providing custom character sheets and dice macros.</p>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
        {mockPlugins.map((plugin) => (
          <PluginCard key={plugin.id} {...plugin} />
        ))}
      </div>
    </section>
  );
}
