export const MOCK_OBSERVANCE_DATA = {
  dashboard: {
    activePatients: 14250,
    averageObservance: 84.5,
    ruptureAlerts24h: 312,
    hmmState4Count: 845,
    myneDataValue: "€42.5K",
    avgMhfs: 845
  },
  recentAlerts: [
    { id: "A3F7", patient: "Patient #A3F7", molecule: "Lithium", shift: "HMM 2→3", location: "Rabat", time: "Il y a 2h", alert: "⚠ FRAGILISATION", severity: "amber" },
    { id: "B8E1", patient: "Patient #B8E1", molecule: "Clozapine", shift: "Refill retard 8j", location: "Casablanca", time: "Il y a 5h", alert: "🔴 RUPTURE", severity: "red" },
    { id: "C9FA", patient: "Patient #C9FA", molecule: "Valproate", shift: "HMM 3→4", location: "Dakar", time: "Il y a 6h", alert: "🔴 RUPTURE", severity: "red" },
    { id: "D12B", patient: "Patient #D12B", molecule: "Aripiprazole", shift: "HMM 1→2", location: "Kigali", time: "Il y a 8h", alert: "⚠ FRAGILISATION", severity: "amber" }
  ],
  moleculeAggregates: [
    { molecule: "Lithium", activePatients: 4500, observance: 88, alerts24h: 45, hmm: [60, 20, 15, 5], mhfs: 860 },
    { molecule: "Clozapine", activePatients: 2100, observance: 92, alerts24h: 12, hmm: [75, 15, 8, 2], mhfs: 890 },
    { molecule: "Valproate", activePatients: 3200, observance: 81, alerts24h: 85, hmm: [50, 25, 15, 10], mhfs: 810 },
    { molecule: "Aripiprazole", activePatients: 2800, observance: 85, alerts24h: 56, hmm: [55, 25, 12, 8], mhfs: 835 },
    { molecule: "Rispéridone", activePatients: 1650, observance: 79, alerts24h: 114, hmm: [45, 30, 15, 10], mhfs: 790 }
  ],
  environmentalFactors: [
    { molecule: "Lithium", factor: "Chaleur Extrême", country: "Maroc", multiplier: "1.4x", adjustment: "-15%", season: "Juillet-Août", source: "OMS 2023" },
    { molecule: "Tous Antidépresseurs", factor: "Photopériode", country: "Sénégal", multiplier: "0.8x", adjustment: "+5%", season: "Hiver", source: "Lancet Psy 2024" },
    { molecule: "Valproate", factor: "Ramadan", country: "Algérie", multiplier: "2.1x", adjustment: "-25%", season: "Mois Lunaire", source: "AJP 2022" },
  ],
  habitProfiles: [
    { profile: "Méthodique", strategy: "Ancrage Temporel", expectedEffect: "d=0.85" },
    { profile: "Négligent", strategy: "Variable Reward", expectedEffect: "d=0.45" },
    { profile: "Sceptique", strategy: "Social Proof", expectedEffect: "d=0.60" },
    { profile: "Anxieux", strategy: "Réassurance Active", expectedEffect: "d=0.75" },
    { profile: "Rebelle", strategy: "Autonomie Guidée", expectedEffect: "d=0.50" }
  ],
  dyads: [
    { id: 1, patientHMM: 3, caregiverExt: "Épuisé", delay: "14j", correlation: 0.85 },
    { id: 2, patientHMM: 1, caregiverExt: "Engagé", delay: "-", correlation: 0.92 },
    { id: 3, patientHMM: 4, caregiverExt: "Épuisé", delay: "21j", correlation: 0.78 },
    { id: 4, patientHMM: 2, caregiverExt: "Fragile", delay: "7j", correlation: 0.65 },
    { id: 5, patientHMM: 1, caregiverExt: "Engagé", delay: "-", correlation: 0.88 }
  ]
};
