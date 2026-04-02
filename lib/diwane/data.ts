import type {
  DiwaneGlobalData, DiwaneCountryArt, DiwaneArtist, DiwaneGallery,
  DiwaneMuseum, DiwaneAuctionHouse, DiwaneArtFair, DiwaneArtFinance,
  DiwaneRegulation, DiwaneCollector, DiwaneArtEducation,
  DiwaneTabDef, DiwaneSearchItem
} from './types';

/* ============================================
   DIWANE — Art Intelligence Platform
   Master Data File
   49 countries (22 Africa + 27 EU)
   ============================================ */

// --- GLOBAL DATA ---
export const DIWANE_GLOBAL_DATA: DiwaneGlobalData = {
  stats: {
    totalCountries: 57,
    africaCountries: 30,
    euCountries: 27,
    totalArtists: "350+",
    totalGalleries: "250+",
    totalMuseums: "180+",
    globalArtMarket: "$67.8 Mds (2024)",
    africanArtMarket: "~$1.5 Mds (2025 est.)",
    euArtMarket: "~$17 Mds (dont France $4.5 Mds)"
  },

  topArtists: [
    {name: "El Anatsui", country: "Ghana/Nigeria", medium: "Sculpture (capsules aluminium)", auctionRecord: "£541,250 — Bonhams"},
    {name: "Njideka Akunyili Crosby", country: "Nigeria", medium: "Peinture / Collage", auctionRecord: "$3.4M — Christie's"},
    {name: "Mohamed Melehi", country: "Maroc", medium: "Peinture (Vagues)", auctionRecord: "€166,455 — Artcurial 2025"},
    {name: "Ben Enwonwu", country: "Nigeria", medium: "Sculpture / Peinture", auctionRecord: "£1.2M (Tutu) — Bonhams 2018"},
    {name: "William Kentridge", country: "Afrique du Sud", medium: "Dessin animé / Gravure", auctionRecord: "$3.2M — Sotheby's"},
    {name: "Ibrahim Mahama", country: "Ghana", medium: "Installation (jute)", auctionRecord: "#1 ArtReview Power 100 2024"},
    {name: "Julie Mehretu", country: "Éthiopie", medium: "Peinture abstraite", auctionRecord: "$9.6M — Sotheby's"},
    {name: "Ousmane Sow", country: "Sénégal", medium: "Sculpture monumentale", auctionRecord: "Pont des Arts 1999, Académie Beaux-Arts"},
    {name: "Marlene Dumas", country: "Afrique du Sud", medium: "Peinture", auctionRecord: "$6.3M — Sotheby's"},
    {name: "Yinka Shonibare", country: "Nigeria", medium: "Installation / Textile", auctionRecord: "Turner Prize nominee, CBE"}
  ],

  topAuctions: [
    {artist: "Julie Mehretu", title: "Retopistics: A Renegade Excavation", price: "$9.6M", house: "Sotheby's", date: "2019"},
    {artist: "Njideka Akunyili Crosby", title: "Bush Babies", price: "$3.4M", house: "Christie's", date: "2018"},
    {artist: "El Anatsui", title: "New World Map", price: "£541,250", house: "Bonhams", date: "2012"},
    {artist: "Ben Enwonwu", title: "Tutu", price: "£1.2M", house: "Bonhams", date: "2018"},
    {artist: "Marlene Dumas", title: "The Visitor", price: "$6.3M", house: "Sotheby's", date: "2008"},
    {artist: "Mohamed Melehi", title: "Vague, c. 1968", price: "€166,455", house: "Artcurial Marrakech", date: "2025"},
    {artist: "Jacques Majorelle", title: "Le Souk à Marrakech", price: "€370,500", house: "Artcurial Marrakech", date: "2025"},
    {artist: "Hassan El Glaoui", title: "Chevaux", price: "€49,379", house: "Artcurial Marrakech", date: "2025"},
    {artist: "Aboudia", title: "Sans titre, 2017", price: "€135,765", house: "Artcurial Marrakech", date: "2025"},
    {artist: "Baya", title: "Jardin d'Eden", price: "€92,587", house: "Artcurial Marrakech", date: "2025"}
  ],

  alerts: [
    {text: "France — Marché art à $4.5 Mds en 2025 (+9%), Paris #1 UE. Art Basel Paris lancé Oct 2025.", level: "green"},
    {text: "Maroc — Artcurial Marrakech 3 ventes/an à La Mamounia. €2.2M déc 2025. 1-54 Fair en croissance.", level: "green"},
    {text: "Nigeria — Art X Lagos 10e anniversaire. Tate Modern expose le modernisme nigérian.", level: "green"},
    {text: "Ghana — Ibrahim Mahama #1 ArtReview Power 100. 3 institutions créées à Tamale.", level: "green"},
    {text: "Sénégal — Dak'Art 15e édition (nov 2024), 58 artistes, 33 pays. Budget $2.9M.", level: "green"},
    {text: "Art africain contemporain — Marché estimé $1.5 Mds en 2025. Ultra-contemporain en forte hausse.", level: "green"},
    {text: "Art Finance — Marché mondial prêts art-backed : $34-40 Mds (2025). Croissance 12%/an.", level: "orange"},
    {text: "Enchères mondiales — Sotheby's $7 Mds (+17%), Christie's $6.2 Mds (+7%), Phillips $927M (+10%).", level: "green"},
    {text: "TVA France art — Nouveau taux réduit 5.5% depuis jan 2025 (directive UE 2022/542).", level: "green"},
    {text: "Centre Pompidou fermé pour rénovation jusqu'en 2030. Impact temporaire sur marché parisien.", level: "orange"},
    {text: "Afrique du Sud — Zeitz MOCAA, plus grand musée art contemporain africain. Investec Cape Town Art Fair.", level: "green"},
    {text: "Restitution — Débat en cours sur retour des œuvres africaines. Rapport Sarr-Savoy (2018) influent.", level: "orange"}
  ],

  marketTrends: [
    {label: "Marché mondial art", value: "$67.8 Mds", trend: "↑ +3%"},
    {label: "Art africain contemporain", value: "$1.5 Mds est.", trend: "↑ +46% (2013-2023)"},
    {label: "Ultra-contemporain africain", value: "$40.6M (enchères)", trend: "↑ depuis $16.2M (2020)"},
    {label: "France (#1 UE)", value: "$4.5 Mds", trend: "↑ +9%"},
    {label: "Royaume-Uni (référence)", value: "$10.5 Mds", trend: "→ stable"},
    {label: "Prêts art-backed", value: "$34-40 Mds", trend: "↑ +12%/an"},
    {label: "Ventes privées (maisons enchères)", value: "$3.9 Mds", trend: "↑ +2%"},
    {label: "Art en ligne", value: "$11.8 Mds", trend: "↑ croissance continue"}
  ]
};

// --- TABS ---
export const DIWANE_TABS: DiwaneTabDef[] = [
  {id: "overview", label: "Vue d'ensemble"},
  {id: "artists", label: "Artistes"},
  {id: "galleries", label: "Galeries"},
  {id: "museums", label: "Musées"},
  {id: "auctions", label: "Enchères"},
  {id: "fairs", label: "Foires"},
  {id: "finance", label: "Art Finance"},
  {id: "regulation", label: "Régulation"},
  {id: "collectors", label: "Collectionneurs"},
  {id: "education", label: "Éducation"}
];

