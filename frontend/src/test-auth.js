// Test authentication API endpoints
const testAuth = async () => {
  const baseURL = 'http://localhost:5000';
  
  try {
    // Test health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await fetch(`${baseURL}/health`);
    const healthData = await healthResponse.json();
    console.log('Health check:', healthData);

    // Test registration endpoint
    console.log('\nTesting registration endpoint...');
    const registerResponse = await fetch(`${baseURL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '1234567890',
        address: 'Test Address'
      }),
    });
    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);

    // Test login endpoint
    console.log('\nTesting login endpoint...');
    const loginResponse = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
    });
    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

  } catch (error) {
    console.error('Error testing auth endpoints:', error);
  }
};

// Run the test
testAuth(); 