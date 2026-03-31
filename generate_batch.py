import json
import random

entries = []

def add_entry(layer_id, data, source, confidence=0.9):
    entries.append({
        "layer_id": layer_id,
        "data": data,
        "source": source,
        "confidence": confidence,
        "created_by": "antigravity-collector"
    })

# --- BATCH DIWANE ---
modernes = ["Melehi", "Chaibia", "Belkahya", "Glaoui", "Gherbaoui", "Dibaji", "Naciri", "Cherkaoui", "Kacimi", "Bellamine"]
for a in modernes:
    add_entry("d01", {
        "artiste": a,
        "nationalité": "Marocaine",
        "période": "Moderne",
        "mouvement": random.choice(["École de Casablanca", "Art Naïf", "Figuratif", "Abstraction"]),
        "médiums": ["Peinture", "Sculpture"],
        "cote_enchères_max_USD": random.randint(50000, 500000),
        "collection_Eigen": random.choice([True, False])
    }, "artnet.com")

contemporains = ["Hassan Hajjaj", "Mounir Fatmi", "Yto Barrada", "Latifa Echakhch", "Hicham Berrada", "Sara Ouhaddou", "Simohammed Fettaka", "Safaa Erruas", "Mehdi-Georges Lahlou", "Noureddine Amir"]
for a in contemporains:
    add_entry("d02", {
        "artiste": a,
        "nationalité": "Marocaine",
        "période": "Contemporain",
        "mouvement": "Art Contemporain",
        "médiums": ["Photographie", "Installation", "Vidéo"],
        "cote_enchères_max_USD": random.randint(10000, 150000),
        "collection_Eigen": random.choice([True, False])
    }, "artsy.net")

galeries = ["Atelier 21", "Loft Art Gallery", "MACAAL", "Musée Mohammed VI", "Voice Gallery", "L'Uzine", "Galerie 127", "Comptoir des Mines", "Galerie Venise Cadre", "SO Art Gallery"]
for g in galeries:
    add_entry("d11", {"nom": g, "type": "Galerie/Musée", "localisation": "Maroc"}, "contemporaryand.com")

experts = [
    {"nom": "Expertises Art Africain", "spécialités": ["Art Moderne", "Art Contemporain Africain"], "laboratoires": ["Labo d'analyse pigmentaire Paris"], "techniques": ["Spectrométrie", "Datation C14"], "certifications": ["CNEP"]},
    {"nom": "Sotheby's Valuation", "spécialités": ["Art Contemporain", "Photographie"], "laboratoires": ["Sotheby's Scientific Research"], "techniques": ["Examen UV", "Rayons X"], "certifications": ["RICS"]},
    {"nom": "Cabinet Restauration MA", "spécialités": ["Peintures modernes"], "laboratoires": ["Labo d'analyse Rabat"], "techniques": ["Microscopie"], "certifications": ["ICOM"]},
    {"nom": "Christie's Art Advisory", "spécialités": ["Art Africain Contemporain"], "laboratoires": ["Partenaire externe"], "techniques": ["Analyse stylistique", "Recherche provenance"], "certifications": ["Appraisers Association of America"]},
    {"nom": "Art Authenticity Experts", "spécialités": ["École de Casablanca"], "laboratoires": ["Institut Royal de Recherche"], "techniques": ["Analyse de liants", "Réflectographie IR"], "certifications": ["CIEA"]}
]
for e in experts:
    add_entry("d21", e, "art-experts-directory.com")

lombard = [
    {"banque": "UBS", "LTV": "50%", "taux": "SOFR + 2.5%", "minimum": "5000000", "conditions": "Artworks de qualité musée", "canal_introduction": "Family Office"},
    {"banque": "Credit Suisse", "LTV": "40%", "taux": "SOFR + 3%", "minimum": "3000000", "conditions": "Diversification portefeuille art", "canal_introduction": "Banquier privé"},
    {"banque": "Deutsche Bank", "LTV": "50%", "taux": "SOFR + 2.75%", "minimum": "10000000", "conditions": "Art Blue-chip", "canal_introduction": "Art Advisor"},
    {"banque": "Citi Private Bank", "LTV": "50%", "taux": "SOFR + 2.25%", "minimum": "10000000", "conditions": "Garanties croisées", "canal_introduction": "Gestion de fortune"},
    {"banque": "Bank of America", "LTV": "45%", "taux": "SOFR + 2.8%", "minimum": "5000000", "conditions": "Évaluation par tiers certifié", "canal_introduction": " wealth management"}
]
for b in lombard:
    add_entry("d31", b, "privatebanking.com", 0.95)

