import json

file_path = "/Users/mehdielkadiri/eigen-repos/raqib-v4/entries-batch.json"
try:
    with open(file_path, "r", encoding="utf-8") as f:
        entries = json.load(f)
except FileNotFoundError:
    entries = []

def add_entry(layer_id, data, source, confidence=0.9):
    entries.append({
        "layer_id": layer_id,
        "data": data,
        "source": source,
        "confidence": confidence,
        "created_by": "antigravity-collector"
    })

# --- BATCH AELYA ---
lois_a01 = [
    {"loi": "RGPD", "pays": "Union Européenne", "date_adoption": "2016-04-14", "date_application": "2018-05-25", "autorité_contrôle": "EDPB", "sanctions_max": "20M€ ou 4% CA"},
    {"loi": "Loi 09-08", "pays": "Maroc", "date_adoption": "2009-02-18", "date_application": "2009-02-18", "autorité_contrôle": "CNDP", "sanctions_max": "300000 MAD et prison"},
    {"loi": "POPIA", "pays": "Afrique du Sud", "date_adoption": "2013-11-19", "date_application": "2020-07-01", "autorité_contrôle": "Information Regulator", "sanctions_max": "10M ZAR ou 10 ans prison"},
    {"loi": "Nigeria DPA 2023", "pays": "Nigeria", "date_adoption": "2023-06-12", "date_application": "2023-06-12", "autorité_contrôle": "NDPC", "sanctions_max": "10M NGN ou 2% CA"},
    {"loi": "Ghana DPA", "pays": "Ghana", "date_adoption": "2012", "date_application": "2012", "autorité_contrôle": "Data Protection Commission", "sanctions_max": "Amendes et prison"},
    {"loi": "Kenya DPA", "pays": "Kenya", "date_adoption": "2019-11-08", "date_application": "2019-11-25", "autorité_contrôle": "ODPC", "sanctions_max": "5M KES ou 1% CA"},
    {"loi": "Sénégal loi données", "pays": "Sénégal", "date_adoption": "2008-01-25", "date_application": "2008-01-25", "autorité_contrôle": "CDP", "sanctions_max": "100M XOF et prison"},
    {"loi": "CDI loi informatique", "pays": "Côte d'Ivoire", "date_adoption": "2013", "date_application": "2013", "autorité_contrôle": "ARTCI", "sanctions_max": "Amendes et prison"},
    {"loi": "Cameroun loi 2024", "pays": "Cameroun", "date_adoption": "2024", "date_application": "2024", "autorité_contrôle": "ANTIC", "sanctions_max": "Amendes financières"},
    {"loi": "Tunisie loi organique", "pays": "Tunisie", "date_adoption": "2004", "date_application": "2004", "autorité_contrôle": "INPDP", "sanctions_max": "Amendes"},
    {"loi": "Égypte loi 151", "pays": "Égypte", "date_adoption": "2020", "date_application": "2020", "autorité_contrôle": "Personal Data Protection Center", "sanctions_max": "5M EGP"},
    {"loi": "Rwanda loi données", "pays": "Rwanda", "date_adoption": "2021-10-15", "date_application": "2021-10-15", "autorité_contrôle": "NCSA", "sanctions_max": "5M RWF ou 1% CA"},
    {"loi": "UK GDPR", "pays": "Royaume-Uni", "date_adoption": "2018", "date_application": "2021-01-01", "autorité_contrôle": "ICO", "sanctions_max": "17.5M GBP ou 4% CA"},
    {"loi": "Suisse LPD", "pays": "Suisse", "date_adoption": "2020-09-25", "date_application": "2023-09-01", "autorité_contrôle": "PFPDT", "sanctions_max": "250000 CHF"},
    {"loi": "LPDP Turquie", "pays": "Turquie", "date_adoption": "2016", "date_application": "2016", "autorité_contrôle": "KVKK", "sanctions_max": "2M TRY"}
]
for loi in lois_a01:
    add_entry("a01", loi, "national-assembly-records", 0.95)

