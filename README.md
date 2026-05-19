# Next Mountain Readiness Assessment — MVP

Static-site implementation of the NMRA. Deployable as-is, customizable in clearly marked spots.

## What's here

```
nmra-mvp/
├── index.html          Landing page
├── assessment.html     24-question instrument
├── results.html        Personalized report (reads from URL hash)
├── apply.html          Founding cohort application form
├── css/
│   └── styles.css      All styling
└── js/
    ├── data.js         Questions, scoring, zones (single source of truth)
    ├── assessment.js   Assessment flow + submission
    └── results.js      Report renderer
```

No build step. No framework. Open `index.html` in a browser to run locally.

## Deploy

### Option A — Vercel (recommended)

1. Create a new GitHub repo. Drop this folder's contents into it. Commit and push.
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub.
3. Pick the repo. Framework preset: **Other**. Build command: blank. Output directory: blank.
4. Deploy. You'll get a `*.vercel.app` URL within ~30 seconds.
5. Add your custom domain in Vercel → Settings → Domains.

### Option B — Netlify

Identical to Vercel: create repo, link in Netlify, deploy. Or drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop) for a one-shot deploy without GitHub.

### Option C — GitHub Pages

Push to a repo, enable Pages under Settings → Pages → main branch / root. URL will be `username.github.io/repo-name`.

## Before going live — required customization

### 1. Form endpoint

The assessment posts a JSON payload to a form endpoint when the user clicks **See my results**. Set it in `js/assessment.js`:

```js
const CONFIG = {
  formEndpoint: "https://formspree.io/f/REPLACE_ME",
  resultsPage: "results.html",
};
```

**Options:**
- **Formspree** ([formspree.io](https://formspree.io)) — easiest. Create a form, paste the endpoint URL. Submissions arrive in your inbox + a Formspree dashboard. Free tier: 50 submissions/month.
- **ConvertKit form** — slightly more setup, but pairs natively with email sequences (recommended for the 3-email follow-up). Use ConvertKit's HTML form action URL.
- **Your own webhook** — anything that accepts a POST with JSON.

If the endpoint is left as `REPLACE_ME`, submissions are silently skipped (the assessment still works locally — useful for testing).

### 2. Application form endpoint

In `apply.html`, replace:

```html
<form action="https://formspree.io/f/REPLACE_ME" method="POST" class="apply-form">
```

### 3. Email follow-up sequence (not yet wired)

When you connect ConvertKit (or Mailchimp), set up 4 emails triggered by NMRA completion:

- **Day 0** — Auto-generated report email with the recipient's zone, top + growth dimensions, and a link back to their results URL.
- **Day 2** — Personal note from Jeff or Jason referencing their zone, inviting a 30-min Next Mountain Conversation.
- **Day 7** — Short reflection: Issachar passage + one zone-specific next move.
- **Day 14** — Founding cohort application invitation. Send only to **Mapping the Climb** and **Leading from Calling** zones with role in {CEO, COO, CFO, ministry exec}. Confirm rule with Jeff.

The submission payload includes `results.zone` and `reader.role` — use these to segment.

### 4. Domain

Default copy assumes `nextmountaincircles.com`. If you register a different domain, search/replace `nextmountaincircles.com` across `*.html`. Mailto link in `results.html` also references `hello@nextmountaincircles.com`.

### 5. Visual identity

The current palette and typography (Cormorant Garamond + Inter, slate-blue accent) is a deliberate, restrained baseline. **Recommend a half-day with a designer before public launch** to lock logotype, color, and a finalized report visual. All visual variables live at the top of `css/styles.css` under `:root` — single place to update.

## Customizing content

All question copy, scoring rules, zone definitions, and per-dimension diagnostic text live in **`js/data.js`**. This is the single source of truth — edit there, and both the assessment and the results page update automatically.

To change a question, edit the `text` field. To toggle a reversed item, change `reversed: false` to `true` (or vice versa). To adjust zone cutoffs, edit the `zones` array.

## How the report URL works

When a user finishes the assessment, the eight dimension scores are encoded into the URL hash:

```
results.html#n=Sarah&e=sarah%40example.com&s=12:10:8:14:11:7:13:15
```

This means:
- The report is **regenerable**: bookmark or revisit at any time.
- The report is **shareable**: a user can send the URL to their executive coach or spouse.
- No backend required to render the report — pure client-side.

The same payload is also POSTed to the form endpoint (for follow-up sequencing) so you have a copy.

## Testing locally

```bash
# Any static server. With Python:
cd nmra-mvp
python3 -m http.server 8000

# Then open:
# http://localhost:8000
```

Or just double-click `index.html` and navigate. The form endpoint will skip if left as the default placeholder, so the whole flow works offline.

## Privacy + data

The MVP captures: first name, last name, email, role, organization size, optional organization name, and all 24 answers. This is posted to whatever form endpoint you configure. Update the privacy paragraph in `assessment.html` to match your actual data handling.

## Open items before launch

These are the items Jeff still needs to weigh in on (see `NMRA_Build_Spec_Outline_v0.1.docx`):

- [ ] Domain registered and pointed at deployment
- [ ] Email infrastructure chosen (recommended: ConvertKit)
- [ ] Form endpoint configured in `assessment.js` and `apply.html`
- [ ] Day 14 application-invite gating rule confirmed
- [ ] Visual identity baseline reviewed (designer recommended)
- [ ] Privacy paragraph reviewed for accuracy
- [ ] QR code generated pointing to the live `/index.html` or `/assessment.html`
