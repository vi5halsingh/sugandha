# Authentication Implementation

## Overview
This implementation adds login and signup functionality to the frontend by integrating with the backend authentication API.

## Features

### 1. Authentication Forms
- **Login Form**: Email and password authentication
- **Signup Form**: Full registration with name, email, password, phone, and address
- **Modal Display**: Forms appear as overlays with position absolute styling
- **Form Switching**: Users can switch between login and signup forms
- **Error Handling**: Displays validation and server errors
- **Success Feedback**: Shows success messages on successful authentication

### 2. Navbar Integration
- **Login Button**: Styled similar to the existing "Buy" button
- **Signup Button**: Matching design with hover animations
- **User State**: Shows welcome message and logout button when logged in
- **Responsive Design**: Buttons adapt to different screen sizes

### 3. API Integration
- **Backend Endpoints**: 
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
- **Token Storage**: JWT tokens stored in localStorage
- **User Data**: User information cached locally
- **Error Handling**: Network and server error handling

## Usage

### Starting the Application

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**:
   ```bash
   cd frontend
   npm run dev
   ```

### Authentication Flow

1. **Registration**:
   - Click "Sign Up" button in navbar
   - Fill in required fields (name, email, password)
   - Optional fields: phone, address
   - Submit form to create account

2. **Login**:
   - Click "Login" button in navbar
   - Enter email and password
   - Submit to authenticate

3. **Logout**:
   - Click "Logout" button when logged in
   - Clears local storage and resets state

## Components

### AuthForms.jsx
- Modal component for login/signup forms
- Form validation and error handling
- API integration with backend
- Success/error message display

### Navbar.jsx (Updated)
- Added authentication buttons
- User state management
- Logout functionality
- Conditional rendering based on auth state

## API Endpoints

### Registration
```javascript
POST /api/auth/register
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string (optional)",
  "address": "string (optional)"
}
```

### Login
```javascript
POST /api/auth/login
{
  "email": "string",
  "password": "string"
}
```

## Styling

- **Modal Overlay**: Fixed positioning with backdrop blur
- **Form Design**: Clean, modern design with focus states
- **Button Styling**: Consistent with existing navbar buttons
- **Responsive**: Works on mobile and desktop
- **Animations**: Hover effects and transitions

## Security Features

- **Password Validation**: Minimum 6 characters
- **Email Validation**: Proper email format checking
- **Token Storage**: Secure localStorage usage
- **Error Handling**: Comprehensive error messages
- **Input Sanitization**: Backend validation

## Future Enhancements

- Password reset functionality
- Email verification
- Social media login
- Remember me functionality
- Profile management
- Session timeout handling 