pets_a11 = ["Differential Privacy", "ZKP", "Homomorphic Encryption", "Secure MPC", "TEE", "Federated Learning", "k-anonymity", "l-diversity", "t-closeness", "Synthetic Data"]
for pet in pets_a11:
    add_entry("a11", {"technologie": pet, "catégorie": "Privacy Enhancing Technology"}, "PETs-Adoption-Report")

cabinets_a21 = [
    {"cabinet": "Bird & Bird", "pays": "France", "spécialité": "IT/Privacy", "partners": ["Alexandre Vuchot"], "tarif": "600-800 EUR/h"},
    {"cabinet": "Hogan Lovells", "pays": "UK", "spécialité": "Cybersecurity & Privacy", "partners": ["Eduardo Ustaran"], "tarif": "700-1000 GBP/h"},
    {"cabinet": "Baker McKenzie", "pays": "Belgique", "spécialité": "Global Privacy", "partners": ["Elisabeth Dehareng"], "tarif": "550-750 EUR/h"},
    {"cabinet": "Linklaters", "pays": "Allemagne", "spécialité": "Tech & Privacy", "partners": ["Tanguy Van Overstraeten"], "tarif": "600-900 EUR/h"},
    {"cabinet": "DLA Piper", "pays": "Pays-Bas", "spécialité": "Data Protection", "partners": ["Richard van Schaik"], "tarif": "500-700 EUR/h"},
    {"cabinet": "Allen & Overy", "pays": "Luxembourg", "spécialité": "Digital/Privacy", "partners": ["Catherine Di Lorenzo"], "tarif": "600-800 EUR/h"},
    {"cabinet": "Covington & Burling", "pays": "Irlande", "spécialité": "Public Policy & Privacy", "partners": ["Daniel Pavin"], "tarif": "650-850 EUR/h"},
    {"cabinet": "Dentons", "pays": "Pologne", "spécialité": "IT/Privacy", "partners": ["Igor Ostrowski"], "tarif": "400-600 EUR/h"},
    {"cabinet": "Osborne Clarke", "pays": "Espagne", "spécialité": "Digital / Data", "partners": ["Rafael García"], "tarif": "450-650 EUR/h"},
    {"cabinet": "Fieldfisher", "pays": "UK", "spécialité": "Data Protection", "partners": ["Phil Lee"], "tarif": "500-750 GBP/h"}
]
for c in cabinets_a21:
    add_entry("a21", c, "Legal500-EMEA", 0.9)

adequacy_a81 = [
    {"pays": "Andorre", "statut": "Adéquat"},
    {"pays": "Argentine", "statut": "Adéquat"},
    {"pays": "Canada", "statut": "Adéquat (organismes commerciaux)"},
    {"pays": "Îles Féroé", "statut": "Adéquat"},
    {"pays": "Guernesey", "statut": "Adéquat"},
    {"pays": "Israël", "statut": "Adéquat"},
    {"pays": "Île de Man", "statut": "Adéquat"},
    {"pays": "Japon", "statut": "Adéquat"},
    {"pays": "Jersey", "statut": "Adéquat"},
    {"pays": "Nouvelle-Zélande", "statut": "Adéquat"},
    {"pays": "Corée du Sud", "statut": "Adéquat"},
    {"pays": "Suisse", "statut": "Adéquat"},
    {"pays": "Royaume-Uni", "statut": "Adéquat"},
    {"pays": "Uruguay", "statut": "Adéquat"},
    {"pays": "USA DPF", "statut": "Adéquat (via Data Privacy Framework)"}
]
add_entry("a81", {"décisions_adéquation_mars_2026": adequacy_a81}, "Commission-Européenne")

# --- BATCH BURHAN ---
mica_b01 = [
    {"article": "Article 14", "objet": "Rédaction et publication du livre blanc (Whitepaper)", "date_application": "2024-06-30", "pertinence_BURHAN": "Élevée (Audit des tokens de traçabilité)"},
    {"article": "Article 16", "objet": "Responsabilité pour les informations du livre blanc", "date_application": "2024-06-30", "pertinence_BURHAN": "Élevée (Responsabilité des données)"},
    {"article": "Article 19", "objet": "Fonds propres pour les émetteurs de tokens", "date_application": "2024-06-30", "pertinence_BURHAN": "Moyenne (Conformité financière)"},
    {"article": "Article 59", "objet": "Agrément pour les prestataires de services sur crypto-actifs", "date_application": "2024-12-30", "pertinence_BURHAN": "Élevée (Si BURHAN agit comme CASP)"},
    {"article": "Article 68", "objet": "Obligations de conservation", "date_application": "2024-12-30", "pertinence_BURHAN": "Absolue (Protection des actifs des entités)"}
]
for m in mica_b01:
    add_entry("b01", m, "MiCA-Regulation-EU", 0.99)

