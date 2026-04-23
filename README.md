# 🛍️ Trenova — Full-Stack E-Commerce App

A full-featured, production-ready **online shopping platform** built with **Next.js 14**, featuring a modern UI, real product data via Wix SDK, MongoDB backend, and a complete user experience from browsing to checkout.

## 🚀 Live Demo

🔗 **[trenova-git-main-ahmed1492s-projects.vercel.app](https://trenova-git-main-ahmed1492s-projects.vercel.app/)**

🔗 **[Recorded Demo](https://www.linkedin.com/posts/activity-7342732677650812928-Jbv-)**
---

## ✨ Features

### 🔐 Authentication
- Login / Register with Wix OAuth
- Password reset via email
- Email verification code flow
- Show/hide password toggle
- Persistent session via cookies

### 🛒 Cart & Checkout
- Add to cart with quantity selector
- Guest cart that merges on login
- Animated cart drawer in navbar
- Full checkout form (contact, delivery, payment)
- Real card number / expiry / CVV formatting
- Order success animation with redirect

### 📦 Orders
- Full order details page with progress tracker (Placed → Processing → Shipped → Delivered)
- Status badges with color coding
- Delivery info, total paid, items list
- Back to all orders navigation

### 👤 Profile
- Edit profile (username, first/last name, phone)
- Tabbed layout (Edit Profile / My Orders)
- Avatar with initials
- Order history with status badges and quick navigation

### 🔍 Shop & Filtering
- Real Wix product categories with drag-to-scroll
- Filter by category, type (physical/digital), price range
- Sort by price or date
- Inline search with debounce
- Active filter chips with individual dismiss
- Skeleton loading states

### 💬 Reviews
- Leave star ratings and comments (only after purchasing)
- Edit and delete your own reviews
- Average rating display
- Notification to review after order

### 🔔 Notifications
- Post-purchase notifications stored in localStorage
- Counter resets when panel is opened
- Per-notification dismiss
- Clicking a notification closes the panel

### 🎨 UI / UX
- Fully responsive (mobile drawer menu, desktop navbar)
- Hero slider with auto-advance, pause on hover, progress bar
- Animated checkout success overlay (SVG checkmark)
- Frosted glass cart dropdown
- Dark footer with payment icons
- Shop, Deals, About, Contact pages

---

## 🛠️ Tech Stack

### Front-End
- **Next.js 14** (App Router, Server Components, Server Actions)
- **Tailwind CSS** (UI Styling)
- **Zustand** (Cart & Notification state)
- **Wix SDK** — `@wix/stores`, `@wix/members`, `@wix/ecom`

### Back-End (built-in Next.js API Routes)
- **MongoDB + Mongoose** (Users, Orders, Reviews)
- `unstable_cache` for Wix API response caching
- Singleton connection pool for DB performance

### Key Libraries
- `axios` — HTTP requests
- `dayjs` — relative timestamps
- `js-cookie` — auth token storage
- `isomorphic-dompurify` — safe HTML rendering

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # All backend API routes (orders, users, comments)
│   ├── shop/             # Dynamic shop page with filters
│   ├── list/             # Category listing page
│   ├── product/[id]/     # Single product page with reviews & related products
│   ├── cart/             # Cart page
│   ├── checkout/         # Checkout page
│   ├── orders/[orderId]/ # Order details page
│   ├── profile/          # User profile page
│   ├── login/            # Auth page (login/register/reset)
│   ├── about/            # About page
│   ├── deals/            # Deals page
│   └── contact/          # Contact page
├── components/           # All reusable UI components
├── hooks/                # Zustand stores (cart, notifications)
├── lib/                  # DB connection, Mongoose models, Wix client
└── context/              # Wix client context provider
```

---

## 📈 Highlights

- **No separate backend server** — all API logic lives inside Next.js API routes
- **Wix SDK** for real product catalog, categories, and member authentication
- **MongoDB** for orders, users, and reviews with Mongoose models
- **Response caching** with `unstable_cache` for fast page loads
- **Drag-to-scroll** category row with touch support
- **Animated UI** — success overlay, skeleton loaders, hover effects throughout
- Clean, scalable component architecture with Tailwind CSS

---

## 🧠 What I Learned

- Built a complete full-stack app entirely within **Next.js App Router**
- Integrated **Wix SDK** for real e-commerce data (products, members, cart)
- Replaced an external Express backend with **Next.js API routes + MongoDB**
- Implemented **response caching** strategies for performance
- Built complex UI patterns: drag scroll, animated SVG, frosted glass dropdowns
- Managed global state with **Zustand** for cart and notifications
- Developed a complete auth flow with Wix OAuth and cookie-based sessions

---

## 💡 Summary

Trenova is a complete, production-quality e-commerce platform built from the ground up with modern tools. It demonstrates full-stack development skills — from real-time product data and authentication to order management and a polished, responsive UI.

---

*Built with ❤️ by Ahmed Mohamed*
