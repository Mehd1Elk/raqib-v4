'use client';

import { useState, useEffect } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';

/**
 * Numeric ISO 3166-1 → Alpha-3 mapping for countries used in the app.
 * world-atlas@2 uses numeric IDs as feature `id`.
 */
const ISO_NUM_TO_A3: Record<string, string> = {
  '012': 'DZA', '024': 'AGO', '032': 'ARG', '036': 'AUS', '040': 'AUT',
  '048': 'BHR', '050': 'BGD', '056': 'BEL', '068': 'BOL', '072': 'BWA',
  '076': 'BRA', '100': 'BGR', '104': 'MMR', '108': 'BDI', '112': 'BLR',
  '116': 'KHM', '120': 'CMR', '124': 'CAN', '132': 'CPV', '140': 'CAF',
  '148': 'TCD', '152': 'CHL', '156': 'CHN', '170': 'COL', '178': 'COG',
  '180': 'COD', '188': 'CRI', '191': 'HRV', '192': 'CUB', '196': 'CYP',
  '203': 'CZE', '204': 'BEN', '208': 'DNK', '214': 'DOM', '218': 'ECU',
  '226': 'GNQ', '818': 'EGY', '222': 'SLV', '231': 'ETH', '232': 'ERI',
  '233': 'EST', '246': 'FIN', '250': 'FRA', '266': 'GAB', '270': 'GMB',
  '276': 'DEU', '288': 'GHA', '300': 'GRC', '320': 'GTM', '324': 'GIN',
  '328': 'GUY', '332': 'HTI', '340': 'HND', '348': 'HUN', '352': 'ISL',
  '356': 'IND', '360': 'IDN', '364': 'IRN', '368': 'IRQ', '372': 'IRL',
  '376': 'ISR', '380': 'ITA', '384': 'CIV', '388': 'JAM', '392': 'JPN',
  '400': 'JOR', '398': 'KAZ', '404': 'KEN', '408': 'PRK', '410': 'KOR',
  '414': 'KWT', '418': 'LAO', '422': 'LBN', '426': 'LSO', '430': 'LBR',
  '434': 'LBY', '440': 'LTU', '442': 'LUX', '450': 'MDG', '454': 'MWI',
  '458': 'MYS', '462': 'MDV', '466': 'MLI', '478': 'MRT', '484': 'MEX',
  '496': 'MNG', '504': 'MAR', '508': 'MOZ', '512': 'OMN', '516': 'NAM',
  '524': 'NPL', '528': 'NLD', '540': 'NCL', '548': 'VUT', '554': 'NZL',
  '558': 'NIC', '562': 'NER', '566': 'NGA', '578': 'NOR', '586': 'PAK',
  '591': 'PAN', '598': 'PNG', '600': 'PRY', '604': 'PER', '608': 'PHL',
  '616': 'POL', '620': 'PRT', '624': 'GNB', '630': 'PRI', '634': 'QAT',
  '642': 'ROU', '643': 'RUS', '646': 'RWA', '678': 'STP', '682': 'SAU',
  '686': 'SEN', '694': 'SLE', '702': 'SGP', '703': 'SVK', '704': 'VNM',
  '705': 'SVN', '706': 'SOM', '710': 'ZAF', '716': 'ZWE', '724': 'ESP',
  '729': 'SDN', '736': 'SSD', '740': 'SUR', '748': 'SWZ', '752': 'SWE',
  '756': 'CHE', '760': 'SYR', '762': 'TJK', '764': 'THA', '768': 'TGO',
  '780': 'TTO', '788': 'TUN', '792': 'TUR', '795': 'TKM', '800': 'UGA',
  '804': 'UKR', '784': 'ARE', '826': 'GBR', '834': 'TZA', '840': 'USA',
  '854': 'BFA', '858': 'URY', '860': 'UZB', '862': 'VEN', '887': 'YEM',
  '894': 'ZMB',
};

const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

let cachedGeoJSON: FeatureCollection<Geometry> | null = null;

/**
 * Fetches world countries as GeoJSON from world-atlas TopoJSON.
 * Each feature has `properties.iso_a3` (ISO 3166-1 alpha-3).
 * Cached after first fetch.
 */
export function useCountriesGeoJSON() {
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry> | null>(cachedGeoJSON);
  const [loading, setLoading] = useState(!cachedGeoJSON);

  useEffect(() => {
    if (cachedGeoJSON) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(WORLD_ATLAS_URL);
        const topo = (await res.json()) as Topology;
        const fc = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;

        // Add iso_a3 property
        for (const f of fc.features) {
          const numId = String(f.id);
          f.properties = { ...f.properties, iso_a3: ISO_NUM_TO_A3[numId] ?? numId };
        }

        cachedGeoJSON = fc;
        if (!cancelled) {
          setGeojson(fc);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { geojson, loading };
}
