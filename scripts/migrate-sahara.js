const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// --- 1. Connection Supabase ---
const envPath = path.join(process.cwd(), '.env.local');
let envData;
try {
  envData = fs.readFileSync(envPath, 'utf8');
} catch (e) {
  console.error("❌ Erreur: Veuillez exécuter depuis ~/eigen-repos/raqib-v4/");
  process.exit(1);
}

const envVars = {};
envData.split('\n').forEach(line => {
  if (line && !line.startsWith('#') && line.includes('=')) {
    const v = line.split('=');
    envVars[v[0].trim()] = v.slice(1).join('=').trim();
  }
});

const SUPABASE_URL = envVars.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Clés Supabase manquantes");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const S={
TEL:"TEL",BNK:"BNK",INS:"INS",ENR:"ENR",PHR:"PHR",BTP:"BTP",
FMC:"FMC",TEC:"TEC",LOG:"LOG",CNS:"CNS",AUT:"AUT",LUX:"LUX",
MIN:"MIN",AGR:"AGR",AVA:"AVA",DEF:"DEF",MED:"MED",EDU:"EDU",
IMM:"IMM",DFI:"DFI",CHM:"CHM",IND:"IND"
};

const companiesRaw = [
["Orange","FR",S.TEL,44,137,["FR","MA","SN","CI","GN","BJ","TG","ML","MR"],"NAMZBR"],
["Maroc Telecom","MA",S.TEL,3.8,15,["MA","BJ","TG","CI","GN","MR","ML","NE","GH"],"NAZBR"],
["MTN Group","ZA",S.TEL,11,18,["NG","GH","CI","GN","BJ"],"NAZBR"],
["Vodafone","UK",S.TEL,45,100,["GH","ES","PT","DE","IT","UK"],"NAZ"],
["Airtel Africa","IN",S.TEL,5.5,4,["NG","GH","SN","CI","GN"],"NAZBR"],
["Telefónica","ES",S.TEL,42,100,["ES","DE","UK","BR"],"NAZ"],
["Deutsche Telekom","DE",S.TEL,122,200,["DE","FR","NL","AT","US"],"NAZ"],
["Iliad/Free","FR",S.TEL,9.5,17,["FR","IT","SN"],"NABR"],
["SFR/Altice","FR",S.TEL,11,16,["FR","PT","IL"],"NA"],
["Bouygues Telecom","FR",S.TEL,7.5,9,["FR"],"NA"],
["inwi","MA",S.TEL,0.8,2,["MA"],"NA"],
["Sonatel","SN",S.TEL,2.1,6,["SN","ML","GN","SL","GM"],"NAZBR"],
["Togocel","TG",S.TEL,0.12,0.5,["TG"],"NA"],
["Moov Africa","BJ",S.TEL,0.3,1,["BJ","TG","CI","NE"],"NA"],
["Expresso","SN",S.TEL,0.08,0.3,["SN"],"NA"],
["Glo","NG",S.TEL,0.8,3,["NG","GH","BJ","CI"],"NAZ"],
["9mobile","NG",S.TEL,0.4,1,["NG"],"NA"],
["Vodacom","ZA",S.TEL,6.5,12,["ZA","TZ","MZ","KE","DRC"],"NAZ"],
["Telia","SE",S.TEL,9,20,["SE","FI","NO","DK","EE","LT"],"NA"],
["KPN","NL",S.TEL,5.5,10,["NL","DE","BE"],"NA"],
["Swisscom","CH",S.TEL,11,19,["CH","IT"],"NA"],
["BT Group","UK",S.TEL,26,100,["UK","FR","DE","IT","ES"],"NA"],
["Telenor","NO",S.TEL,12,15,["NO","SE","DK","FI","BD","PK"],"NA"],
["Proximus","BE",S.TEL,5.5,11,["BE","LU"],"NA"],
["NOS","PT",S.TEL,1.7,2,["PT"],"NA"],
["MEO/Altice Portugal","PT",S.TEL,2.2,3,["PT"],"NA"],
["Africell","UK",S.TEL,0.3,1,["GM","SL","UG","DRC"],"NABR"],
["Safaricom","KE",S.TEL,2.8,7,["KE","ET"],"NAZBR"],
["Econet","ZW",S.TEL,1.2,3,["ZW","BW","LS"],"NA"],
["Telecel","GH",S.TEL,0.2,0.5,["GH"],"NA"],
["AXIAN","MG",S.TEL,0.5,2,["MG","SN","TG"],"NABR"],
["BNP Paribas","FR",S.BNK,52,190,["FR","MA","SN","CI","GN","BJ","TG"],"NAMZBR"],
["Société Générale","FR",S.BNK,28,117,["FR","MA","SN","CI","GH","BJ","TG","GN","MR"],"NAMZBR"],
["Crédit Agricole","FR",S.BNK,40,147,["FR","IT","MA","EG"],"NAMZB"],
["BPCE/Natixis","FR",S.BNK,26,100,["FR","MA"],"NAMZ"],
["Attijariwafa Bank","MA",S.BNK,4.2,20,["MA","SN","CI","TG","BJ","GN","MR","ML","TN","EG"],"NAMZBR"],
["Bank of Africa/BMCE","MA",S.BNK,1.8,13,["MA","SN","CI","BJ","TG","GH","NG","MR","ML","NE","DRC","KE","TN","MG","ET"],"NAMZBR"],
["BCP/Atlantic","MA",S.BNK,1.5,10,["MA","SN","CI","TG","BJ","GN","MR","ML","NE","CM"],"NAMZBR"],
["Crédit du Maroc","MA",S.BNK,0.5,3,["MA"],"NAMZBR"],
["CIH Bank","MA",S.BNK,0.4,2,["MA"],"NAB"],
["Al Barid Bank","MA",S.BNK,0.3,5,["MA"],"NAB"],
["HSBC","UK",S.BNK,65,220,["UK","FR","DE","MA","EG","AE","SG"],"NAMZ"],
["Barclays","UK",S.BNK,30,82,["UK","GH","KE","ZA"],"NAMZ"],
["Deutsche Bank","DE",S.BNK,30,85,["DE","UK","FR","IT","ES"],"NAMZ"],
["ING","NL",S.BNK,22,60,["NL","BE","DE","FR","IT","ES"],"NAMZ"],
["UBS","CH",S.BNK,42,75,["CH","UK","DE","FR","SG","US"],"NAMZ"],
["Santander","ES",S.BNK,62,200,["ES","PT","UK","BR","MX","US"],"NAMZ"],
["BBVA","ES",S.BNK,32,120,["ES","PT","MX","TR"],"NAMZ"],
["CaixaBank","ES",S.BNK,14,45,["ES","PT"],"NAZ"],
["UniCredit","IT",S.BNK,24,80,["IT","DE","AT"],"NAMZ"],
["Intesa Sanpaolo","IT",S.BNK,26,100,["IT","EG"],"NAZ"],
["ABN AMRO","NL",S.BNK,9,20,["NL","DE","FR","BE"],"NAZ"],
["Rabobank","NL",S.BNK,14,40,["NL","BR","AU"],"NAZ"],
["Nordea","FI",S.BNK,11,28,["FI","SE","DK","NO"],"NA"],
["Ecobank","TG",S.BNK,2.2,14,["TG","NG","GH","SN","CI","BJ","GN","MR","ML","NE"],"NAMZBR"],
["Guaranty Trust Bank","NG",S.BNK,1.5,12,["NG","GH","CI","SN","UK"],"NAZBR"],
["Zenith Bank","NG",S.BNK,1.9,8,["NG","GH","UK","SN","GM"],"NAZBR"],
["Access Bank","NG",S.BNK,2.1,10,["NG","GH","SN","GM","CI","MR"],"NAZBR"],
["First Bank Nigeria","NG",S.BNK,1.8,8,["NG","GH","SN","DRC","UK"],"NAZBR"],
["UBA","NG",S.BNK,1.6,10,["NG","GH","SN","CI","BJ","FR","UK"],"NAZBR"],
["Stanbic/Standard Bank","ZA",S.BNK,8,50,["NG","GH","CI","KE","ZA"],"NAMZ"],
["BGFI","GA",S.BNK,0.5,3,["GA","CI","SN","BJ","CM","DRC"],"NABR"],
["NSIA Banque","CI",S.BNK,0.3,2,["CI","SN","BJ","TG","GN"],"NABR"],
["Coris Bank","BF",S.BNK,0.3,2,["BF","CI","SN","ML","TG","BJ","NE"],"NABR"],
["Orabank","TG",S.BNK,0.2,1.5,["TG","BJ","SN","CI","GN","MR","GA","ML","NE"],"NABR"],
["Bank of Ghana","GH",S.BNK,0.5,1,["GH"],"NAB"],
["GCB Bank","GH",S.BNK,0.3,2,["GH"],"NAB"],
["Banque Centrale Populaire","MA",S.BNK,1.5,8,["MA","CI","SN","TG"],"NAMZB"],
["CDG","MA",S.BNK,3,5,["MA"],"NAZ"],
["AXA","FR",S.INS,105,145,["FR","MA","SN","CI","NG","GH","ES","DE","IT","UK","BE"],"NAMZBR"],
["Allianz","DE",S.INS,160,160,["DE","FR","IT","ES","CI","SN","GH","NG"],"NAMZBR"],
["Generali","IT",S.INS,82,75,["IT","FR","DE","ES","AT","CH"],"NAMZB"],
["Zurich","CH",S.INS,72,55,["CH","DE","UK","ES","IT"],"NAMZ"],
["AtlantaSanad","MA",S.INS,0.6,2,["MA"],"NAMZBR"],
["Saham Assurance","MA",S.INS,0.8,3,["MA","SN","CI","BJ","TG","NG"],"NAMZBR"],
["Wafa Assurance","MA",S.INS,0.5,1.5,["MA"],"NAMZB"],
["NSIA Assurance","CI",S.INS,0.4,2,["CI","SN","BJ","TG","GN","NG","GH"],"NAMZBR"],
["Sanlam","ZA",S.INS,8,25,["ZA","MA","NG","GH","CI","SN","KE"],"NAMZBR"],
["AIICO","NG",S.INS,0.3,1,["NG"],"NAMZB"],
["Leadway","NG",S.INS,0.4,1,["NG"],"NAMZB"],
["Custodian Insurance","NG",S.INS,0.2,0.8,["NG"],"NAMZ"],
["SIC Insurance","GH",S.INS,0.1,0.5,["GH"],"NAZ"],
["Star Assurance","GH",S.INS,0.08,0.3,["GH"],"NAZ"],
["Prudential Africa","UK",S.INS,2,5,["GH","NG","KE","CI"],"NAMZ"],
["CNP Assurances","FR",S.INS,36,5,["FR","IT","BR"],"NAMZ"],
["MAPFRE","ES",S.INS,28,30,["ES","PT","BR","US"],"NAZ"],
["Aviva","UK",S.INS,45,22,["UK","FR","IE"],"NAZ"],
["Munich Re","DE",S.INS,70,40,["DE","FR","UK","ZA","NG"],"NAMZ"],
["Swiss Re","CH",S.INS,45,15,["CH","UK","US","ZA"],"NAZ"],
["TotalEnergies","FR",S.ENR,218,100,["FR","NG","SN","CI","GN","MR","MA"],"BMZBR"],
["Engie","FR",S.ENR,97,97,["FR","MA","SN","CI","BE","NL"],"BMZ"],
["EDF","FR",S.ENR,130,170,["FR","UK","IT","BE","CI"],"BM"],
["Shell","UK",S.ENR,316,86,["UK","NG","GH","NL","DE"],"BMZ"],
["BP","UK",S.ENR,211,65,["UK","DE","SN","MR"],"BMZ"],
["Repsol","ES",S.ENR,62,24,["ES","PT","NG"],"BM"],
["Galp","PT",S.ENR,28,6,["PT","MZ","BR"],"BM"],
["ENI","IT",S.ENR,120,32,["IT","NG","CI","GH","EG"],"BMZR"],
["Equinor","NO",S.ENR,107,22,["NO","UK","NG","BR"],"BM"],
["Enel","IT",S.ENR,95,66,["IT","ES","PT","BR"],"BM"],
["Iberdrola","ES",S.ENR,49,40,["ES","PT","UK","US","BR"],"BM"],
["EDP","PT",S.ENR,18,12,["PT","ES","BR","US"],"BM"],
["Ørsted","DK",S.ENR,17,8,["DK","UK","DE","NL"],"BM"],
["Vattenfall","SE",S.ENR,24,20,["SE","DE","NL","UK"],"BM"],
["Siemens Energy","DE",S.ENR,33,92,["DE","FR","UK","ES","MA","NG","SN"],"BMZBR"],
["Vestas","DK",S.ENR,15,30,["DK","DE","UK","ES","MA"],"BM"],
["OCP Group","MA",S.ENR,9.4,21,["MA","NG","SN","CI","GH","BR","IN"],"BMYBR"],
["ONEE","MA",S.ENR,3,10,["MA"],"BM"],
["NNPC","NG",S.ENR,25,20,["NG"],"BMZR"],
["PETROSEN","SN",S.ENR,0.3,0.5,["SN"],"BMR"],
["SNIM","MR",S.ENR,1.2,6,["MR"],"BMR"],
["Dangote Oil","NG",S.ENR,8,5,["NG","GH","SN"],"BMZR"],
["Vivo Energy","UK",S.ENR,9,2,["MA","SN","CI","GH","TG","BJ"],"BMBR"],
["Puma Energy","CH",S.ENR,18,4,["SN","CI","GH","BJ","TG","GN"],"BM"],
["RWE","DE",S.ENR,30,20,["DE","UK","NL"],"BM"],
["Fortum","FI",S.ENR,7,5,["FI","SE","NO"],"BM"],
["TAQA","AE",S.ENR,9,3,["AE","MA","GH","US"],"BMR"],
["Sanofi","FR",S.PHR,47,91,["FR","MA","SN","CI","NG","GH","DE","US"],"NAMBR"],
["Novartis","CH",S.PHR,50,78,["CH","FR","DE","MA","NG","SN","CI"],"NAMB"],
["Roche","CH",S.PHR,65,100,["CH","FR","DE","UK","NG"],"NAMB"],
["AstraZeneca","UK",S.PHR,45,83,["UK","FR","DE","NG","KE"],"NAMB"],
["GSK","UK",S.PHR,37,69,["UK","FR","NG","GH","SN","KE"],"NAMB"],
["Bayer","DE",S.PHR,52,100,["DE","FR","NG","CI","GH","SN"],"NAMB"],
["Merck","DE",S.PHR,22,63,["DE","FR","MA","NG"],"NAM"],
["UCB","BE",S.PHR,6,8,["BE","FR","DE","UK","US"],"NAM"],
["Ipsen","FR",S.PHR,3.5,6,["FR","UK","DE","US"],"NAM"],
["Servier","FR",S.PHR,6,22,["FR","MA","NG","CI","SN"],"NAMB"],
["Pierre Fabre","FR",S.PHR,3,10,["FR","MA","SN","CI"],"NAM"],
["Biocodex","FR",S.PHR,0.5,2,["FR","MA","SN","CI"],"NA"],
["Pharma5","MA",S.PHR,0.3,4,["MA"],"NABR"],
["Cooper Pharma","MA",S.PHR,0.15,2,["MA","SN","CI"],"NAB"],
["Sothema","MA",S.PHR,0.25,3,["MA","SN"],"NAB"],
["mPharma","GH",S.PHR,0.1,0.8,["GH","NG","KE","ZM"],"NAMBR"],
["Helium Health","NG",S.PHR,0.02,0.3,["NG","GH","SN"],"NAMBR"],
["Emzor","NG",S.PHR,0.15,2,["NG"],"NAB"],
["May & Baker Nigeria","NG",S.PHR,0.08,0.8,["NG"],"NAB"],
["Fidson","NG",S.PHR,0.06,0.5,["NG"],"NAB"],
["Doctolib","FR",S.PHR,0.5,3,["FR","DE","IT"],"NABR"],
["Alan","FR",S.PHR,0.3,0.8,["FR","ES","BE"],"NAMZ"],
["Withings","FR",S.PHR,0.2,0.5,["FR","US"],"NAM"],
["Novo Nordisk","DK",S.PHR,35,64,["DK","FR","DE","UK"],"NAM"],
["Essilor/Luxottica","FR",S.PHR,25,190,["FR","IT","US","MA"],"NA"],
["Vinci","FR",S.BTP,65,272,["FR","MA","SN","CI","GH","NG","UK","ES","PT","DE"],"BZBR"],
["Bouygues","FR",S.BTP,56,200,["FR","MA","CI","SN","GH","UK"],"BZBR"],
["Eiffage","FR",S.BTP,22,73,["FR","SN","CI","MA","DE","ES","BE"],"BZR"],
["Saint-Gobain","FR",S.BTP,51,160,["FR","MA","SN","CI","NG","DE","UK","ES"],"BZR"],
["LafargeHolcim","CH",S.BTP,27,60,["CH","FR","MA","NG","CI","GH","SN"],"BZBR"],
["Dangote Cement","NG",S.BTP,4,15,["NG","GH","SN","CI","CM","TZ","ET"],"BZBR"],
["BUA Cement","NG",S.BTP,2,5,["NG"],"BZR"],
["Ciments du Maroc","MA",S.BTP,0.6,2,["MA"],"BZ"],
["HeidelbergCement","DE",S.BTP,22,51,["DE","UK","FR","GH","TG","BJ"],"BZR"],
["Strabag","AT",S.BTP,18,72,["AT","DE","NL","BE"],"BZ"],
["ACS","ES",S.BTP,40,120,["ES","UK","AU","US"],"BZ"],
["Ferrovial","ES",S.BTP,8,25,["ES","UK","US","NL"],"BZ"],
["Acciona","ES",S.BTP,12,40,["ES","PT","MA","AU"],"BZR"],
["Skanska","SE",S.BTP,18,28,["SE","NO","FI","UK","US"],"BZ"],
["NCC","SE",S.BTP,7,13,["SE","NO","DK","FI"],"BZ"],
["COLAS","FR",S.BTP,16,57,["FR","MA","SN","CI","BJ","TG"],"BZR"],
["Mota-Engil","PT",S.BTP,4,30,["PT","NG","GH","MA","MZ"],"BZBR"],
["AECOM","US",S.BTP,14,47,["US","UK","FR","AE","MA"],"BZ"],
["Saipem","IT",S.BTP,12,30,["IT","NG","MA","SN","MZ"],"BZR"],
["SOGEA-SATOM","FR",S.BTP,1.5,15,["SN","CI","MA","BJ","TG","GN","MR"],"BZR"],
["Unilever","UK",S.FMC,60,127,["UK","FR","MA","NG","GH","CI","SN"],"NABZR"],
["Nestlé","CH",S.FMC,100,270,["CH","FR","MA","NG","GH","CI","SN","DE","ES","IT"],"NABZR"],
["Danone","FR",S.FMC,28,86,["FR","MA","SN","CI","NG","ES","DE","UK"],"NABZ"],
["L'Oréal","FR",S.FMC,42,87,["FR","MA","NG","DE","UK","US","CN"],"NAB"],
["P&G","US",S.FMC,82,106,["US","FR","MA","NG","GH","DE","UK"],"NABZ"],
["Mondelez","US",S.FMC,36,91,["US","FR","MA","NG","GH","CI","EG","DE"],"NABZ"],
["PepsiCo","US",S.FMC,91,315,["US","FR","MA","NG","DE","UK","ES"],"NAB"],
["Coca-Cola/HBC","US",S.FMC,46,82,["US","FR","MA","NG","GH","CI","SN","DE","IT"],"NABZ"],
["JTI","CH",S.FMC,18,44,["CH","FR","MA","NG","EG","DE","UK"],"NABZ"],
["BAT","UK",S.FMC,32,52,["UK","NG","GH","KE","SN"],"NAB"],
["Heineken","NL",S.FMC,30,85,["NL","FR","NG","CI","SN","ES","DRC"],"NABZ"],
["Diageo","UK",S.FMC,20,28,["UK","NG","GH","KE","FR"],"NAB"],
["Pernod Ricard","FR",S.FMC,12,19,["FR","MA","NG","CI","ES"],"NAB"],
["Lactalis","FR",S.FMC,28,85,["FR","MA","SN","CI","IT","ES"],"NABZ"],
["Bel Group","FR",S.FMC,4,13,["FR","MA","SN","CI","EG"],"NAB"],
["Groupe Casino","FR",S.FMC,33,200,["FR","CI","SN","BR"],"NAZ"],
["Carrefour","FR",S.FMC,88,320,["FR","MA","SN","CI","ES","IT","BE"],"NABZ"],
["Auchan","FR",S.FMC,32,160,["FR","ES","PT"],"NA"],
["Lidl/Schwarz","DE",S.FMC,130,575,["DE","FR","ES","PT","IT","UK"],"NA"],
["Aldi","DE",S.FMC,120,200,["DE","FR","UK","ES","PT","IT"],"NA"],
["Olam","SG",S.FMC,40,82,["SG","NG","GH","CI","SN","FR"],"NABZR"],
["Flour Mills Nigeria","NG",S.FMC,1.5,8,["NG"],"NAB"],
["Dangote Sugar","NG",S.FMC,0.5,3,["NG"],"NAB"],
["Dangote Foods","NG",S.FMC,2,8,["NG","GH","SN"],"NABZ"],
["FanMilk","GH",S.FMC,0.2,1,["GH","CI","TG","BJ","NG"],"NAB"],
["Cosumar","MA",S.FMC,0.8,3,["MA"],"NAB"],
["Centrale Danone","MA",S.FMC,0.6,3,["MA"],"NAB"],
["Lesieur Cristal","MA",S.FMC,0.5,1,["MA"],"NAB"],
["CMGP","MA",S.FMC,0.2,1,["MA"],"NAB"],
["Marjane","MA",S.FMC,1.5,10,["MA"],"NA"],
["SAP","DE",S.TEC,35,108,["DE","FR","UK","MA","NG","ZA"],"NAMBR"],
["Capgemini","FR",S.TEC,22,360,["FR","MA","UK","DE","US","IN"],"NAMBR"],
["Atos","FR",S.TEC,11,95,["FR","MA","SN","DE","UK"],"NAMBR"],
["Sopra Steria","FR",S.TEC,6,56,["FR","MA","UK","DE","BE"],"NAMB"],
["Dassault Systèmes","FR",S.TEC,6,24,["FR","DE","US","UK"],"NAB"],
["Amadeus","ES",S.TEC,6,17,["ES","FR","DE","UK","US"],"NAB"],
["OVHcloud","FR",S.TEC,0.9,3,["FR","DE","UK","SN","MA"],"NAMBR"],
["Scaleway","FR",S.TEC,0.2,0.6,["FR","NL"],"NAB"],
["CGI","CA",S.TEC,14,90,["CA","FR","UK","DE","MA"],"NAMB"],
["Accenture","IE",S.TEC,64,740,["IE","FR","DE","UK","MA","NG","ZA"],"NAMBR"],
["IBM","US",S.TEC,60,280,["US","FR","DE","UK","MA","NG","KE"],"NAMB"],
["Microsoft","US",S.TEC,236,220,["US","FR","DE","UK","MA","NG","KE"],"NAMB"],
["Google/Alphabet","US",S.TEC,307,183,["US","FR","DE","UK","NG","GH","KE"],"NAM"],
["Amazon/AWS","US",S.TEC,574,1540,["US","FR","DE","UK","IE","ZA"],"NAM"],
["Salesforce","US",S.TEC,35,73,["US","FR","UK","DE"],"NAM"],
["Oracle","US",S.TEC,53,143,["US","FR","DE","UK","MA","ZA"],"NAM"],
["Andela","NG",S.TEC,0.2,2,["NG","GH","KE","US"],"NAB"],
["Flutterwave","NG",S.TEC,0.3,1,["NG","GH","CI","SN","KE","US"],"NAZBR"],
["Paystack","NG",S.TEC,0.1,0.5,["NG","GH","ZA"],"NAZBR"],
["Wave","SN",S.TEC,0.2,1,["SN","CI","ML","BF","UG"],"NAZBR"],
["Interswitch","NG",S.TEC,0.3,1,["NG","KE","UG","GM"],"NAZB"],
["SystemSpecs","NG",S.TEC,0.1,0.3,["NG"],"NAB"],
["OPay","NG",S.TEC,0.5,3,["NG","EG"],"NAZB"],
["PalmPay","NG",S.TEC,0.3,2,["NG","GH"],"NAZB"],
["HPS","MA",S.TEC,0.15,1.5,["MA","FR","AE","SN"],"NAZBR"],
["M2M Group","MA",S.TEC,0.04,0.3,["MA","CI","SN"],"NAB"],
["S2M","MA",S.TEC,0.03,0.3,["MA"],"NAB"],
["Majorel/Teleperformance","FR",S.TEC,8,400,["FR","MA","PT","DE","US"],"NA"],
["Webhelp/Concentrix","FR",S.TEC,4,100,["FR","MA","CI","PT"],"NA"],
["Criteo","FR",S.TEC,2,3,["FR","DE","UK","US"],"NAM"],
["Worldline","FR",S.TEC,4.6,18,["FR","DE","BE","NL","UK"],"NAZB"],
["Adyen","NL",S.TEC,1.6,4,["NL","FR","UK","DE","US"],"NAZB"],
["Stripe","US",S.TEC,14,8,["US","UK","FR","DE","IE","NG"],"NAZB"],
["Klarna","SE",S.TEC,1.5,4,["SE","DE","UK","FR","US"],"NAZ"],
["Bolloré/Vivendi","FR",S.LOG,6,25,["FR","CI","SN","BJ","TG","GN","GH","NG","MR","CM"],"BZBR"],
["CMA CGM","FR",S.LOG,72,160,["FR","MA","SN","CI","NG","GH","ES","NL"],"BZR"],
["DHL/Deutsche Post","DE",S.LOG,94,590,["DE","FR","MA","NG","GH","SN","CI","ES","PT"],"NABZR"],
["Maersk","DK",S.LOG,51,100,["DK","FR","MA","NG","GH","ES","UK","NL"],"BZR"],
["MSC","CH",S.LOG,80,150,["CH","FR","MA","NG","GH","CI","ES"],"BZR"],
["Air France-KLM","FR",S.AVA,32,72,["FR","MA","SN","CI","NG","GH","NL"],"BZ"],
["Aéroports de Paris","FR",S.LOG,5.5,22,["FR","MA","IN","JO"],"BZ"],
["Royal Air Maroc","MA",S.AVA,1.5,4,["MA","FR","SN","CI","NG","GH","BJ","TG","GN","MR","ML","ES","PT"],"BZR"],
["Tanger Med","MA",S.LOG,0.8,6,["MA"],"BZR"],
["ONCF","MA",S.LOG,0.5,8,["MA"],"BZ"],
["Grimaldi Group","IT",S.LOG,4,8,["IT","NG","GH","CI","ES"],"BZ"],
["DB Schenker","DE",S.LOG,23,76,["DE","FR","UK","ES","MA"],"BZ"],
["Kuehne+Nagel","CH",S.LOG,25,78,["CH","FR","UK","MA","ZA"],"BZ"],
["Ethiopian Airlines","ET",S.AVA,7,17,["ET","FR","SN","CI","NG","GH","UK","DE"],"BZ"],
["ASKY Airlines","TG",S.AVA,0.1,0.5,["TG","BJ","CI","SN","GH","NG","GN"],"BZ"],
["Transnet","ZA",S.LOG,4.5,55,["ZA","MZ"],"BZ"],
["Deloitte","UK",S.CNS,65,460,["UK","FR","MA","NG","GH","CI","SN","DE","ES"],"NAMZBR"],
["PwC","UK",S.CNS,55,370,["UK","FR","MA","NG","GH","CI","SN","DE"],"NAMZBR"],
["EY","UK",S.CNS,50,395,["UK","FR","MA","NG","GH","CI","SN","DE"],"NAMZBR"],
["KPMG","NL",S.CNS,38,275,["NL","FR","MA","NG","GH","CI","SN","DE"],"NAMZBR"],
["McKinsey","US",S.CNS,16,45,["US","FR","MA","NG","CI","SN","UK","DE"],"NAMZBR"],
["BCG","US",S.CNS,12,32,["US","FR","MA","NG","DE","UK"],"NAMBR"],
["Bain","US",S.CNS,7,18,["US","FR","UK","DE","NG"],"NAM"],
["Oliver Wyman","US",S.CNS,3,7,["US","FR","UK","DE","AE"],"NAZ"],
["Roland Berger","DE",S.CNS,1.5,3,["DE","FR","MA","NG"],"NAR"],
["Kearney","US",S.CNS,2,4,["US","FR","DE","UK","AE"],"NA"],
["Mazars","FR",S.CNS,2.5,47,["FR","MA","SN","CI","NG","UK","DE"],"NABR"],
["BDO","BE",S.CNS,13,112,["BE","FR","MA","SN","NG","DE","UK"],"NAB"],
["Kienbaum","DE",S.CNS,0.15,0.6,["DE","FR","AT","CH"],"NAMYBR"],
["Lazard","US",S.BNK,3,3,["US","FR","UK","DE"],"NAMZR"],
["LVMH","FR",S.LUX,87,213,["FR","IT","ES","UK","US","JP","CN","MA"],"NABZ"],
["Kering","FR",S.LUX,20,49,["FR","IT","UK","US","JP"],"NAB"],
["Hermès","FR",S.LUX,14,22,["FR","IT","UK","US","JP"],"NAB"],
["Chanel","FR",S.LUX,17,30,["FR","UK","US","JP"],"NAB"],
["Inditex/Zara","ES",S.LUX,36,165,["ES","MA","FR","PT","DE","IT","UK"],"NABZ"],
["H&M","SE",S.LUX,24,100,["SE","FR","DE","UK","ES","IT","MA"],"NAB"],
["Primark","IE",S.LUX,9,70,["IE","UK","ES","FR","DE","PT","IT"],"NA"],
["C&A","NL",S.LUX,6,28,["NL","DE","FR","ES","IT"],"NA"],
["Decathlon","FR",S.LUX,16,105,["FR","MA","SN","CI","ES","DE","IT","UK"],"NABZ"],
["Fnac Darty","FR",S.LUX,8,25,["FR","ES","PT","MA"],"NA"],
["Leroy Merlin","FR",S.LUX,25,100,["FR","ES","PT","MA","CI","SN"],"NAB"],
["IKEA","SE",S.LUX,50,230,["SE","FR","DE","ES","PT","IT","MA"],"NA"],
["Kiabi","FR",S.LUX,2.5,10,["FR","MA","ES","IT"],"NA"],
["ArcelorMittal","LU",S.MIN,79,155,["LU","FR","ES","MA","SN"],"BZR"],
["Glencore","CH",S.MIN,217,135,["CH","UK","NG","GH","DRC","ZA"],"BMZR"],
["Rio Tinto","UK",S.MIN,55,50,["UK","GN","ZA","AU"],"BMZR"],
["Endeavour Mining","UK",S.MIN,2.5,8,["UK","SN","CI","BF","GN","ML"],"BMBR"],
["AngloGold Ashanti","ZA",S.MIN,5.4,30,["ZA","GH","GN","ML","CI"],"BMR"],
["Gold Fields","ZA",S.MIN,4.2,6,["ZA","GH","AU"],"BM"],
["Managem","MA",S.MIN,1,10,["MA","SN","CI","GN","GA","DRC"],"BMZBR"],
["Teranga Gold","CA",S.MIN,0.5,2,["SN","BF","CI"],"BMR"],
["Perseus Mining","AU",S.MIN,0.4,2,["CI","GH","SN"],"BMR"],
["SNIM","MR",S.MIN,1.2,6,["MR"],"BMR"],
["Ciment de l'Afrique (CIMAF)","MA",S.MIN,0.3,3,["MA","CI","SN","GN","CM","GA"],"BZR"],
["BAD/AfDB","CI",S.DFI,8,2,["CI","NG","SN","GH","MA","TG","BJ","GN","MR"],"NAMZBR"],
["IFC/World Bank","US",S.DFI,35,12,["US","MA","NG","SN","CI","GH"],"NAMZBR"],
["Proparco/AFD","FR",S.DFI,12,3,["FR","MA","SN","CI","NG","GH","BJ","TG","GN","MR"],"NAMZBR"],
["BID/IsDB","SA",S.DFI,5,1.5,["SA","MA","SN","NG","GN","MR","ML"],"NAMZBR"],
["BEI/EIB","LU",S.DFI,80,4,["LU","FR","MA","SN","CI","NG"],"NAMZR"],
["CDC France","FR",S.DFI,3,5,["FR","MA"],"NAMZ"],
["FMO","NL",S.DFI,4,0.6,["NL","NG","GH","SN","CI"],"NAMZ"],
["DEG","DE",S.DFI,2,0.6,["DE","NG","GH","MA","SN"],"NAMZ"],
["Norfund","NO",S.DFI,1.5,0.1,["NO","KE","NG","GH"],"NAMZ"],
["FinDev Canada","CA",S.DFI,1,0.1,["CA","SN","CI","GH"],"NAMZ"],
["OPIC/DFC","US",S.DFI,8,0.5,["US","MA","NG","SN","CI","GH"],"NAMZR"],
["GIZ","DE",S.DFI,4,25,["DE","MA","SN","CI","NG","GH","BJ","TG","GN"],"NABR"],
["Renault","FR",S.AUT,56,170,["FR","MA","ES","PT","DE","IT"],"NABZ"],
["Stellantis","NL",S.AUT,189,280,["NL","FR","IT","ES","PT","MA","DE"],"NABZ"],
["Volkswagen","DE",S.AUT,295,670,["DE","FR","ES","PT","MA","NG"],"NAB"],
["BMW","DE",S.AUT,155,150,["DE","FR","UK","IT","ES","ZA"],"NAB"],
["Mercedes-Benz","DE",S.AUT,154,170,["DE","FR","UK","IT","ES","ZA"],"NAB"],
["Lear Corp","US",S.AUT,23,170,["US","FR","MA","DE","ES"],"NABR"],
["Valeo","FR",S.AUT,22,100,["FR","MA","DE","ES","IT"],"NAB"],
["Faurecia/FORVIA","FR",S.AUT,28,150,["FR","MA","DE","ES","IT","US"],"NAB"],
["Yazaki","JP",S.AUT,14,250,["JP","MA","PT","ES"],"NAB"],
["Sumitomo","JP",S.AUT,8,240,["JP","MA","UK","DE"],"NA"],
["Thales","FR",S.DEF,19,81,["FR","UK","DE","NL","MA","AE"],"NABR"],
["Airbus","NL",S.DEF,79,134,["NL","FR","DE","ES","UK","MA"],"NAB"],
["Dassault Aviation","FR",S.DEF,8,13,["FR","IN","AE","EG"],"NAB"],
["Leonardo","IT",S.DEF,16,53,["IT","FR","UK","DE"],"NAB"],
["BAE Systems","UK",S.DEF,25,90,["UK","US","AU","SA"],"NA"],
["Safran","FR",S.DEF,24,92,["FR","MA","DE","UK","US"],"NAB"],
["MBDA","FR",S.DEF,5,14,["FR","UK","DE","IT"],"NA"],
["Vivendi","FR",S.MED,10,35,["FR","CI","SN","BJ","TG"],"NAB"],
["Canal+","FR",S.MED,6,6,["FR","CI","SN","BJ","TG","NG","MA"],"NABR"],
["RTL Group","LU",S.MED,7,14,["LU","DE","FR","NL","BE"],"NA"],
["Bertelsmann","DE",S.MED,20,80,["DE","FR","UK","US"],"NA"],
["Naspers/Prosus","ZA",S.TEC,40,30,["ZA","NL","NG","KE"],"NAM"],
["Multichoice","ZA",S.MED,3.5,9,["ZA","NG","GH","KE"],"NAB"],
["Emaar","AE",S.IMM,9,13,["AE","MA","EG"],"BZR"],
["ADDOHA","MA",S.IMM,0.5,3,["MA","CI","SN"],"BZ"],
["Alliances","MA",S.IMM,0.3,2,["MA","CI"],"BZ"],
["Nexity","FR",S.IMM,4.5,8,["FR","PT"],"NA"],
["UM6P","MA",S.EDU,0.5,3,["MA"],"NAMYBR"],
["42 Network","FR",S.EDU,0.05,0.5,["FR","MA","CI","SN","NG"],"NABR"],
["Holmarcom Group","MA",S.INS,2.5,9,["MA"],"NAMZBR"],
["BMCI","MA",S.BNK,0.4,2,["MA"],"NAB"],
["Wafabank/AWB sub","MA",S.BNK,0.3,1,["MA"],"NAZ"],
["TMSA","MA",S.LOG,0.3,1,["MA"],"BZ"],
["Marsa Maroc","MA",S.LOG,0.3,2,["MA"],"BZ"],
["ONHYM","MA",S.ENR,0.1,0.5,["MA"],"BMR"],
["AKDITAL","MA",S.PHR,0.2,3,["MA"],"NAMBR"],
["Mutandis","MA",S.FMC,0.15,1,["MA","CI"],"NAB"],
["Label'Vie","MA",S.FMC,1,5,["MA"],"NA"],
["Inwi","MA",S.TEL,0.8,2,["MA"],"NA"],
["SOMAGEC","MR",S.BTP,0.1,1,["MR","SN","MA"],"BZ"],
["SDE/Suez Sénégal","SN",S.ENR,0.2,1,["SN"],"BM"],
["Industries Chimiques Sénégal","SN",S.CHM,0.15,1,["SN"],"BM"],
["SIPRA","CI",S.AGR,0.1,0.5,["CI"],"NAB"],
["SOLIBRA","CI",S.FMC,0.2,1,["CI"],"NAB"],
["Société Ivoirienne de Banque","CI",S.BNK,0.2,1,["CI"],"NAB"],
["Société Générale CI","CI",S.BNK,0.3,1.5,["CI"],"NAMB"],
["Orange CI","CI",S.TEL,0.8,1.5,["CI"],"NAB"],
["Sonatel SN","SN",S.TEL,0.7,1.5,["SN"],"NAB"],
["Nestlé Nigeria","NG",S.FMC,0.8,2,["NG"],"NAB"],
["Nigerian Breweries","NG",S.FMC,0.7,3,["NG"],"NAB"],
["Lafarge Africa","NG",S.BTP,0.6,3,["NG"],"BZ"],
["Union Bank Nigeria","NG",S.BNK,0.4,3,["NG"],"NAB"],
["Fidelity Bank Nigeria","NG",S.BNK,0.5,3,["NG"],"NAB"],
["FCMB","NG",S.BNK,0.3,2,["NG"],"NAB"],
["Ecobank Ghana","GH",S.BNK,0.2,1,["GH"],"NAB"],
["Société Générale Maroc","MA",S.BNK,0.5,2,["MA"],"NAMB"],
["Schneider Electric","FR",S.IND,36,130,["FR","MA","SN","CI","NG","DE","UK","ES"],"BZBR"],
["ABB","CH",S.IND,32,105,["CH","DE","FR","UK","ES","IT","NG"],"BZ"],
["Siemens","DE",S.IND,72,310,["DE","FR","UK","ES","MA","NG"],"NABZR"],
["Veolia","FR",S.IND,43,213,["FR","MA","SN","CI","NG","UK","DE"],"BMZBR"],
["Suez","FR",S.IND,8,35,["FR","MA","SN","CI"],"BMZ"],
["Accor","FR",S.LUX,5,40,["FR","MA","SN","CI","NG","DE","ES","UK"],"NABZ"],
["Sodexo","FR",S.FMC,23,420,["FR","MA","NG","UK","US"],"NAB"],
["Compass Group","UK",S.FMC,37,550,["UK","FR","DE","ES"],"NAB"],
["Serco","UK",S.LOG,5,50,["UK","AE","AU"],"NA"],
["G4S/Allied Universal","UK",S.DEF,18,800,["UK","FR","MA","NG","GH","CI"],"NAB"],
];

