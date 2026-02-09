# 🗺️ Project Roadmap: Oak & Chisel

This roadmap outlines the journey from the current development phase to a fully live, professional, and profitable digital presence.

---

## 🏗️ Phase 1: The Path to Launch (Critical)
*Goal: Move from localhost to a secure, public environment.*

### 🔐 1. Admin Security
*   **Current State:** `/admin` is public.
*   **Action:** Implement real authentication (e.g., Supabase Auth or Clerk) to protect client data and business tools.

### 💾 2. Real Data Integration
*   **Current State:** Using `MOCK_JOBS` and local constants.
*   **Action:** Connect to a database (Supabase, Vercel Postgres) so jobs, quotes, and tax data persist and are editable by the user.

### 📩 3. Lead Capture
*   **Current State:** Contact forms are UI-only.
*   **Action:** Connect forms to a service like **Resend** or **Formspree** so you receive an email notification the moment a customer reaches out.

### 🌐 4. Deployment & Domain
*   **Action:** 
    *   Deploy to **Vercel** or **Netlify**.
    *   Connect the `oakandchisel.co.uk` (or similar) domain.
    *   Enable SSL (HTTPS).

---

## 🛠️ Phase 2: Usability & Professionalism
*Goal: Ensure the site works perfectly for the owner and the customer.*

### 📸 1. Content Finalization
*   **Action:** Replace placeholder `hero.png` and mock gallery items with professional high-res photography of real commissions.

### 📱 2. Admin Mobile "App"
*   **Action:** Add a Web Manifest so the owner can "Add to Home Screen" on their iPhone/Android, treating the Job Board like a native app.

### 📝 3. Invoice Automation
*   **Action:** Finalize the PDF generation logic to include the company VAT number (if applicable) and professional branding.

### ⚡ 4. Performance Optimization
*   **Action:** Use Astro’s `<Image />` component for all portfolio items to ensure blazingly fast load times on mobile 4G/5G.

---

## 🚀 Phase 3: Success & Growth
*Goal: Drive traffic, build trust, and automate sales.*

### 🔍 1. Local SEO Domination
*   **Action:** 
    *   Target keywords: "Bespoke Joinery [Location]", "Custom Kitchens [Location]".
    *   Submit Sitemap to Google Search Console.
    *   Optimize Meta Tags for every service page.

### 📍 2. Google Business Integration
*   **Action:** Verify the Google Business Profile and embed real Google Reviews onto the "Trust Bar".

### 📧 3. Post-Job Automation
*   **Action:** When a job is marked **"Completed"** in the Admin panel, trigger an automated email to the customer asking for a review with a direct link.

### 📊 4. Analytics
*   **Action:** Install privacy-first analytics (like Umami or Fathom) to track where leads are coming from without needing a cookie banner.

---
*Last Updated: February 2026*
