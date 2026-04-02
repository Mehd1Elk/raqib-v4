'use client';

import Link from 'next/link';

export default function DiwaneExpertisePage() {
  return (
    <div className="diwane-main-content">
      <div className="expertise-placeholder">
        <h1>NOOS de l&apos;Art</h1>
        <p>
          Module d&apos;expertise et d&apos;intelligence artificielle appliqué au marché de l&apos;art.
          Évaluation, authentification, provenance, et recommandations de collection
          alimentées par les données DIWANE sur 49 marchés.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
          Module en cours de développement — Intégration prévue Q3 2026
        </p>

        <div className="expertise-modules">
          <div className="expertise-module">
            <h3>Authentification IA</h3>
            <p>
              Analyse stylistique, détection de faux, comparaison avec bases de données
              de référence. Intelligence artificielle entraînée sur 500K+ oeuvres.
            </p>
          </div>
          <div className="expertise-module">
            <h3>Provenance Tracker</h3>
            <p>
              Traçabilité blockchain des oeuvres d&apos;art, historique des ventes,
              certifications et documentation. Powered by BURHAN.
            </p>
          </div>
          <div className="expertise-module">
            <h3>Valorisation Prédictive</h3>
            <p>
              Modèles prédictifs de valorisation basés sur l&apos;analyse de marché,
              tendances, et données historiques d&apos;enchères mondiales.
            </p>
          </div>
          <div className="expertise-module">
            <h3>Conseil Collection</h3>
            <p>
              Recommandations personnalisées pour collectionneurs, basées sur le profil
              de risque, les préférences esthétiques et l&apos;horizon d&apos;investissement.
            </p>
          </div>
          <div className="expertise-module">
            <h3>Due Diligence Art</h3>
            <p>
              Vérification réglementaire, sanctions, blanchiment d&apos;argent.
              Conformité avec les normes AML/KYC appliquées au marché de l&apos;art.
            </p>
          </div>
          <div className="expertise-module">
            <h3>Réseau Galeries</h3>
            <p>
              Cartographie des relations entre galeries, artistes, collectionneurs
              et institutions. Analyse de réseau powered by ÆLYA.
            </p>
          </div>
        </div>

        <div className="link-row" style={{ marginTop: '3rem' }}>
          <Link href="/diwane" className="link-button">Retour DIWANE</Link>
          <Link href="/" className="link-button">Retour RAQIB</Link>
        </div>
      </div>

      <footer className="diwane-footer">
        <p>RAQIB <span className="highlight">DIWANE</span> · NOOS de l&apos;Art · Eigen SAS · 2026</p>
      </footer>
    </div>
  );
}