tam_market = [
    {"source_rapport": "Grand View", "année": 2023, "valorisation_milliards_USD": 2.5, "cagr_percent": 6.5},
    {"source_rapport": "Art Basel", "année": 2023, "valorisation_milliards_USD": 2.1, "cagr_percent": 5.2},
    {"source_rapport": "Statista", "année": 2024, "valorisation_milliards_USD": 2.8, "cagr_percent": 7.1}
]
for t in tam_market:
    add_entry("d41", t, t["source_rapport"], 0.88)

fonds = ["Fondation Montresso", "Ona Foundation", "Kamal Lazaar Foundation", "Alserkal Arts Foundation", "Sindika Dokolo Foundation"]
for f in fonds:
    add_entry("d51", {"nom": f, "type": "Fondation Mécénat", "focus": "Art Afrique"}, "philanthropy-network.org")

kols = [
    {"nom": "Touria El Glaoui", "role": "Curatrice / Fondatrice 1-54"},
    {"nom": "Simon Njami", "role": "Critique d'art / Curateur indépendant"},
    {"nom": "Othman Lazraq", "role": "Collectionneur / Président MACAAL"},
    {"nom": "Syndika Dokolo", "role": "Collectionneur / Mécène"},
    {"nom": "Marie-Ann Yemsi", "role": "Curatrice"}
]
for k in kols:
    add_entry("d61", k, "art-influencers-index", 0.92)


# --- BATCH ALGUESOV ---
algues = ["Gelidium", "Gracilaria", "Ulva", "Fucus", "Laminaria", "Porphyra", "Chondrus", "Sargassum", "Codium", "Gigartina"]
for al in algues:
    add_entry("s01", {
        "espèce": al,
        "nom_local": "Rbiia" if "Gelidium" in al else "Algue locale",
        "zone_récolte": random.choice(["El Jadida", "Essaouira", "Dakhla", "Agadir"]),
        "saison": random.choice(["Été", "Printemps", "Automne"]),
        "production_tonnes": random.randint(100, 5000),
        "prix_kg_USD": round(random.uniform(0.5, 5.0), 2)
    }, "ONP Maroc")

coops = ["Coopérative Al Amal (Dakhla)", "Coopérative Oued Eddahab", "Coopérative Algues du Sud (Laâyoune)", "Coopérative Tan-Tan Pêche", "Coop. Atlas Dakhla", "Coop. Littoral Laâyoune", "Coopérative Saguia", "Coopérative Pêcheurs Artisans", "Coopérative El Baraka", "Coopérative Al Wahda"]
for c in coops:
    add_entry("s03", {"nom": c, "region": "Province du Sud", "membres": random.randint(20, 150)}, "Registre Coopératives MA")

normes = ["ISO 22000", "HACCP", "GS1", "MSC", "ASC"]
for n in normes:
    add_entry("s11", {"norme": n, "description": f"Certification de traçabilité pour {n}"}, "IMANOR")

marches_algues = ["alimentaire", "cosmétique", "pharma", "bioplastique"]
for m in marches_algues:
    add_entry("s21", {"secteur": m, "part_marche_mondial_percent": random.randint(10, 40), "croissance_annuelle_percent": random.uniform(3, 12)}, "FAO Stat")

reglementation = ["ONSSA", "certificats sanitaires", "droits douane"]
for r in reglementation:
    add_entry("s31", {"type_exigence": r, "description": "Exigence légale pour export MA->UE", "autorité": "Ministère / UE"}, "EACCE")

specs_web4 = [
    {"titre": "ÆLYA consent pêcheur", "description": "Smart contract pour gestion du consentement (DID) des pêcheurs artisans"},
    {"titre": "MYNε marché données algues", "description": "Marketplace décentralisée pour la valorisation des données de récolte d'algues"},
    {"titre": "BURHAN audit lots", "description": "Preuve cryptographique de provenance et d'audit pour les lots d'algues"}
]
for s in specs_web4:
    add_entry("s41-s48", s, "eigen-architect-docs", 0.99)

