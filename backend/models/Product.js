const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['honey', 'sherry', 'organic', 'premium', 'gift-set', 'accessories']
  },
  subcategory: {
    type: String,
    enum: ['wildflower', 'clover', 'manuka', 'acacia', 'eucalyptus', 'orange-blossom', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price must be positive']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  unit: {
    type: String,
    default: 'kg',
    enum: ['kg', 'g', 'ml', 'l', 'piece']
  },
  weight: {
    type: Number,
    required: [true, 'Please add weight/volume']
  },
  weightUnit: {
    type: String,
    default: 'kg',
    enum: ['kg', 'g', 'ml', 'l']
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  minStock: {
    type: Number,
    default: 10,
    min: [0, 'Minimum stock cannot be negative']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  features: [{
    title: String,
    description: String,
    icon: String
  }],
  specifications: {
    origin: String,
    harvestDate: Date,
    expiryDate: Date,
    purity: {
      type: Number,
      min: 0,
      max: 100
    },
    color: String,
    texture: String,
    taste: String,
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
      fiber: Number
    }
  },
  certifications: [{
    name: String,
    issuer: String,
    validUntil: Date,
    certificateUrl: String
  }],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: true
  },
  isVegan: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  barcode: String,
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    requiresSpecialHandling: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for stock status
ProductSchema.virtual('stockStatus').get(function() {
  if (this.stock === 0) return 'out-of-stock';
  if (this.stock <= this.minStock) return 'low-stock';
  return 'in-stock';
});

// Index for search
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to generate SKU if not provided
ProductSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = `SH-${this.category.toUpperCase()}-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model('Product', ProductSchema); 