// --- COUNTRY DATA ---
export const DIWANE_COUNTRIES: DiwaneCountryArt[] = [
  // ========================================================================
  // P0 — MAROC (Priorité ABSOLUE)
  // ========================================================================
  {
    id: "MA",
    name: "Maroc",
    region: "africa",
    marketOverview: "Le Maroc est le hub art #1 d'Afrique du Nord. Marrakech est devenue une destination mondiale pour l'art contemporain avec 1-54, Artcurial à La Mamounia, et un réseau de galeries de classe internationale. L'École de Casablanca (années 60) a fondé l'identité artistique moderne du pays. Le marché est porté par des collectionneurs marocains et du Golfe, avec un intérêt croissant pour l'art contemporain africain.",
    marketSize: "~€50M (estimé, enchères + galeries + foires)",
    artMovements: ["École de Casablanca (1960s)", "Art moderne marocain", "Calligraphie contemporaine", "Street art Casablanca", "Art contemporain africain (1-54)"],
    artists: [
      {name: "Mohamed Melehi", born: "1936", died: "2020", medium: "Peinture — série Vagues, sérigraphie", movement: "École de Casablanca", auctionRecord: "€166,455 (Artcurial 2025, record mondial)", galleries: ["Comptoir des Mines Galerie"], collections: ["MMVI Rabat", "MACAAL", "Tate Modern"], significance: "Co-fondateur de l'École de Casablanca. A étudié au Bauhaus. Ses 'Vagues' sont iconiques de l'art moderne marocain. 100% de lots vendus chez Artcurial."},
      {name: "Farid Belkahia", born: "1934", died: "2014", medium: "Cuivre, cuir, pigments naturels", movement: "École de Casablanca", auctionRecord: "Ventes régulières chez Artcurial et Piasa", galleries: ["Comptoir des Mines Galerie"], collections: ["MMVI Rabat", "Centre Pompidou", "British Museum"], significance: "Directeur de l'École des Beaux-Arts de Casablanca (1962-74). Pionnier de l'utilisation du cuivre et du cuir comme supports artistiques."},
      {name: "Chaïbia Tallal", born: "1929", died: "2004", medium: "Peinture naïve / expressionniste", movement: "Art naïf marocain", auctionRecord: "Records chez Artcurial 2025", galleries: ["Atelier 21"], collections: ["MMVI Rabat", "Collections privées internationales"], significance: "Autodidacte. L'une des rares femmes artistes marocaines de sa génération à avoir acquis une renommée internationale."},
      {name: "Jilali Gharbaoui", born: "1930", died: "1971", medium: "Peinture abstraite, encre de Chine", movement: "Art abstrait marocain", auctionRecord: "Record mondial à Artcurial pour encre de Chine (€22,800)", galleries: ["Collections muséales"], collections: ["MMVI Rabat"], significance: "Premier peintre abstrait marocain. Formation à l'Académie des Beaux-Arts de Rome et à l'atelier de Jean Bazaine à Paris."},
      {name: "Hassan El Glaoui", born: "1924", died: "2018", medium: "Peinture — fantasia, cavaliers", movement: "Art moderne marocain", auctionRecord: "€49,379 (Chevaux, Artcurial 2025)", galleries: ["Atelier 21", "Loft Art Gallery"], collections: ["MMVI Rabat", "Collections royales"], significance: "Fils du Pacha El Glaoui. Ses scènes de fantasia sont emblématiques du Maroc. Touria El Glaoui (sa fille) a fondé la foire 1-54."},
      {name: "Ahmed Cherkaoui", born: "1934", died: "1967", medium: "Peinture abstraite, signes berbères", movement: "École de Casablanca", auctionRecord: "Œuvres en collections muséales", galleries: ["Collections muséales"], collections: ["MMVI Rabat", "Institut du Monde Arabe Paris"], significance: "A fusionné calligraphie arabe, signes berbères et abstraction occidentale. Mort prématurément à 33 ans."},
      {name: "Mohammed Kacimi", born: "1942", died: "2003", medium: "Peinture, installation", movement: "Art engagé marocain", auctionRecord: "Exposé régulièrement chez Comptoir des Mines", galleries: ["Comptoir des Mines Galerie"], collections: ["MMVI Rabat"], significance: "Artiste activiste engagé sur l'Irak, la Palestine, l'Afrique de l'Ouest. Héritage perpétué par les artistes contemporains marocains."},
      {name: "Mehdi Qotbi", born: "1951", medium: "Peinture — calligraphie abstraite", movement: "Art contemporain marocain", galleries: ["Expositions institutionnelles"], collections: ["MMVI Rabat", "Collections présidentielles"], significance: "Président de la Fondation Nationale des Musées (FNM). Figure politique de l'art au Maroc. Influence directe sur les politiques muséales nationales."},
      {name: "Mahi Binebine", born: "1959", medium: "Sculpture, peinture", movement: "Art contemporain marocain", galleries: ["Galerie 208 Marrakech"], collections: ["MMVI Rabat", "Musée d'Art Moderne Paris"], significance: "Devait co-commissarier le pavillon marocain à la Biennale de Venise 2023. Exposition majeure au Mandarin Oriental Marrakech (2025)."},
      {name: "Mounir Fatmi", born: "1970", medium: "Vidéo, installation, sculpture", movement: "Art contemporain", galleries: ["Goodman Gallery", "Galerie Hussenot Paris"], collections: ["Centre Pompidou", "Brooklyn Museum", "Barjeel Art Foundation"], significance: "L'un des artistes contemporains marocains les plus exposés internationalement. Travail sur l'identité, la technologie et la géopolitique."},
      {name: "Hassan Hajjaj", born: "1961", medium: "Photographie, installation pop", movement: "Pop art marocain", galleries: ["MACAAL", "Third Line Dubai"], collections: ["LACMA", "V&A London", "Brooklyn Museum"], significance: "Surnommé 'Andy Warhol d'Afrique du Nord'. Mélange culture pop, haute couture et identité marocaine."},
      {name: "Sara Benabdallah", born: "1990s", medium: "Peinture, art textile", movement: "Jeune génération marocaine", galleries: ["Nil Gallery Paris"], significance: "Fusion tradition-modernité. Symbolisme visuel et intellectuel. Exposée à 1-54 Marrakech 2025."},
      {name: "Fatiha Zemmouri", medium: "Installation, mixed media", movement: "Art contemporain marocain", galleries: ["Comptoir des Mines Galerie"], significance: "Artiste majeure du circuit Comptoir des Mines. Exposée à MENART Fair, Art Dubai, 1-54."},
      {name: "Khadija Jayi", medium: "Peinture, installation", movement: "Art contemporain marocain", galleries: ["Comptoir des Mines Galerie"], significance: "Présentée régulièrement par Comptoir des Mines à Art Dubai et MENART Fair."},
      {name: "Mustapha Akrim", medium: "Sculpture, installation conceptuelle", movement: "Art contemporain marocain", galleries: ["Comptoir des Mines Galerie"], significance: "Héritier conceptuel de Melehi. Projet 'Back to Mexico' au Comptoir des Mines."}
    ],
    galleries: [
      {name: "Atelier 21", city: "Casablanca", founded: "2008", specialty: "Art moderne et contemporain marocain, artistes de la diaspora", artists: ["Chaïbia Tallal", "Hassan El Glaoui", "Artistes diaspora"], website: "atelier21.ma", fairs: ["1-54 Marrakech"]},
      {name: "Comptoir des Mines Galerie (CMG)", city: "Marrakech", founded: "2018", specialty: "Art moderne et contemporain marocain, dialogue historique-contemporain", artists: ["Mohamed Melehi", "Mohammed Kacimi", "Farid Belkahia", "Mustapha Akrim", "Fatiha Zemmouri", "Khadija Jayi"], website: "cmgmarrakech.com", fairs: ["1-54 Marrakech", "Art Dubai", "MENART Fair", "Zonamaco"]},
      {name: "Loft Art Gallery", city: "Casablanca + Marrakech", founded: "2009", director: "Hiba Tahri", specialty: "Art contemporain marocain, programmation all-Moroccan", artists: ["Amina Agueznay", "Samy Snoussi", "Nassim Azarzar", "Bouchra Boudoua"], website: "loftartgallery.net", fairs: ["1-54 Marrakech"]},
      {name: "Galerie Venise Cadre", city: "Casablanca", specialty: "Art moderne marocain, encadrement et galerie historique"},
      {name: "MACAAL", city: "Marrakech", founded: "2016", specialty: "Musée/galerie privé d'art contemporain africain", artists: ["Hassan Hajjaj", "Artistes panafricains"], website: "macaal.org", fairs: ["1-54 Marrakech"]},
      {name: "Galerie 208", city: "Marrakech", specialty: "Art contemporain, expositions au Mandarin Oriental"},
      {name: "So Gallery", city: "Casablanca", fairs: ["1-54 Marrakech"]},
      {name: "Le Cube", city: "Rabat", specialty: "Espace alternatif d'art contemporain"},
      {name: "Le Kulte", city: "Rabat", specialty: "Art contemporain et expérimental"},
      {name: "Appartement 22", city: "Rabat", specialty: "Espace indépendant d'art, résidences"}
    ],
    museums: [
      {name: "MMVI — Musée Mohammed VI d'Art Moderne et Contemporain", city: "Rabat", type: "Musée national", collection: "Art moderne et contemporain marocain et africain. Premier musée des beaux-arts du Maroc.", visitors: "~200,000/an", website: "museemohammed6.ma"},
      {name: "MACAAL — Museum of African Contemporary Art Al Maaden", city: "Marrakech", type: "Musée privé", collection: "Art contemporain panafricain, collection Lazraq", website: "macaal.org"},
      {name: "Fondation Nationale des Musées (FNM)", city: "Rabat", type: "Institution nationale", collection: "Réseau de musées nationaux sous la présidence de Mehdi Qotbi"},
      {name: "La Villa des Arts", city: "Rabat + Casablanca", type: "Centre d'art", collection: "Expositions temporaires d'art contemporain marocain"},
      {name: "Musée de Marrakech", city: "Marrakech", type: "Musée historique et art", collection: "Art marocain dans un palais du XIXe siècle"}
    ],
    auctionHouses: [
      {name: "Artcurial Maroc", city: "Marrakech (La Mamounia)", specialty: "Leader mondial pour Majorelle, art orientaliste, art moderne marocain, art contemporain africain", majorSales: ["A Moroccan Winter (€2.2M déc 2025, €3M déc 2024)", "Moroccan & African Spirit (€2M nov 2025)", "A Moroccan Spring (mai 2026)", "Records Melehi €166,455, Mona Saudi €142,000, Paul-Élie Dubois €111,140"]},
      {name: "Piasa", city: "Paris", specialty: "Orientalisme, art moderne Afrique du Nord"},
      {name: "Sotheby's", city: "London/Doha", specialty: "Modern & Contemporary Arab Art (ventes annuelles)"},
      {name: "Bonhams", city: "London", specialty: "Africa Now (art africain moderne et contemporain)"},
      {name: "Christie's", city: "Paris", specialty: "Art du Moyen-Orient et Afrique du Nord (occasionnel)"}
    ],
    artFairs: [
      {name: "1-54 Contemporary African Art Fair", city: "Marrakech (La Mamounia)", frequency: "Annuel (février)", significance: "6e édition 2025, 30+ galeries de 15 pays, plus grande foire d'art africain au Maroc"},
      {name: "MENART Fair", city: "Marrakech + Paris", frequency: "Annuel", significance: "Art du monde arabe, focus femmes artistes"},
      {name: "Art Dubai", city: "Dubai", significance: "CMG y participe pour sa 5e fois (2025). Pont Maroc-Golfe."}
    ],
    artFinance: [
      {institution: "Crédit du Maroc", type: "Banque commerciale", services: "Partenaire potentiel Art Lombard Credit DIWANE", contact: "Kenza Bensallah"},
      {institution: "Bank of Africa", type: "Banque panafricaine", services: "Potentiel prêts art-backed pour collectionneurs marocains"},
      {institution: "Al Barid Bank", type: "Banque postale", services: "Micro-finance art pour artistes émergents"},
      {institution: "Société Générale Private Banking", type: "Banque privée (référence internationale)", services: "Art Banking complet : acquisition, vente, expertise, inventaire, assurance, succession, philanthropie", contact: "Laurent Issaurat (Head of Art Banking)"}
    ],
    regulation: {
      vatRate: "TVA 20% (taux normal), pas de taux réduit spécifique à l'art",
      droitDeSuite: "Non appliqué au Maroc",
      exportRules: "Autorisation requise pour œuvres du patrimoine national (loi 22-80)",
      heritageProtection: "Loi 22-80 sur la conservation des monuments historiques",
      antiMoneyLaundering: "Loi 12-18 relative à la lutte contre le blanchiment"
    },
    collectors: [
      {name: "Famille El Kadiri (collection fondateur)", type: "Privé", focus: "Art moderne marocain, École de Casablanca", publicAccess: false},
      {name: "Fondation Alliances", type: "Fondation", focus: "Art contemporain marocain", publicAccess: true},
      {name: "Famille Lazraq (MACAAL)", type: "Privé / Musée", focus: "Art contemporain panafricain", collectionSize: "2000+ œuvres", publicAccess: true},
      {name: "Collection Fondation ONA", type: "Fondation corporate", focus: "Art moderne marocain"}
    ],
    artEducation: [
      {name: "École des Beaux-Arts de Casablanca", city: "Casablanca", type: "École supérieure d'art"},
      {name: "INBA — Institut National des Beaux-Arts", city: "Tétouan", type: "École nationale"},
      {name: "École Supérieure des Arts Visuels", city: "Marrakech", type: "Formation privée"}
    ]
  },

  // ========================================================================
  // P0 — NIGERIA
  // ========================================================================
  {
    id: "NG",
    name: "Nigeria",
    region: "africa",
    marketOverview: "Le Nigeria possède le plus grand marché de l'art en Afrique subsaharienne. Lagos Art Week est un événement mondial. Le pays a une tradition artistique remontant aux bronzes du Bénin et aux sculptures Nok. Le modernisme nigérian (Zaria Art Society, 1958) a fondé une identité artistique indépendante. La nouvelle génération d'artistes atteint des prix records à l'international.",
    marketSize: "~$200M (estimé, plus grand marché d'Afrique subsaharienne)",
    artMovements: ["Zaria Art Society (1958)", "École d'Oshogbo", "Mbari Club (1961)", "Lagos Contemporary", "Nigerian Modernism (Tate Modern 2025)"],
    artists: [
      {name: "Ben Enwonwu", born: "1917", died: "1994", medium: "Sculpture, peinture", movement: "Modernisme nigérian", auctionRecord: "£1.2M (Tutu, Bonhams 2018)", galleries: ["Collections muséales"], collections: ["National Museum Lagos", "Tate Modern", "Smithsonian"], significance: "Pionnier de l'art moderne nigérian. Anyanwu sur la façade du National Museum Lagos. Tutu (1974) redécouvert et vendu £1.2M."},
      {name: "El Anatsui", born: "1944", medium: "Sculpture — capsules aluminium, tapisseries métalliques", movement: "Art contemporain ghanéen-nigérian", auctionRecord: "£541,250 (New World Map, Bonhams 2012)", galleries: ["October Gallery London", "Jack Shainman Gallery NY"], collections: ["Met", "Pompidou", "British Museum", "Smithsonian"], significance: "Transforme des déchets en tapisseries monumentales. L'un des artistes africains les plus cotés au monde. Vit et travaille au Nigeria."},
      {name: "Njideka Akunyili Crosby", born: "1983", medium: "Peinture, collage, transfert photo", movement: "Art contemporain diaspora", auctionRecord: "~$3.4M — Christie's", galleries: ["Victoria Miro London", "David Zwirner NY"], collections: ["Whitney Museum", "Tate Modern", "LACMA"], significance: "Née au Nigeria, basée à LA. Combine imagerie nigériane et techniques occidentales. Parmi les artistes contemporains les plus cotés."},
      {name: "Yinka Shonibare CBE RA", born: "1962", medium: "Installation, sculpture, textile wax", movement: "Art postcolonial", galleries: ["Stephen Friedman Gallery London", "James Cohan NY"], collections: ["Tate", "MoMA", "Smithsonian"], significance: "Nominé Turner Prize. CBE. Fondateur de GAS Foundation Lagos (2019). Questionne l'identité postcoloniale avec textiles wax."},
      {name: "Toyin Ojih Odutola", born: "1985", medium: "Dessin (stylo, pastel, fusain)", movement: "Art contemporain", galleries: ["Jack Shainman Gallery NY"], collections: ["Whitney Museum", "Smithsonian", "MoMA"], significance: "Dessins narratifs explorant race, genre, classe. Major solo show au Whitney (2017)."},
      {name: "Bruce Onobrakpeya", born: "1932", medium: "Gravure, estampe (techniques innovantes)", movement: "Zaria Art Society", galleries: ["Collections muséales"], collections: ["Vatican Museum", "V&A London", "Tate Modern"], significance: "93 ans. Fils de sculpteur Urhobo. Innovations en gravure. Zaria Art Society 1958. Exposé à Tate Modern 2025."},
      {name: "Uche Okeke", born: "1933", died: "2016", medium: "Dessin, peinture (tradition Uli)", movement: "Zaria Art Society", collections: ["National Museum Lagos", "Smithsonian"], significance: "Fondateur de la Zaria Art Society. Tradition Uli (dessins corporels Igbo) comme langage artistique moderne."},
      {name: "Yusuf Grillo", born: "1934", died: "2021", medium: "Peinture", movement: "Lagos Modernism", collections: ["National Museum Lagos"], significance: "Pionnier du modernisme de Lagos. Ses peintures de marchés et de vie quotidienne définissent l'identité artistique de Lagos."},
      {name: "J.D. 'Okhai Ojeikere", born: "1930", died: "2014", medium: "Photographie (coiffures nigérianes)", movement: "Photographie documentaire", auctionRecord: "Collections muséales internationales", collections: ["Tate", "Centre Pompidou", "MoMA"], significance: "A documenté les coiffures traditionnelles nigérianes pendant 40 ans. Plus de 1000 portraits de coiffures."},
      {name: "Nengi Omuku", medium: "Peinture sur sanyan (tissu Yoruba)", movement: "Art contemporain Lagos", galleries: ["Kasmin Gallery NY", "Pippy Houldsworth London"], significance: "Peint sur sanyan (Aso-oke Yoruba). Basée à Lagos. Thèmes : héritage, psychologie intérieure."}
    ],
    galleries: [
      {name: "Rele Gallery", city: "Lagos + Los Angeles + London", director: "Adenrele Sonariwo", specialty: "Art contemporain africain cutting-edge", artists: ["Artistes émergents africains"], website: "relegallerylondon.com", fairs: ["Art X Lagos", "1-54 London"]},
      {name: "Nike Art Gallery", city: "Lagos (Lekki)", director: "Chief Nike Davies-Okundaye", specialty: "Art nigérian traditionnel et contemporain, 30,000+ œuvres sur 4 étages", artists: ["Artistes nigérians multidisciplinaires"], website: "nikeart.com"},
      {name: "kó Art Space", city: "Lagos", specialty: "Art moderne et contemporain nigérian, modernistes des années 40-80", artists: ["Artistes modernistes et contemporains nigérians"], fairs: ["Art X Lagos"]},
      {name: "SMO Contemporary Art", city: "Lagos", specialty: "Art contemporain africain et diaspora"},
      {name: "Tafeta Gallery", city: "Lagos + London", specialty: "Art contemporain africain et diaspora", fairs: ["1-54 London", "Art X Lagos"]},
      {name: "Tiwani Contemporary", city: "Lagos + London", specialty: "Art contemporain africain", artists: ["Nifemi Marcus-Bello"]},
      {name: "GAS Foundation (Guest Artists Space)", city: "Lagos", founded: "2019", director: "Yinka Shonibare CBE", specialty: "Ateliers, échanges culturels internationaux, résidences"}
    ],
    museums: [
      {name: "Nike Art Gallery Lagos", city: "Lagos (Lekki)", type: "Galerie/Musée privé", collection: "30,000+ œuvres : peintures, sculptures, textiles, masques, perles. Plus grande galerie d'Afrique de l'Ouest.", visitors: "Ouvert 7j/7"},
      {name: "National Museum Lagos", city: "Lagos (Onikan)", type: "Musée national", collection: "Art et artefacts nigérians. Sculpture Anyanwu d'Enwonwu sur la façade."},
      {name: "MUSON Centre", city: "Lagos", type: "Centre culturel", collection: "Musique, art, événements culturels"},
      {name: "Museum of West African Art (MOWAA)", city: "Benin City", type: "Musée (en construction)", collection: "Art ouest-africain. Architecte : Sir David Adjaye. Accueillera le Pavillon Nigeria de la Biennale de Venise 2024."}
    ],
    auctionHouses: [
      {name: "Arthouse Contemporary Lagos", city: "Lagos", specialty: "Première maison d'enchères nigériane spécialisée art moderne et contemporain ouest-africain (fondée 2007 par Kavita Chellaram)", majorSales: ["Peintures Enwonwu : de 1.5M Naira (2008) à 20M Naira (2018)"]},
      {name: "Bonhams — Africa Now", city: "London", specialty: "Art africain moderne et contemporain", majorSales: ["Enwonwu Tutu £1.2M (2018)", "El Anatsui New World Map £541,250 (2012)", "Enwonwu Anyanwu £133,350"]},
      {name: "Sotheby's", city: "London/New York", specialty: "Modern & Contemporary African Art"},
      {name: "Christie's", city: "London/New York", specialty: "African art (occasionnel)"}
    ],
    artFairs: [
      {name: "Art X Lagos", city: "Lagos (Federal Palace)", frequency: "Annuel (novembre)", significance: "10e anniversaire 2025. Fondée par Tokini Peterside-Schwebig. Ancre de Lagos Art Week."},
      {name: "Lagos Art Week", city: "Lagos", frequency: "Annuel (novembre)", significance: "Semaine complète d'événements, ouvertures, collections privées ouvertes"}
    ],
    artFinance: [
      {institution: "Arthouse Contemporary", type: "Maison d'enchères / Conseil", services: "Marché secondaire transparent pour art ouest-africain"},
      {institution: "Access Bank Art Collection", type: "Collection corporate", services: "Programme d'acquisition d'art nigérian"}
    ],
    regulation: {
      vatRate: "TVA 7.5% (taux standard, pas de réduction art)",
      exportRules: "National Commission for Museums and Monuments régule les exportations d'antiquités",
      heritageProtection: "NCMM Act — protection du patrimoine culturel",
      culturalRestitution: "Négociations en cours pour retour des bronzes du Bénin (Smithsonian, British Museum partiellement restitués)"
    },
    collectors: [
      {name: "Femi Akinsanya", type: "Privé", focus: "Art ancien à moderne nigérian, sculptures à maîtres modernes"},
      {name: "Kavita Chellaram", type: "Privé / Fondatrice Arthouse", focus: "Modernistes nigérians depuis les années 1970"},
      {name: "Adeniyi Adenubi", type: "Privé (financier)", focus: "Demas Nwoko, modernistes nigérians"},
      {name: "Prince Yemisi Shyllon", type: "Privé / Musée", focus: "Art africain, fondation à UNILAG", collectionSize: "7000+ œuvres", publicAccess: true}
    ],
    artEducation: [
      {name: "Ahmadu Bello University (Zaria)", city: "Zaria", type: "Département des Beaux-Arts (Zaria Art Society)"},
      {name: "University of Nigeria Nsukka", city: "Nsukka", type: "Département des Beaux-Arts (El Anatsui y a enseigné)"},
      {name: "Yaba College of Technology", city: "Lagos", type: "Département d'art et design"}
    ]
  },

  // ========================================================================
  // P0 — FRANCE (#1 marché art UE)
  // ========================================================================
  {
    id: "FR",
    name: "France",
    region: "eu",
    marketOverview: "La France est le #1 marché de l'art dans l'UE avec $4.5 Mds de ventes en 2025 (+9%). Paris a reconquis sa position de capitale européenne de l'art, surpassant les niveaux pré-pandémie. Le lancement d'Art Basel Paris (oct 2025) a consolidé cette position. Christie's, Sotheby's, et les maisons françaises (Artcurial, Piasa, Drouot) constituent un écosystème de vente dense.",
    marketSize: "$4.5 Mds (2025, +9% — Art Basel/UBS Report 2026)",
    artMovements: ["Impressionnisme", "Art nouveau", "Cubisme", "Surréalisme", "Art informel", "Nouveau réalisme", "Support/Surface", "Art contemporain international"],
    artists: [
      {name: "Daniel Buren", born: "1938", medium: "Installation, peinture (bandes)", significance: "Colonnes de Buren au Palais-Royal. Artiste conceptuel majeur."},
      {name: "Pierre Soulages", born: "1919", died: "2022", medium: "Peinture (Outrenoir)", auctionRecord: "€10.2M — Christie's", significance: "Maître de l'Outrenoir. Musée Soulages à Rodez."},
      {name: "Annette Messager", born: "1943", medium: "Installation, textile", significance: "Lion d'Or Biennale de Venise 2005."},
      {name: "Christian Boltanski", born: "1944", died: "2021", medium: "Installation, mémoire", significance: "Art de la mémoire et de l'absence. Monumenta 2010."},
      {name: "JR", born: "1983", medium: "Photographie, art urbain monumental", galleries: ["Perrotin"], significance: "Street artist global. Projets Inside Out, Women Are Heroes."},
      {name: "Camille Henrot", born: "1978", medium: "Sculpture, vidéo, installation", galleries: ["Kamel Mennour"], significance: "Lion d'Argent Biennale de Venise 2013. 9 nominés Marcel Duchamp via Mennour."},
      {name: "Kader Attia", born: "1970", medium: "Installation, sculpture", galleries: ["Kamel Mennour"], significance: "Marcel Duchamp Prize 2016. Travail sur la réparation et le postcolonial."},
      {name: "Mohamed Bourouissa", born: "1978", medium: "Photographie, vidéo, installation", galleries: ["Kamel Mennour"], significance: "Artiste franco-algérien. Périphéries, identités urbaines."}
    ],
    galleries: [
      {name: "Perrotin", city: "Paris (Le Marais) + global", founded: "1990", director: "Emmanuel Perrotin", specialty: "Art contemporain international de premier plan", artists: ["Takashi Murakami", "JR", "Sophie Calle", "Daniel Arsham"], website: "perrotin.com", fairs: ["Art Basel Paris", "Art Basel", "Frieze"]},
      {name: "Kamel Mennour", city: "Paris (4 espaces)", founded: "1999", director: "Kamel Mennour", specialty: "Art contemporain, 9 nominés Marcel Duchamp, don 180 œuvres au MAM Paris", artists: ["Anish Kapoor", "Camille Henrot", "Mohamed Bourouissa", "Kader Attia", "Hicham Berrada"], website: "kamelmennour.com", fairs: ["Art Basel Paris", "Art Basel"]},
      {name: "Templon", city: "Paris (Concorde + Marais) + Bruxelles", founded: "1966", director: "Daniel Templon", specialty: "Institution de l'art contemporain, historiquement Basquiat/Haring/Warhol", artists: ["Omar Ba", "Chiharu Shiota", "Kehinde Wiley"], website: "templon.com", fairs: ["Art Basel Paris", "FIAC historique"]},
      {name: "Galerie Lelong & Co.", city: "Paris + New York", specialty: "Art moderne et contemporain de premier plan", artists: ["David Hockney", "Nalini Malani", "Etel Adnan"]},
      {name: "Marian Goodman", city: "Paris + New York + London", specialty: "Art contemporain international majeur", artists: ["Gerhard Richter", "Steve McQueen", "William Kentridge"]},
      {name: "Almine Rech", city: "Paris + global", specialty: "Art moderne et contemporain", fairs: ["Art Basel Paris"]},
      {name: "Thaddaeus Ropac", city: "Paris + Salzburg + London + Seoul", specialty: "Art moderne, post-war et contemporain", artists: ["Georg Baselitz", "Alex Katz", "Robert Rauschenberg"]},
      {name: "Chantal Crousel", city: "Paris", specialty: "Art contemporain international", fairs: ["Art Basel Paris"]},
      {name: "Nathalie Obadia", city: "Paris + Bruxelles", specialty: "Art contemporain, focus Afrique et diaspora", fairs: ["Art Basel Paris"]},
      {name: "Piasa Rive Gauche", city: "Paris", specialty: "Design et art moderne"}
    ],
    museums: [
      {name: "Musée du Louvre", city: "Paris", type: "Musée national", collection: "Le musée le plus visité au monde. 380,000 objets, 35,000 exposés.", visitors: "~8.9M/an", website: "louvre.fr"},
      {name: "Musée d'Orsay", city: "Paris", type: "Musée national", collection: "Art impressionniste et post-impressionniste. Monet, Renoir, Van Gogh, Cézanne.", visitors: "~3.6M/an"},
      {name: "Centre Pompidou", city: "Paris", type: "Musée national", collection: "Art moderne et contemporain. Plus grande collection en Europe. FERMÉ pour rénovation jusqu'en 2030.", visitors: "Fermé (habituellement ~3M/an)"},
      {name: "Musée du Quai Branly — Jacques Chirac", city: "Paris", type: "Musée national", collection: "Arts et civilisations d'Afrique, Asie, Océanie, Amériques. Majeure collection d'art africain en Europe.", visitors: "~1.2M/an"},
      {name: "Fondation Louis Vuitton", city: "Paris (Bois de Boulogne)", type: "Fondation privée", collection: "Art contemporain international. Bâtiment Frank Gehry.", visitors: "~1.5M/an"},
      {name: "Palais de Tokyo", city: "Paris", type: "Centre d'art contemporain", collection: "Plus grand centre d'art contemporain en Europe. Expositions temporaires."},
      {name: "Musée d'Art Moderne de Paris (MAM)", city: "Paris", type: "Musée municipal", collection: "Art moderne et contemporain. Don Kamel Mennour 180 œuvres (exposition 2027)."},
      {name: "Pinault Collection — Bourse de Commerce", city: "Paris", type: "Fondation privée", collection: "Collection François Pinault. Art contemporain dans la Bourse de Commerce restaurée par Tadao Ando."}
    ],
    auctionHouses: [
      {name: "Christie's Paris", city: "Paris", specialty: "Toutes catégories, investissement massif dans le marché parisien", majorSales: ["7 des 10 œuvres les plus chères vendues en France en 2024", "Monet Nymphéas €15.3M"]},
      {name: "Sotheby's Paris", city: "Paris", specialty: "Toutes catégories, présence renforcée"},
      {name: "Artcurial", city: "Paris + Marrakech", specialty: "Leader français, orientalisme, Moroccan art, art moderne", majorSales: ["Rodin Le Penseur €9.8M (2024)", "Records Melehi, Majorelle, Glaoui"]},
      {name: "Piasa", city: "Paris", specialty: "Art orientaliste, design, art moderne"},
      {name: "Drouot", city: "Paris", specialty: "Complexe historique de 16 salles de vente, 60+ commissaires-priseurs. Plus ancienne maison d'enchères de France."}
    ],
    artFairs: [
      {name: "Art Basel Paris", city: "Paris (Grand Palais)", frequency: "Annuel (octobre)", significance: "Lancé oct 2025, remplace FIAC. Validation institutionnelle du marché français."},
      {name: "Paris Photo", city: "Paris", frequency: "Annuel (novembre)", significance: "Plus grande foire de photographie au monde"},
      {name: "AKAA — Also Known As Africa", city: "Paris", frequency: "Annuel", significance: "Foire d'art contemporain africain à Paris"},
      {name: "Salon du Dessin", city: "Paris", frequency: "Annuel", significance: "Référence mondiale du dessin ancien et moderne"},
      {name: "Drawing Now", city: "Paris", frequency: "Annuel", significance: "Foire de dessin contemporain"}
    ],
    artFinance: [
      {institution: "BNP Paribas Wealth Management", type: "Banque privée", services: "Art Advisory, conseil en collection, structuration patrimoniale art"},
      {institution: "Société Générale Private Banking Art Banking", type: "Banque privée", services: "Acquisition, vente, expertise, inventaire, assurance, succession, philanthropie art", contact: "Laurent Issaurat (Head of Art Banking)"},
      {institution: "Sotheby's Financial Services", type: "Prêts art-backed", services: "Prêts $5M-$250M, portefeuille ~$2 Mds"},
      {institution: "Athena Art Finance", type: "Prêteur spécialisé", services: "Prêts art-backed spécialisés, évaluation œuvre par œuvre"}
    ],
    regulation: {
      vatRate: "TVA 5.5% sur l'art (depuis jan 2025, loi finances 2024 transposant directive UE 2022/542). Ancien régime : TVA sur marge à 20%.",
      droitDeSuite: "Droit de suite 4% sur reventes (depuis 1920, code propriété intellectuelle art. L122-8). Directive EU 2001/84/CE.",
      exportRules: "Certificat d'exportation requis pour trésors nationaux. Contrôle des biens culturels.",
      importRules: "TVA 5.5% à l'importation d'œuvres d'art (taux réduit)",
      heritageProtection: "Code du patrimoine. Classement monuments historiques. Dation en paiement.",
      antiMoneyLaundering: "5ème directive anti-blanchiment EU transposée. Obligations de vigilance pour marchands d'art >€10,000.",
      taxOnSales: "Article 238 bis AB : déduction fiscale pour entreprises achetant des œuvres d'artistes vivants (prolongé jusqu'en 2025)"
    },
    collectors: [
      {name: "François Pinault", type: "Privé / Fondation", focus: "Art contemporain international", collectionSize: "10,000+ œuvres", publicAccess: true},
      {name: "Bernard Arnault (LVMH)", type: "Privé / Fondation", focus: "Art contemporain, Fondation Louis Vuitton", publicAccess: true},
      {name: "Collection Cartier (Fondation Cartier)", type: "Fondation corporate", focus: "Art contemporain, art africain", publicAccess: true}
    ],
    artEducation: [
      {name: "École des Beaux-Arts de Paris (ENSBA)", city: "Paris", type: "Grande école d'art"},
      {name: "École des Arts Décoratifs (ENSAD)", city: "Paris", type: "Grande école d'art appliqué"},
      {name: "Villa Arson", city: "Nice", type: "Centre national d'art contemporain et école"},
      {name: "ENSBA Lyon", city: "Lyon", type: "École nationale des beaux-arts"}
    ]
  },

  // ========================================================================
  // P0 — GHANA (Hub art émergent)
  // ========================================================================
  {
    id: "GH",
    name: "Ghana",
    region: "africa",
    marketOverview: "Le Ghana est devenu un hub art émergent majeur en Afrique de l'Ouest. Ibrahim Mahama a été nommé #1 du ArtReview Power 100 en 2024 — premier artiste africain à occuper cette position. Accra abrite Gallery 1957 et la Nubuke Foundation. Tamale émerge comme pôle culturel grâce aux institutions de Mahama.",
    marketSize: "~$20M (estimé, en croissance rapide)",
    artMovements: ["Art contemporain ghanéen", "blaxTARLINES (collectif expérimental)", "Fantôme Noire", "Tamale Cultural Renaissance"],
    artists: [
      {name: "El Anatsui", born: "1944", medium: "Sculpture — capsules aluminium, tapisseries métalliques", movement: "Art contemporain ghanéen-nigérian", auctionRecord: "£541,250 (New World Map, Bonhams)", galleries: ["October Gallery London", "Jack Shainman Gallery NY"], collections: ["Met", "Pompidou", "British Museum", "Smithsonian"], significance: "Né au Ghana. Professeur à University of Nigeria Nsukka. Transforme déchets industriels en tapisseries monumentales."},
      {name: "Ibrahim Mahama", born: "1987", medium: "Installation — jute, lits d'hôpital, wagons", movement: "blaxTARLINES", galleries: ["White Cube", "Gallery 1957"], collections: ["Tate Modern", "Centre Pompidou"], significance: "#1 ArtReview Power 100 (2024), premier artiste africain. A construit 3 institutions à Tamale : SCCA, Red Clay Studio, Nkrumah Volini. Expositions à White Cube NY, Barbican, Fruitmarket Edinburgh."},
      {name: "Serge Attukwei Clottey", born: "1985", medium: "Installation, performance — jerricans jaunes", movement: "Afrogallonism", galleries: ["Gallery 1957", "Simchowitz Gallery"], significance: "Performance avec jerricans jaunes symbolisant la crise de l'eau au Ghana. Art activiste et communautaire."},
      {name: "Lynette Yiadom-Boakye", born: "1977", medium: "Peinture — portraits fictionnels", movement: "Art contemporain britanno-ghanéen", auctionRecord: "~£1.5M — Christie's", galleries: ["Corvi-Mora London", "Jack Shainman NY"], collections: ["Tate", "MoMA", "Carnegie Museum"], significance: "Turner Prize shortlist 2013. Peint des portraits de personnages fictifs noirs. Basée à Londres."},
      {name: "Amoako Boafo", born: "1984", medium: "Peinture — finger-painting portraits", auctionRecord: "~$3.4M — Phillips", galleries: ["Roberts Projects LA", "Mariane Ibrahim"], significance: "Peint avec ses doigts. Portraits de personnes noires célébrant la joie et la beauté. Prix en forte hausse."}
    ],
    galleries: [
      {name: "Gallery 1957", city: "Accra", specialty: "Art contemporain ghanéen et africain, représente Ibrahim Mahama", artists: ["Ibrahim Mahama", "Serge Attukwei Clottey"], website: "gallery1957.com", fairs: ["1-54 London", "Art Basel"]},
      {name: "Nubuke Foundation", city: "Accra", specialty: "Art, éducation, espace communautaire", website: "nubukefoundation.org"},
      {name: "ANO Gallery / ANO Institute of Arts and Knowledge", city: "Accra", specialty: "Art contemporain et recherche culturelle"},
      {name: "Savannah Centre for Contemporary Art (SCCA)", city: "Tamale", founded: "2019", director: "Ibrahim Mahama", specialty: "Art contemporain, résidences, recherche en Afrique du Nord Ghana"},
      {name: "Red Clay Studio", city: "Tamale", director: "Ibrahim Mahama", specialty: "Ateliers, production artistique"},
      {name: "Nkrumah Volini", city: "Tamale", director: "Ibrahim Mahama", specialty: "Centre culturel et éducatif"}
    ],
    museums: [
      {name: "National Museum of Ghana", city: "Accra", type: "Musée national", collection: "Art et artefacts ghanéens historiques et contemporains"},
      {name: "W.E.B. Du Bois Memorial Centre", city: "Accra", type: "Centre commémoratif", collection: "Bibliothèque, archives, art panafricain"},
      {name: "Museum of West African Art (MOWAA)", city: "Benin City (Nigeria, rayonnement régional)", type: "Musée (en construction)", collection: "Conçu par David Adjaye. Art ouest-africain. Pertinence régionale pour le Ghana."}
    ],
    auctionHouses: [
      {name: "Bonhams — Africa Now", city: "London", specialty: "Art africain incluant artistes ghanéens"},
      {name: "Sotheby's", city: "London/New York", specialty: "El Anatsui, Amoako Boafo"},
      {name: "Phillips", city: "London/New York", specialty: "Amoako Boafo, ultra-contemporain"}
    ],
    artFairs: [
      {name: "Chale Wote Street Art Festival", city: "Accra (Jamestown)", frequency: "Annuel", significance: "Plus grand festival d'art urbain au Ghana. Art public, musique, performance."}
    ],
    regulation: {
      heritageProtection: "National Museum Decree 1969, Ghana Museums and Monuments Board",
      exportRules: "Permis requis pour antiquités et biens culturels"
    },
    artEducation: [
      {name: "Kwame Nkrumah University of Science and Technology (KNUST)", city: "Kumasi", type: "Département des Beaux-Arts (El Anatsui y a étudié)"},
      {name: "University of Ghana (Legon)", city: "Accra", type: "Département d'art"}
    ]
  },

  // ========================================================================
  // P0 — SÉNÉGAL (Dak'Art, École de Dakar)
  // ========================================================================
  {
    id: "SN",
    name: "Sénégal",
    region: "africa",
    marketOverview: "Le Sénégal occupe une place unique grâce à Dak'Art, la plus ancienne biennale d'art en Afrique (depuis 1992). L'École de Dakar (années 60-70) a été le premier mouvement artistique post-indépendance du continent, influencé par la Négritude de Léopold Sédar Senghor. Dakar possède un écosystème institutionnel fort avec Raw Material Company, le Musée des Civilisations Noires, et le Village des Arts.",
    marketSize: "~$15M (estimé, porté par Dak'Art et institutions)",
    artMovements: ["École de Dakar (1960s-70s)", "Négritude artistique", "Laboratoire Agit'Art", "Set Setal (art urbain)", "Art contemporain sénégalais"],
    artists: [
      {name: "Ousmane Sow", born: "1935", died: "2016", medium: "Sculpture monumentale (techniques mixtes)", movement: "Art contemporain sénégalais", galleries: ["Collections muséales"], collections: ["Musée du Quai Branly", "Collections internationales"], significance: "Sculpteur monumental. Exposition mythique sur le Pont des Arts à Paris (1999). Premier artiste d'Afrique subsaharienne élu à l'Académie des Beaux-Arts de France."},
      {name: "Issa Samb (Joe Ouakam)", born: "1945", died: "2017", medium: "Installation, performance, sculpture", movement: "Laboratoire Agit'Art", collections: ["Documenta", "Collections muséales"], significance: "Co-fondateur du Laboratoire Agit'Art. Artiste multidisciplinaire radical. Documenta 13 (2012)."},
      {name: "Omar Ba", born: "1977", medium: "Peinture (huile et crayon sur carton noir)", movement: "Art contemporain sénégalais", galleries: ["Galerie Templon Paris"], significance: "Représenté par Templon, une des plus grandes galeries de Paris. Peint sur carton ondulé. Thèmes : pouvoir, spiritualité, Afrique."},
      {name: "Soly Cissé", born: "1969", medium: "Peinture, sculpture", movement: "Afrofuturisme sénégalais", galleries: ["Galerie Cécile Fakhoury"], significance: "Univers hybride homme-animal. Afrofuturisme. Exposé internationalement."},
      {name: "Omar Victor Diop", born: "1980", medium: "Photographie — autoportraits historiques", movement: "Photographie contemporaine africaine", auctionRecord: "Record mondial à Artcurial", galleries: ["Magnin-A Paris"], significance: "Série Liberty reconstituant des portraits historiques de personnages noirs. Record mondial chez Artcurial."},
      {name: "Ndary Lo", born: "1961", died: "2017", medium: "Sculpture soudée (fer, béton)", auctionRecord: "€24,677 (Marcheurs, Artcurial Marrakech)", significance: "Sculptures de marcheurs en fer soudé. Thème de la migration."},
      {name: "Viyé Diba", born: "1954", medium: "Installation, peinture, mixed media", movement: "École de Dakar / Art contemporain", significance: "Figure de la transition entre École de Dakar et art contemporain."}
    ],
    galleries: [
      {name: "Selebe Yoon Gallery", city: "Dakar", specialty: "Art contemporain sénégalais et africain, expositions Dak'Art"},
      {name: "Raw Material Company", city: "Dakar", founded: "2011", director: "Koyo Kouoh", specialty: "Centre d'art indépendant, programmation curatoriale de classe mondiale"},
      {name: "Village des Arts", city: "Dakar", specialty: "Résidences d'artistes, ateliers, espace de création communautaire"},
      {name: "Galerie Arte", city: "Dakar", specialty: "Art contemporain sénégalais"}
    ],
    museums: [
      {name: "Musée des Civilisations Noires", city: "Dakar", type: "Musée national", collection: "Art et civilisations panafricaines. Conçu par l'architecte chinois Pierre Goudiaby Atepa. Inauguré 2018.", visitors: "~100,000/an"},
      {name: "Musée Théodore Monod (IFAN)", city: "Dakar", type: "Musée d'art africain", collection: "Arts africains — masques, textiles, instruments. Labels multilingues, expositions communautaires."},
      {name: "Dak'Art Biennale (lieux multiples)", city: "Dakar", type: "Biennale / Institution", collection: "Plus ancienne biennale d'art en Afrique. 15e édition nov 2024: 58 artistes, 33 pays, thème 'The Wake', budget $2.9M, directrice artistique Salimata Diop."}
    ],
    auctionHouses: [
      {name: "Artcurial Marrakech", city: "Marrakech", specialty: "Ventes incluant artistes sénégalais (Omar Victor Diop, Ndary Lo)"},
      {name: "Piasa", city: "Paris", specialty: "Art africain contemporain incluant sénégalais"}
    ],
    artFairs: [
      {name: "Dak'Art Biennale", city: "Dakar (Ancien Palais de Justice)", frequency: "Biennal (tous les 2 ans)", significance: "Plus ancienne biennale d'art en Afrique. Fondée 1992. Plateforme de validation de l'art contemporain africain."},
      {name: "Partcours", city: "Dakar", frequency: "Annuel", significance: "Circuit galeries et ateliers de Dakar"}
    ],
    regulation: {
      heritageProtection: "Loi 71-12 du 25 janvier 1971 fixant le régime des monuments historiques",
      exportRules: "Autorisation requise pour biens culturels classés"
    },
    collectors: [
      {name: "Jean Pigozzi", type: "Privé (international)", focus: "Art contemporain africain, collection CAAC", collectionSize: "10,000+ œuvres africaines", publicAccess: false}
    ],
    artEducation: [
      {name: "École Nationale des Arts (ENA)", city: "Dakar", type: "École nationale d'art (fondée par Senghor)"},
      {name: "Manufacture des Arts Décoratifs", city: "Thiès", type: "Centre de tapisserie et arts décoratifs"}
    ]
  },

  // --- Afrique du Sud ---
  {
    id: "ZA",
    name: "Afrique du Sud",
    region: "africa",
    marketOverview: "Plus grand marché art d'Afrique australe. Zeitz MOCAA au Cap est le plus grand musée d'art contemporain africain au monde. Investec Cape Town Art Fair et FNB Art Joburg structurent le marché.",
    marketSize: "~$150M",
    artists: [
      {name: "William Kentridge", born: "1955", medium: "Dessin animé, gravure, théâtre", auctionRecord: "$3.2M — Sotheby's", significance: "Artiste sud-africain le plus coté. Animations dessinées au fusain."},
      {name: "Marlene Dumas", born: "1953", medium: "Peinture", auctionRecord: "$6.3M — Sotheby's", significance: "Née en Afrique du Sud, basée aux Pays-Bas. Portraits émotionnels intenses."},
      {name: "Zanele Muholi", born: "1972", medium: "Photographie", significance: "Activiste visuel·le LGBTQ+. Série Somnyama Ngonyama."},
      {name: "Athi-Patra Ruga", born: "1984", medium: "Performance, tapisserie, costume", significance: "Art queer sud-africain. Scénographie du Zeitz MOCAA Gala 2024."},
      {name: "Mary Sibande", born: "1982", medium: "Sculpture, photographie", significance: "Personnage fictif Sophie. Identité post-apartheid."}
    ],
    galleries: [
      {name: "Goodman Gallery", city: "Johannesburg + Cape Town + London", specialty: "Art contemporain sud-africain et international", artists: ["William Kentridge", "Zanele Muholi"]},
      {name: "Stevenson", city: "Cape Town + Johannesburg + Amsterdam", specialty: "Art contemporain sud-africain"},
      {name: "WHATIFTHEWORLD", city: "Cape Town", specialty: "Art contemporain émergent"},
      {name: "Blank Projects", city: "Cape Town", specialty: "Art contemporain et expérimental"}
    ],
    museums: [
      {name: "Zeitz MOCAA", city: "Cape Town", type: "Musée privé", collection: "Plus grand musée d'art contemporain africain au monde. 100+ galeries sur 9 étages."},
      {name: "Norval Foundation", city: "Cape Town", type: "Fondation privée", collection: "Art sud-africain moderne et contemporain"},
      {name: "Iziko South African National Gallery", city: "Cape Town", type: "Musée national", collection: "Art sud-africain et international"},
      {name: "Johannesburg Art Gallery", city: "Johannesburg", type: "Musée municipal", collection: "Plus ancienne galerie d'art d'Afrique australe"}
    ],
    auctionHouses: [
      {name: "Strauss & Co", city: "Cape Town + Johannesburg", specialty: "Première maison d'enchères sud-africaine"},
      {name: "Aspire Art Auctions", city: "Johannesburg", specialty: "Art sud-africain contemporain"}
    ],
    artFairs: [
      {name: "Investec Cape Town Art Fair", city: "Cape Town", frequency: "Annuel (février)", significance: "Plus grande foire d'art d'Afrique"},
      {name: "FNB Art Joburg", city: "Johannesburg", frequency: "Annuel", significance: "Foire d'art de Johannesburg"}
    ]
  },

  // --- Côte d'Ivoire ---
  {
    id: "CI",
    name: "Côte d'Ivoire",
    region: "africa",
    marketOverview: "Scène art émergente avec Abidjan comme hub. Galerie Cécile Fakhoury est la galerie la plus influente d'Afrique de l'Ouest francophone.",
    artists: [
      {name: "Aboudia", born: "1983", medium: "Peinture, collage (style graffiti)", auctionRecord: "€135,765 (Artcurial Marrakech 2025)", significance: "Style raw et urbain. Marché international en forte hausse."},
      {name: "Frédéric Bruly Bouabré", born: "1923", died: "2014", medium: "Dessin, écriture syllabaire", auctionRecord: "Record mondial Artcurial €58,500", significance: "A inventé un alphabet pour la langue Bété. Documenta 11."},
      {name: "Ouattara Watts", born: "1957", medium: "Peinture abstraite mystique", significance: "Basé à New York. Protégé de Basquiat."}
    ],
    galleries: [
      {name: "Galerie Cécile Fakhoury", city: "Abidjan + Dakar + Paris", specialty: "Art contemporain africain, galerie la plus influente d'Afrique de l'Ouest francophone"},
      {name: "LouiSimone Guirandou Gallery", city: "Abidjan", specialty: "Art contemporain ivoirien et africain"}
    ],
    museums: [
      {name: "Musée des Civilisations de Côte d'Ivoire", city: "Abidjan", type: "Musée national", collection: "Art et civilisations ivoiriennes"}
    ]
  },

  // --- RDC (Congo) ---
  {
    id: "CD",
    name: "RDC (Congo)",
    region: "africa",
    marketOverview: "Riche tradition artistique (Académie des Beaux-Arts de Kinshasa). Lubumbashi Biennale positionne le pays sur la scène contemporaine.",
    artists: [
      {name: "Chéri Samba", born: "1956", medium: "Peinture populaire narrative", significance: "Artiste le plus connu de RDC. Magiciens de la Terre (1989). Autobiographique et satirique."},
      {name: "Bodys Isek Kingelez", born: "1948", died: "2015", medium: "Maquettes architecturales en carton", auctionRecord: "Record mondial Artcurial €19,500", significance: "Villes utopiques en carton. Rétrospective au MoMA (2018)."},
      {name: "Sammy Baloji", born: "1978", medium: "Photographie, installation", significance: "Patrimoine industriel du Katanga. Prix Rolex de mentorat."},
      {name: "Steve Bandoma", born: "1981", medium: "Collage, mixed media", auctionRecord: "Record mondial Artcurial €12,400", significance: "Collages commentant la politique congolaise."}
    ],
    galleries: [
      {name: "Imani Contemporary", city: "Lubumbashi", specialty: "Art contemporain congolais"},
      {name: "Académie des Beaux-Arts de Kinshasa", city: "Kinshasa", specialty: "Formation et exposition"}
    ],
    museums: [
      {name: "Musée National de Kinshasa", city: "Kinshasa", type: "Musée national"},
      {name: "Lubumbashi Biennale", city: "Lubumbashi", type: "Biennale", collection: "Biennale d'art contemporain de Lubumbashi"}
    ]
  },

  // --- Kenya ---
  {
    id: "KE",
    name: "Kenya",
    region: "africa",
    marketOverview: "Nairobi est le centre de la scène artistique est-africaine. East African Art Auction (depuis 2013) a mis la ville sur la carte. Michael Armitage a percé internationalement.",
    artists: [
      {name: "Michael Armitage", born: "1984", medium: "Peinture sur lubugo (écorce d'arbre)", significance: "Exposition majeure à la Royal Academy London. Représenté par White Cube."},
      {name: "Wangechi Mutu", born: "1972", medium: "Sculpture, collage, vidéo", significance: "Première artiste à exposer dans les niches du Met (2019). Prix Zeitz MOCAA 2024."},
      {name: "Peterson Kamwathi", born: "1980", medium: "Dessin, installation", significance: "Artiste kényan majeur. Thèmes : mémoire, justice."}
    ],
    galleries: [
      {name: "Circle Art Gallery", city: "Nairobi", specialty: "Art contemporain est-africain, organise East African Art Auction"},
      {name: "One Off Gallery", city: "Nairobi", specialty: "Art contemporain kényan"},
      {name: "Banana Hill Art Gallery", city: "Nairobi", specialty: "Art est-africain accessible"}
    ],
    museums: [
      {name: "Nairobi National Museum", city: "Nairobi", type: "Musée national", collection: "Art, histoire naturelle, culture kényane"}
    ]
  },

  // --- Égypte ---
  {
    id: "EG",
    name: "Égypte",
    region: "africa",
    marketOverview: "Le Caire a une scène artistique ancienne et riche. Mahmoud Mokhtar est le père de la sculpture moderne égyptienne. La scène contemporaine est portée par des galeries comme Mashrabia et Gypsum.",
    artists: [
      {name: "Ghada Amer", born: "1963", medium: "Peinture-broderie", significance: "Artiste égypto-américaine. Féminisme et érotisme."},
      {name: "Wael Shawky", born: "1971", medium: "Vidéo, film, marionnettes", significance: "Cabaret Crusades trilogy. Biennale de Venise."},
      {name: "Mahmoud Mokhtar", born: "1891", died: "1934", medium: "Sculpture monumentale", auctionRecord: "La Fiancée du Nil triplé son estimation chez Artcurial", significance: "Père de la sculpture moderne égyptienne."}
    ],
    galleries: [
      {name: "Mashrabia Gallery of Contemporary Art", city: "Le Caire", specialty: "Art contemporain égyptien et arabe"},
      {name: "Gypsum Gallery", city: "Le Caire", specialty: "Art contemporain"}
    ],
    museums: [
      {name: "Musée d'Art Moderne Égyptien", city: "Le Caire", type: "Musée national", collection: "Art moderne et contemporain égyptien"},
      {name: "Grand Egyptian Museum (GEM)", city: "Giza", type: "Musée national (2024)", collection: "Le plus grand musée archéologique du monde, incluant art moderne"}
    ]
  },

  // --- Éthiopie ---
  {
    id: "ET",
    name: "Éthiopie",
    region: "africa",
    marketOverview: "Addis-Abeba émerge comme centre artistique est-africain. Julie Mehretu (née à Addis) est l'une des artistes les plus cotées au monde. Addis Fine Art opère à Addis et Londres.",
    artists: [
      {name: "Julie Mehretu", born: "1970", medium: "Peinture abstraite grande échelle", auctionRecord: "$9.6M — Sotheby's", significance: "Née à Addis-Abeba. L'artiste africaine la plus cotée aux enchères."},
      {name: "Elias Sime", born: "1968", medium: "Assemblage (composants électroniques)", significance: "Transforme déchets technologiques en tapisseries. Exposé au MoMA."},
      {name: "Aida Muluneh", born: "1974", medium: "Photographie", significance: "Fondatrice d'Addis Foto Fest. Body painting et identité."}
    ],
    galleries: [
      {name: "Addis Fine Art", city: "Addis-Abeba + London", specialty: "Art contemporain est-africain et diaspora"},
      {name: "Lela Gallery", city: "Addis-Abeba", specialty: "Art contemporain éthiopien"}
    ],
    museums: [
      {name: "Ethiopia National Museum", city: "Addis-Abeba", type: "Musée national", collection: "Art, histoire, paléontologie (Lucy)"},
      {name: "Modern Art Museum Gebre Kristos Desta Center", city: "Addis-Abeba", type: "Centre d'art moderne"}
    ]
  },

  // --- Tanzanie ---
  {
    id: "TZ",
    name: "Tanzanie",
    region: "africa",
    artists: [
      {name: "George Lilanga", born: "1934", died: "2005", medium: "Sculpture, peinture Shetani", significance: "Art Makonde. Inspiré par les esprits Shetani. Reconnu internationalement."},
      {name: "Saidi Chilamboni", medium: "Peinture Tingatinga", significance: "Héritier de la tradition Tingatinga. Art populaire tanzanien."}
    ],
    galleries: [
      {name: "Nafasi Art Space", city: "Dar es Salaam", specialty: "Espace d'art contemporain, résidences, ateliers"}
    ],
    museums: [
      {name: "National Museum of Tanzania", city: "Dar es Salaam", type: "Musée national", collection: "Art, culture, histoire naturelle"}
    ]
  },

  // --- Rwanda ---
  {
    id: "RW",
    name: "Rwanda",
    region: "africa",
    artists: [
      {name: "Innocent Nkurunziza", medium: "Peinture", significance: "Co-fondateur d'Inema Arts Center. Art post-génocide et réconciliation."},
      {name: "Emmanuel Nkuranga", medium: "Peinture", significance: "Co-fondateur d'Inema. Couleurs vibrantes, scènes rwandaises."}
    ],
    galleries: [
      {name: "Inema Arts Center", city: "Kigali", specialty: "Art contemporain rwandais, résidences internationales"},
      {name: "Ivuka Arts", city: "Kigali", specialty: "Art contemporain et formation"}
    ],
    museums: [
      {name: "Rwesero Arts Museum", city: "Nyanza", type: "Musée d'art dans ancien palais royal", collection: "Art contemporain et traditionnel rwandais"}
    ]
  },

  // --- Angola ---
  {
    id: "AO",
    name: "Angola",
    region: "africa",
    artists: [
      {name: "Edson Chagas", born: "1977", medium: "Photographie", significance: "Lion d'Or à la Biennale de Venise 2013 (Pavillon Angola)."},
      {name: "Kiluanji Kia Henda", born: "1979", medium: "Photographie, vidéo, installation", significance: "Art conceptuel sur l'urbanisme et l'histoire coloniale angolaise."},
      {name: "Yonamine", born: "1975", medium: "Collage, mixed media", significance: "Artiste angolais basé à Lisbonne. Culture urbaine."}
    ],
    galleries: [
      {name: "Jahmek Contemporary Art", city: "Luanda", specialty: "Art contemporain angolais"}
    ],
    museums: [
      {name: "Museu Nacional de Antropologia", city: "Luanda", type: "Musée national", collection: "Art et culture angolaise"}
    ]
  },

  // --- Mozambique ---
  {
    id: "MZ",
    name: "Mozambique",
    region: "africa",
    artists: [
      {name: "Malangatana Ngwenya", born: "1936", died: "2011", medium: "Peinture, sculpture", significance: "Artiste le plus célèbre du Mozambique. UNESCO Artist for Peace."},
      {name: "Gonçalo Mabunda", born: "1975", medium: "Sculpture — armes transformées", significance: "Transforme armes de guerre en sculptures. Art pour la paix."}
    ],
    galleries: [
      {name: "Núcleo de Arte", city: "Maputo", specialty: "Centre d'art historique, ateliers et expositions"}
    ],
    museums: [
      {name: "Museu Nacional de Arte", city: "Maputo", type: "Musée national", collection: "Art mozambicain moderne et contemporain"}
    ]
  },

  // --- Cameroun ---
  {
    id: "CM",
    name: "Cameroun",
    region: "africa",
    artists: [
      {name: "Pascale Marthine Tayou", born: "1966", medium: "Installation, sculpture", auctionRecord: "€55,546 (Artcurial Marrakech 2025)", significance: "Artiste camerounais le plus exposé internationalement. Documenta, Biennales."},
      {name: "Barthélémy Toguo", born: "1967", medium: "Peinture, sculpture, installation", significance: "Fondateur de Bandjoun Station. Artiste engagé."},
      {name: "Samuel Fosso", born: "1962", medium: "Photographie — autoportraits", significance: "Autoportraits explorant identités africaines et mondiales. Exposé au Pompidou, Tate."}
    ],
    galleries: [
      {name: "Bandjoun Station", city: "Bandjoun", director: "Barthélémy Toguo", specialty: "Résidence, ferme artistique, centre culturel"},
      {name: "Doual'art", city: "Douala", specialty: "Art contemporain et art public urbain"}
    ],
    museums: [
      {name: "Musée National du Cameroun", city: "Yaoundé", type: "Musée national", collection: "Art et patrimoine camerounais"}
    ]
  },

  // --- Gabon ---
  {
    id: "GA",
    name: "Gabon",
    region: "africa",
    artists: [
      {name: "Owanto (Fête)", born: "1953", medium: "Photographie, sculpture", significance: "Artiste gabonaise basée en Europe. Art sur la condition féminine en Afrique."}
    ],
    galleries: [
      {name: "Centre Culturel Français de Libreville", city: "Libreville", specialty: "Expositions, promotion culturelle"}
    ],
    museums: [
      {name: "Musée National des Arts et Traditions du Gabon", city: "Libreville", type: "Musée national", collection: "Art traditionnel gabonais, masques Fang et Punu"}
    ]
  },

  // --- Guinée ---
  {
    id: "GN",
    name: "Guinée",
    region: "africa",
    artists: [
      {name: "Sékou Camara (Kerfala)", medium: "Peinture", significance: "Artiste guinéen pionnier de l'art abstrait guinéen."}
    ],
    galleries: [
      {name: "Espace Culturel Franco-Guinéen", city: "Conakry", specialty: "Expositions, événements culturels"}
    ],
    museums: [
      {name: "Musée National de Guinée", city: "Conakry", type: "Musée national", collection: "Art et patrimoine guinéen"}
    ]
  },

  // --- Mali ---
  {
    id: "ML",
    name: "Mali",
    region: "africa",
    marketOverview: "Le Mali a une tradition photographique exceptionnelle (Sidibé, Keïta). La Biennale de Bamako est la biennale de photographie africaine.",
    artists: [
      {name: "Malick Sidibé", born: "1936", died: "2016", medium: "Photographie noir et blanc", auctionRecord: "Record mondial Artcurial €24,700", significance: "Golden Lion Biennale de Venise 2007. Hasselblad Award. Photographies de la jeunesse malienne des années 60."},
      {name: "Seydou Keïta", born: "1921", died: "2001", medium: "Photographie portrait studio", significance: "Portraits studio à Bamako. Redécouvert dans les années 90. MoMA, Pompidou, Tate."},
      {name: "Abdoulaye Konaté", born: "1953", medium: "Installation textile", significance: "Textiles monumentaux. Directeur du Conservatoire des Arts de Bamako."}
    ],
    galleries: [
      {name: "Galerie Médina", city: "Bamako", specialty: "Art contemporain malien"}
    ],
    museums: [
      {name: "Musée National du Mali", city: "Bamako", type: "Musée national", collection: "Art et patrimoine malien"},
      {name: "Biennale de Bamako (Rencontres de Bamako)", city: "Bamako", type: "Biennale de photographie africaine"}
    ]
  },

  // --- Togo ---
  {
    id: "TG",
    name: "Togo",
    region: "africa",
    artists: [
      {name: "El Loko", born: "1950", died: "2016", medium: "Peinture, sculpture", significance: "Artiste togolais majeur. Fusion traditions Vaudou et art contemporain."},
      {name: "Kossi Aguessy", born: "1978", medium: "Design, sculpture", significance: "Designer et artiste basé à Paris. Afrofuturisme."}
    ],
    galleries: [
      {name: "Centre Culturel Togolais", city: "Lomé", specialty: "Expositions et événements culturels"}
    ],
    museums: [
      {name: "Musée National du Togo", city: "Lomé", type: "Musée national", collection: "Art et patrimoine togolais"}
    ]
  },

  // --- Burkina Faso ---
  {
    id: "BF",
    name: "Burkina Faso",
    region: "africa",
    artists: [
      {name: "Siriki Ky", born: "1953", medium: "Sculpture monumentale métal", significance: "Sculpteur monumental. Œuvres publiques au Burkina Faso et en Europe."},
      {name: "Hamed Ouattara", medium: "Sculpture — métal recyclé", significance: "Art à partir de bidons et métal recyclé."}
    ],
    galleries: [
      {name: "Galerie Houkami Guyzagn", city: "Ouagadougou", specialty: "Art contemporain burkinabè"}
    ],
    museums: [
      {name: "Musée National du Burkina Faso", city: "Ouagadougou", type: "Musée national", collection: "Art et patrimoine burkinabè"}
    ]
  },

  // --- Niger ---
  {
    id: "NE",
    name: "Niger",
    region: "africa",
    artists: [
      {name: "Elhadj Moussa", medium: "Photographie", significance: "Photographe documentaire nigérien."},
      {name: "Issa Maïga", medium: "Peinture", significance: "Peintre nigérien, scènes du Sahel."}
    ],
    galleries: [
      {name: "Centre Culturel Franco-Nigérien", city: "Niamey", specialty: "Expositions et événements culturels"}
    ],
    museums: [
      {name: "Musée National Boubou Hama", city: "Niamey", type: "Musée national", collection: "Art, histoire, dinosaures, habitats traditionnels"}
    ]
  },

  // --- Sierra Leone ---
  {
    id: "SL",
    name: "Sierra Leone",
    region: "africa",
    artists: [
      {name: "John Osmund Akar", born: "1927", died: "1989", medium: "Peinture", significance: "Pionnier de l'art moderne sierra-léonais."}
    ],
    galleries: [
      {name: "Centre culturel de Freetown", city: "Freetown", specialty: "Expositions culturelles"}
    ],
    museums: [
      {name: "Sierra Leone National Museum", city: "Freetown", type: "Musée national", collection: "Art, histoire, patrimoine"}
    ]
  },

  // --- Liberia ---
  {
    id: "LR",
    name: "Liberia",
    region: "africa",
    artists: [
      {name: "Lester Hicks", medium: "Peinture", significance: "Artiste libérien contemporain. Scènes de vie et reconstruction post-conflit."}
    ],
    galleries: [
      {name: "Monrovia Arts Society", city: "Monrovia", specialty: "Promotion de l'art libérien"}
    ],
    museums: [
      {name: "Liberia National Museum", city: "Monrovia", type: "Musée national", collection: "Art et patrimoine libérien"}
    ]
  },

  // --- Madagascar ---
  {
    id: "MG",
    name: "Madagascar",
    region: "africa",
    artists: [
      {name: "Joël Andrianomearisoa", born: "1977", medium: "Installation textile, papier noir", significance: "Premier représentant de Madagascar à la Biennale de Venise (2019). Art monochrome noir."}
    ],
    galleries: [
      {name: "Hakanto Contemporary", city: "Antananarivo", specialty: "Art contemporain malgache et international"}
    ],
    museums: [
      {name: "Musée d'Art Contemporain Antananarivo", city: "Antananarivo", type: "Musée", collection: "Art contemporain malgache"}
    ]
  },

  // --- Namibie ---
  {
    id: "NA",
    name: "Namibie",
    region: "africa",
    artists: [
      {name: "John Muafangejo", born: "1943", died: "1987", medium: "Linogravure noir et blanc", significance: "Artiste namibien le plus connu. Gravures narratives. Apartheid."}
    ],
    galleries: [
      {name: "National Art Gallery of Namibia", city: "Windhoek", specialty: "Art namibien et régional"}
    ],
    museums: [
      {name: "National Art Gallery of Namibia", city: "Windhoek", type: "Galerie nationale", collection: "Art namibien moderne et contemporain"}
    ]
  },

  // --- Guinée-Bissau ---
  {
    id: "GW",
    name: "Guinée-Bissau",
    region: "africa",
    artists: [
      {name: "Nú Barreto", born: "1966", medium: "Peinture, installation", significance: "Artiste bisso-guinéen basé à Paris. Art engagé."}
    ],
    galleries: [
      {name: "Centro Cultural Português", city: "Bissau", specialty: "Expositions culturelles"}
    ],
    museums: [
      {name: "Museu Nacional da Guiné-Bissau", city: "Bissau", type: "Musée national"}
    ]
  },


  // --- Mauritanie ---
  {
    id: "MR",
    name: "Mauritanie",
    region: "africa",
    artists: [
      {name: "Amy Sow", medium: "Peinture", significance: "Artiste mauritanienne contemporaine. Identité féminine sahélienne."}
    ],
    galleries: [
      {name: "Centre Culturel Marocain de Nouakchott", city: "Nouakchott", specialty: "Expositions culturelles"}
    ],
    museums: [
      {name: "Musée National de Mauritanie", city: "Nouakchott", type: "Musée national", collection: "Art et patrimoine mauritanien"}
    ]
  },

  // --- Gambie ---
  {
    id: "GM",
    name: "Gambie",
    region: "africa",
    artists: [
      {name: "Momodou Ceesay", medium: "Sculpture, batik", significance: "Artiste gambien. Art textile et sculpture traditionnelle."}
    ],
    galleries: [
      {name: "African Heritage Gallery", city: "Banjul", specialty: "Art gambien traditionnel et contemporain"}
    ],
    museums: [
      {name: "National Museum of The Gambia", city: "Banjul", type: "Musée national", collection: "Art et patrimoine gambien"}
    ]
  },

  // --- Bénin ---
  {
    id: "BJ",
    name: "Bénin",
    region: "africa",
    marketOverview: "Le Bénin a lancé un programme ambitieux de restitution d'œuvres d'art et construit de nouveaux musées. Les 26 trésors royaux restitués par la France en 2021 ont marqué un tournant.",
    artists: [
      {name: "Romuald Hazoumè", born: "1962", medium: "Sculpture — masques en bidons", significance: "Artiste béninois le plus connu internationalement. Masques en jerricans. Documenta 12."},
      {name: "Meschac Gaba", born: "1961", medium: "Installation conceptuelle", significance: "Museum of Contemporary African Art (projet conceptuel itinérant). Tate Modern."},
      {name: "Dominique Zinkpè", born: "1969", medium: "Sculpture, installation Vaudou", significance: "Fondateur de Centre Arts et Cultures de Lobozounkpa."}
    ],
    galleries: [
      {name: "Centre Arts et Cultures de Lobozounkpa", city: "Cotonou", specialty: "Art contemporain béninois, fondé par Zinkpè"},
      {name: "Galerie Guèdèhounguè", city: "Cotonou", specialty: "Art contemporain"}
    ],
    museums: [
      {name: "Musée d'Art Contemporain de Cotonou", city: "Cotonou", type: "Nouveau musée", collection: "Art contemporain béninois"},
      {name: "Palais Royaux d'Abomey", city: "Abomey", type: "Site UNESCO", collection: "26 trésors royaux restitués par la France (2021). Patrimoine du Dahomey."}
    ]
  },

  // --- Congo-Brazzaville ---
  {
    id: "CG",
    name: "Congo-Brazzaville",
    region: "africa",
    artists: [
      {name: "Bill Kouélany", born: "1965", medium: "Peinture, installation, poésie", significance: "Fondatrice des Ateliers Sahm. Artiste multidisciplinaire majeure."},
      {name: "Gastineau Massamba", medium: "Sculpture, installation", significance: "Art contemporain congolais."}
    ],
    galleries: [
      {name: "Les Ateliers Sahm", city: "Brazzaville", director: "Bill Kouélany", specialty: "Résidences, ateliers, expositions d'art contemporain"}
    ],
    museums: [
      {name: "Musée National du Congo", city: "Brazzaville", type: "Musée national", collection: "Art et patrimoine congolais"}
    ]
  },

  // --- Allemagne ---
  {
    id: "DE",
    name: "Allemagne",
    region: "eu",
    marketSize: "~$2.1 Mds (3e en Europe)",
    galleries: [
      {name: "Sprüth Magers", city: "Berlin + London + LA"},
      {name: "König Galerie", city: "Berlin"},
      {name: "Esther Schipper", city: "Berlin"},
      {name: "Capitain Petzel", city: "Berlin"},
      {name: "neugerriemschneider", city: "Berlin"}
    ],
    museums: [
      {name: "Hamburger Bahnhof", city: "Berlin", collection: "Art contemporain dans ancienne gare"},
      {name: "Museum Ludwig", city: "Cologne", collection: "Art moderne et contemporain, Pop Art"},
      {name: "Pinakothek der Moderne", city: "Munich", collection: "Art des XXe et XXIe siècles"}
    ],
    artists: [],
    regulation: {
      vatRate: "7% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Art Cologne", city: "Allemagne", significance: "Art Cologne, Gallery Weekend Berlin"}],
    marketOverview: "Droit de suite EU harmonisé. Folgerecht allemand. Réglementation stricte exportation biens culturels."
  },

  // --- Italie ---
  {
    id: "IT",
    name: "Italie",
    region: "eu",
    marketSize: "~$800M",
    galleries: [
      {name: "Galleria Continua", city: "San Gimignano + global"},
      {name: "Massimo De Carlo", city: "Milan + London + Paris"},
      {name: "Alfonso Artiaco", city: "Naples"},
      {name: "Lia Rumma", city: "Naples + Milan"},
      {name: "Galleria Franco Noero", city: "Turin"}
    ],
    museums: [
      {name: "Galleria degli Uffizi", city: "Florence", collection: "Renaissance, collection des Médicis"},
      {name: "Peggy Guggenheim Collection", city: "Venise", collection: "Art moderne"},
      {name: "MAXXI", city: "Rome", collection: "Art et architecture du XXIe siècle"}
    ],
    artists: [],
    regulation: {
      vatRate: "10% TVA importation art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Venice Biennale (la plus ancienne", city: "Italie", significance: "Venice Biennale (la plus ancienne, 1895), Artissima Turin, miart Milan"}],
    marketOverview: "Biennale de Venise — la plus importante au monde (fondée 1895). Droit de suite EU. Soprintendenza protège le patrimoine."
  },

  // --- Espagne ---
  {
    id: "ES",
    name: "Espagne",
    region: "eu",
    marketSize: "~$400M",
    galleries: [
      {name: "Galería Juana de Aizpuru", city: "Madrid"},
      {name: "Galería Elvira González", city: "Madrid"},
      {name: "Galería Helga de Alvear", city: "Madrid + Cáceres"},
      {name: "Travesía Cuatro", city: "Madrid + Guadalajara"},
      {name: "Galería Max Estrella", city: "Madrid"}
    ],
    museums: [
      {name: "Museo del Prado", city: "Madrid", collection: "Maîtres anciens — Velázquez, Goya, Bosch"},
      {name: "Museo Reina Sofía", city: "Madrid", collection: "Art contemporain — Guernica de Picasso"},
      {name: "MACBA", city: "Barcelone", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "21% TVA (10% réduit importation)",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "ARCO Madrid (foire de référence du monde hispanique)", city: "Espagne", significance: "ARCO Madrid (foire de référence du monde hispanique)"}],
    marketOverview: "Droit de suite EU. Ley del Patrimonio Histórico Español. TVA réduite 10% importation."
  },

  // --- Pays-Bas ---
  {
    id: "NL",
    name: "Pays-Bas",
    region: "eu",
    marketSize: "~$600M",
    galleries: [
      {name: "Grimm", city: "Amsterdam + New York + London"},
      {name: "Ron Mandos", city: "Amsterdam"},
      {name: "Annet Gelink Gallery", city: "Amsterdam"},
      {name: "Fons Welters", city: "Amsterdam"},
      {name: "Upstream Gallery", city: "Amsterdam"}
    ],
    museums: [
      {name: "Rijksmuseum", city: "Amsterdam", collection: "Siècle d'Or néerlandais — Rembrandt, Vermeer"},
      {name: "Stedelijk Museum", city: "Amsterdam", collection: "Art moderne et contemporain"},
      {name: "Van Gogh Museum", city: "Amsterdam", collection: "Plus grande collection Van Gogh au monde"}
    ],
    artists: [],
    regulation: {
      vatRate: "9% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "TEFAF Maastricht (foire de référence mondiale Old Masters)", city: "Pays-Bas", significance: "TEFAF Maastricht (foire de référence mondiale Old Masters), Art Rotterdam"}],
    marketOverview: "TEFAF Maastricht — première foire mondiale d'art ancien. Droit de suite EU. Régulation art et antiquités stricte."
  },

  // --- Belgique ---
  {
    id: "BE",
    name: "Belgique",
    region: "eu",
    marketSize: "~$250M",
    galleries: [
      {name: "Xavier Hufkens", city: "Bruxelles"},
      {name: "Zeno X Gallery", city: "Anvers"},
      {name: "Jan Mot", city: "Bruxelles"},
      {name: "Rodolphe Janssen", city: "Bruxelles"},
      {name: "Galerie Templon Brussels", city: "Bruxelles"}
    ],
    museums: [
      {name: "MOMA Brussels (Musée d'Art Moderne)", city: "Bruxelles", collection: "Art moderne et contemporain"},
      {name: "SMAK", city: "Gand", collection: "Art contemporain"},
      {name: "MuHKA", city: "Anvers", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "6% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Art Brussels", city: "Belgique", significance: "Art Brussels, Brafa"}],
    marketOverview: "Bruxelles hub galeries contemporaines. Droit de suite EU. TVA réduite 6%."
  },

  // --- Autriche ---
  {
    id: "AT",
    name: "Autriche",
    region: "eu",
    marketSize: "~$200M",
    galleries: [
      {name: "Thaddaeus Ropac", city: "Salzburg + Paris + London + Seoul"},
      {name: "Galerie nächst St. Stephan", city: "Vienne"},
      {name: "Galerie Krinzinger", city: "Vienne"},
      {name: "Galerie Martin Janda", city: "Vienne"}
    ],
    museums: [
      {name: "Kunsthistorisches Museum", city: "Vienne", collection: "Maîtres anciens — Bruegel, Vermeer"},
      {name: "MUMOK", city: "Vienne", collection: "Art moderne et contemporain"},
      {name: "Albertina", city: "Vienne", collection: "Dessins et estampes — Dürer, Monet, Picasso"}
    ],
    artists: [],
    regulation: {
      vatRate: "13% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "viennacontemporary", city: "Autriche", significance: "viennacontemporary"}],
    marketOverview: "Vienne important centre culturel. Droit de suite EU. TVA réduite 13%."
  },

  // --- Suède ---
  {
    id: "SE",
    name: "Suède",
    region: "eu",
    marketSize: "~$150M",
    galleries: [
      {name: "Galerie Nordenhake", city: "Stockholm + Berlin + Mexico"},
      {name: "Andréhn-Schiptjenko", city: "Stockholm + Paris"},
      {name: "Magasin III Museum for Contemporary Art", city: "Stockholm"}
    ],
    museums: [
      {name: "Moderna Museet", city: "Stockholm", collection: "Art moderne et contemporain nordique et international"},
      {name: "Malmö Konsthall", city: "Malmö", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "12% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Market Art Fair Stockholm", city: "Suède", significance: "Market Art Fair Stockholm"}],
    marketOverview: "Scène artistique nordique forte. Droit de suite EU. TVA réduite 12%."
  },

  // --- Danemark ---
  {
    id: "DK",
    name: "Danemark",
    region: "eu",
    marketSize: "~$120M",
    galleries: [
      {name: "Victoria Miro Copenhagen", city: "Copenhague"},
      {name: "Galleri Nicolai Wallner", city: "Copenhague"},
      {name: "David Risley Gallery", city: "Copenhague"}
    ],
    museums: [
      {name: "Louisiana Museum of Modern Art", city: "Humlebæk", collection: "Art moderne et contemporain, architecture iconique"},
      {name: "SMK — National Gallery of Denmark", city: "Copenhague", collection: "Art danois et international"},
      {name: "ARoS Aarhus Kunstmuseum", city: "Aarhus", collection: "Art contemporain, Rainbow Panorama d'Olafur Eliasson"}
    ],
    artists: [],
    regulation: {
      vatRate: "25% TVA (pas de taux réduit art)",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "CHART Art Fair Copenhagen", city: "Danemark", significance: "CHART Art Fair Copenhagen"}],
    marketOverview: "Louisiana — l'un des musées les plus visités d'Europe du Nord. TVA 25% sans réduction art."
  },

  // --- Finlande ---
  {
    id: "FI",
    name: "Finlande",
    region: "eu",
    marketSize: "~$80M",
    galleries: [
      {name: "Helsinki Contemporary", city: "Helsinki"},
      {name: "Galerie Forsblom", city: "Helsinki"}
    ],
    museums: [
      {name: "Kiasma — Museum of Contemporary Art", city: "Helsinki", collection: "Art contemporain finlandais et nordique"},
      {name: "Amos Rex", city: "Helsinki", collection: "Art et architecture, galerie souterraine spectaculaire"}
    ],
    artists: [],
    regulation: {
      vatRate: "10% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "ArtHelsinki", city: "Finlande", significance: "ArtHelsinki"}],
    marketOverview: "Helsinki scène design-art intégrée. TVA réduite 10%."
  },

  // --- Irlande ---
  {
    id: "IE",
    name: "Irlande",
    region: "eu",
    marketSize: "~$80M",
    galleries: [
      {name: "Kerlin Gallery", city: "Dublin"},
      {name: "Green on Red Gallery", city: "Dublin"}
    ],
    museums: [
      {name: "IMMA — Irish Museum of Modern Art", city: "Dublin", collection: "Art moderne et contemporain dans Royal Hospital Kilmainham"},
      {name: "Hugh Lane Gallery", city: "Dublin", collection: "Art impressionniste et contemporain, atelier Francis Bacon reconstitué"}
    ],
    artists: [],
    regulation: {
      vatRate: "13.5% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Dublin Art Book Fair", city: "Irlande", significance: "Dublin Art Book Fair"}],
    marketOverview: "Marché modeste mais galeries de qualité. Droit de suite EU."
  },

  // --- Portugal ---
  {
    id: "PT",
    name: "Portugal",
    region: "eu",
    marketSize: "~$100M",
    galleries: [
      {name: "Galeria Filomena Soares", city: "Lisbonne"},
      {name: "Galeria Pedro Cera", city: "Lisbonne"},
      {name: "Galeria Francisco Fino", city: "Lisbonne"}
    ],
    museums: [
      {name: "MAAT — Museum of Art, Architecture and Technology", city: "Lisbonne", collection: "Art contemporain et technologie"},
      {name: "Serralves", city: "Porto", collection: "Art contemporain, jardin et architecture Álvaro Siza"},
      {name: "Museu Berardo", city: "Lisbonne", collection: "Art moderne et contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "6% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "ARCOlisboa", city: "Portugal", significance: "ARCOlisboa"}],
    marketOverview: "Lisbonne hub émergent. TVA réduite 6%. Forte connexion art lusophone (Brésil, Angola, Mozambique)."
  },

  // --- Grèce ---
  {
    id: "GR",
    name: "Grèce",
    region: "eu",
    marketSize: "~$60M",
    galleries: [
      {name: "Kalfayan Galleries", city: "Athènes + Thessalonique"},
      {name: "Bernier/Eliades", city: "Athènes + Bruxelles"}
    ],
    museums: [
      {name: "EMST — National Museum of Contemporary Art", city: "Athènes", collection: "Art contemporain grec et international"},
      {name: "Goulandris Museum", city: "Athènes", collection: "Art moderne impressionniste et post-impressionniste"}
    ],
    artists: [],
    regulation: {
      vatRate: "13% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Athens Art Week", city: "Grèce", significance: "Athens Art Week"}],
    marketOverview: "Athènes hub émergent art contemporain. Documenta 14 s'y est tenue en 2017."
  },

  // --- Pologne ---
  {
    id: "PL",
    name: "Pologne",
    region: "eu",
    marketSize: "~$70M",
    galleries: [
      {name: "Foksal Gallery Foundation", city: "Varsovie"},
      {name: "Raster Gallery", city: "Varsovie"}
    ],
    museums: [
      {name: "Museum of Modern Art Warsaw (MSN)", city: "Varsovie", collection: "Art moderne et contemporain polonais et international"},
      {name: "MOCAK", city: "Cracovie", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "8% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Warsaw Gallery Weekend", city: "Pologne", significance: "Warsaw Gallery Weekend"}],
    marketOverview: "Varsovie scène contemporaine dynamique. TVA réduite 8%."
  },

  // --- République tchèque ---
  {
    id: "CZ",
    name: "République tchèque",
    region: "eu",
    marketSize: "~$50M",
    galleries: [
      {name: "Hunt Kastner", city: "Prague"},
      {name: "Galerie Rudolfinum", city: "Prague"}
    ],
    museums: [
      {name: "DOX Centre for Contemporary Art", city: "Prague", collection: "Art contemporain, design, architecture"},
      {name: "National Gallery Prague", city: "Prague", collection: "Art ancien à contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "12% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Prague Contemporary Art Festival", city: "République tchèque", significance: "Prague Contemporary Art Festival"}],
    marketOverview: "Prague scène émergente. Forte tradition d'art conceptuel."
  },

  // --- Hongrie ---
  {
    id: "HU",
    name: "Hongrie",
    region: "eu",
    marketSize: "~$40M",
    galleries: [
      {name: "acb Gallery", city: "Budapest"},
      {name: "Kisterem Gallery", city: "Budapest"}
    ],
    museums: [
      {name: "Ludwig Museum — Museum of Contemporary Art", city: "Budapest", collection: "Art contemporain international"},
      {name: "Museum of Fine Arts", city: "Budapest", collection: "Maîtres anciens et art moderne"}
    ],
    artists: [],
    regulation: {
      vatRate: "5% TVA réduite sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Art Market Budapest", city: "Hongrie", significance: "Art Market Budapest"}],
    marketOverview: "Budapest hub culturel d'Europe centrale. TVA très favorable 5%."
  },

  // --- Roumanie ---
  {
    id: "RO",
    name: "Roumanie",
    region: "eu",
    marketSize: "~$30M",
    galleries: [
      {name: "Ivan Gallery", city: "Bucarest"},
      {name: "Plan B Gallery", city: "Cluj + Berlin"}
    ],
    museums: [
      {name: "MNAC — National Museum of Contemporary Art", city: "Bucarest", collection: "Art contemporain dans le Palais du Parlement"}
    ],
    artists: [],
    regulation: {
      vatRate: "9% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Art Safari Bucharest", city: "Roumanie", significance: "Art Safari Bucharest"}],
    marketOverview: "Cluj scène art émergente reconnue internationalement."
  },

  // --- Bulgarie ---
  {
    id: "BG",
    name: "Bulgarie",
    region: "eu",
    marketSize: "~$15M",
    galleries: [
      {name: "Sariev Contemporary", city: "Plovdiv"},
      {name: "Structura Gallery", city: "Sofia"}
    ],
    museums: [
      {name: "National Gallery Sofia", city: "Sofia", collection: "Art bulgare et international"}
    ],
    artists: [],
    regulation: {
      vatRate: "9% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Sofia Art Week", city: "Bulgarie", significance: "Sofia Art Week"}],
    marketOverview: "Plovdiv Capitale Européenne de la Culture 2019. Scène émergente."
  },

  // --- Croatie ---
  {
    id: "HR",
    name: "Croatie",
    region: "eu",
    marketSize: "~$20M",
    galleries: [
      {name: "Galerija Gregor Podnar", city: "Berlin + Ljubljana"},
      {name: "Lauba — House for People and Art", city: "Zagreb"}
    ],
    museums: [
      {name: "Museum of Contemporary Art Zagreb", city: "Zagreb", collection: "Art contemporain croate et international"}
    ],
    artists: [],
    regulation: {
      vatRate: "13% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Zagreb Art Week", city: "Croatie", significance: "Zagreb Art Week"}],
    marketOverview: "Zagreb scène contemporaine émergente."
  },

  // --- Slovaquie ---
  {
    id: "SK",
    name: "Slovaquie",
    region: "eu",
    marketSize: "~$15M",
    galleries: [
      {name: "Gandy Gallery", city: "Bratislava"},
      {name: "Zahorian & Van Espen", city: "Bratislava"}
    ],
    museums: [
      {name: "Slovak National Gallery", city: "Bratislava", collection: "Art slovaque et international"},
      {name: "Kunsthalle Bratislava", city: "Bratislava", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "10% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Bratislava Art Week", city: "Slovaquie", significance: "Bratislava Art Week"}],
    marketOverview: "Bratislava scène émergente liée à Vienne."
  },

  // --- Slovénie ---
  {
    id: "SI",
    name: "Slovénie",
    region: "eu",
    marketSize: "~$15M",
    galleries: [
      {name: "Galerija Škuc", city: "Ljubljana"},
      {name: "+MSUM — Museum of Contemporary Art Metelkova", city: "Ljubljana"}
    ],
    museums: [
      {name: "Museum of Modern Art Ljubljana", city: "Ljubljana", collection: "Art moderne et contemporain slovène"},
      {name: "Metelkova City", city: "Ljubljana", collection: "Centre culturel alternatif"}
    ],
    artists: [],
    regulation: {
      vatRate: "9.5% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Ljubljana Biennial of Graphic Arts", city: "Slovénie", significance: "Ljubljana Biennial of Graphic Arts"}],
    marketOverview: "Ljubljana hub culturel des Balkans. Biennale de graphisme historique."
  },

  // --- Lituanie ---
  {
    id: "LT",
    name: "Lituanie",
    region: "eu",
    marketSize: "~$15M",
    galleries: [
      {name: "Vartai Gallery", city: "Vilnius"},
      {name: "Meno Niša", city: "Vilnius"}
    ],
    museums: [
      {name: "MO Museum", city: "Vilnius", collection: "Art moderne et contemporain lituanien"},
      {name: "National Gallery of Art", city: "Vilnius", collection: "Art lituanien XXe siècle"}
    ],
    artists: [],
    regulation: {
      vatRate: "9% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Vilnius Art Week", city: "Lituanie", significance: "Vilnius Art Week"}],
    marketOverview: "Vilnius Capitale Européenne de la Culture 2009."
  },

  // --- Lettonie ---
  {
    id: "LV",
    name: "Lettonie",
    region: "eu",
    marketSize: "~$10M",
    galleries: [
      {name: "kim? Contemporary Art Centre", city: "Riga"}
    ],
    museums: [
      {name: "Latvian National Museum of Art", city: "Riga", collection: "Art letton et international"},
      {name: "LCCA — Latvian Centre for Contemporary Art", city: "Riga", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "12% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Riga Art Days", city: "Lettonie", significance: "Riga Art Days"}],
    marketOverview: "Riga Capitale Européenne de la Culture 2014."
  },

  // --- Estonie ---
  {
    id: "EE",
    name: "Estonie",
    region: "eu",
    marketSize: "~$10M",
    galleries: [
      {name: "Temnikova & Kasela", city: "Tallinn"},
      {name: "Kogo Gallery", city: "Tartu"}
    ],
    museums: [
      {name: "Kumu Art Museum", city: "Tallinn", collection: "Art estonien du XVIIIe au contemporain"},
      {name: "EKKM — Contemporary Art Museum of Estonia", city: "Tallinn", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "9% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Tallinn Art Week", city: "Estonie", significance: "Tallinn Art Week"}],
    marketOverview: "Tallinn hub digital et art. Forte scène contemporaine."
  },

  // --- Chypre ---
  {
    id: "CY",
    name: "Chypre",
    region: "eu",
    marketSize: "~$5M",
    galleries: [
      {name: "Eins Gallery", city: "Limassol"},
      {name: "Omikron Gallery", city: "Nicosie"}
    ],
    museums: [
      {name: "NiMAC — Nicosia Municipal Arts Centre", city: "Nicosie", collection: "Art contemporain dans ancienne centrale électrique"}
    ],
    artists: [],
    regulation: {
      vatRate: "5% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Nicosia Art Walk", city: "Chypre", significance: "Nicosia Art Walk"}],
    marketOverview: "Chypre pont art Europe-Moyen-Orient."
  },

  // --- Malte ---
  {
    id: "MT",
    name: "Malte",
    region: "eu",
    marketSize: "~$5M",
    galleries: [
      {name: "Malta Contemporary Art", city: "Valletta"}
    ],
    museums: [
      {name: "MUZA — MICAS Malta", city: "Valletta", collection: "Art maltais et méditerranéen"},
      {name: "Valletta Contemporary", city: "Valletta", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "5% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Malta Art Biennale", city: "Malte", significance: "Malta Art Biennale"}],
    marketOverview: "Valletta Capitale Européenne de la Culture 2018. Hub art méditerranéen."
  },

  // --- Luxembourg ---
  {
    id: "LU",
    name: "Luxembourg",
    region: "eu",
    marketSize: "~$50M",
    galleries: [
      {name: "Nosbaum Reding", city: "Luxembourg"},
      {name: "Zidoun-Bossuyt", city: "Luxembourg + Paris"}
    ],
    museums: [
      {name: "Mudam — Musée d'Art Moderne Grand-Duc Jean", city: "Luxembourg", collection: "Art contemporain, architecture I.M. Pei"},
      {name: "Casino Luxembourg — Forum d'art contemporain", city: "Luxembourg", collection: "Art contemporain"}
    ],
    artists: [],
    regulation: {
      vatRate: "8% TVA sur art",
      droitDeSuite: "Directive EU 2001/84/CE appliquée"
    },
    artFairs: [{name: "Luxembourg Art Week", city: "Luxembourg", significance: "Luxembourg Art Week"}],
    marketOverview: "Luxembourg place financière = collectionneurs privés importants. TVA réduite 8%."
  },

];

