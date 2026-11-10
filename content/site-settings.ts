import type { SiteSettings } from "@/lib/types/content";

/**
 * Site-wide settings.
 */
export const SITE_SETTINGS: SiteSettings = {
  /** Main contact details, as supplied by the client. */
  contact: {
    phone: "+94 112 125 125",
    email: "info.jkcg@keells.com",
    callCentreHours: "07:00 – 19:00",
    headOffice: {
      name: "John Keells CG Auto Head Office",
      address: "186, Vauxhall Street, Colombo 02",
    },
  },
  /** Test-drive / register-your-interest form (John Keells CG Auto). Encoded in the test-drive QR codes. */
  testDriveFormUrl: "https://www.johnkeellscgauto.com/register-your-interest/",
  // The form site blocks iframes (X-Frame-Options: SAMEORIGIN, frame-ancestors 'self'),
  // so "Open form here" stays hidden and visitors use the QR code.
  testDriveFormEmbeddable: false,
  idleTimeoutSeconds: 90,
  formIdleTimeoutSeconds: 300,
  contentVersion: "0.1.0",
};
