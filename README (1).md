# 📦 Subscription Manager

A backend service to manage user subscriptions, handle payments, notify renewals, and provide access to subscription-based services.

---

## 🚀 Features
- Manage user subscriptions (create, view, cancel)
- Handle payments via **Stripe API**
- Support for subscription plans (Basic, Premium, Pro)
- Store subscription details securely in **MongoDB**
- Easy integration with any front-end application

---

## 🛠️ Technologies Used
- **Node.js** (Express.js)
- **MongoDB** (with Mongoose)
- **Stripe API** for payment processing
- **dotenv** for environment variables
- **Nodemon** for development

---

## 📂 Project Structure
```
subscription-manager/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   └── subscriptionController.js  # Handle subscription logic
├── models/
│   └── Subscription.js        # Subscription Mongoose schema
├── routes/
│   └── subscriptionRoutes.js  # API routes
├── services/
│   └── paymentService.js      # Stripe payment integration
├── .env                        # Environment variables
├── package.json
├── server.js                   # Entry point
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd subscription-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Set your Stripe Price IDs**

   In `services/paymentService.js`, update the `priceMap` with your actual Stripe Price IDs:
   ```javascript
   const priceMap = {
     basic: 'your_stripe_price_id_for_basic',
     premium: 'your_stripe_price_id_for_premium',
     pro: 'your_stripe_price_id_for_pro'
   };
   ```

5. **Run the server**
   ```bash
   npm run dev
   ```

---

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|:------:|:--------:|:-----------|
| POST | `/api/subscriptions` | Create a new subscription |
| GET | `/api/subscriptions/:userId` | Fetch subscription details |
| DELETE | `/api/subscriptions/:userId` | Cancel a subscription |

---

## 🧪 Example Request

**Create Subscription (POST `/api/subscriptions`)**
```json
{
  "userId": "user123",
  "plan": "premium",
  "paymentMethodId": "pm_1Nxxxxxxx" 
}
```

---

## 📢 Notes
- Make sure you have valid **Stripe Price IDs** and **Payment Methods**.
- Test payments easily using Stripe's test cards (e.g., `4242 4242 4242 4242`).

---

## 📜 License
This project is licensed under the MIT License.