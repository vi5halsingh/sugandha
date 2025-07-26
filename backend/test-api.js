const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testProduct = {
  name: 'Test Honey',
  description: 'Test honey product for testing',
  category: 'honey',
  price: 100,
  weight: 1,
  weightUnit: 'kg',
  stock: 10
};

let authToken = '';

// Test functions
const testHealthCheck = async () => {
  try {
    const response = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return false;
  }
};

const testUserRegistration = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ User registration passed:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ User registration failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testUserLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    authToken = response.data.token;
    console.log('✅ User login passed:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ User login failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Get products passed:', `Found ${response.data.count} products`);
    return true;
  } catch (error) {
    console.log('❌ Get products failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testCreateProduct = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, testProduct, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    console.log('✅ Create product passed:', response.data.message);
    return response.data.data._id;
  } catch (error) {
    console.log('❌ Create product failed:', error.response?.data?.message || error.message);
    return null;
  }
};

const testGetUserProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    console.log('✅ Get user profile passed:', response.data.user.name);
    return true;
  } catch (error) {
    console.log('❌ Get user profile failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testContactForm = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/contact`, {
      name: 'Test Contact',
      email: 'contact@test.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    });
    console.log('✅ Contact form passed:', response.data.message);
    return true;
  } catch (error) {
    console.log('❌ Contact form failed:', error.response?.data?.message || error.message);
    return false;
  }
};

// Run all tests
const runTests = async () => {
  console.log('🧪 Starting API Tests...\n');

  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'User Registration', fn: testUserRegistration },
    { name: 'User Login', fn: testUserLogin },
    { name: 'Get Products', fn: testGetProducts },
    { name: 'Create Product', fn: testCreateProduct },
    { name: 'Get User Profile', fn: testGetUserProfile },
    { name: 'Contact Form', fn: testContactForm }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n🔍 Testing: ${test.name}`);
    const result = await test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 All tests passed! The API is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the server and try again.');
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get('http://localhost:5000/health');
    return true;
  } catch (error) {
    return false;
  }
};

// Main execution
const main = async () => {
  console.log('🚀 Sherry Honey API Test Suite\n');
  
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   npm run dev');
    return;
  }

  await runTests();
};

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testHealthCheck,
  testUserRegistration,
  testUserLogin,
  testGetProducts,
  testCreateProduct,
  testGetUserProfile,
  testContactForm
}; 