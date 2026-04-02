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
