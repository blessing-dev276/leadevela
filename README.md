# Leadvela website

Static site (plain HTML/CSS, no build step) for leadvela.com.

## Structure
- `index.html` – the homepage
- `styles.css` – styling (brand colours are CSS variables at the top)
- `leadvela-logo-120.png` – logo used in the website AND the email signature
  (live URL: https://leadvela.com/leadvela-logo-120.png)
- `favicon-32.png`, `apple-touch-icon.png` – icons
- `assets/` – full-size logo

## Run locally
Open `index.html` in a browser, or run `npx serve .`

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial Leadvela site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/leadvela-site.git
git push -u origin main
```

## Deploy (free) and connect leadvela.com
Use Netlify, Vercel or Cloudflare Pages: import the GitHub repo, no build command,
publish directory `.` (root). Then add `leadvela.com` as a custom domain and set the
DNS records they show you in Namecheap (Domain List -> Manage -> Advanced DNS).
Keep your existing email redirect records in place.
