# 🌍 GlobalTradeX — B2B/B2C Global Marketplace

<div align="center">

![GlobalTradeX Banner](https://img.shields.io/badge/GlobalTradeX-Marketplace-1A56DB?style=for-the-badge&logo=globe&logoColor=white)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-7C3AED?style=flat-square)](https://anthropic.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github)](https://pages.github.com)

**A production-grade, Alibaba-inspired international B2B/B2C marketplace platform**  
with AI-powered customer service, multi-role dashboards, and real-time messaging.

[🚀 Live Demo](#live-demo) • [✨ Features](#features) • [🛠 Installation](#installation) • [📖 Usage](#usage) • [🤝 Contributing](#contributing)

</div>

---

## 📸 Screenshots

| Homepage | Product Listing | Seller Dashboard |
|----------|----------------|-----------------|
| 🌍 Hero + categories | 🔍 Filter & browse | 📊 Revenue analytics |

| Admin Panel | AI Chatbot | Checkout |
|-------------|-----------|---------|
| 🛡 Platform management | 🤖 Claude-powered | 🛒 3-step flow |

---

## ✨ Features

### 🏠 Marketplace
- **Homepage** — Hero banner, category grid, hot products, trust badges, footer
- **Product Listing** — Category filter sidebar, sort options, 12 product types across 8 categories
- **Product Detail** — Image gallery, volume pricing tiers, MOQ, seller card, tabbed specs/reviews/Q&A
- **Search** — Global search across products and categories

### 👤 Authentication
- Sign In / Register with role selection (Buyer / Seller)
- Demo accounts: `admin@gtx.com` · `seller@gtx.com` · `buyer@gtx.com`
- Google & GitHub OAuth buttons (UI-ready)
- Role-based routing (auto-redirect to correct dashboard)

### 🛒 Buyer Features
- Add to Cart with persistent cart count in navbar
- Wishlist toggle on all product cards
- **3-step Checkout**: Cart → Shipping → Payment
- Shipping method selection (Standard / Express Air / DHL)
- Trade Assurance escrow notice
- Order confirmation with order number
- **Buyer Dashboard**: Order history with status badges, Wishlist management

### 🏭 Seller Dashboard
- Revenue overview (area chart)
- Sales category breakdown (pie chart)
- 4 KPI stat cards: Revenue, Orders, Products, Rating
- **Product Inventory**: Full table with SKU, stock levels, status badges
- **Order Management**: Status tracking, update controls
- **Analytics**: Bar chart (revenue) + Line chart (orders)
- Add Product modal with image upload UI
- Bulk Upload button

### 🛡 Admin Panel
- Platform GMV + User Growth charts
- 4 platform KPIs: Users, Sellers, GMV, Commission
- **User Management**: Full table with role/status badges, actions
- **Seller Approvals**: Approve / Reject pending sellers
- Dispute, Fraud Detection, CMS placeholders

### 🤖 AI Customer Service (Claude-powered)
- **TradeBot** — Live AI assistant built on `claude-sonnet-4-20250514`
- Understands: Trade Assurance, order tracking, supplier sourcing, RFQ, logistics
- Quick-reply suggestion chips
- Animated typing indicator
- Multi-conversation sidebar (supplier chats + AI chat)
- Markdown rendering (bold, bullet points)

### 🎨 UI/UX
- Alibaba + Amazon inspired professional layout
- Fully responsive (mobile-first)
- Sticky navbar with live cart count
- Dark gradient hero sections
- Smooth hover animations on product cards
- Status badges with semantic color coding
- Recharts data visualizations

---

## 🛠 Installation

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.0.0 |
| npm | ≥ 9.0.0 |
| Git | any |

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/globaltradeX.git
cd globaltradeX
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

> 🔑 Get your API key at [console.anthropic.com](https://console.anthropic.com)

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Output is in the `dist/` folder — ready to deploy anywhere.

---

## 🌐 Deploy to GitHub Pages

### Automatic (Recommended)

This repo includes a GitHub Actions workflow that auto-deploys on every push to `main`.

**One-time setup:**

1. Go to your repo → **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Add your API key as a secret:
   - **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
   - Name: `VITE_ANTHROPIC_API_KEY`
   - Value: your API key

4. Push to `main`:

```bash
git add .
git commit -m "deploy: initial release"
git push origin main
```

The workflow (`.github/workflows/deploy.yml`) will:
- Install dependencies
- Build the project
- Deploy to `https://YOUR_USERNAME.github.io/globaltradeX/`

### Manual Deploy

```bash
npm run build
npm run deploy
```

---

## 🗂 Project Structure

```
globaltradeX/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   └── favicon.svg             # App icon
├── src/
│   ├── App.jsx                 # Main app (all pages & components)
│   └── main.jsx                # React entry point
├── index.html                  # HTML shell
├── vite.config.js              # Vite + React config
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS config
├── package.json                # Dependencies & scripts
├── .env.example                # Environment variable template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Charts | Recharts |
| AI Backend | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Deployment | GitHub Pages via GitHub Actions |
| Font | Plus Jakarta Sans (Google Fonts) |

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ANTHROPIC_API_KEY` | ✅ Yes | Anthropic API key for TradeBot AI |

> ⚠️ **Security Note:** Never commit your `.env` file. The `.gitignore` excludes it automatically.  
> For production, use the API through a backend proxy to keep your key server-side.

---

## 🎭 Demo Accounts

| Email | Password | Role | Redirects to |
|-------|----------|------|-------------|
| `admin@gtx.com` | any | Admin | Admin Dashboard |
| `seller@gtx.com` | any | Seller | Seller Dashboard |
| `buyer@gtx.com` | any | Buyer | Buyer Dashboard |
| any other email | any | Buyer | Buyer Dashboard |

---

## 📊 Pages Reference

| Route (state) | Page | Access |
|---------------|------|--------|
| `home` | Homepage | Public |
| `products` | Product Listing | Public |
| `product_detail` | Product Detail | Public |
| `auth` | Sign In / Register | Public |
| `checkout` | Checkout Flow | Buyer |
| `buyer_dashboard` | Buyer Dashboard | Buyer |
| `seller_dashboard` | Seller Dashboard | Seller |
| `admin_dashboard` | Admin Panel | Admin |
| `messages` | Messaging + AI Chat | All |

---

## 🤖 AI Chatbot — TradeBot

TradeBot is powered by `claude-sonnet-4-20250514` with a specialized system prompt for B2B trade. It can answer questions about:

- Product sourcing and supplier recommendations
- Trade Assurance and escrow payments
- Order tracking and logistics
- RFQ (Request for Quotation) process
- MOQ (Minimum Order Quantity) negotiation
- Dispute resolution
- Import/export regulations (general guidance)

**Quick prompts to try:**
- *"How does Trade Assurance protect my payment?"*
- *"Find me a verified solar panel supplier from Germany"*
- *"What's the process to raise a dispute?"*
- *"Explain MOQ and how to negotiate it"*

---

## 🗺 Roadmap

- [ ] Backend API (Node.js + Express + PostgreSQL)
- [ ] Real authentication with JWT + refresh tokens
- [ ] Stripe & PayPal payment integration
- [ ] Real-time chat with WebSockets
- [ ] Product image uploads to AWS S3
- [ ] Email verification & 2FA
- [ ] Elasticsearch-powered search
- [ ] Multi-language (i18n) support
- [ ] Mobile app (React Native)
- [ ] Seller subscription plans

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Anthropic](https://anthropic.com) — Claude AI API
- [Alibaba.com](https://alibaba.com) — Design inspiration
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling
- [Recharts](https://recharts.org) — React chart library
- [Lucide React](https://lucide.dev) — Icon library

---

<div align="center">

Built with ❤️ using React + Claude AI

⭐ Star this repo if you find it useful!

</div>
