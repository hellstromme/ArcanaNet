'use client';

import styles from './PluginCard.module.css';

export interface PluginCardProps {
  id: string;
  name: string;
  version: string;
  description: string;
}

export function PluginCard({ id, name, version, description }: PluginCardProps) {
  return (
    <article className={styles.card}>
      <header>
        <h3>{name}</h3>
        <span>{version}</span>
      </header>
      <p>{description}</p>
      <footer>
        <button type="button">Configure</button>
        <button type="button">Disable</button>
      </footer>
    </article>
  );
}
