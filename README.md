# abiolalawal.com — Portfolio Website

> **Abiola Lawal** · DevSecOps & Kubernetes Engineer  
> Live at: [abiolalawal.com](https://abiolalawal.com)

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JS |
| Server | Nginx 1.27 (Alpine) |
| Container | Docker (multi-stage, non-root) |
| CI/CD | GitHub Actions |
| Hosting | Cloudflare Pages (now) → RKE2 Kubernetes (later) |
| Email | Cloudflare Email Routing → infra@abiolalawal.com |

---

## Local Development

```bash
# Clone
git clone https://github.com/Biolajr/abiolalawal.git
cd abiolalawal

# Run with Docker
docker compose up -d

# Open
open http://localhost:8080
```

Or just open `public/index.html` directly in your browser — it's pure static HTML.

---

## Project Structure

```
abiolalawal/
├── public/               # Static site files
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── photo.jpeg        # Your headshot
│   └── uploads/          # PDFs (CV, certs) — add manually, not committed
│       └── .gitkeep
├── k8s/
│   └── portfolio.yaml    # Kubernetes manifests (Deployment, Service, Ingress, HPA, PDB)
├── .github/
│   └── workflows/
│       ├── deploy.yml        # Cloudflare Pages deployment
│       └── deploy-k8s.yml    # Kubernetes deployment (for when cluster is ready)
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Local development
├── nginx.conf             # Production Nginx config
├── _headers               # Cloudflare Pages headers
├── _redirects             # Cloudflare Pages redirects
└── README.md
```

---

## Deploy to Cloudflare Pages (Current Setup)

### 1. Create Cloudflare Pages project

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project**
2. Connect your GitHub repo
3. Set **Build output directory**: `public`
4. Set **Build command**: *(leave empty)*

### 2. Connect your domain

1. In Cloudflare Pages → your project → **Custom domains**
2. Add `abiolalawal.com` and `www.abiolalawal.com`
3. Cloudflare will auto-configure DNS (since your domain is already on Cloudflare)

### 3. Add GitHub Actions secrets

In your GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token (use "Edit Cloudflare Workers" template, add Pages permission) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare → right sidebar on any page |
| `CLOUDFLARE_ZONE_ID` | Cloudflare → your domain → Overview → Zone ID |

### 4. Push and deploy

```bash
git add .
git commit -m "feat: initial portfolio deployment"
git push origin main
```

GitHub Actions will automatically deploy to Cloudflare Pages. ✅

---

## Set Up Email: infra@abiolalawal.com

Use **Cloudflare Email Routing** (free):

1. Cloudflare Dashboard → your domain → **Email** → **Email Routing**
2. Enable email routing
3. Add a **custom address**: `infra@abiolalawal.com`
4. Set destination: your Gmail or personal email
5. Verify the destination email

Done — all emails to `infra@abiolalawal.com` forward to your inbox.

> For sending from `infra@abiolalawal.com`, use [Resend.com](https://resend.com) (free tier: 100 emails/day):
> 1. Sign up at resend.com → Add domain `abiolalawal.com`
> 2. Add the required DNS records in Cloudflare
> 3. Get your API key
> 4. Use the Resend SDK to send from `infra@abiolalawal.com`

---

## Contact Form (Formspree)

Replace the form endpoint in `public/script.js`:

```js
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → copy the form ID
3. Replace `REPLACE_WITH_YOUR_ID` in `script.js`

---

## Add Your PDF Files

Place these in `public/uploads/` (they're gitignored, add manually):

```
public/uploads/
├── Biola_Lawal_Resume_2026.pdf    # Your CV
├── aws-saa.pdf                     # AWS cert (when done)
├── cka.pdf                         # CKA cert (when done)
└── ...
```

---

## Docker Image (GHCR)

The GitHub Actions workflow automatically builds and pushes to GitHub Container Registry:

```bash
# Pull latest
docker pull ghcr.io/biolajr/abiolalawal:latest

# Run locally
docker run -p 8080:80 ghcr.io/biolajr/abiolalawal:latest
```

---

## Migrate to Kubernetes (When Homelab is Ready)

1. Add `KUBECONFIG_BASE64` secret to GitHub (base64-encoded kubeconfig)
2. Ensure cert-manager and NGINX ingress are installed in your cluster
3. Create namespace: `kubectl apply -f k8s/portfolio.yaml`
4. Trigger the k8s workflow: push a tag like `git tag k8s-v1.0.0 && git push --tags`

Or manually trigger from **Actions → Deploy to Kubernetes → Run workflow**.

---

## DNS Setup (Cloudflare)

| Record | Type | Value |
|---|---|---|
| `abiolalawal.com` | CNAME | `<pages-project>.pages.dev` (proxied ✅) |
| `www` | CNAME | `<pages-project>.pages.dev` (proxied ✅) |
| `infra` | MX / Email | Cloudflare Email Routing handles this |

---

## License

MIT — feel free to use as inspiration for your own portfolio.

---

*Built with HTML, CSS, and ❤ · Deployed on Cloudflare Pages*
