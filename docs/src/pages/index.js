import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="OrangerAI"
      description="Suivi intelligent du rendement et du stade phénologique des orangers grâce à l'IA">
      <header className={styles.heroBanner}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.leftContent}>
            <h1 className="hero__title">OrangerAI</h1>
            <p className="hero__subtitle">
              Optimisez la production de vos orangers avec la détection intelligente des stades phénologiques.
            </p>
            <div className={styles.buttonGroup}>
              
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                🚀 Commencer
              </Link>
            </div>
          </div>
          <div className={styles.rightImage}>
            <img src="/img/agriculture-tech.jpg" alt="Oranger" />
          </div>
        </div>
      </header>
    </Layout>
  );
}
