import React, { useState } from 'react';
import { BLOOMBERG_PRUNE_COLORS, COMMON_STYLES } from '../shared/constants';

interface Intention {
  id: string;
  user: string;
  location: string;
  query: string;
  budget: string;
  urgency: string;
  category: string;
  basePrice: number;
}

interface Bid {
  buyer: string;
  price: number;
  isRecommended: boolean;
  reason?: string;
}

const INTENTIONS: Intention[] = [
  { id: '1', user: 'Fatima K.', location: 'Casablanca', query: 'Cherche crédit immobilier < 3000 DH/mois', budget: '€150K', urgency: '30j', category: 'FINANCE', basePrice: 42 },
  { id: '2', user: 'Ahmed T.', location: 'Dakar', query: 'Assurance auto moto', budget: '< 200K CFA/an', urgency: 'Immédiate', category: 'ASSURANCE', basePrice: 15 },
  { id: '3', user: 'Sophie L.', location: 'Paris', query: 'Thérapie TCC anxiété', budget: '€60-80/séance', urgency: '7j', category: 'SANTÉ', basePrice: 35 },
  { id: '4', user: 'Youssef B.', location: 'Rabat', query: 'Achat VÉ (Véhicule Électrique)', budget: '€25K', urgency: '15j', category: 'MOBILITÉ', basePrice: 28 },
  { id: '5', user: 'Marie M.', location: 'Lyon', query: 'Formation Data Science', budget: '€3K', urgency: '60j', category: 'EDUCATION', basePrice: 18 },
];

const BIDS_MAP: Record<string, Bid[]> = {
  '1': [
    { buyer: 'Crédit du Maroc', price: 42, isRecommended: true, reason: 'Meilleur prix + taux historique 2.1%' },
    { buyer: 'Attijariwafa', price: 38, isRecommended: false },
    { buyer: 'BOA', price: 35, isRecommended: false },
  ],
  '2': [
    { buyer: 'AXA Sénégal', price: 15, isRecommended: true, reason: 'Couverture optimale pour ce profil' },
    { buyer: 'Sanlam', price: 12, isRecommended: false },
  ],
  '3': [
    { buyer: 'Qare', price: 35, isRecommended: true, reason: 'Match parfait avec spécialité TCC' },
    { buyer: 'Livi', price: 30, isRecommended: false },
    { buyer: 'Doctolib Therapy', price: 28, isRecommended: false },
  ],
  '4': [
    { buyer: 'Renault Maroc', price: 28, isRecommended: true, reason: 'Offre promotionnelle en cours' },
    { buyer: 'Peugeot', price: 25, isRecommended: false },
  ],
  '5': [
    { buyer: 'Le Wagon', price: 18, isRecommended: true, reason: 'Financement CPF possible' },
    { buyer: 'OpenClassrooms', price: 15, isRecommended: false },
  ]
};

export default function IntentionMarketplaceView() {
  const [selectedId, setSelectedId] = useState<string>(INTENTIONS[0].id);

  const selectedIntention = INTENTIONS.find(i => i.id === selectedId);
  const currentBids = BIDS_MAP[selectedId] || [];
  const recommendedBid = currentBids.find(b => b.isRecommended);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div>
        <h2 style={COMMON_STYLES.sectionTitle}>Intention Marketplace</h2>
        <p style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
          L'ÉCONOMIE DE L'INTENTION EN ACTION — REAL-TIME BIDDING
        </p>
      </div>

      <div className="flex-1 flex space-x-6 overflow-hidden">
        {/* LEFT PANEL: ACTIVE INTENTIONS */}
        <div className="w-1/2 flex flex-col h-full" style={COMMON_STYLES.card}>
          <div className="p-4 border-b" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
            <span style={COMMON_STYLES.categoryLabel}>INTENTIONS ACTIVES (PRODUCTEURS)</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {INTENTIONS.map((intention) => {
              const isSelected = selectedId === intention.id;
              return (
                <div 
                  key={intention.id}
                  onClick={() => setSelectedId(intention.id)}
                  className={`p-4 cursor-pointer transition-all border ${isSelected ? 'bg-white/5' : 'hover:bg-white/5'}`}
                  style={{
                    borderColor: isSelected ? BLOOMBERG_PRUNE_COLORS.textSecondary : BLOOMBERG_PRUNE_COLORS.border,
                    backgroundColor: isSelected ? 'rgba(228,212,234,0.05)' : 'transparent',
                    borderRadius: 0
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: BLOOMBERG_PRUNE_COLORS.textMain }}>
                      {intention.user}, {intention.location}
                    </span>
                    <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.accentNeutral }}>
                      {intention.category}
                    </span>
                  </div>
                  <div style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginBottom: '8px' }}>
                    « {intention.query} »
                  </div>
                  <div className="flex space-x-4">
                    <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
                      BUDGET: <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>{intention.budget}</span>
                    </span>
                    <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
                      URGENCE: <span style={{ color: BLOOMBERG_PRUNE_COLORS.textMain }}>{intention.urgency}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: LIVE BIDS */}
        <div className="w-1/2 flex flex-col h-full" style={COMMON_STYLES.card}>
          <div className="p-4 border-b" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
            <span style={COMMON_STYLES.categoryLabel}>ENCHÈRES EN COURS (ACHETEURS)</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col space-y-8">
            {selectedIntention ? (
              <>
                <div className="space-y-4">
                  <div style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>ORDRES D'ACHAT (VIA ÆLYA)</div>
                  {currentBids.map((bid, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
                      <span style={{ ...COMMON_STYLES.tableData }}>{bid.buyer}</span>
                      <div className="flex items-center space-x-4">
                        <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>POUR CE LEAD</span>
                        <span style={COMMON_STYLES.pricePositive}>€{bid.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {recommendedBid && (
                  <div className="p-4 border border-green-500/30 bg-green-500/5">
                    <div className="flex items-center space-x-2 mb-2">
                       <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.accentPositive }}>ÆLYA RECOMMANDATION</span>
                    </div>
                    <div style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textMain }}>
                      ACCEPT {recommendedBid.buyer}
                    </div>
                    <div style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textSecondary, marginTop: '4px' }}>
                      ({recommendedBid.reason})
                    </div>
                  </div>
                )}

                <div className="pt-6 mt-auto border-t" style={{ borderColor: BLOOMBERG_PRUNE_COLORS.border }}>
                  <div className="flex justify-between items-center">
                    <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textSecondary }}>
                      REVENUE PRODUCTEUR ({selectedIntention.user})
                    </span>
                    <div className="text-right">
                      <div style={{ ...COMMON_STYLES.tableData, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
                        €{recommendedBid?.price.toFixed(2)} × 53% REVENUE SHARE
                      </div>
                      <div className="text-2xl mt-1" style={COMMON_STYLES.pricePositive}>
                        €{((recommendedBid?.price || 0) * 0.53).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex justify-center items-center">
                <span style={{ ...COMMON_STYLES.categoryLabel, color: BLOOMBERG_PRUNE_COLORS.textTertiary }}>
                  SÉLECTIONNEZ UNE INTENTION
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