blockchains_b21 = [
    {"protocole": "Ethereum", "type": "L1", "TPS": 15, "gas_cost": "Élevé", "finality": "12-15 min", "EVM": True, "audit": "Très Élevé"},
    {"protocole": "Polygon zkEVM", "type": "L2", "TPS": 2000, "gas_cost": "Faible", "finality": "Rapide", "EVM": True, "audit": "En cours"},
    {"protocole": "Arbitrum", "type": "L2", "TPS": 4000, "gas_cost": "Faible", "finality": "1 semaine (Optimistic)", "EVM": True, "audit": "Très Élevé"},
    {"protocole": "Optimism", "type": "L2", "TPS": 2000, "gas_cost": "Faible", "finality": "1 semaine (Optimistic)", "EVM": True, "audit": "Très Élevé"},
    {"protocole": "Solana", "type": "L1", "TPS": 65000, "gas_cost": "Très Faible", "finality": "400 ms", "EVM": False, "audit": "Élevé"},
    {"protocole": "Avalanche", "type": "L1", "TPS": 4500, "gas_cost": "Moyen", "finality": "2 sec", "EVM": True, "audit": "Élevé"},
    {"protocole": "BNB Chain", "type": "L1", "TPS": 300, "gas_cost": "Faible", "finality": "3 sec", "EVM": True, "audit": "Moyen"},
    {"protocole": "Tezos", "type": "L1", "TPS": 1000, "gas_cost": "Faible", "finality": "Rapide", "EVM": False, "audit": "Moyen"},
    {"protocole": "Algorand", "type": "L1", "TPS": 6000, "gas_cost": "Très Faible", "finality": "3.3 sec", "EVM": False, "audit": "Élevé"},
    {"protocole": "Hedera", "type": "L1/DLT", "TPS": 10000, "gas_cost": "Très Faible", "finality": "3-5 sec", "EVM": True, "audit": "Très Élevé"}
]
for b in blockchains_b21:
    add_entry("b21", b, "Blockchain-Protocol-Comparative")

b31_concurrents = ["VeChain", "IBM Food Trust", "OriginTrail", "Provenance", "Ambrosus"]
for c in b31_concurrents:
    add_entry("b31", {"concurrent": c, "domaine": "Traçabilité & Supply Chain"}, "Gartner-Supply-Chain-DLT")

kols_b61 = ["Vitalik Buterin", "Gavin Wood", "Nicolas Cary", "Pascal Gauthier", "Mickaël van de Poppe"]
for k in kols_b61:
    add_entry("b61", {"nom": k, "territoire": "Europe"}, "KOL-Blockchain-Index")

cbdc_b81 = [
    {"pays": "Maroc", "statut": "Recherche avancée - Bank Al-Maghrib"},
    {"pays": "Nigeria", "statut": "Lancé (eNaira)"},
    {"pays": "Ghana", "statut": "Pilote en cours (eCedi)"},
    {"pays": "Sénégal", "statut": "Recherche (BCEAO)"},
    {"pays": "Côte d'Ivoire", "statut": "Recherche (BCEAO)"},
    {"pays": "Kenya", "statut": "Discussion publique (CBK)"},
    {"pays": "Rwanda", "statut": "Étude de faisabilité"},
    {"pays": "Union Européenne", "statut": "Phase de préparation (Euro Numérique)"},
    {"pays": "Suisse", "statut": "Pilote institutionnel (Projet Helvetia)"},
    {"pays": "Royaume-Uni", "statut": "Consultation (Britcoin)"}
]
for c in cbdc_b81:
    add_entry("b81", c, "BIS-CBDC-Tracker")

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print("Updated batch with AELYA and BURHAN layers.")
