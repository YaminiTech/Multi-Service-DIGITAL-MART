# DigitalMart - Multi-Service Aggregator & Vendor Portal

DigitalMart is a modern, responsive, all-in-one web-based digital marketplace dashboard. It consolidates access to leading third-party e-commerce, grocery, and food delivery services under a single, unified interface, while simultaneously providing a direct shopping experience and a dedicated portal for local vendors.

---

## 🚀 Key Features

### 1. **Multi-Service Directory**
Quick, direct redirection links to official third-party portals:
* 🛒 **E-Commerce:** Amazon & Flipkart
* 🍎 **Groceries:** BigBasket & Instamart
* 🍔 **Food Delivery:** Swiggy
* 👗 **Fashion & Beauty:** Myntra

### 2. **Direct Shopping & Persistent Cart**
* Browse local digital products across category segments (E-commerce, Food, Groceries, Fashion, Beauty).
* Persistent, interactive shopping cart powered by browser `localStorage` that preserves added items across page navigation.
* Smooth checkout flow with simulated shipping, address forms, and secure payment methods (PhonePe, GPay, Razorpay).

### 3. **Local Vendor Enablement**
* Registration portal for local sellers/vendors (requires PAN and GST validation).
* Vendor dashboard to oversee products and simulate verification/block states.

### 4. **Modern UI/UX**
* Fully responsive layout (with mobile hamburger menus and responsive grids).
* CSS Variables-driven customization.
* Dark/Light mode theme toggling.
* Search filter to search across both local and affiliate/third-party catalog items in real-time.

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), FontAwesome Icons.
* **Backend:** Node.js, Express.js.
* **Security:** `bcryptjs` for secure password hashing.
* **Development utilities:** `cors` (Cross-Origin Resource Sharing), `nodemon` (auto-restart in dev mode).

---

## 📦 Getting Started

Follow these steps to run the application locally:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/YaminiTech/Multi-Service-DIGITAL-MART.git
   cd Multi-Service-DIGITAL-MART
   ```

2. **Navigate to the Application Directory & Install Dependencies:**
   ```bash
   cd shopcart
   npm install
   ```

3. **Start the Backend Server:**
   * For production/standard execution:
     ```bash
     npm start
     ```
   * For development (with auto-restart on code changes):
     ```bash
     npm run dev
     ```
   The backend will start listening on `http://localhost:3000`.

4. **Launch the Frontend:**
   * Open `shopcart/index.html` directly in your web browser, or serve it using a local live server extension.

---

## 📁 Repository Structure

```files
├── shopcart/
│   ├── index.html            # Main Landing & Aggregator Dashboard
│   ├── cart.html             # Dedicated Shopping Cart Page
│   ├── checkout.html         # Payment & Checkout Gateway
│   ├── style.css             # Main stylesheet & theme settings
│   ├── app.js                # Core frontend client interactions
│   ├── server.js             # Node/Express API backend (Auth, Signup/Login)
│   ├── package.json          # Node backend configuration and dependencies
│   ├── *.js                  # Scraper & utility scripts (for syncing platform data)
│   └── *.png / *.jpg / *.jpeg# Product and brand image assets
├── .gitignore                # Excludes node_modules and logs from git
├── README.md                 # Project overview and setup instructions
└── group11 project book final (1).pdf # Academic/Technical project report
```
