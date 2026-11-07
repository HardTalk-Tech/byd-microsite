import type { MapCluster, Showroom } from "@/lib/types/content";

/**
 * BYD locations shown on 05 Showrooms (John Keells CG Auto).
 *
 * - location / directionsUrl: from the Google Maps share links supplied by the client
 *   (coordinates read from each link's resolved address).
 * - phone: from the client's Google listings ("0112 125 125" = +94 112 125 125).
 * - address: Galle as supplied by the client; the others are the street at the map pin
 *   (to confirm with the client).
 * - province: from the coordinates (Natural Earth district boundaries).
 * - hours: not supplied yet (the listings only give a Saturday opening time) – TBC.
 *
 * Listed alphabetically by name ("Colombo – Altair" … "Ratnapura").
 */

const MAIN_PHONE = "+94 112 125 125";
const HOURS_TBC = "TBC";

export const SHOWROOMS: readonly Showroom[] = [
  {
    id: "colombo-altair",
    city: "Colombo",
    area: "Altair",
    type: "Showroom",
    location: { lat: 6.9187448, lng: 79.8542041 },
    province: "western",
    mapCluster: "colombo",
    label: { side: "left" },
    address: "Altair, Sir James Peiris Mawatha, Colombo 02",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/GSNKogMeswaonQFK6",
  },
  {
    id: "colombo-union-place",
    city: "Colombo",
    area: "Union Place",
    type: "Showroom",
    location: { lat: 6.9187816, lng: 79.8617314 },
    province: "western",
    mapCluster: "colombo",
    label: { side: "left" },
    address: "Union Place, Colombo 02",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/GzGS6Tga8d9L72qi9",
  },
  {
    id: "colombo-vauxhall-street",
    city: "Colombo",
    area: "Vauxhall Street",
    type: "Showroom",
    location: { lat: 6.9221996, lng: 79.8582546 },
    province: "western",
    mapCluster: "colombo",
    label: { side: "left" },
    address: "Vauxhall Street, Colombo 02",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/JVW6oSjmNA6XsZ998",
  },
  {
    id: "galle",
    city: "Galle",
    type: "Showroom",
    location: { lat: 6.0334442, lng: 80.2451777 },
    province: "southern",
    label: { side: "right" },
    address: "Southern Highway, Nugadhuwa entrance road, Galle",
    phone: "+94 77 310 4000",
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/7EE2Y2BdKzFCEjx67",
  },
  {
    id: "kandy",
    city: "Kandy",
    type: "Showroom",
    location: { lat: 7.315154, lng: 80.6305937 },
    province: "central",
    label: { side: "right" },
    address: "Katugastota Road, Kandy",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/geNFUMza4WvqDgxC7",
  },
  {
    id: "kurunegala",
    city: "Kurunegala",
    type: "3S Facility",
    location: { lat: 7.440713, lng: 80.3402006 },
    province: "north-western",
    label: { side: "left" },
    address: "Kurunegala–Ambepussa Road, Kurunegala",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/1WWSrh7XT958PbbU7",
  },
  {
    id: "moratuwa",
    city: "Moratuwa",
    type: "Showroom",
    location: { lat: 6.7954292, lng: 79.8877076 },
    province: "western",
    // Only ~25 px below the Colombo pin: nudge the label down so they don't touch.
    label: { side: "left", dy: 14 },
    address: "Galle Road, Moratuwa",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/orUBii7U8LMFt76R9",
  },
  {
    id: "negombo",
    city: "Negombo",
    type: "Showroom",
    location: { lat: 7.2207873, lng: 79.8464251 },
    province: "western",
    label: { side: "left" },
    address: "Colombo–Puttalam Road, Negombo",
    // No number in the Negombo listing; the main hotline is shown (to confirm).
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/KiHdNpKAxCo2ueEV7",
  },
  {
    id: "ratnapura",
    city: "Ratnapura",
    type: "3S Facility",
    location: { lat: 6.6774299, lng: 80.4163992 },
    province: "sabaragamuwa",
    label: { side: "right" },
    address: "Ratnapura–Wellawaya Road, Ratnapura",
    phone: MAIN_PHONE,
    hours: HOURS_TBC,
    directionsUrl: "https://maps.app.goo.gl/HNcTGDJTLgqGBM2z5",
  },
];

/** The three central-Colombo locations are under 1 km apart: one pin on the map. */
export const MAP_CLUSTERS: readonly MapCluster[] = [
  { id: "colombo", name: "Colombo", label: { side: "left", dy: -10 } },
];

/** Name used in the list and accessible labels, e.g. "Colombo – Altair". */
export function showroomName(showroom: Showroom): string {
  return showroom.area ? `${showroom.city} – ${showroom.area}` : showroom.city;
}