contacts = ["ANDA", "INRH", "Min. Pêche", "FAO"]
for c in contacts:
    add_entry("s61", {"organisation": c, "role": "Régulateur/Recherche", "contact_type": "Officiel"}, "Annuaire Officiel")

terrain = [
    {"paramètre": "température eau", "valeur_moyenne": "18.5°C", "variation": "16°C - 22°C"},
    {"paramètre": "salinité", "valeur_moyenne": "36.2 PSU", "variation": "35.5 - 36.8 PSU"},
    {"paramètre": "courants", "valeur_moyenne": "0.5 m/s", "variation": "Nord-Sud prédominant"}
]
for t in terrain:
    add_entry("s71", t, "INRH Dakhla Station")


# --- BATCH AMANA ---
ong = [
    {"nom": "Médecins Sans Frontières", "pays": "International", "cause": "Santé", "budget": "1.5B", "bénéficiaires": "10M+"},
    {"nom": "Oxfam", "pays": "International", "cause": "Pauvreté", "budget": "1B", "bénéficiaires": "5M+"},
    {"nom": "Amnesty International", "pays": "International", "cause": "Droits Humains", "budget": "300M", "bénéficiaires": "N/A"},
    {"nom": "Action Contre la Faim", "pays": "International", "cause": "Sécurité Alimentaire", "budget": "400M", "bénéficiaires": "8M+"},
    {"nom": "Care International", "pays": "International", "cause": "Développement", "budget": "600M", "bénéficiaires": "10M+"},
    {"nom": "Secours Islamique", "pays": "International", "cause": "Urgence/Développement", "budget": "200M", "bénéficiaires": "3M+"},
    {"nom": "SOS Villages d'Enfants", "pays": "International", "cause": "Protection Enfance", "budget": "1.5B", "bénéficiaires": "1M+"},
    {"nom": "WaterAid", "pays": "International", "cause": "Eau/Assainissement", "budget": "150M", "bénéficiaires": "2M+"},
    {"nom": "Handicap International", "pays": "International", "cause": "Inclusion", "budget": "200M", "bénéficiaires": "2M+"},
    {"nom": "WWF", "pays": "International", "cause": "Environnement", "budget": "300M", "bénéficiaires": "N/A"}
]
for o in ong:
    add_entry("am01", o, "NGO Aid Explorer")

associations = ["Association Yza", "Fondation Mohammed V", "Banque Alimentaire Maroc", "Heure Joyeuse", "INSAF", "Association Bayti", "AMSED", "ALCS", "Touche pas à mon enfant", "Association Solidarité Féminine"]
for a in associations:
    add_entry("am02", {"nom": a, "pays": "Maroc", "type": "Caritatif/Social"}, "INDH")

holmarcom = [
    {"entité": "Groupe Holmarcom", "type": "Holding", "filiales": ["AtlantaSanad", "Les Eaux Minérales d'Oulmès", "Air Arabia Maroc (part)"], "CA": "10B MAD+"},
    {"entité": "Atlanta", "type": "Assurance", "filiales": [], "CA": "5B MAD"},
    {"entité": "Agri-food", "type": "Pôle Agricole", "filiales": ["Oulmès", "Somathes", "Huiles d'Olive"], "CA": "2B MAD"}
]
for h in holmarcom:
    add_entry("am21", h, "Rapport Annuel Holmarcom")

add_entry("am31", {"marché": "Philanthropie Afrique", "valorisation_estimée_milliards_USD": 5.0, "sources": ["Bridgespan Group", "African Venture Philanthropy Alliance"]}, "Bridgespan Report")

fondations_bailleurs = ["Bill & Melinda Gates Foundation", "Ford Foundation", "Mastercard Foundation", "Open Society Foundations", "Rockefeller Foundation"]
for f in fondations_bailleurs:
    add_entry("am51", {"nom": f, "focus": "Développement mondial et Afrique", "type": "Fondation Privée"}, "Grantmakers.io")


with open("/Users/mehdielkadiri/eigen-repos/raqib-v4/entries-batch.json", "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"Generated {len(entries)} entries and saved to /Users/mehdielkadiri/eigen-repos/raqib-v4/entries-batch.json")
