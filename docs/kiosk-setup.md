# Kiosk setup

How to deploy the site and set up a showroom screen so it runs all day, offline if needed.

## 1. One-time: deployment (Vercel)

Set these environment variables in the Vercel project (Settings → Environment Variables), then redeploy:

| Variable | Value | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://byd-microsite.vercel.app` | Address used in link previews and the sitemap. Change it if the domain changes. |
| `NEXT_PUBLIC_FIREBASE_BUCKET` | your bucket id | Already set. Only used for links left empty in `content/model-videos.ts`. |

## 2. One-time: let kiosks save the Firebase videos (bucket CORS)

Videos stream fine without this. To save them for offline use, the kiosk downloads each video with a normal page request, and the bucket has to allow that from the site's address. Until this is done, the kiosk status screen shows **Videos saved for offline: 0 of N**.

The rule is in `cors.json` at the project root. It allows `https://byd-microsite.vercel.app`, plus `localhost:3000` and `localhost:3123` for testing. Add any other domain the kiosk uses to the `origin` list.

Apply it once, from any computer with the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) signed in to the Firebase project:

```sh
gcloud storage buckets update gs://byd-ht-project.firebasestorage.app --cors-file=cors.json
```

Check it:

```sh
gcloud storage buckets describe gs://byd-ht-project.firebasestorage.app --format="default(cors_config)"
```

The Firebase console's storage rules don't control CORS. It can only be set this way.

## 3. Each screen: the computer

- **Power and sleep:** screen never turns off, computer never sleeps. On Windows: Settings → System → Power → Screen and sleep → *Never*. The site also asks the browser to keep the screen on.
- **Notifications:** turn on Do Not Disturb / Focus permanently and turn off pop-ups from other apps.
- **Updates:** set Windows Update active hours to cover showroom hours, or pause updates during events.
- **Display:** set the screen to its native resolution with 100% scaling. The site adapts to any landscape screen (it's tuned for the 4'2" × 2'5" panel, about 1.72:1).
- **Touch:** turn off edge swipes if the OS supports it (Windows: *Allow edge swipes* off via Group Policy or the registry), so visitors can't open system menus.

## 4. Each screen: the browser (Chrome or Edge)

Two ways to run it. Option B is best for a locked-down kiosk.

**A. Installed app.** Open the site, then use the install button in the address bar (or menu → *Cast, save and share → Install page as app*). The app opens full-screen with the BYD icon.

**B. Kiosk mode at start-up.** Create a shortcut in the Windows Startup folder (`Win+R` → `shell:startup`) with this target:

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk https://byd-microsite.vercel.app/ --noerrdialogs --disable-session-crashed-bubble --disable-infobars --autoplay-policy=no-user-gesture-required --overscroll-history-navigation=0 --disable-pinch --no-first-run
```

To leave kiosk mode, press `Alt+F4` with a keyboard.

Use the same browser profile every time (don't use Incognito or Guest): saved videos are kept in the browser's storage.

Install the app once (option A), even if you then launch it in kiosk mode: Chrome is more likely to keep an installed app's storage. Saved videos are only removed if the disk gets nearly full, so keep a few GB free.

## 5. First launch

1. Connect to the internet and open the site.
2. **01 Loading** shows *"X of N videos ready"* while the app and the videos are saved. With fast internet this takes a few minutes, since the videos total about 115 MB today.
3. When it reaches 100%, Home opens. If a download stalls for 60 s, Home opens anyway and the download keeps going in the background.

Later launches go straight to Home. If anything is missing, it's downloaded again while online.

## 6. Kiosk status screen

**Open it:** tap the **BYD logo** (top-left of the navigation) **5 times within 3 seconds**. A single tap does nothing, so visitors won't open it by accident. There's no PIN, and the screen only shows information.

| Shows | Meaning |
| --- | --- |
| Videos saved for offline | How many real videos are saved, e.g. *18 of 18*. Shown in gold while some are missing. Dummy links (`example.com`) aren't counted. |
| Network | *Online* or *Offline*. |
| Content version | The `contentVersion` this kiosk is running. It should match the latest one you deployed. |

Close it with the **×** button. It also closes on its own after the idle timeout.

**If videos are missing:** make sure the kiosk is online and the bucket's CORS rule is applied (section 2), then restart the app (close and reopen the browser). It downloads whatever is missing on start-up.

## 7. Updating content

1. Change the links in `content/model-videos.ts` / `content/site-videos.ts` (or texts in `content/`).
2. Bump `contentVersion` in `content/site-settings.ts`, e.g. `0.1.0` → `0.2.0`.
3. Deploy. On their next start while online, kiosks pick up the new app, download only the new videos, and delete the ones no longer used.
4. Run `node scripts/build-assets-doc.mjs` to refresh `docs/assets.md`.

## 8. Pre-event checklist

- [ ] Kiosk status screen (tap the logo 5 times): **Videos saved for offline N of N**, and the content version is the latest.
- [ ] Unplug the network cable (or turn off Wi-Fi) and **reload** the app: Home opens.
- [ ] Still offline: open **every model** in Experience and switch Exterior / Interior and Day / Night. Every real video plays.
- [ ] Still offline: open Models and Showrooms. The map and showroom list show. The test-drive form needs internet, so it shows the QR code only.
- [ ] Leave the screen untouched for 2 minutes: "Still there?" appears, then it returns to Home.
- [ ] Reconnect the network.

## 9. Testing aids

- `?debug=1`: shows the labels of media slots (`?debug=0` hides them again).
- `?autotour=1`: drives the kiosk around every screen forever, used for long memory tests. Don't leave it on a showroom kiosk.
