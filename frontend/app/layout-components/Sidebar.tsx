export function Sidebar() {
  return (
    <aside style={{ minWidth: '220px' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li>Dashboard</li>
          <li>Campaigns</li>
          <li>Characters</li>
          <li>Dice Roller</li>
        </ul>
      </nav>
    </aside>
  );
}