async function runMigration() {
  console.log(`🚀 Lancement de l'insertion SAHARA...`);

  // 1. ENTREPRISES
  console.log(`\n🌀 Traitement de ${companiesRaw.length} entreprises...`);
  
  const companiesData = companiesRaw.map(entry => {
    const name = entry[0];
    const hq = entry[1];
    const sectorCode = entry[2]; 
    const revenue_b = entry[3];
    const employees_k = entry[4];
    const corridor_countries = entry[5];
    const eigen_briques = entry[6];

    const eigen_score = eigen_briques.length + 3;
    let tier = "Tier 3";
    if (revenue_b >= 50) tier = "Tier 0";
    else if (revenue_b >= 5) tier = "Tier 1";
    else if (revenue_b >= 0.5) tier = "Tier 2";

    let priority = "P2";
    if (eigen_score >= 9) priority = "P0";
    else if (eigen_score >= 7) priority = "P1";

    return {
      name,
      hq,
      sector: sectorCode,
      revenue_b,
      employees_k,
      corridor_countries,
      eigen_briques,
      eigen_score,
      tier,
      priority,
      pipeline_stage: "identified"
    };
  });

  await supabase.from('acq_companies').delete().neq('name', 'xyz_placeholder_to_delete_all');
  
  const { error: errComp } = await supabase.from('acq_companies').insert(companiesData);
  if (errComp) console.error("❌ Erreur entreprises:", errComp.message);
  else console.log(`✅ ${companiesData.length} entreprises insérées.`);

  // 2. REGULATIONS
  const regulationsList = ["AI Act", "EHDS", "CS3D", "DORA", "PSD3", "CSRD", "EU FMD", "LkSG", "DDA", "NIS2", "eIDAS 2.0", "Malabo", "IA UA", "AfCFTA", "Loi 09-08"];
  const regulationsData = regulationsList.map(r => ({ name: r }));
  
  await supabase.from('acq_regulations').delete().neq('name', 'xyz');
  const { error: errReg } = await supabase.from('acq_regulations').insert(regulationsData);
  if (errReg) console.error("❌ Erreur régulations:", errReg.message);
  else console.log(`✅ ${regulationsData.length} régulations insérées.`);

  // 3. PLAYBOOKS
  const playbooksData = [
    { persona: "DRH", hooks: ["ROI Formation", "RPS Assessment", "Talent Management"], scripts: ["Bonjour, le turnover C-level...", "Êtes-vous prêts pour la CSRD ?"], objections: ["Budget limité", "Pas la priorité"], email_templates: ["Template DRH - Contact froid", "Template DRH - Suivi"], cac: 10000, ltv: 50000 },
    { persona: "DPO", hooks: ["Risque sanction AI Act", "Certification Data Corridor"], scripts: ["Vos traitements de données...", "Simplifiez le consentement"], objections: ["On gère en interne", "Trop cher"], email_templates: ["Template DPO - Conformité"], cac: 2000, ltv: 150000 },
    { persona: "CTO", hooks: ["Intégration SDK rapide", "Zéro friction pour les devs"], scripts: ["Déployez Burhan en 10 lignes..."], objections: ["Lock-in", "Latence induite"], email_templates: ["Template CTO - SDK"], cac: 0, ltv: 50000 },
    { persona: "RSE", hooks: ["Reporting CSRD", "Mesure Impact Social"], scripts: ["La LkSG vous oblige...", "Prouvez votre impact Santé"], objections: ["Focus climat d'abord"], email_templates: ["Template RSE - Impact"], cac: 0, ltv: 40000 },
    { persona: "Achats", hooks: ["Cartographie risques SAPIN II", "Traçabilité Burhan"], scripts: ["Le risque fournisseur est opaque..."], objections: ["Système déjà en place"], email_templates: ["Template CPO - Risk"], cac: 1000, ltv: 80000 },
    { persona: "CFO", hooks: ["Coût remittance 15%", "Optimisation Settlement Mizan"], scripts: ["Divisez vos frais FX par 3..."], objections: ["Partenaires banques verrouillés"], email_templates: ["Template CFO - FX"], cac: 5000, ltv: 500000 },
  ];

  await supabase.from('acq_playbook').delete().neq('persona', 'xyz');
  const { error: errPb } = await supabase.from('acq_playbook').insert(playbooksData);
  if (errPb) console.error("❌ Erreur playbooks:", errPb.message);
  else console.log(`✅ 6 playbooks insérés.`);

  // 4. EVENTS
  const eventsData = [
    { name: "GITEX Africa", location: "Marrakech", date_start: "2026-04-07", duration_days: 3 },
    { name: "ATS London", location: "London Stock Exchange", date_start: "2026-05-29", duration_days: 1 },
    { name: "VivaTech Paris", location: "Paris Expo", date_start: "2026-06-17", duration_days: 4 }
  ];

  await supabase.from('acq_events').delete().neq('name', 'xyz');
  const { error: errEv } = await supabase.from('acq_events').insert(eventsData);
  if (errEv) {
    console.error("❌ Erreur events avec champs standard, fallback... (" + errEv.message + ")");
    const fallbackEvents = [
      { name: "GITEX Africa", location: "Marrakech", date: "7-9 avril 2026", duration: "3j" },
      { name: "ATS London", location: "London Stock Exchange", date: "29 mai 2026", duration: "1j" },
      { name: "VivaTech Paris", location: "Paris Expo", date: "17-20 juin 2026", duration: "4j" }
    ];
    const { error: errEvF } = await supabase.from('acq_events').insert(fallbackEvents);
    if(errEvF) console.error("❌ Erreur events fallback:", errEvF.message);
    else console.log(`✅ 3 événements insérés (fallback).`);
  } else {
    console.log(`✅ 3 événements insérés.`);
  }

  console.log(`\n🏁 SAHARA Migration process finished.`);
}

runMigration().catch(console.error);
