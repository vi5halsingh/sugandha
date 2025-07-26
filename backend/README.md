# Sherry Honey Backend API

A comprehensive Node.js/Express backend API for a sherry and honey product business with authentication, product management, order processing, and payment integration.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: CRUD operations with categories, pricing, and inventory
- **Order Processing**: Complete order lifecycle with status tracking
- **Payment Integration**: Stripe payment processing with webhooks
- **Review System**: Product reviews and ratings with moderation
- **User Management**: Admin panel for user management
- **Contact & Support**: Email-based contact forms and support requests
- **Security**: Rate limiting, input validation, and security headers

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sherry_honey_db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=10&category=honey&minPrice=100&maxPrice=1000&sort=price
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Admin/Vendor)
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Pure Wildflower Honey",
  "description": "Natural wildflower honey from the Himalayas",
  "category": "honey",
  "subcategory": "wildflower",
  "price": 450,
  "weight": 1,
  "weightUnit": "kg",
  "stock": 50,
  "isOrganic": true,
  "features": [
    {
      "title": "100% Natural",
      "description": "Pure honey without any additives"
    }
  ]
}
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id_here",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "phone": "9876543210",
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "paymentMethod": "online"
}
```

#### Get User Orders
```http
GET /orders
Authorization: Bearer <token>
```

### Payment Endpoints

#### Create Payment Intent
```http
POST /payments/create-payment-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_id_here"
}
```

#### Confirm Payment
```http
POST /payments/confirm
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_id_here",
  "paymentIntentId": "pi_xxx"
}
```

### Review Endpoints

#### Add Review
```http
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "product": "product_id_here",
  "rating": 5,
  "title": "Excellent Quality",
  "comment": "Best honey I've ever tasted!"
}
```

#### Get Product Reviews
```http
GET /reviews/product/:productId?page=1&limit=10
```

### Contact Endpoints

#### Send Contact Form
```http
POST /contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I would like to know more about your honey products."
}
```

#### Support Request
```http
POST /contact/support
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "issue": "My order hasn't arrived yet",
  "orderNumber": "SH250726001",
  "priority": "high"
}
```

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 👥 User Roles

- **user**: Regular customer
- **vendor**: Product seller
- **admin**: Full system access

## 🧪 Testing with Postman

### 1. Health Check
```http
GET http://localhost:5000/health
```

### 2. Register a User
```http
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Login
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 4. Get Products
```http
GET http://localhost:5000/api/products
```

### 5. Create Order (with token)
```http
POST http://localhost:5000/api/orders
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "items": [
    {
      "product": "product_id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "name": "Test User",
    "phone": "9876543210",
    "street": "Test Street",
    "city": "Test City",
    "state": "Test State",
    "zipCode": "123456"
  },
  "paymentMethod": "cod"
}
```

## 📊 Database Schema

### User
- name, email, password, phone, address
- role (user/vendor/admin), isVerified
- preferences, profileImage

### Product
- name, description, category, subcategory
- price, weight, stock, images
- specifications, certifications, tags
- vendor, rating, numReviews

### Order
- orderNumber, user, items
- subtotal, tax, shippingCost, total
- status, paymentStatus, paymentMethod
- shippingAddress, trackingNumber

### Review
- user, product, rating, title, comment
- isVerified, isApproved, helpful
- adminResponse

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/sherry_honey_db |
| JWT_SECRET | JWT secret key | - |
| JWT_EXPIRE | JWT expiration | 30d |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | Email username | - |
| EMAIL_PASS | Email password | - |
| STRIPE_SECRET_KEY | Stripe secret key | - |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key | - |

## 🚀 Deployment

### Heroku
1. Create Heroku app
2. Set environment variables
3. Deploy with Git

### Vercel
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

For support, email support@sherryhoney.com or create an issue in the repository. 