# SUGANDHA - Modern Web Application

A modern, responsive web application built with React and Node.js, featuring beautiful animations, authentication, and a sleek user interface.

## 📸 Screenshots

### Main Landing Page
![Main Page](./frontend/src/assets/main_page_ss.png)

### Features Section
![Features](./frontend/src/assets/features_ss.png)

### Authentication Modal
![Signup Form](./frontend/src/assets/signup_ss.png)

### Footer Section
![Signup Form](./frontend/src/assets/footer_ss.png)

---

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Clean, responsive design with glass morphism effects
- **Authentication System**: Login and signup with transparent modal forms
- **Animated Components**: 
  - TextPressure animations for branding
  - SplitText animations for interactive text
  - GlassIcons and PixelTransition effects
  - Custom cursor with magnetic effects
- **Smart Navigation**: Auto-hiding navbar that shows/hides on scroll
- **Loading Experience**: Animated loader with progress tracking
- **Responsive Design**: Works perfectly on all devices
- **Smooth Scrolling**: Lenis smooth scrolling implementation

### Backend (Node.js + Express)
- **JWT Authentication**: Secure token-based authentication
- **User Management**: Registration, login, profile updates
- **Security Features**: 
  - Password hashing with bcrypt
  - Rate limiting protection
  - Input validation
  - CORS configuration
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error management

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animations
- **Lenis** - Smooth scrolling
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Object Data Modeling
- **JWT** - JSON Web Tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
sugandha/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Auto-hiding navigation
│   │   │   ├── AuthForms.jsx        # Login/signup modals
│   │   │   ├── Loader.jsx           # Animated loading screen
│   │   │   ├── Hero.jsx             # Landing section
│   │   │   ├── Features.jsx         # Features section
│   │   │   ├── Benefits.jsx         # Benefits section
│   │   │   ├── Buy.jsx              # Purchase section
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   └── CustomCursor.jsx     # Magnetic cursor
│   │   ├── animated/
│   │   │   ├── TextPressure.jsx     # Text animation
│   │   │   ├── SplitText.jsx        # Text splitting effects
│   │   │   ├── GlassIcons.jsx       # Glass morphism icons
│   │   │   └── PixelTransition.jsx  # Pixel transition effects
│   │   └── App.jsx                  # Main application
│   └── package.json
├── backend/
│   ├── routes/
│   │   └── auth.js                  # Authentication routes
│   ├── models/
│   │   └── User.js                  # User data model
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   └── errorHandler.js          # Error handling
│   ├── config/
│   │   └── database.js              # Database connection
│   ├── server.js                    # Express server
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/sugandha_db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   CORS_ORIGIN=http://localhost:5173
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 🎨 Key Features Explained

### 1. **Animated Loader**
- Full-screen loading experience
- Progress bar with realistic simulation
- Loading steps with visual feedback
- Smooth transition to main content

### 2. **Smart Navigation**
- Auto-hides when scrolling down
- Reappears when scrolling up
- Smooth transitions with CSS transforms
- Responsive design for all screen sizes

### 3. **Authentication Forms**
- 80% width transparent modals
- 10px backdrop blur effect
- Glass morphism design
- Form validation and error handling
- Smooth animations and transitions

### 4. **Modern Animations**
- **TextPressure**: Dynamic text animations
- **SplitText**: Character-by-character text effects
- **GlassIcons**: Transparent icon effects
- **CustomCursor**: Magnetic cursor interactions
- **PixelTransition**: Pixel-based transitions

### 5. **Responsive Design**
- Mobile-first approach
- Flexible layouts
- Adaptive components
- Touch-friendly interactions

## 🔐 Authentication API

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210",
  "address": "123 Main St, Mumbai"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

## 🎯 Current Status

### ✅ Completed Features
- [x] Responsive landing page design
- [x] Animated loader with progress tracking
- [x] Auto-hiding navigation bar
- [x] Transparent authentication modals
- [x] JWT-based authentication system
- [x] User registration and login
- [x] Modern animations and transitions
- [x] Glass morphism UI effects
- [x] Smooth scrolling implementation
- [x] Backend API with security features
- [x] Database integration with MongoDB
- [x] Error handling and validation

### 🚧 In Progress
- [ ] User profile management
- [ ] Password change functionality
- [ ] Additional page sections
- [ ] Enhanced animations

### 📋 Planned Features
- [ ] Admin dashboard
- [ ] User preferences
- [ ] Email notifications
- [ ] Advanced animations
- [ ] Performance optimizations

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt for secure storage
- **Input Validation**: Express-validator protection
- **Rate Limiting**: Brute force attack prevention
- **CORS Configuration**: Cross-origin security
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error management

## 🎨 Design Philosophy

The project follows modern design principles:
- **Glass Morphism**: Transparent, blurred effects
- **Minimalism**: Clean, uncluttered interfaces
- **Micro-interactions**: Subtle, delightful animations
- **Accessibility**: Inclusive design practices
- **Performance**: Optimized for speed and efficiency

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and modern web technologies**