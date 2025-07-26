const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sherry_honey_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@sherryhoney.com',
    password: 'admin123',
    role: 'admin',
    isVerified: true,
    phone: '9876543210',
    address: {
      street: 'Admin Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    }
  },
  {
    name: 'Vendor User',
    email: 'vendor@sherryhoney.com',
    password: 'vendor123',
    role: 'vendor',
    isVerified: true,
    phone: '9876543211',
    address: {
      street: 'Vendor Street',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001'
    }
  },
  {
    name: 'Test Customer',
    email: 'customer@sherryhoney.com',
    password: 'customer123',
    role: 'user',
    isVerified: true,
    phone: '9876543212',
    address: {
      street: 'Customer Street',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001'
    }
  }
];

const products = [
  {
    name: 'Pure Wildflower Honey',
    description: 'Natural wildflower honey harvested from the pristine Himalayan region. Rich in antioxidants and natural enzymes.',
    shortDescription: 'Pure and natural wildflower honey from Himalayas',
    category: 'honey',
    subcategory: 'wildflower',
    price: 450,
    originalPrice: 500,
    weight: 1,
    weightUnit: 'kg',
    stock: 100,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
        alt: 'Wildflower Honey',
        isPrimary: true
      }
    ],
    features: [
      {
        title: '100% Natural',
        description: 'Pure honey without any additives or preservatives'
      },
      {
        title: 'Rich in Antioxidants',
        description: 'Contains natural antioxidants for better health'
      },
      {
        title: 'Himalayan Source',
        description: 'Harvested from pristine Himalayan region'
      }
    ],
    specifications: {
      origin: 'Himalayan Region',
      purity: 100,
      color: 'Golden Amber',
      texture: 'Smooth and Creamy',
      taste: 'Sweet with floral notes',
      nutritionalInfo: {
        calories: 304,
        protein: 0.3,
        carbs: 82.4,
        fat: 0,
        fiber: 0.2
      }
    },
    tags: ['natural', 'organic', 'himalayan', 'wildflower'],
    isOrganic: true,
    isFeatured: true,
    rating: 4.8,
    numReviews: 25
  },
  {
    name: 'Premium Manuka Honey',
    description: 'Premium grade Manuka honey with high MGO content. Known for its exceptional antibacterial properties.',
    shortDescription: 'Premium Manuka honey with high MGO content',
    category: 'honey',
    subcategory: 'manuka',
    price: 1200,
    originalPrice: 1500,
    weight: 0.5,
    weightUnit: 'kg',
    stock: 50,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
        alt: 'Manuka Honey',
        isPrimary: true
      }
    ],
    features: [
      {
        title: 'High MGO Content',
        description: 'Contains high levels of Methylglyoxal for enhanced benefits'
      },
      {
        title: 'Antibacterial Properties',
        description: 'Natural antibacterial and antimicrobial properties'
      },
      {
        title: 'Premium Grade',
        description: 'Highest quality Manuka honey available'
      }
    ],
    specifications: {
      origin: 'New Zealand',
      purity: 100,
      color: 'Dark Amber',
      texture: 'Thick and Rich',
      taste: 'Strong and Distinctive',
      nutritionalInfo: {
        calories: 304,
        protein: 0.3,
        carbs: 82.4,
        fat: 0,
        fiber: 0.2
      }
    },
    tags: ['manuka', 'premium', 'antibacterial', 'new-zealand'],
    isOrganic: true,
    isFeatured: true,
    rating: 4.9,
    numReviews: 15
  },
  {
    name: 'Organic Acacia Honey',
    description: 'Light and mild acacia honey with a delicate floral taste. Perfect for tea and light desserts.',
    shortDescription: 'Light and mild organic acacia honey',
    category: 'honey',
    subcategory: 'acacia',
    price: 350,
    originalPrice: 400,
    weight: 1,
    weightUnit: 'kg',
    stock: 75,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
        alt: 'Acacia Honey',
        isPrimary: true
      }
    ],
    features: [
      {
        title: 'Light and Mild',
        description: 'Delicate flavor perfect for tea and desserts'
      },
      {
        title: 'Organic Certified',
        description: 'Certified organic by international standards'
      },
      {
        title: 'Low Glycemic Index',
        description: 'Suitable for diabetics in moderation'
      }
    ],
    specifications: {
      origin: 'India',
      purity: 100,
      color: 'Light Golden',
      texture: 'Smooth and Liquid',
      taste: 'Mild and Floral',
      nutritionalInfo: {
        calories: 304,
        protein: 0.3,
        carbs: 82.4,
        fat: 0,
        fiber: 0.2
      }
    },
    tags: ['acacia', 'organic', 'light', 'mild'],
    isOrganic: true,
    rating: 4.6,
    numReviews: 30
  },
  {
    name: 'Aged Sherry Wine',
    description: 'Premium aged sherry wine with rich flavors and complex aromas. Perfect for special occasions.',
    shortDescription: 'Premium aged sherry wine with rich flavors',
    category: 'sherry',
    price: 2500,
    originalPrice: 3000,
    weight: 0.75,
    weightUnit: 'l',
    stock: 25,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500',
        alt: 'Aged Sherry Wine',
        isPrimary: true
      }
    ],
    features: [
      {
        title: 'Aged to Perfection',
        description: 'Carefully aged for optimal flavor development'
      },
      {
        title: 'Rich Flavors',
        description: 'Complex aromas and rich, full-bodied taste'
      },
      {
        title: 'Premium Quality',
        description: 'Made from the finest grapes and traditional methods'
      }
    ],
    specifications: {
      origin: 'Spain',
      color: 'Deep Amber',
      texture: 'Full-bodied',
      taste: 'Rich and Complex',
      nutritionalInfo: {
        calories: 120,
        protein: 0,
        carbs: 4,
        fat: 0,
        fiber: 0
      }
    },
    tags: ['sherry', 'aged', 'premium', 'spain'],
    isFeatured: true,
    rating: 4.7,
    numReviews: 12
  },
  {
    name: 'Honey Gift Set',
    description: 'Beautiful gift set containing three varieties of premium honey. Perfect for gifting.',
    shortDescription: 'Premium honey gift set with three varieties',
    category: 'gift-set',
    price: 800,
    originalPrice: 1000,
    weight: 1.5,
    weightUnit: 'kg',
    stock: 40,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500',
        alt: 'Honey Gift Set',
        isPrimary: true
      }
    ],
    features: [
      {
        title: 'Three Varieties',
        description: 'Includes wildflower, acacia, and manuka honey'
      },
      {
        title: 'Beautiful Packaging',
        description: 'Elegant gift packaging perfect for presents'
      },
      {
        title: 'Great Value',
        description: 'Best value for money with premium quality'
      }
    ],
    specifications: {
      origin: 'Multiple Regions',
      color: 'Mixed',
      texture: 'Varied',
      taste: 'Multiple Flavors'
    },
    tags: ['gift-set', 'premium', 'variety', 'gift'],
    isFeatured: true,
    rating: 4.8,
    numReviews: 18
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create users
    const createdUsers = [];
    for (const userData of users) {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`Created user: ${user.name} (${user.email})`);
    }

    // Create products (assign to vendor user)
    const vendorUser = createdUsers.find(user => user.role === 'vendor');
    
    for (const productData of products) {
      const product = await Product.create({
        ...productData,
        vendor: vendorUser._id
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log('✅ Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log('✅ Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error destroying data:', error);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 