// --- SEARCH INDEX ---
export function buildDiwaneSearchIndex(): DiwaneSearchItem[] {
  const items: DiwaneSearchItem[] = [];
  for (const c of DIWANE_COUNTRIES) {
    items.push({id: c.id, name: c.name, type: "country"});
    for (const a of c.artists) {
      items.push({id: c.id + "-" + a.name.replace(/\s/g, "-").toLowerCase(), name: a.name, type: "artist", country: c.name});
    }
    for (const g of c.galleries) {
      items.push({id: c.id + "-" + g.name.replace(/\s/g, "-").toLowerCase(), name: g.name, type: "gallery", country: c.name});
    }
    for (const m of c.museums) {
      items.push({id: c.id + "-" + m.name.replace(/\s/g, "-").toLowerCase(), name: m.name, type: "museum", country: c.name});
    }
  }
  return items;
}

// --- BACKWARD COMPATIBILITY ALIASES ---
// These map to the old export names used by API routes in app/api/diwane/*

// ============================================================
// ENRICHED DATA FROM WEB RESEARCH (2026-04-02)
// Source: DIWANE Research Agent — cross-referenced web sources
// ============================================================

// --- GLOBAL AUCTION RECORDS (detailed, web-verified) ---
export interface DiwaneDetailedAuctionRecord {
  artistName: string;
  title: string;
  price: string;
  auctionHouse: string;
  date: string;
  countryOrigin: string;
  medium: string;
}

