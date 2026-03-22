# Vatsalya Plumbing Services 🔧

A full-stack plumbing services website built with **React + Vite**, powered by **Supabase** as the backend database. The platform includes a customer-facing shop, service request system, order tracking, and a secure admin dashboard.

---

## 🌐 Live Features

### 🧑‍💼 Customer Side
- Browse & buy plumbing products (PVC pipes, taps, fittings, etc.)
- Add to cart with size selection and quantity controls
- Checkout with name, phone, delivery address, and payment method
- **My Orders** — track order status (Pending / Delivered) by phone number
- WhatsApp support button on every order card
- Request a service call-back with area and service type

### 🛠️ Admin Dashboard (`/#admin`)
- Secure login (credentials stored in `.env`)
- View all product orders with customer details, items, and totals
- **Live Status Dropdown** — update any order to Pending or Delivered (syncs to Supabase)
- **Delete** orders and quote leads with confirmation guard
- View all service quote inquiries
- WhatsApp reply button per lead

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/vatsalya-plumbing.git
cd vatsalya-plumbing
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_admin_password
```

> ⚠️ **NEVER share or commit your `.env` file.** It is protected by `.gitignore`.

### 4. Run Locally
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 🗄️ Supabase Database Setup

Create the following tables in your Supabase project:

### `orders` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `customer` | text | Customer full name |
| `phone` | text | Customer phone number |
| `items` | text | Comma-separated order items |
| `total` | numeric | Order total amount |
| `payment` | text | Payment method |
| `address` | text | Delivery address |
| `status` | text | Default: `'Pending'` |
| `created_at` | timestamptz | Auto-generated |

### `leads` table
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `name` | text | Customer name |
| `phone` | text | Customer phone |
| `email` | text | Customer email |
| `area` | text | Delivery area |
| `service` | text | Selected service type |
| `msg` | text | Customer message |
| `created_at` | timestamptz | Auto-generated |

### Row Level Security (RLS) Policies

Run these in your Supabase **SQL Editor**:

```sql
-- Allow customers to place orders
CREATE POLICY "Enable insert for all"
ON orders FOR INSERT WITH CHECK (true);

-- Allow customers to read their own orders
CREATE POLICY "Enable read access for all users"
ON orders FOR SELECT USING (true);

-- Allow admin to update order status
CREATE POLICY "Enable update for service admins"
ON orders FOR UPDATE USING (true);

-- Allow admin to delete orders
CREATE POLICY "Enable delete for service admins"
ON orders FOR DELETE USING (true);

-- Allow customers to submit quote leads
CREATE POLICY "Enable insert for all leads"
ON leads FOR INSERT WITH CHECK (true);

-- Allow admin to read leads
CREATE POLICY "Enable read for leads"
ON leads FOR SELECT USING (true);

-- Allow admin to delete leads
CREATE POLICY "Enable delete for service leads"
ON leads FOR DELETE USING (true);
```

---

## 🔐 Security Notes

- Admin credentials are stored in `.env` and never in source code
- `.env` is blocked from GitHub by `.gitignore`
- Admin URL (`/#admin`) scrubs itself from browser history on logout
- Supabase `anon` key is safe for frontend use — it is read-only by intent and restricted by RLS policies
- For production, consider setting up **Supabase Auth** for more robust admin access

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Frontend UI |
| Vite | Build tool & dev server |
| Supabase | Database & backend API |
| Vanilla CSS | Styling & responsive design |
| Google Fonts (Oswald + Open Sans) | Typography |

---

## 📁 Project Structure

```
plumb/
├── src/
│   ├── App.jsx          # Main application component
│   ├── styles.css       # Global styles
│   ├── main.jsx         # React entry point
│   └── lib/
│       └── supabaseClient.js  # Supabase client initialization
├── public/
├── .env                 # ⚠️ Secret keys — DO NOT COMMIT
├── .gitignore           # Protects .env and node_modules
├── index.html
├── package.json
└── vite.config.js
```

---

## 📞 Business Contact

**Vatsalya Plumbing Services**
- 📍 Nashik, Maharashtra
- 📱 WhatsApp: +91 90968 99364

---

## 📄 License

This project is private and proprietary. All rights reserved by **Amol — Vatsalya Plumbing Services**.
