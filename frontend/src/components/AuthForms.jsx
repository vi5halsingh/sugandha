import React, { useState } from 'react';
import SplitText from '../../animated/SplitText';

const AuthForms = ({ isOpen, onClose, formType, onSwitchForm, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = formType === 'login' ? '/api/auth/login' : '/api/auth/register';
      const payload = formType === 'login' 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(formType === 'login' ? 'Login successful!' : 'Registration successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Call the callback to update parent component state
        if (onAuthSuccess) {
          onAuthSuccess(data.user);
        }
        
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50  ">
             <div className=" backdrop-blur-[10px] rounded-lg md:p-6 md:w-[80%] max-w-2xl mx-4 relative border border-white/20 m-auto  ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white text-2xl transition-colors duration-200"
        >
          ×
        </button>
        
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {formType === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          <p className="text-white/80">
            {formType === 'login' 
              ? 'Welcome back! Please login to your account.' 
              : 'Create your account to get started.'
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {formType === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-white/60"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-white/60"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-white/60"
              placeholder="Enter your password"
            />
          </div>

          {formType === 'signup' && (
            <>
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-white/60"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Address (Optional)
                </label>
                                 <textarea
                   name="address"
                   value={formData.address}
                   onChange={handleInputChange}
                   rows="2"
                   className="w-full px-3 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10 text-white placeholder-white/60"
                   placeholder="Enter your address"
                 />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600/80 backdrop-blur-sm text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? 'Processing...' : (formType === 'login' ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-white/80">
            {formType === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onSwitchForm(formType === 'login' ? 'signup' : 'login')}
              className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
            >
              {formType === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForms; 