export const DIWANE_DETAILED_AUCTION_RECORDS: DiwaneDetailedAuctionRecord[] = [
  { artistName: "Cristiano Mangovo Bras", title: "Les amours contemporains", price: "$71,500 (65,000 EUR)", auctionHouse: "Piasa", date: "November 7, 2019", countryOrigin: "Angola", medium: "Acrylic on canvas" },
  { artistName: "Chokwe", title: "A Chokwe Ensemble", price: "$37,000", auctionHouse: "Christie's", date: "May 14, 2019", countryOrigin: "Angola", medium: "Sculpture ensemble" },
  { artistName: "António Ole", title: "Memória", price: "$25,600 (£20,000)", auctionHouse: "Sotheby's", date: "May 2017", countryOrigin: "Angola", medium: "Mixed media" },
  { artistName: "António Ole", title: "North/South VII", price: "$11,200 (£8,750)", auctionHouse: "Sotheby's", date: "2016", countryOrigin: "Angola", medium: "Mixed media on paper" },
  { artistName: "Ihosvanny Cisneros", title: "Riots and Rage", price: "$8,500 (7800 EUR)", auctionHouse: "Piasa", date: "2020", countryOrigin: "Angola", medium: "Painting" },
  { artistName: "Keyezua", title: "Women fighting political tigers 2", price: "$8,500 (7800 EUR)", auctionHouse: "Piasa", date: "2020", countryOrigin: "Angola", medium: "Painting" },
  { artistName: "Antonio Ole", title: "Footnotes", price: "$3,150 (2860 EUR)", auctionHouse: "Piasa", date: "2020", countryOrigin: "Angola", medium: "Collage and lithography on paper" },
  { artistName: "El Anatsui", title: "Prophet", price: "$2,228,000", auctionHouse: "Christie's", date: "2023-05-15", countryOrigin: "Ghana", medium: "found aluminum bottle caps" },
  { artistName: "El Anatsui", title: "Take My Hand", price: "$2,180,034", auctionHouse: "Sotheby's", date: "2023-06-27", countryOrigin: "Ghana", medium: "aluminum bottlecaps and copper wire" },
  { artistName: "El Anatsui", title: "New Layout", price: "$1,950,000", auctionHouse: "Christie's", date: "2021-05-11", countryOrigin: "Ghana", medium: "found aluminum bottlecaps" },
  { artistName: "El Anatsui", title: "Hesitant Rivers", price: "$1,607,053", auctionHouse: "Sotheby's", date: "2025-10-16", countryOrigin: "Ghana", medium: "aluminium bottle caps and copper wire" },
  { artistName: "El Anatsui", title: "Tagomizor", price: "$1,524,000", auctionHouse: "Christie's", date: "2025-11-19", countryOrigin: "Ghana", medium: "aluminum bottle caps and copper wire" },
  { artistName: "El Anatsui", title: "Recycled Dreams (Uniting the World with", price: "$1,512,500", auctionHouse: "Christie's", date: "2018-11-16", countryOrigin: "Ghana", medium: "found aluminum bottle cap" },
  { artistName: "El Anatsui", title: "Lanogo", price: "$1,470,000", auctionHouse: "Christie's", date: "2021-11-09", countryOrigin: "Ghana", medium: "aluminum bottle caps" },
  { artistName: "El Anatsui", title: "PATHS TO THE OKRO FARM", price: "$1,445,000", auctionHouse: "Sotheby's", date: "2014-05-15", countryOrigin: "Ghana", medium: "aluminum and copper wire" },
  { artistName: "El Anatsui", title: "ZEBRA CROSSING 2", price: "$1,430,903", auctionHouse: "Sotheby's", date: "2019-04-02", countryOrigin: "Ghana", medium: "aluminum bottle caps and copper wire" },
  { artistName: "El Anatsui", title: "Dexterity", price: "$1,347,191", auctionHouse: "Sotheby's", date: "2023-10-12", countryOrigin: "Ghana", medium: "aluminium and copper wire" },
  { artistName: "El Anatsui", title: "VUMEDI", price: "$1,344,654", auctionHouse: "Sotheby's", date: "2020-10-02", countryOrigin: "Ghana", medium: "metal bottletops and copper wire" },
  { artistName: "El Anatsui", title: "Zebra Square", price: "$1,292,188", auctionHouse: "Phillips", date: "2026-03-05", countryOrigin: "Ghana", medium: "aluminium liquor bottle caps" },
  { artistName: "El Anatsui", title: "Sechra", price: "$1,260,000", auctionHouse: "Christie's", date: "2023-11-07", countryOrigin: "Ghana", medium: "found aluminum bottle cap" },
  { artistName: "El Anatsui", title: "Plot a Plan I", price: "$1,085,000", auctionHouse: "Christie's", date: "2015-05-12", countryOrigin: "Ghana", medium: "found aluminum and copper" },
  { artistName: "El Anatsui", title: "Another Plot", price: "$1,179,750", auctionHouse: "Christie's", date: "2013-05-16", countryOrigin: "Ghana", medium: "aluminum and copper wire" },
  { artistName: "El Anatsui", title: "Peju's Robe", price: "$1,167,921", auctionHouse: "Bonhams", date: "2016-02-11", countryOrigin: "Ghana", medium: "aluminium and copper wire" },
  { artistName: "El Anatsui", title: "Affirmation", price: "$1,193,526", auctionHouse: "Phillips", date: "2020-02-13", countryOrigin: "Ghana", medium: "aluminium bottle caps" },
  { artistName: "El Anatsui", title: "Plot a Plan IV", price: "$1,298,601", auctionHouse: "Phillips", date: "2021-04-15", countryOrigin: "Ghana", medium: "aluminium and copper wire" },
  { artistName: "Ibrahim Mahama", title: "Chale Wote", price: "$105,824", auctionHouse: "Sotheby's", date: "2018-03-28", countryOrigin: "Ghana", medium: "jute sacking, African wax print textiles and fishing nets" },
  { artistName: "El Anatsui", title: "Exoke", price: "$845,000", auctionHouse: "Christie's", date: "2016-05-11", countryOrigin: "Ghana", medium: "aluminum and copper wire" },
  { artistName: "Master of Sikasso", title: "Senufo female statue", price: "$12,000,000", auctionHouse: "Sotheby's", date: "2014", countryOrigin: "Burkina Faso", medium: "wooden statue" },
  { artistName: "Julie Mehretu", title: "Walkers With the Dawn and Morning", price: "$10,737,500", auctionHouse: "Sotheby's", date: "November 15, 2023", countryOrigin: "Ethiopia", medium: "ink and acrylic on canvas" },
  { artistName: "Julie Mehretu", title: "Untitled (diptych)", price: "$9,320,000", auctionHouse: "Sotheby's", date: "October 2023", countryOrigin: "Ethiopia", medium: "painting" },
  { artistName: "Julie Mehretu", title: "Mumbaphilia (JE)", price: "$5,800,000", auctionHouse: "Christie's", date: "May 2024", countryOrigin: "Ethiopia", medium: "abstract painting" },
  { artistName: "Fang reliquary guardian figure", title: "Fang Mabea statue", price: "$5,170,000", auctionHouse: "Christie's", date: "2014", countryOrigin: "Cameroon", medium: "wooden statue" },
  { artistName: "Julie Mehretu", title: "Black Ground (Deep Light)", price: "$5,600,000", auctionHouse: "unknown", date: "2019", countryOrigin: "Ethiopia", medium: "painting" },
  { artistName: "Irma Stern", title: "Bahora Girl", price: "$3,590,000", auctionHouse: "Bonhams", date: "2010", countryOrigin: "South Africa", medium: "oil painting" },
  { artistName: "Bangwa Queen", title: "Bangwa Queen sculpture", price: "$3,400,000", auctionHouse: "Sotheby's", date: "1990", countryOrigin: "Cameroon", medium: "wooden sculpture" },
  { artistName: "Njideka Akunyili Crosby", title: "The Beautyful Ones", price: "$4,700,000", auctionHouse: "Christie's", date: "November 2022", countryOrigin: "Nigeria", medium: "painting" },
  { artistName: "Amoako Boafo", title: "Hands Up", price: "$3,400,000", auctionHouse: "Christie's", date: "2021", countryOrigin: "Ghana", medium: "painting" },
  { artistName: "Jadé Fadojutimi", title: "Teeter towards me", price: "$1,814,500", auctionHouse: "Sotheby's", date: "November 15, 2023", countryOrigin: "Nigeria", medium: "oil on canvas" },
  { artistName: "Toyin Ojih Odutola", title: "Untitled", price: "$2,190,000", auctionHouse: "Sotheby's", date: "November 2021", countryOrigin: "Nigeria", medium: "painting" },
  { artistName: "Lynette Yiadom-Boakye", title: "Highpower", price: "$1,800,000", auctionHouse: "Christie's", date: "October 2022", countryOrigin: "Ghana", medium: "painting" },
  { artistName: "Benedict Enwonwu", title: "Tutu", price: "$1,680,000", auctionHouse: "Bonhams", date: "2018", countryOrigin: "Nigeria", medium: "painting" },
  { artistName: "El Anatsui", title: "Recycled Dreams (Uniting the World with a Stitch)", price: "$1,512,000", auctionHouse: "Christie's", date: "November 2018", countryOrigin: "Ghana", medium: "metal sculpture" },
  { artistName: "Irma Stern", title: "Zululand", price: "$660,500", auctionHouse: "Bonhams", date: "October 16, 2024", countryOrigin: "South Africa", medium: "oil on canvas" },
  { artistName: "Barbara Chase-Riboud", title: "La Musica / Amnesia", price: "$647,700", auctionHouse: "Sotheby's", date: "November 15, 2023", countryOrigin: "United States (African American)", medium: "bronze with silver patina and gray silk" },
  { artistName: "Benedict Enwonwu", title: "FESTAC ’77", price: "$543,000", auctionHouse: "Bonhams", date: "2024", countryOrigin: "Nigeria", medium: "painting" },
  { artistName: "El Anatsui", title: "Zebra Crossing 2", price: "$1,428,975", auctionHouse: "Sotheby's", date: "April 2019", countryOrigin: "Ghana", medium: "aluminum bottle caps and copper wire" },
  { artistName: "Irma Stern", title: "Children Reading the Koran", price: "$1,227,000", auctionHouse: "Strauss & Co", date: "March 28, 2023", countryOrigin: "South Africa", medium: "oil painting" },
  { artistName: "Ben Enwonwu", title: "Tutu", price: "$1,670,000", auctionHouse: "Bonhams", date: "2018-02-28", countryOrigin: "Nigeria", medium: "oil on canvas Artnet News" },
  { artistName: "Ben Enwonwu", title: "Christine", price: "$1,400,000", auctionHouse: "Sotheby's", date: "2019-10-15", countryOrigin: "Nigeria", medium: "oil on canvas Artnet News" },
  { artistName: "Ben Enwonwu", title: "Africa Dances", price: "$596,333", auctionHouse: "Sotheby's", date: "2019-10-15", countryOrigin: "Nigeria", medium: "oil on canvas Artnet News, Alt A Review" },
  { artistName: "Ben Enwonwu", title: "Portrait of Tonkin Jackson", price: "$481,700", auctionHouse: "Bonhams", date: "2024-03-27", countryOrigin: "Nigeria", medium: "painting HENI News" },
  { artistName: "Irma Stern", title: "Arab Priest", price: "$4.4 million", auctionHouse: "Bonhams", date: "March 23, 2011", countryOrigin: "South Africa", medium: "oil on canvas" },
  { artistName: "William Kentridge", title: "Large Typewriters", price: "$940,000", auctionHouse: "Bonhams", date: "March 24, 2021", countryOrigin: "South Africa", medium: "drawing" },
  { artistName: "William Kentridge", title: "Procession", price: "$1.6 million", auctionHouse: "Sotheby's", date: "March 7, 2013", countryOrigin: "South Africa", medium: "bronze" },
  { artistName: "JH Pierneef", title: "Farm Jonkershoek with Twin Peaks Beyond, Stellenbosch", price: "$1.64 million", auctionHouse: "unknown", date: "unknown", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Marlene Dumas", title: "The Visitor", price: "$5 million", auctionHouse: "Sotheby's", date: "2008", countryOrigin: "South Africa", medium: "oil painting" },
  { artistName: "Alexis Preller", title: "The Garden of Eden", price: "$1.23 million", auctionHouse: "unknown", date: "unknown", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Vladimir Tretchikoff", title: "Chinese Girl", price: "$1.12 million", auctionHouse: "unknown", date: "unknown", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Anton van Wouw", title: "Bronze small-scale model of the Paul Kruger Statue", price: "$590,000", auctionHouse: "unknown", date: "2019", countryOrigin: "South Africa", medium: "bronze sculpture" },
  { artistName: "Alexis Preller", title: "The Red Blanket", price: "$406,000", auctionHouse: "unknown", date: "2023", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Irma Stern", title: "Malay (Black Headdress)", price: "$1.35 million", auctionHouse: "Strauss & Co", date: "2025", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Sydney Kumalo", title: "Mythological Rider", price: "$114,000", auctionHouse: "unknown", date: "2021", countryOrigin: "South Africa", medium: "bronze" },
  { artistName: "Maggie Laubser", title: "Flamingos on the Beach", price: "$157,000", auctionHouse: "unknown", date: "2010", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Gerard Sekoto", title: "Street Scene", price: "$165,000", auctionHouse: "unknown", date: "2023", countryOrigin: "South Africa", medium: "painting" },
  { artistName: "Chéri Samba", title: "J'aime la couleur", price: "$122,344", auctionHouse: "Sotheby's", date: "April 2, 2019", countryOrigin: "Democratic Republic of the Congo", medium: "Painting" },
  { artistName: "Eddy Kamuanga Ilunga", title: "Palm", price: "$106,031", auctionHouse: "Sotheby's", date: "April 2, 2019", countryOrigin: "Democratic Republic of the Congo", medium: "Painting" },
  { artistName: "Chéri Samba", title: "Record painting sale", price: "$139,992", auctionHouse: "Major auction house", date: "Unknown", countryOrigin: "Democratic Republic of the Congo", medium: "Painting" },
  { artistName: "Bodys Isek Kingelez", title: "Pacific Art Tower", price: "€71,500 (~$81,700)", auctionHouse: "Artcurial", date: "December 30, 2018", countryOrigin: "Democratic Republic of the Congo", medium: "Sculpture" },
  { artistName: "Chéri Samba", title: "Retour au Bercail", price: "R432,440 (~$26,000)", auctionHouse: "Aspire X Piasa", date: "February 14, 2020", countryOrigin: "Democratic Republic of the Congo", medium: "Painting" },
  { artistName: "Mohamed Melehi", title: "Constitution in puzzle B", price: "$196,800 USD", auctionHouse: "Artcurial", date: "November 2023", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Mohamed Melehi", title: "Composition", price: "$183,680 USD", auctionHouse: "Artcurial", date: "November 2023", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Mohamed Melehi", title: "Wilde", price: "$201,600 USD", auctionHouse: "Christie's", date: "May 2023", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Mohamed Melehi", title: "The Blacks", price: "$487,339 USD", auctionHouse: "Sotheby's", date: "March 2020", countryOrigin: "Morocco", medium: "Oil on canvas" },
  { artistName: "Mohamed Melehi", title: "Mirage", price: "$162,400 USD", auctionHouse: "Sotheby's", date: "March 2024", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Farid Belkahia", title: "Jerusalem", price: "$260,000 USD", auctionHouse: "Sotheby's", date: "March 2020", countryOrigin: "Morocco", medium: "Pigment on skin" },
  { artistName: "Farid Belkahia", title: "Étude sur le Malheur", price: "$89,456 USD", auctionHouse: "Bonhams", date: "June 2020", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Farid Belkahia", title: "Moroccanbestiaire (Bestial)", price: "$84,500 USD", auctionHouse: "Sotheby's", date: "April 2018", countryOrigin: "Morocco", medium: "Oil and pigments on wood" },
  { artistName: "Farid Belkahia", title: "Le Couple", price: "$74,815 USD", auctionHouse: "Bonhams", date: "June 2024", countryOrigin: "Morocco", medium: "Copper relief" },
  { artistName: "Farid Belkahia", title: "Composition", price: "$65,520 USD", auctionHouse: "Christie's", date: "November 2022", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Jilali Gharbaoui", title: "Composition", price: "$114,660 USD", auctionHouse: "Christie's", date: "November 2023", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Chaïbia Talal", title: "La Mariée", price: "$72,800 USD", auctionHouse: "Artcurial", date: "December 2021", countryOrigin: "Morocco", medium: "Oil on canvas" },
  { artistName: "Chaïbia Talal", title: "Un cycliste", price: "$67,600 USD", auctionHouse: "Artcurial", date: "December 2019", countryOrigin: "Morocco", medium: "Oil on canvas" },
  { artistName: "Jilali Gharbaoui", title: "Composition 1968", price: "$55,900 USD", auctionHouse: "Artcurial", date: "December 2021", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Chaïbia Talal", title: "Composition - 1999", price: "$49,400 USD", auctionHouse: "Artcurial", date: "December 2020", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Farid Belkahia", title: "Untitled", price: "$138,125 USD", auctionHouse: "Sotheby's", date: "April 2013", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Farid Belkahia", title: "Hand (Main)", price: "$113,750 USD", auctionHouse: "Sotheby's", date: "October 2014", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Mohamed Melehi", title: "Yellow Flame Between Black and Brown", price: "$80,000 USD", auctionHouse: "Sotheby's", date: "March 2023", countryOrigin: "Morocco", medium: "Oil on canvas" },
  { artistName: "Chaïbia Talal", title: "Aïcha", price: "$39,312 USD", auctionHouse: "Christie's", date: "November 2023", countryOrigin: "Morocco", medium: "Unknown" },
  { artistName: "Romuald Hazoumé", title: "Chou Chou", price: "$69,000", auctionHouse: "Fair Warning", date: "August 2020", countryOrigin: "Benin", medium: "Found plastic jerry can, synthetic hair, nylon, metal wire" },
  { artistName: "Romuald Hazoumé", title: "Alexandra", price: "$31,501 (£25,000)", auctionHouse: "Sotheby's", date: "11 November 2016", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Beninese Tallonnée", price: "$27,900 (£21,250)", auctionHouse: "Sotheby's London", date: "April 2019", countryOrigin: "Benin", medium: "Mixed media / found objects" },
  { artistName: "Romuald Hazoumé", title: "Untitled", price: "$26,200 (£20,000)", auctionHouse: "Phillips London", date: "October 2017", countryOrigin: "Benin", medium: "Mixed media" },
  { artistName: "Romuald Hazoumé", title: "Sénégauloise", price: "$24,500 (£20,160)", auctionHouse: "Christie's London", date: "October 2022", countryOrigin: "Benin", medium: "Plastic container, wire, dyed cloth" },
  { artistName: "Romuald Hazoumé", title: "Tchaï", price: "$22,700 (€20,800)", auctionHouse: "Artcurial Paris", date: "December 2018", countryOrigin: "Benin", medium: "Plastic jerry can, spoon" },
  { artistName: "Romuald Hazoumé", title: "Makanaki", price: "$20,200 (€18,560)", auctionHouse: "Bonhams", date: "July 2023", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Mon Gouvernement", price: "$21,200 (£16,380)", auctionHouse: "Sotheby's London", date: "October 2020", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Beninesema Poule", price: "$21,300 (£16,250)", auctionHouse: "Sotheby's London", date: "March 2018", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Sans titre", price: "$20,000 (196,800 MAD)", auctionHouse: "Artcurial", date: "December 2023", countryOrigin: "Benin", medium: "Unknown" },
  { artistName: "Romuald Hazoumé", title: "Alfred", price: "$13,000 (£10,080)", auctionHouse: "Sotheby's London", date: "October 2020", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Doko", price: "$14,200 (€13,000)", auctionHouse: "Artcurial Paris", date: "December 2018", countryOrigin: "Benin", medium: "Plastic jerry can, nylon" },
  { artistName: "Romuald Hazoumé", title: "Tudalar", price: "$11,200 (€10,240)", auctionHouse: "Bonhams Paris", date: "December 2023", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Angel", price: "$10,500 (€9,600)", auctionHouse: "Bonhams", date: "July 2023", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "La Mère Cotivet", price: "$11,400 (£8,750)", auctionHouse: "Sotheby's London", date: "May 2017", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Aícha", price: "$6,300", auctionHouse: "Christie's Dubai", date: "May 2024", countryOrigin: "Benin", medium: "Found plastic objects, heels, copper wire" },
  { artistName: "Romuald Hazoumé", title: "Arman", price: "$7,000 (€6,400)", auctionHouse: "Bonhams Paris", date: "September 2024", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Romuald Hazoumé", title: "Coca-lang", price: "$10,000 (97,500 MAD)", auctionHouse: "Artcurial Marrakech", date: "December 2020", countryOrigin: "Benin", medium: "Unknown" },
  { artistName: "Romuald Hazoumé", title: "Miss Johannesburg", price: "$18,500 (£15,000)", auctionHouse: "Sotheby's", date: "11 November 2016", countryOrigin: "Benin", medium: "Found objects" },
  { artistName: "Julie Mehretu", title: "Walkers with the Dawn and Morning", price: "$10,700,000", auctionHouse: "Sotheby's", date: "November 2023", countryOrigin: "Ethiopia", medium: "ink and acrylic on canvas" },
  { artistName: "Julie Mehretu", title: "Untitled (2001)", price: "$9,320,000", auctionHouse: "Sotheby's", date: "October 5, 2023", countryOrigin: "Ethiopia", medium: "acrylic on canvas diptych" },
  { artistName: "Elias Sime", title: "Tightrope: Split In Half (2017)", price: "$96,500", auctionHouse: "Sotheby's", date: "September 2024", countryOrigin: "Ethiopia", medium: "mixed media" },
  { artistName: "Afewerk Tekle", title: "Ethiopian defender Of His Country", price: "$42,933", auctionHouse: "Sotheby's", date: "October 16, 2018", countryOrigin: "Ethiopia", medium: "painting" },
  { artistName: "Skunder Boghossian", title: "L’Eternel Blue Composition (1963)", price: "$175,075", auctionHouse: "Bonhams", date: "2020", countryOrigin: "Ethiopia", medium: "oil on canvas" },
  { artistName: "Julie Mehretu", title: "Untitled I (2001)", price: "$1,020,000", auctionHouse: "Sotheby's", date: "2010", countryOrigin: "Ethiopia", medium: "unknown" },
  { artistName: "Gebre Kristos Desta", title: "People disguised (1973)", price: "unknown", auctionHouse: "Bonhams", date: "October 2016", countryOrigin: "Ethiopia", medium: "oil on board" },
  { artistName: "Gebre Kristos Desta", title: "The Devil and the Crescent", price: "unknown", auctionHouse: "Bonhams", date: "May 19, 2015", countryOrigin: "Ethiopia", medium: "oil on panel" },
  { artistName: "Pascale Marthine Tayou", title: "Unknown", price: "$98,000", auctionHouse: "Sotheby's", date: "16 Oct 2018", countryOrigin: "Cameroon", medium: "Mixed media" },
  { artistName: "Pascale Marthine Tayou", title: "Chalks and pins U", price: "$94,000", auctionHouse: "Bonhams", date: "19 May 2022", countryOrigin: "Cameroon", medium: "chalk, pins, feathers, straws, glitter and hot glue on wood" },
  { artistName: "Pascale Marthine Tayou", title: "Cache Sexe", price: "$68,000", auctionHouse: "Sotheby's", date: "May 2017", countryOrigin: "Cameroon", medium: "Unknown" },
  { artistName: "Pascale Marthine Tayou", title: "Little Chalk", price: "$40,900", auctionHouse: "Christie's", date: "202?", countryOrigin: "Cameroon", medium: "Acrylic, chalk, pastel" },
  { artistName: "Pascale Marthine Tayou", title: "Untitled (Italian Masks)", price: "$29,000", auctionHouse: "Christie's", date: "Mar 2026", countryOrigin: "Cameroon", medium: "Unknown" },
  { artistName: "Ouattara Watts", title: "Afro Beat", price: "$781,200", auctionHouse: "Christie's", date: "May 10, 2022", countryOrigin: "Ivory Coast", medium: "Painting" },
  { artistName: "Ouattara Watts", title: "Dark Star", price: "$125,000 (hammer)", auctionHouse: "Phillips", date: "September 25, 2025", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Aboudia", title: "Untitled", price: "£504,000 (~$655,200)", auctionHouse: "Christie's", date: "2022", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "Intercessor", price: "HK$1,134,000 (~$147,420)", auctionHouse: "Phillips", date: "2022", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "№ 1 For Miles", price: "£113,400 (~$147,420)", auctionHouse: "Phillips", date: "Not specified", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Aboudia", title: "La renaissance du Christ", price: "$187,500", auctionHouse: "Christie's", date: "March 2021", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Aboudia", title: "Noutchy dans la rue", price: "$187,500", auctionHouse: "Christie's", date: "March 2021", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "OZB", price: "$66,040", auctionHouse: "Phillips", date: "Not specified", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "Beyond Life", price: "$63,000", auctionHouse: "Phillips", date: "Not specified", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "Cosmic", price: "£30,480 (~$39,624)", auctionHouse: "Phillips", date: "Not specified", countryOrigin: "Ivory Coast", medium: "Not specified" },
  { artistName: "Ouattara Watts", title: "La Danseuse de Zanzibar", price: "$30,240", auctionHouse: "Phillips", date: "November 16, 2022", countryOrigin: "Ivory Coast", medium: "acrylic, gouache and graphite on handmade paper" },
  { artistName: "Aboudia", title: "Le Petit Chien Rouge", price: "$98,400", auctionHouse: "Sotheby's", date: "October 22, 2020", countryOrigin: "Ivory Coast", medium: "Not specified" },
];

// --- DETAILED COLLECTORS & PATRONS ---
export interface DiwaneDetailedCollector {
  name: string;
  countryId?: string;
  type: string;
  focus: string;
  collectionSize: string;
  publicAccess: boolean;
}

export const DIWANE_DETAILED_COLLECTORS: DiwaneDetailedCollector[] = [
  { name: "Joseph Awuah-Darko (Terra Collection)", type: "Private collector", focus: "Contemporary African art (African continent and diaspora)", collectionSize: "Unknown", publicAccess: true, countryId: "GH" },
  { name: "Nubuke Foundation", type: "Foundation", focus: "Contemporary Ghanaian art", collectionSize: "Unknown", publicAccess: true, countryId: "GH" },
  { name: "Seth Dei Collection", type: "Private collector, Diaspora", focus: "Modern and contemporary Ghanaian art", collectionSize: ">500 paintings", publicAccess: true, countryId: "GH" },
  { name: "Institute Museum of Ghana (Noldor)", type: "Foundation", focus: "Contemporary African and diaspora art", collectionSize: "Unknown (includes donations from Awuah-Darko)", publicAccess: true, countryId: "GH" },
  { name: "Bassam Chaïtou", type: "Private collector", focus: "Senegalese art over 40 years (e.g., Iba Ndiaye, Mor Faye, El Hadj Sy)", collectionSize: "Large (broad and deep, started 1998)", publicAccess: true, countryId: "SN" },
  { name: "David Brolliet", type: "Private collector (resident in Dakar)", focus: "Contemporary African/Francophone art, Senegalese (Omar Ba, Fally Sène Sow, Viyé Diba)", collectionSize: ">1,000 works", publicAccess: false, countryId: "SN" },
  { name: "Sylvain Sankalé", type: "Private collector", focus: "Classical and contemporary African/Senegalese art", collectionSize: "Several hundred", publicAccess: false, countryId: "SN" },
  { name: "Oumar Sow", type: "Private collector", focus: "Contemporary art (hosts residencies)", collectionSize: "Unknown", publicAccess: true, countryId: "SN" },
  { name: "CCH Pounder & Boubacar Koné (Musée Boribana)", type: "Foundation/Museum (diaspora collectors)", focus: "Caribbean/African Diaspora contemporary, Senegalese (Seydou Keita, Malick Sidibé)", collectionSize: ">500 works", publicAccess: true, countryId: "SN" },
  { name: "Kehinde Wiley (Black Rock Senegal)", type: "Foundation/Patron", focus: "Multi-disciplinary contemporary art", collectionSize: "N/A (residency program)", publicAccess: false, countryId: "SN" },
  { name: "Raw Material Company", type: "Foundation/Art Center", focus: "Contemporary African art", collectionSize: "N/A", publicAccess: true, countryId: "SN" },
  { name: "Sindika Dokolo Foundation", type: "Foundation (Diaspora)", focus: "Contemporary African art, African diaspora", collectionSize: "3,000-5,000 works", publicAccess: true, countryId: "CD" },
  { name: "Defise Foundation", type: "Foundation (Diaspora)", focus: "Modern and contemporary Congolese art", collectionSize: "Unknown", publicAccess: true, countryId: "CD" },
  { name: "Jean Pigozzi CAAC", type: "Private collector", focus: "Contemporary African art (incl. DRC artists)", collectionSize: "~10,000 pieces", publicAccess: true, countryId: "CD" },
  { name: "Pierre Loos Collection", type: "Private collector", focus: "Modern Congolese art 1926-1960", collectionSize: "Major private collection (50+ paintings auctioned)", publicAccess: false, countryId: "CD" },
  { name: "Texaf-Bilembo Cultural Centre", type: "Cultural centre / Patrons", focus: "DRC contemporary art", collectionSize: "Unknown", publicAccess: true, countryId: "CD" },
  { name: "Robert Defise Collection", type: "Private collector", focus: "Mid-20th century Congolese art", collectionSize: "Unknown", publicAccess: false, countryId: "CD" },
  { name: "Hans Bogatzke Collection", type: "Private collector", focus: "Contemporary sub-Saharan African art", collectionSize: "500+ works", publicAccess: false, countryId: "CD" },
  { name: "Adama Toungara", type: "Private collector", focus: "Art (likely contemporary Ivorian)", collectionSize: "~3,000 works", publicAccess: false, countryId: "CI" },
  { name: "Serge Hié", type: "Private collector", focus: "Classical African art", collectionSize: ">500 works", publicAccess: false, countryId: "CI" },
  { name: "Fondation Donwahi", type: "Family Foundation", focus: "Contemporary African art", collectionSize: "Unknown", publicAccess: true, countryId: "CI" },
  { name: "Société Générale Côte d'Ivoire Foundation (Maison de l'Art)", type: "Corporate", focus: "Contemporary African art", collectionSize: "Unknown", publicAccess: true, countryId: "CI" },
  { name: "Janine Kacou Diagou", type: "Private collector", focus: "Contemporary art", collectionSize: "Unknown", publicAccess: false, countryId: "CI" },
  { name: "Fabrice Sawegnon", type: "Private collector", focus: "Contemporary art", collectionSize: "Unknown", publicAccess: false, countryId: "CI" },
  { name: "Cédric Tidiane Diarra", type: "Private collector", focus: "Contemporary art", collectionSize: "Unknown", publicAccess: false, countryId: "CI" },
  { name: "Georges Moulo", type: "Diaspora Private collector", focus: "Emerging Ivorian artists", collectionSize: "20-30 million CFA value", publicAccess: false, countryId: "CI" },
  { name: "Jean Pigozzi Collection (CAAC)", type: "Private collector", focus: "Contemporary sub-Saharan African art (paintings, sculptures, photos, etc.)", collectionSize: ">10,000 works", publicAccess: true },
  { name: "Blachère Foundation", type: "Corporate Foundation", focus: "Contemporary African art", collectionSize: "~2,000-4,000 works", publicAccess: true },
  { name: "Artur Walther Collection", type: "Private collector", focus: "African photography & video art", collectionSize: "One of the largest globally", publicAccess: true },
  { name: "Gunter Péus Collection", type: "Private collector", focus: "Modern & tribal African art", collectionSize: "~400 works", publicAccess: true },
  { name: "Jean Pigozzi (CAAC)", type: "Private collector", focus: "Contemporary African art and photography", collectionSize: "~10,000 pieces", publicAccess: true },
  { name: "Prince Yemisi Shyllon / YSMA", type: "Private collector, Foundation", focus: "Nigerian art", collectionSize: "~7,000 artworks", publicAccess: true },
  { name: "Zeitz MOCAA (Jochen Zeitz)", type: "Foundation/Museum", focus: "Contemporary African art", collectionSize: "Large (largest museum)", publicAccess: true },
  { name: "Fondation Zinsou", type: "Foundation", focus: "Contemporary African art", collectionSize: ">1,000 works", publicAccess: true },
  { name: "MACAAL", type: "Foundation/Museum", focus: "Contemporary African art", collectionSize: "Impressive", publicAccess: true },
  { name: "Nike Art Gallery", type: "Private collector/Gallery", focus: "Nigerian art", collectionSize: "~8,000 pieces", publicAccess: true },
  { name: "Robert Devereux", type: "Private collector (Diaspora)", focus: "Contemporary African and diaspora art", collectionSize: "One of the largest", publicAccess: true },
  { name: "Tunji Akintokun", type: "Private collector", focus: "Modern and contemporary African art", collectionSize: "Significant", publicAccess: false },
  { name: "Prince Yemisi Shyllon / Yemisi Shyllon Museum of Art (YSMA)", type: "Private collector, Foundation", focus: "Nigerian art from traditional to modern/contemporary, African art, cultural festivals photos", collectionSize: "~7,000 artworks + 55,000 photographs", publicAccess: true, countryId: "NG" },
  { name: "Nike Davies-Okundaye / Nike Art Gallery", type: "Private collector, Gallery", focus: "Contemporary and traditional Nigerian/African art, paintings, sculptures, textiles", collectionSize: "Over 10,000 artworks", publicAccess: true, countryId: "NG" },
  { name: "Tunji Akintokun / Ilesha Charitable Trust", type: "Private collector (Diaspora), Foundation", focus: "Modern and contemporary African art", collectionSize: "Significant (30+ years collecting)", publicAccess: false, countryId: "NG" },
  { name: "Joe Obiago", type: "Private collector", focus: "Modern and contemporary art from Nigeria and other African countries", collectionSize: "Unknown", publicAccess: false, countryId: "NG" },
  { name: "Robert Mbonu / The Art Exchange", type: "Private collector", focus: "Nigerian contemporary art", collectionSize: "Unknown", publicAccess: true, countryId: "NG" },
  { name: "Aisha & Gbenga Oyebode", type: "Private collectors (family)", focus: "Nigerian art", collectionSize: "Unknown", publicAccess: false, countryId: "NG" },
  { name: "Kola Aina", type: "Private collector", focus: "Nigerian art", collectionSize: "Unknown", publicAccess: false, countryId: "NG" },
  { name: "The Wheatbaker Art Collection", type: "Corporate (hotel)", focus: "Contemporary African art", collectionSize: "Unknown", publicAccess: true, countryId: "NG" },
  { name: "Bandjoun Station (Barthélémy Toguo)", type: "Foundation", focus: "Modern and contemporary art, African and international", collectionSize: "Hundreds (compiled over 25 years)", publicAccess: true, countryId: "CM" },
  { name: "Diane Audrey Ngako", type: "Private collector", focus: "Contemporary African art", collectionSize: "Unknown", publicAccess: true, countryId: "CM" },
  { name: "Fondation MAM", type: "Foundation", focus: "Art, nature, culture; creative residencies", collectionSize: "Unknown", publicAccess: true, countryId: "CM" },
  { name: "Bègue-Buchert Collection", type: "Private collector (Diaspora)", focus: "Contemporary African art", collectionSize: "Unknown", publicAccess: true, countryId: "CM" },
  { name: "Bwo Art (Brice Yonkeu & Noelle Mukete-Elhalaby)", type: "Private collector/Advisory (Diaspora)", focus: "Contemporary African art", collectionSize: "150+ works placed", publicAccess: false, countryId: "CM" },
  { name: "Vanishing African Art Collection", type: "Private collector (Diaspora)", focus: "Traditional Cameroon art (Bamun etc.)", collectionSize: "Unknown (collected since 1970s)", publicAccess: false, countryId: "CM" },
  { name: "Menil Collection (Grassfields focus)", type: "Foundation", focus: "Cameroon Grassfields art", collectionSize: "20+ historical works exhibited", publicAccess: true, countryId: "CM" },
  { name: "Norval Foundation (Homestead Collection)", type: "Foundation", focus: "20th-century South African art, modern/contemporary African art", collectionSize: "Leading collection (size not specified)", publicAccess: true },
  { name: "Standard Bank Corporate Art Collection", type: "Corporate", focus: "Contemporary and classical South African/African art", collectionSize: "Over 1,200 pieces", publicAccess: true },
  { name: "Sasol Art Collection", type: "Corporate", focus: "Historical (pre-1994) and contemporary South African art", collectionSize: "~2,500 artworks", publicAccess: true },
  { name: "Ichikowitz Family Foundation Heritage Art Collection", type: "Family Foundation", focus: "South African and African art (1970s-present)", collectionSize: "One of the largest of its kind", publicAccess: true },
  { name: "Rupert Art Foundation / Museum", type: "Family Foundation", focus: "Modern South African art", collectionSize: "Foremost collection (size N/S)", publicAccess: true },
  { name: "Johannesburg Contemporary Art Foundation (JCAF)", type: "Foundation", focus: "Contemporary South African art connected to global south", collectionSize: "Draws from multiple private collections", publicAccess: true },
  { name: "Southern Collection", type: "Private Collection", focus: "Comprehensive contemporary South African art", collectionSize: "Large, comprehensive", publicAccess: true },
  { name: "Jack Ginsburg", type: "Private collector", focus: "Artist books", collectionSize: "N/S", publicAccess: true },
  { name: "Emile Stipp", type: "Private collector", focus: "Video art and broad collection", collectionSize: "Broad, N/S", publicAccess: true },
  { name: "Adi Enthoven & Gordon Schachat", type: "Private collectors", focus: "Contemporary art", collectionSize: "Considerable", publicAccess: true },
  { name: "Lazraq Family / MACAAL", type: "Private collector/Foundation", focus: "Contemporary African art, Moroccan pioneers", collectionSize: ">2,500 works", publicAccess: true, countryId: "MA" },
  { name: "Bank Al-Maghrib", type: "Corporate", focus: "Moroccan painting, Orientalist art", collectionSize: "80+ works", publicAccess: true, countryId: "MA" },
  { name: "Attijariwafa Bank", type: "Corporate", focus: "Modern Moroccan art, Casablanca School, African artists", collectionSize: "~2,250 works", publicAccess: false, countryId: "MA" },
  { name: "Abderrahman Slaoui Foundation", type: "Foundation", focus: "Moroccan decorative arts, jewelry, sous verre paintings", collectionSize: "Large (N/A)", publicAccess: true, countryId: "MA" },
  { name: "Fondation Cherkaoui", type: "Family Foundation", focus: "Ahmed Cherkaoui, modern Moroccan art", collectionSize: "N/A", publicAccess: true, countryId: "MA" },
  { name: "Fondation Alliances (Lazraq)", type: "Foundation", focus: "Contemporary African art", collectionSize: ">2,000 works", publicAccess: true, countryId: "MA" },
  { name: "Montresso* Art Foundation", type: "Foundation", focus: "Contemporary international art", collectionSize: "N/A", publicAccess: true, countryId: "MA" },
  { name: "Bouskri Family / Terrasses des Arts", type: "Private collector", focus: "Moroccan artifacts, pottery, jewelry, textiles", collectionSize: "Extensive", publicAccess: true, countryId: "MA" },
  { name: "Fatima-Zohra Bennani Bennis", type: "Private collector", focus: "Photography, contemporary art", collectionSize: "N/A", publicAccess: false, countryId: "MA" },
];

// --- DETAILED REGULATIONS BY COUNTRY (web-sourced with law names) ---
export const DIWANE_DETAILED_REGULATIONS: Record<string, DiwaneRegulation> = {
  "NG": {
    heritageProtection: "Nigeria's primary law is the National Commission for Museums and Monuments (NCMM) Act (Cap. N19 LFN 2004), originally Decree 77 of 1979, which protects antiquities, monuments, and national cultural heritage. The NCMM administers museums, declares national monuments, regulates excavations, and prohib",
    exportRules: "Export of antiquities requires a permit from the NCMM under the NCMM Act (Sections 24-26); exports without permit are prohibited, with compulsory purchase option by the state at fair price if permit denied. Antiquities and artifacts are banned from export (confirmed in 2026 policy). Modern artworks ",
    importRules: "Original artworks generally exempt from customs duties (HS Chapter 97); subject to 7.5% VAT on CIF value. No specific art import restrictions noted beyond general customs procedures.ARTMAJEUR, Trade.gov",
    droitDeSuite: "Nigeria has artist resale rights (droit de suite) under Section 17 of the Copyright Act 2022, entitling artists to a percentage of resale proceeds for original artworks sold at public auction or through dealers (specific rate not detailed in sources)",
    taxOnSales: "7.5% VAT applies to sales of artworks by artists, galleries, dealers, and auction houses (standard rate as of 2025-2026).AOC Solicitors, Zaccheus",
    antiMoneyLaundering: "No specific AML regulations for art market; art dealers/auction houses qualify as Designated Non-Financial Businesses and Professions (DNFBPs) under Money Laundering (Prevention and Prohibition) Act 2022 (Section 30), requiring compliance programs, C",
    culturalRestitution: "Ongoing Benin Bronzes restitutions: Netherlands returned 119 bronzes in 2025 (largest single return; handover June 2025 at Lagos National Museum, stored in Benin City).Town & Country, Government.nl, Museum.ng, Euronews. Switzerland agreed to return in 2026. NCMM oversees; 2023 Gazette vests ownershi",
  },
  "GH": {
    heritageProtection: "Ghana's cultural heritage is protected under Act 387 of 1969 (formerly NLCD 387), administered by the Ghana Museums and Monuments Board (GMMB), which manages movable and immovable heritage, maintains a national register, declares national monuments, and controls export/import/sale via permits. Folkl",
    exportRules: "Export of antiques, art, and cultural property requires a permit from GMMB under Act 387/EI 29. GRA requires specific permits for antiques from Museums and Monuments Authority; general exports need registration, forms, and agency permits.GRA, GMMB",
    importRules: "Imports require GMMB permit for cultural property; general process via ICUMS includes registration, declaration, permits from relevant agencies (e.g., GSA), duties 5-35% by HS code (art/antiques likely Chapter 97, often low/duty-free globally but ver",
    droitDeSuite: "No droit de suite (artist's resale royalty) in Ghana; Copyright Act 2005 covers economic rights but no resale right provision.WIPO",
    taxOnSales: "Standard VAT 15% + 2.5% NHIL + 2.5% GETFund (effective 20% on taxable supplies including art sales by registered dealers); auctioneers/promoters must register regardless of turnover. New VAT Act 2025 (Act 1151, eff. 2026) integrates levies as input-d",
    antiMoneyLaundering: "Art dealers/auction houses likely DNFBPs under Anti-Money Laundering Act 2020 (Act 1044); require CDD, record-keeping, suspicious reporting to FIC. No art-specific rules found, but general high-value goods risks apply; follow FATF Rec. 22.NameScan, F",
    culturalRestitution: "Ghana actively pursues restitution of looted Asante artifacts; recent returns: 7 from UCLA Fowler (2024), 32 on loan from BM/V&A (2024), 130+ from private collectors/UK/SA (2025). No specific law, but supported via diplomacy/Manhyia Palace; ongoing calls for permanent returns.Artnet, BBC",
  },
  "AO": {
    heritageProtection: "Primary law is Law No. 14/05 of October 7, 2005, on Cultural Heritage (Lei n.º 14/05, de 7 de Outubro, do Património Cultural), protecting movable and immovable cultural property including art objects of historical, artistic, archaeological value through classification, registration, special protect",
    exportRules: "Cultural heritage items classified under Law 14/05 require export authorization (Article 30 on export regime); illicit export subject to administrative and criminal penalties (Articles 56-66). General exports need customs procedures; no specific art export percentages found. Likely requires INBAC ap",
    importRules: "No specific art import rules identified; general import duties average 10.9% (2-50% range), plus 2% customs fee, VAT 14%; cultural imports may be exempt or restricted if prohibited by heritage laws (e.g., via Presidential Decree 1/24). Prohibited if ",
    droitDeSuite: "No evidence of droit de suite (artist's resale right) legislation in Angola; not mentioned in cultural or IP laws reviewed. Angola not listed among countries implementing it. Harvard Law",
    taxOnSales: "Standard VAT rate 14% applies to goods sales including likely art; no specific art exemptions or reduced rates identified for sales or auctions. Anrok VAT Guide",
    antiMoneyLaundering: "No specific AML regulations for art market found; general AML laws apply (Angola is FATF grey list as of 2025). Art trade lacks dedicated oversight similar to some jurisdictions. AML Watcher",
    culturalRestitution: "Ongoing efforts to reclaim colonial-era artifacts (e.g., Tchokwe dolls, masks from Portugal); Angola conducting inventories and seeking returns, criticizing UNESCO 1970 Convention's non-retroactivity. Active diplomacy via Ministry of Culture. BUALA, Ver Angola",
  },
  "MA": {
    heritageProtection: "Law 22-80 (conservation of monuments, sites, art objects, antiquities, amended 2006); Projet de loi 33.22 (2025 bill, presented Jan 2025, protects material/immaterial heritage incl. subaquatic/geological, living treasures; regulates art exports; severe penalties; aligns w/ intl conventions; status: ",
    exportRules: "Exports of classified cultural goods (archaeological >100yrs?, art >50yrs?, antiques) prohibited w/out permit from Ministry of Culture; illicit export punished severely (fines/prison); regulates art works export per Law 33.22; private ownership allowed but state pre-emption on transfers; aligns w/ U",
    importRules: "No specific art import duties found; general VAT applies on imports (reform to 10-20% rates by 2026, specifics for art unclear); cultural goods imports controlled to prevent illicit trafficking per UNESCO conventions ratified by Morocco. Grant Thornt",
    droitDeSuite: "Enacted in Loi n° 66.19 (June 2023); inalienable right for authors of graphic/plastic art works; royalty 2-8% (degressive) on resales by art market professionals after first sale; collected by BMDAV for artist/heirs (70 yrs post-death); platform bmda",
    taxOnSales: "VAT (TVA) standard 20% (post-reform); no specific reduced rate for art found; sales by galleries/auctions subject to VAT; droit de suite additional 2-8%; no explicit art sales tax exemption. Grant Thornton",
    antiMoneyLaundering: "General AML via Loi 43-05 (anti-money laundering & terror financing); no specific art market rules found; applies to financial sectors; art vulnerable but not designated (e.g., no DNFBP for art); severe penalties (fines 50k-5M MAD, prison 2-30yrs). M",
    culturalRestitution: "Ratified UNIDROIT 1995 & UNESCO 1970; active recoveries (e.g., 25k artifacts from France 2020, fossils from US); fights illicit trafficking; Law 33.22 combats appropriation; intl cooperation for returns; no major colonial claims noted (protectorate 1912-1956). Morocco World News, New Arab",
  },
  "BJ": {
    heritageProtection: "Loi n° 2021-09 du 22 octobre 2021 portant protection du patrimoine culturel en République du Bénin, with 7 implementing decrees in 2023; protects cultural goods from destruction, export, etc.; penalties up to 120 months imprisonment and 50M CFA fine; prior Loi 2007-20 (La Nation Bénin, Books Openedi",
    exportRules: "Export of cultural goods requires prior license from Ministry of Culture; prohibited without it except artisanal items &lt;50 years old; illicit export leads to seizure; Benin reserves right to repatriate illicitly exported goods per Loi 2021-09 (Books Openedition).",
    importRules: "Production, import, sale of artworks exempt from customs duties and TVA since Jan 2025 per Loi de Finances 2025 art.13 (paintings, sculptures, photos, etc.); illicit imports violating origin laws prohibited (24haubenin, Africaho).",
    droitDeSuite: "Provided in Loi n° 2005-30 du 05 avril 2006 art. on droit de suite: percentage on resale proceeds for author/heirs, fixed by regulation (SGG Bénin).",
    taxOnSales: "Exempt from TVA on production, import, sale of artworks since Jan 2025 per Loi de Finances 2025; reduced TPS 3% for art trading firms (Africaho, La Nation).",
    antiMoneyLaundering: "UEMOA uniform Loi relative à la lutte contre le blanchiment de capitaux (2003); applies to financial institutions, casinos; no specific art market rules found; Benin participates in GIABA regional efforts (BCEAO).",
    culturalRestitution: "Loi 2021-09 supports repatriation; Benin received 26 Abomey items from France (2021); supports UNESCO 1970 Convention, UNIDROIT 1995 (50th state 2021); ongoing claims; infrastructure via museums (Gouv Bénin, Diplomatie FR). Benin Bronzes are Nigerian (Edo/Benin City), with 2025-2026 returns from Net",
  },
  "CM": {
    heritageProtection: "Primary law is Loi n° 2013/003 du 18 avril 2013 régissant le patrimoine culturel au Cameroun, regulating movable and immovable cultural heritage, with classification (recognized, Class A/B/C protected), inventories, and protective measures including inalienability of classified items. Implemented by",
    exportRules: "Recognized/classified cultural goods cannot be exported definitively (Art. 55); temporary export requires Minister authorization (Art. 57, e.g., exhibitions). Copies need prior approval. State reserves repatriation rights for illicit exports. No general export permit process detailed beyond heritage",
    importRules: "Standard CEMAC import duties apply per Common External Tariff (0-30% by category; art likely Chap. 97 low/no duty). VAT 19.25% on CIF value + duties at import. No specific cultural import restrictions noted; general quality/price controls. Lloyds Ban",
    droitDeSuite: "Recognized in Loi n° 2000/011 du 19 décembre 2000 relative au droit d’auteur (Art. 20): inalienable right for authors of graphic/plastic works/manuscripts to participate in public auction/dealer resale proceeds. Rate and modalities set by regulation ",
    taxOnSales: "VAT at standard rate of 19.25% applies to art sales (no reduced rate specified for art). Artist deliveries may qualify under general rules; sales of classified heritage subject to state preemption. VAT Update, Anrok",
    antiMoneyLaundering: "No specific AML rules found for art market; general national AML framework applies (Cameroon on FATF grey list, strengthening via GABAC/CEMAC). Art vulnerable due to high value/opacity, but unregulated as DNFBP sector. Financial Afrik",
    culturalRestitution: "Active efforts: Germany returned 8 Bangwa artifacts (2024); first wave planned Sep 2025 (e.g., Tangué, Dzom So’o). ~40,000 items in German museums; committee for repatriation, museum upgrades. France/Germany fund provenance research; Savoy/Sarr report advocates returns. Stopblablacam, Dekonial, Elys",
  },
  "NG": {
    heritageProtection: "Nigeria's primary law is the National Commission for Museums and Monuments (NCMM) Act (Cap. N19, Laws of the Federation of Nigeria 2004, originally Decree 77 of 1979), establishing the NCMM to administer national museums, antiquities, and monuments; declare and protect national monuments; regulate e",
    exportRules: "Export of \"antiquities\" strictly prohibited without NCMM permit (s.25 NCMM Act); modern artworks require NCMM Museum Certificate; Customs Export Declaration Form also needed. No permit = offence (fine N2,000 or 5x value/imprisonment 3 years + forfeiture). Accredited agents only for buying/selling ",
    importRules: "Artworks (HS Ch.97, e.g., 9701 paintings) generally exempt from customs duties; 7.5% VAT on imports. Requires standard import docs (Form M, invoice, etc.); NCMM notification if cultural significance. No specific prohibitions noted beyond general cust",
    droitDeSuite: "Introduced in Copyright Act 2022 (s.17): inalienable right for authors (incl. heirs) of original artistic works (excl. applied/architectural art) to share in resale proceeds via public auction/dealer after first sale; % and conditions set by regulati",
    taxOnSales: "7.5% VAT (standard rate) applies to sales of artworks/galleries/auctions as taxable supplies (no specific exemption noted); administered by FIRS. Companies > threshold must register/remit. Trading Economics, AOC Solicitors Art Law, Stripe VAT Guide",
    antiMoneyLaundering: "No specific AML rules for art market (dealers/galleries/auctions not designated non-financial institutions under Money Laundering (Prohibition) Act 2011 (as amended)); general AML applies via EFCC/NFIU (CDD, STRs for cash >N5m/individuals N10m/compan",
    culturalRestitution: "Active claims/returns of looted Benin Bronzes (1897 British punitive expedition): Netherlands returned 119 (2025, largest physical return); Zurich Museum Rietberg transferred 11 (2026); Germany >500; US (Smithsonian 29, MFA Boston 2, etc.); ongoing from UK/Belgium/France. Nigeria/NCMM leads via form",
  },
  "RW": {
    heritageProtection: "Law Nº 28/2016 of 22/07/2016 on the Preservation of Cultural Heritage and Traditional Knowledge governs protection. Defines tangible (movable/immovable, underwater) and intangible heritage (oral traditions, dances, crafts). Ministry classifies tangible heritage based on criteria like artistic genius",
    exportRules: "Permanent export of national cultural heritage prohibited (Art. 22). Temporary export for restoration/research/exhibition allowed with ministerial certificate (Art. 23). General exports follow EAC rules; cultural items restricted. No general export license required except for specified goods. Rwanda",
    importRules: "Follows EAC Common External Tariff (CET): likely 0-10% duty for art (capital/intermediate goods). VAT 18% on CIF + duty. IDL 1.5%, AUL 0.2%, QIF 0.2%. Foreign classified heritage protected as national (Art. 24); unlawful imports must be reported (Art",
    droitDeSuite: "No evidence of droit de suite (artist's resale royalty) in Rwanda IP laws (Law 055/2024 or prior). Not mentioned in heritage or IP frameworks. ENSafrica, Adams & Adams",
    taxOnSales: "Standard VAT 18% on domestic art sales unless exempt (e.g. certain cultural goods). Exports zero-rated. No specific art exemptions noted. PwC Tax Summaries, RRA Exempt Goods",
    antiMoneyLaundering: "No specific AML rules for art market found. General AML applies via National Bank of Rwanda/FATF compliance, but art dealers not designated as obliged entities. [General searches yielded no Rwanda-specific art AML]",
    culturalRestitution: "Law enables repatriation of unlawfully exported heritage via Minister of Foreign Affairs (Art. 21). ~90% of heritage still abroad (e.g. royal remains, songs); digital repatriations from Belgium, but physical returns limited. Ongoing efforts. Vision Media Rwanda, RwandaLII Law Nº 28/2016",
  },
  "SN": {
    heritageProtection: "Primary law is Loi n° 71-12 du 25 janvier 1971 fixing the regime for historical monuments, sites, excavations, and discoveries. Protects movable and immovable monuments of historical, artistic, scientific interest, including African art. Classification by administrative authority; no destruction/mod",
    exportRules: "Prohibited for classified/proposed/listed monuments/objects; prior authorization for unclassified objects of historical/ethnological/African art interest (excl. recent artisanal). State retention/preemption right. Illegal export: 1-3 months imprisonment + fine 100k-5M CFA francs, confiscation. Tempo",
    importRules: "No specific art import rules found; general customs duties 0-35% by product + 18% VAT on CIF value. Art likely classified under HS Chapter 97 (works of art); WAEMU/OHADA harmonized but specifics unclear zhengbackpack.",
    droitDeSuite: "Yes, under Loi n° 2008-09 du 25 janvier 2008 on copyright: 5% of resale price (public auction/dealer) for original graphic/plastic 3D works/manuscripts (inalienable, post-first ownership transfer). Excludes architecture/applied art. Procedure by decr",
    taxOnSales: "Standard VAT 18% on art sales (B2C/B2B unless reverse charge). No specific reduced rate for art found Anrok, Quaderno.",
    antiMoneyLaundering: "General AML/CFT via Loi 02/2024 (adopted Feb 2024, UEMOA uniform act); covers money laundering, terrorism financing, proliferation. No art-specific; high ML risk (8th globally), real estate primary vector but art vulnerable due to opacity. CENLEC sup",
    culturalRestitution: "Ongoing claims vs France (e.g., sword of El Hadj Omar Tall returned 2020/loan 2019; ~10k objects sought per 2018 Sarr-Savoy report). Benin/Senegal prioritized; France law enables returns for illicitly acquired (1815-1972). Senegal pushes full restitution, builds capacity (Musée des Civilisations Noi",
  },
  "CI": {
    heritageProtection: "Primary law is Loi n° 2023-595 du 7 juin 2023 portant protection du patrimoine culturel national, replacing Loi n° 87-806 du 28 juillet 1987. Defines cultural heritage broadly (material and immaterial). Protection via inventory, inscription, classement (strictest, state preemption/expropriation poss",
    exportRules: "Export of classified movable cultural goods prohibited (Art. 41 Loi 2023-595); exceptional temporary authorization possible (return required). Unclassified art/antiquities require prior Export Certificate from Musée des Civilisations de Côte d'Ivoire or Musée National du Costume de Grand-Bassam (500",
    importRules: "No specific art import restrictions found beyond general ECOWAS CET: 0-35% duties by category (art likely Chapter 97: 0-20%). VAT 18% + 1% stats fee + 2.6% additional tax on CIF value. No cultural import bans noted; standard customs apply.Trade.gov, ",
    droitDeSuite: "Implemented in Loi n° 2016-555 du 26 juillet 2016 relative au droit d'auteur et droits voisins (Arts. 20-22). Inalienable right for authors of graphic/plastic works/manuscripts to share in resale proceeds (auctions/professional art market sales after",
    taxOnSales: "Standard VAT 18% on art sales (no reduced rate for art found). Taxable on domestic sales/import deliveries.IMF/Quaderno, Oxford Business Group",
    antiMoneyLaundering: "General AML via Ordonnance n° 2023-875 (2023) on blanchiment, FT, WMD proliferation. No art-specific rules found (e.g. no KYC thresholds for galleries). Côte d'Ivoire on EU/FATF gray list (2024/2025) for AML deficiencies (non-financial sectors weak);",
    culturalRestitution: "Active claims: 148+ artifacts requested from France (2019), incl. Djidji Ayôkwé talking drum (looted 1916, returned Feb 2026 via French law 2025-644). Ongoing diplomatic efforts; aligns with UNESCO 1970. France/Benin/Senegal precedents.Artnews, Culture.gouv.fr, Le Monde",
  },
  "CD": {
    heritageProtection: "Primary law: Ordonnance-loi n° 71-016 du 15 mars 1971 relative à la protection des biens culturels (classification by Minister of Culture). Constitution Art. 46 protects heritage. Ratified UNESCO 1970 Convention. Recent: National cultural policy law adopted May 2025. World Bank PDF, ACP, DGDA",
    exportRules: "Requires export authorization from Ministry of Culture, Arts &amp; Heritage (Arts/Letters for art/crafts; special temporary for heritage). Plus DGRAD payment note. Prohibits illicit export per 1971 law &amp; UNESCO 1970 (ratified 1974). DGDA Customs",
    importRules: "Detailed declaration required; origin export auth if UNESCO state. Duties 5-20% ad valorem (category-based) + 16% VAT on CIF + OCC 2% tax. Customs verification. No art-specific exemptions found. Trade.gov, DGDA",
    droitDeSuite: "No specific artist's resale royalty (droit de suite) law identified. Copyright: Ordonnance-loi n°86-033/1986 (life +50 years); droits voisins exist but not for visual art resales. WIPO Lex, IFDRC",
    taxOnSales: "Standard 16% VAT on art sales; no reduced rate or special art regime found. Trading Economics, Quaderno",
    antiMoneyLaundering: "General framework: Loi n°22/068 du 27 juillet 2022 (AML/CFT, replacing Loi 04/016). No art-specific rules; may apply to high-value dealers. DRC on FATF grey list since 2022. Revue Chercheur PDF",
    culturalRestitution: "Ongoing claims for ~84,000 colonial artifacts in Belgium (AfricaMuseum). Belgium 2022 law enables restitution of pre-1960 illicitly acquired items; inventories shared. DRC 2022 decree establishes repatriation commission. Some returns (e.g., Suku mask 2022); bilateral talks continue. Belga, Actualite",
  },
  "FR": {
    heritageProtection: "France's Code du patrimoine defines cultural heritage broadly (Art. L111-1) and designates \"trésors nationaux\" (national treasures, Art. L111-1), which cannot be exported permanently but only temporarily with authorization; protection includes export controls and acquisition preferences by the sta",
    exportRules: "Export of cultural goods requires certificates (Cerfa 02 0075) for permanent or unlimited temporary exit, or AST (Cerfa 02 0083) for specific temporary purposes; national treasures only temporary AST. For EU exit, EU export license (Cerfa 11033*03). Thresholds by age/value categories; illicit export",
    importRules: "0% customs duties on art (ch.97 HS); import VAT 5.5% on CIF value. From 28 Jun 2025, EU Reg. 2019/880 requires: import license for >250yo high-risk goods; importer statement for >200yo >€18k lower-risk goods, proving legal export from origin or last ",
    droitDeSuite: "Artist's resale right (droit de suite) on professional resales ≥€750: degressive rates 4% (up to €50k), 3% (€50-200k), 1% (€200-350k), 0.5% (€350-500k), 0.25% (>€500k), cap €12.5k. Applies to EU/EEA nationals or reciprocal countries, life +70 years. ",
    taxOnSales: "From 1 Jan 2025, reduced VAT 5.5% on total price for professional sales, imports, intra-EU acquisitions of art (aligning with EU Directive 2022/542); margin scheme (20% on margin) only if acquired without deductible VAT (e.g. from private). Small sal",
    antiMoneyLaundering: "Art market professionals (galleries, auction houses, dealers) are obliged entities under French Monetary Code (Art. L561-2, post-5AMLD transposition): KYC/CDD for transactions ≥€10k (single/linked), ongoing monitoring, suspicious transaction reports ",
    culturalRestitution: "2025 framework bill (PJL n°871, adopted Senate Jan 2026) creates administrative procedure (decree by Conseil d'État) to declassify/deaccession public collections for restitution to origin states of illicitly appropriated items (1815-1972: theft/pillage/force), excluding military/archives/archaeologi",
  },
  "NE": {
    heritageProtection: "Niger's primary law is Loi N°97-022 of 30 June 1997 relative à la Protection, la Conservation et la Mise en valeur du Patrimoine Culturel National, which categorizes cultural property into material (biens culturels, naturels, mixtes) and immaterial forms. It establishes procedures for inventory, dec",
    exportRules: "Export of cultural heritage is restricted under Loi 97-022 and the 1970 UNESCO Convention (ratified by Niger). Efforts include training for police/douanes (UNESCO 2020-2021) and anti-trafficking programs. No specific permit process detailed in sources; illicit export prohibited, with synergies via O",
    importRules: "No specific import duties or exemptions for art found in Code des Douanes (Loi 61-17, updated 2000). General structure: uniform fiscal duties + protective duties based on origin (general/minimum/intermediate tariffs). Art likely classified under anal",
    droitDeSuite: "No evidence of droit de suite (artist's resale royalty) in Niger. Copyright law (Ordonnance n°93-027 of 1993) protects visual arts but does not mention resale rights; duration 50pma for fine arts. Not adopted in West Africa beyond Nigeria (2022). Afr",
    taxOnSales: "VAT rate 19% (Finance Act 2025); applies to goods/services including potentially art sales, with e-invoicing required. No art-specific exemptions or rates identified. KPMG, VATabout",
    antiMoneyLaundering: "General AML framework via loi relative à la lutte contre le blanchiment et le financement du terrorisme; CENTIF-Niger oversees. No art-specific AML rules found, but cultural trafficking addressed via UNESCO programs and police/douane training. Art tr",
    culturalRestitution: "Niger actively pursues restitution of cultural goods held abroad (e.g., France), planning specialized commission for technical/scientific work. Engaged in ECOWAS/UNESCO frameworks; revising laws for returns. No major completed cases noted (unlike Nigeria/Benin). Le Sahel",
  },
  "BF": {
    heritageProtection: "Primary law is Loi N°022-2023/ALT du 08 août 2023 portant protection, sauvegarde et valorisation du patrimoine culturel au Burkina Faso, replacing Loi N°024-2007/AN. Defines cultural property broadly (Art. 3), mandates state inventory, classification, protection against destruction/alienation/illici",
    exportRules: "Export of classified/inventoried cultural movables prohibited (Art. 66,68 Loi 022-2023); exceptional ministerial loan authorization for exhibitions (max 12 months, renewable 3x, Art.69). All art objects (incl. recent artisanal) require prior culture ministry export title (Art.70). State preemption r",
    importRules: "Prohibits import/export/transit/acquisition of illicitly sourced cultural goods from other states (Art.73 Loi 022-2023). Illicit goods seized, restituted to origin state (Art.74). No specific duties/tariffs found for art imports; general customs appl",
    droitDeSuite: "Yes, under Loi N°032-99/AN du 22 décembre 1999 (propriété littéraire et artistique), Art.18: inalienable right for graphic/plastic arts authors to share of resale proceeds at auction/dealer (rate by decree), persists for heirs.Loi 032-99/AN",
    taxOnSales: "Artist direct sales of own artworks exempt from VAT/IBICA (revenue tax) per CGI Art.28(7), excluding jewelry/manufactured. General VAT 18%; no specific art resale VAT found.DGI CGI",
    antiMoneyLaundering: "Dealers in antiquities/works of art designated as obliged entities under Loi N°016-2016/AN (lutte contre blanchiment capitaux/FT), must apply CDD, report suspicions to CENTIF.Loi 016-2016/AN",
    culturalRestitution: "Loi 022-2023 mandates state facilitation of illicitly exported goods repatriation (Art.79), cooperation for restitution (Art.10), return to origin communities (Art.80). ~1,088 objects identified in French collections; formal request to France (2019), awaiting response. Past repatriations (e.g., 33 i",
  },
  "GA": {
    heritageProtection: "Gabon's primary law is Loi N° 2/94 du 10 décembre 1994 portant protection des biens culturels, protecting movable/immovable cultural property (art, historical, scientific interest) via inventory, classification (inalienable for public), preemption, export authorization by Culture Minister, commerce ",
    exportRules: "Export of cultural property requires authorization from Minister of Culture (Art. 68 Loi 2/94); fraudulent export criminalized. Trade requires Commerce Minister agrément after Culture advice.WIPO Lex, Douanes Gabon",
    importRules: "Illicit import (violating origin country laws) criminalized (Art. 69 Loi 2/94). Imports require Culture Ministry certificate; customs declaration. Duties per CEMAC CET (avg 16.9%, specific for art unclear); VAT 18% on CIF value likely applies.WIPO Le",
    droitDeSuite: "Enacted in Ordonnance N° 0011/PR/2024 du 26/02/2024 (effective 2024, abrogates Loi 1/87): 5% on resale proceeds (auctions/professional art market) for graphical/plastic works authors after first cession, inalienable, charged to seller (excludes archi",
    taxOnSales: "Standard VAT (TVA) 18% applies to art sales (CEMAC/Gabon rate); reduced rates (10%,5%) possible but not specified for art.Trading Economics, Atek",
    antiMoneyLaundering: "No art-specific AML rules found; general AML/CFT framework weak per 2023 FATF assessment (low effectiveness, vulnerabilities in high-risk sectors like precious metals; art not designated). GABAC regional oversight.IMF",
    culturalRestitution: "No formal state claims to France (2026); recent voluntary returns: 90+ objects from Italy/private collections (2025). Ongoing Ngil mask claim in France (looted ~1917). Growing awareness but limited action.Gabonreview, TRT Afrika",
  },
};

// --- ART FINANCE INTELLIGENCE ---
export interface DiwaneArtFinanceIntel {
  topic: string;
  category: string;
  description: string;
  keyPlayers: string;
  marketSize: string;
  africaRelevance: string;
}

export const DIWANE_ART_FINANCE_INTEL: DiwaneArtFinanceIntel[] = [
  { topic: "Art Lending and Lombard Credit", category: "Art Finance", description: "Art lending involves using fine art as collateral for loans, typically 40-60% LTV, allowing collectors liquidity without selling. Lombard lending is securities-backed loans, extended to art portfolios. Global market growing despite art sales fluctuations, focused in US/Europe with emerging African players.Berkley One, Zurani, Deloitte Art & Finance", keyPlayers: "Sotheby's Financial Services ($2B portfolio, up to $250M loans), Christie's Art Finance ($1-150M), Bank of America Private Bank (14% YoY growth H1 2025), Fine Art Group ($1-200M), Athena Art Finance (Yieldstreet), Citi Private Bank, TPC Art Finance. Africa: Lamna (SA), Africa Collect (installment art buys), Nedbank Private Wealth (Lombard).Christie's, Sotheby's, BoA, Lamna", marketSize: "$28.7-33.3B global art loan book in 2025, projected >$50B by 2027; $29-34B in 2023, ~$40B by 2025 est. Growth: BoA +14% H1 2025, steady 10% annual.Maddox Gallery, Art Basel/UBS, Deloitte", africaRelevance: "Emerging but nascent; South Africa leads with Lamna (art pawn loans up to R10M), Africa Collect (collect now-pay-later R1k-50k), Nedbank Lombard (securities/art-backed). Nigeria IP-backed loans for creatives (2025). No major global players focused on Africa; geographic coverage mainly US/UK/Europe/Middle East. Afreximbank $1B creative fund (not art-specific). Limited data for 2025-2026 growth.Lamn" },
  { topic: "Art-secured lending", category: "Art Finance", description: "Art-secured lending involves using fine art collections as collateral for loans, allowing owners to access liquidity without selling assets. Popular among high-net-worth collectors for funding acquisitions, investments, or estate planning while retaining ownership.", keyPlayers: "Sotheby’s Financial Services (portfolio ~$2B, loans up to $250M), Christie’s Art Finance (loans $1M-$150M), Bank of America Private Bank (14% YoY growth H1 2025, min $10M), The Fine Art Group (loans $1M-$200M), Athena Art Finance (part of Yieldstreet), Citibank Art Finance, JPMorgan Private Bank, Emigrant Bank Fine Art. In Africa: VBank/ARTSSPLIT (Nigeria, up to N60M), Lamna (South Africa).", marketSize: "Global outstanding loans estimated $34-40B in 2025 (Deloitte), up from $29.2-34.1B in 2023; projected to reach $50B by 2027. Growth driven by liquidity needs amid muted art sales ($57.5B in 2024). Art Basel, Deloitte via Puck, Wealthprofessional.", africaRelevance: "Emerging but nascent market. Nigeria: VBank/ARTSSPLIT art-based loans up to N60M (~$36K) at 34.5% interest, artwork held by custodian. South Africa: Lamna offers loans against fine art, no credit checks. AfricartMarket provides appraisals for secured lending. No large-scale players; limited to local fintechs/pawnbrokers vs global billions. Businessday NG, Lamna, AfricartMarket." },
  { topic: "Art investment funds", category: "Alternative Investments", description: "Art investment funds pool capital to invest in fine art as an alternative asset class, offering diversification, low correlation to traditional markets, and potential appreciation. Focus on Europe and Africa shows growth amid global art market recovery in 2025.", keyPlayers: "Europe: Artemundi (Guernica V Fund), Anthea Art Investments (CAIF, CAIO funds), The Fine Art Group, Masterworks, Yieldstreet (Athena Art Finance). Africa: KIISA ART (Art 4 Africa Fund), Artscapy, Splint Invest, Strauss & Co (South Africa auctions), platforms like 1-54 Contemporary African Art Fair participants.Coherent Market Insights, HTF Market Intelligence, KIISA ART, SourceForge", marketSize: "Global art funds market valued at ~$838M in 2025 (CAGR 5.8% to $1.24B by 2032); broader art market $59.6B in 2025 (+4% YoY). Europe: Strong presence via AIFMD-regulated funds, UK/France key markets. Africa: Contemporary segment resilient, auction sales $70.5M in 2025 (+43% YoY), led by South Africa/Nigeria.Coherent Market Insights, Art Basel/UBS, Artnet", africaRelevance: "High growth potential in contemporary African art (Nigeria, South Africa, Morocco hubs); opportunities in emerging artists/residencies, challenges include infrastructure gaps, funding scarcity, logistics. Local players like KIISA focus on African/Diaspora art; global interest rising but <1% of world market. Strauss & Co sales +26% to $28M in 2025.Artnet, KIISA ART, LinkedIn" },
  { topic: "African Art Market", category: "Art & Culture", description: "The African art market, focusing on contemporary and modern African art, showed resilience amid global declines, with auction sales reaching $70.5M in 2025 (up 43% YoY from 2024), though below 2022 peak of $116.5M. Projections estimated $1.5B by 2025, driven by art fairs, digital platforms, and growing collectors. Key hubs: Nigeria, South Africa, Ghana; global sales via London, NY auctions.", keyPlayers: "Auction houses: Sotheby's, Christie's, Bonhams, Strauss & Co, Aspire Art, Artcurial. Galleries: Goodman Gallery (SA), Gallery 1957 (Ghana), SMO Contemporary (Nigeria), Gallery MOMO (SA), Addis Fine Art (Ethiopia), Afriart Gallery (Uganda). Funds/Companies: KIISA Art (Art 4 Africa Fund). Artists: Julie Mehretu, Amoako Boafo, Njideka Akunyili Crosby, Toyin Ojih Odutola, Irma Stern, Ben Enwonwu.", marketSize: "Contemporary African art auctions: $101.3M peak (2021), $72M+ annually (2023 data), $70.5M (2025, +43% YoY), resilient with -8.4% drop in 2023 vs global -18%. Overall market projected $1.5B by 2025. Strauss & Co: $28M turnover (2025, +26% YoY). Global art context: <1% of $68B market. Tribal art: €117.6M (2024).", africaRelevance: "High growth in African collectors (e.g., 2/3 of Sotheby's African art sales); fairs like 1-54 Marrakech, Art X Lagos, Investec Cape Town Art Fair boost local ecosystems. Emerging hubs: Nigeria (Lagos), Ghana (Accra), South Africa (Cape Town/Johannesburg), Angola, Senegal. Resilience tied to Africa's fastest-growing millionaire population (to double by 2027). Digital platforms/NFTs enhance access." },
  { topic: "Freeport Art Storage (Geneva, Luxembourg, Singapore, Africa)", category: "Art Logistics & Tax-Deferred Storage", description: "Secure, climate-controlled warehouses allowing tax-deferred storage and trading of high-value art while goods remain 'in transit'. Key hubs: Geneva (world's largest, $100B art), Luxembourg, Singapore. Services include viewing, restoration, logistics. Tightening global regulations on AML/transparency. No Africa freeports; low direct relevance beyond potential use by African collectors.", keyPlayers: "Ports Francs et Entrepôts de Genève (PFEG)/Natural Le Coultre (Geneva), Fortius/Brinks/MT Art (Luxembourg), Le Freeport/Bitdeer Technologies/Jihan Wu (Singapore), Yves Bouvier (historical developer).", marketSize: "Geneva: $100B art value, 1.2M pieces (40% art); global freeports hold significant portion of $65B art market (2023); HNWI art/collectibles: $1.62T (2016) → $2.7T proj. (2026). No precise freeport market size.Citywealth, Policy & Political Review", africaRelevance: "No freeports in Africa identified. Emerging Dubai freeport may attract African art/dealers (e.g., Efie Gallery). African collectors likely use global hubs like Geneva/Singapore. Growing African art market ($72M auction sales 2021) but no specific freeport links found.Arab News, search results." },
  { topic: "Art Insurance Market Africa", category: "Insurance", description: "Emerging market focused on South Africa, with niche specialist providers offering all-risk coverage for art collectors against theft, damage, transit. Low penetration (1/5 SA collectors insured); part of global $429B market (Africa ~5%).", keyPlayers: "iTOO Artinsure (SA, Africa specialist), Artinsure (SA), FNB (partners Artinsure), emPLE (Nigeria), Lloyd&#39;s, AXA XL, Chubb; appraisers: AfricartMarket iTOO, Artinsure, Market Research Future", marketSize: "Africa: Nascent, &gt;5,500 policies (2023), SA dominant, ~5% global share. Global fine art insurance: $429.4B (2024) to $896B (2035), 6.92% CAGR Market Research Future, Market Reports World, Art-Online", africaRelevance: "SA leads (iTOO/Artinsure only Africa specialist insurer); emerging Nigeria/Kenya (emPLE ART X Lagos 2024/25); UAE in MEA; low awareness/regulatory hurdles limit growth; rising art theft/cultural crime drives need Business Insider Africa, iTOO" },
  { topic: "Art Basel UBS Global Art Market Report Africa 2025", category: "Art Market", description: "The Art Basel and UBS Global Art Market Report (2025 edition covers 2024 data; 2026 covers 2025) analyzes the global art market's performance, with limited direct Africa coverage. Global sales declined 12% to $57.5B in 2024 before rebounding 4% to $59.6B in 2025. Africa shows resilience with contemporary art auction sales ~$70M+ annually, outpacing global declines.", keyPlayers: "Global: Art Basel, UBS, Arts Economics (Dr. Clare McAndrew), Sotheby's, Christie's. Africa: Galleries (Rele Gallery, Gallery MOMO, SMAC Gallery, Afriart Gallery, Nike Art Gallery); Auction houses (Strauss & Co); Fairs (Investec Cape Town Art Fair, 1-54 Contemporary African Art Fair, Africa Basel); Gallerists (Adenrele Sonariwo, Monna Mokoena, Daudi Karungi); Funds (Kuonyesha Art Fund, Africa Arts ", marketSize: "Global: $57.5B (2024, -12% YoY), $59.6B (2025, +4% YoY) UBS Art Market page, 2025 Report PDF. Africa: Continental fine-art auctions ~$17M (2024) Africa Basel; Contemporary African art auctions $70.5M (2025, +43% YoY), peaked $101.3M (2021); estimates up to $1.5B total (2025).", africaRelevance: "Marginal in main reports (6 art fairs in 2024, closures like 1-54 Paris/StART SA) but resilient: contemporary sales declined only 8.4% in 2024 vs global 12%; strong growth in auctions (+43% 2025), female artists (52.8% lots); key events (Investec Cape Town 2026, 1-54 London 2025); SA export regs via SAHRA for >50yo works FinGlobal; rising online/first-time buyers." },
];

export const GLOBAL_DATA = DIWANE_GLOBAL_DATA;
export const ALL_COUNTRIES = DIWANE_COUNTRIES;
export const AFRICA_COUNTRIES = DIWANE_COUNTRIES.filter(c => 
  ['MA','NG','SN','GH','CI','ZA','CD','CM','KE','EG','ET','TZ','RW','AO','MZ','GA','GN','ML','TG','BF','NE','SL','LR','MG','NA','GW','MR','GM','BJ','CG'].includes(c.id)
);
export const EU_COUNTRIES_LIST = DIWANE_COUNTRIES.filter(c =>
  ['FR','DE','IT','ES','NL','BE','AT','SE','DK','FI','IE','PT','GR','PL','CZ','HU','RO','BG','HR','SK','SI','LT','LV','EE','CY','MT','LU'].includes(c.id)
);
export const SEARCH_INDEX = buildDiwaneSearchIndex();
export const COMPARISON_INDICATORS = [
  { id: 'artists', label: 'Artistes', icon: '🎨' },
  { id: 'galleries', label: 'Galeries', icon: '🏛' },
  { id: 'museums', label: 'Musées', icon: '🏛️' },
  { id: 'market', label: 'Marché', icon: '📈' },
  { id: 'regulation', label: 'Régulation', icon: '⚖️' },
  { id: 'fairs', label: 'Foires', icon: '🎪' },
];

// Aliases for compatibility with country page imports
export const COUNTRY_TABS = DIWANE_TABS;
export const EU_TABS = DIWANE_TABS;
