import type { MapCluster, Showroom } from "@/lib/types/content";

/**
 * BYD locations shown on 05 Showrooms (John Keells CG Auto).
 *
 * - location / directionsUrl: from the Google Maps share links supplied by the client
 *   (coordinates read from each link's resolved address).
 * - phone: from the client's Google listings ("0112 125 125" = +94 112 125 125;
 *   Ampara lists its own number, 077 887 9970).
 * - address: Galle as supplied by the client; Ampara, Batticaloa and Jaffna as on their
 *   Google listings; the others are the street at the map pin (to confirm with the client).
 * - province: from the coordinates (Natural Earth district boundaries).
 * - hours: 8:00 AM – 6:00 PM for every location for now (client); change any one
 *   location by editing its own `hours` line.
 *
 * Listed alphabetically by name ("Ampara" … "Ratnapura").
 */

const MAIN_PHONE = "+94 112 125 125";
/** Default opening hours (client, for now). Each showroom can override its own `hours`. */
const DEFAULT_HOURS = "8:00 AM – 6:00 PM";

export const SHOWROOMS: readonly Showroom[] = [
  {
    id: "ampara",
    city: "Ampara",
    type: "3S Facility",
    location: { lat: 7.2947477, lng: 81.6920214 },
    province: "eastern",
    // Level with Kandy's label on the map: nudge it down so the two don't run together.
    label: { side: "left", dy: 30 },
    address: "No 431 Hospital Road, Ampara",
    phone: "+94 77 887 9970",
    hours: DEFAULT_HOURS,
    directionsUrl: "https://share.google/x7VfUunjeOWYSa3Mx",
  },
  {
    id: "batticaloa",
    city: "Batticaloa",
    type: "Showroom",
    location: { lat: 7.7298261, lng: 81.6773444 },
    province: "eastern",
    label: { side: "left" },
    address: "Trincomalee–Batticaloa Road, Batticaloa",
    phone: MAIN_PHONE,
    hours: DEFAULT_HOURS,
    directionsUrl: "https://share.google/IBUbRSOLrtAawwMyX",
  },
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
    directionsUrl: "https://maps.app.goo.gl/7EE2Y2BdKzFCEjx67",
  },
  {
    id: "jaffna",
    city: "Jaffna",
    type: "3S Facility",
    location: { lat: 9.6327899, lng: 80.0903773 },
    province: "northern",
    label: { side: "right" },
    address: "7/1 Ariyalai East Road, Jaffna",
    phone: MAIN_PHONE,
    hours: DEFAULT_HOURS,
    directionsUrl: "https://share.google/PalIaTY6DWjJGzqH2",
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
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
    hours: DEFAULT_HOURS,
    directionsUrl: "https://maps.app.goo.gl/HNcTGDJTLgqGBM2z5",
  },
];

/** Selected when 05 Showrooms opens (and after an idle reset): the main Colombo location. */
export const DEFAULT_SHOWROOM_INDEX = Math.max(
  0,
  SHOWROOMS.findIndex((s) => s.id === "colombo-altair"),
);

/** The three central-Colombo locations are under 1 km apart: one pin on the map. */
export const MAP_CLUSTERS: readonly MapCluster[] = [
  { id: "colombo", name: "Colombo", label: { side: "left", dy: -10 } },
];

/** Name used in the list and accessible labels, e.g. "Colombo – Altair". */
export function showroomName(showroom: Showroom): string {
  return showroom.area ? `${showroom.city} – ${showroom.area}` : showroom.city;
}
