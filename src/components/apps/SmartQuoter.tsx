import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, Product, CustomerType } from '../../data/productData';

interface CartItem {
  product: Product;
  quantity: number;
}

const SmartQuoter: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerType, setCustomerType] = useState<CustomerType>('retail');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.keywords.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setShowQuoteBuilder(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getPrice = (product: Product, type: CustomerType): number => {
    return product.pricing[type];
  };

  const calculateTotal = (): number => {
    return cart.reduce((sum, item) => {
      const price = getPrice(item.product, customerType);
      return sum + price * item.quantity;
    }, 0);
  };

  const generateEmailQuote = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = calculateTotal();
    const customerTypeLabel =
      customerType === 'retail'
        ? 'List Price'
        : customerType === 'corporate'
        ? 'Corporate'
        : 'Student/Military';

    let quoteText = `GRASTON TECHNIQUE® PROFESSIONAL QUOTE
Leader in Instrument-Assisted Soft Tissue Mobilization (IASTM)
=====================================

Date: ${new Date().toLocaleDateString()}
Customer Type: ${customerTypeLabel}

QUOTE DETAILS:
--------------
`;

    cart.forEach((item) => {
      const price = getPrice(item.product, customerType);
      const itemTotal = price * item.quantity;
      quoteText += `${item.quantity}x ${item.product.name} - $${itemTotal.toLocaleString()}\n`;
    });

    quoteText += `\nTOTAL: $${total.toLocaleString()}\n`;

    quoteText += `
NEXT STEPS:
-----------
• Review this quote and let me know if you have any questions
• Payment plans available for qualifying purchases ($500 deposit + monthly payments)
• Training schedules and locations available at grastontechnique.com
• Ready to proceed? Reply to confirm your order

Thank you for choosing Graston Technique® - The Leader in IASTM!

© 2025 Graston Technique, LLC. All rights reserved.
`;

    const subject = `Graston Technique® Quote - ${new Date().toLocaleDateString()}`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteText)}`;

    window.location.href = mailtoLink;
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brand-dark text-white rounded-2xl p-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">🚀 Smart Sales & Pricing Tool</h1>
        <p className="text-brand-muted">
          Find pricing fast • Build quotes instantly • Close deals
        </p>
      </motion.div>

      {/* Controls */}
      <div className="bg-brand-surface rounded-xl p-6 space-y-4 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, training, instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value as CustomerType)}
            className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="retail">List Price</option>
            <option value="corporate">Corporate</option>
            <option value="student">Student/Military</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="all">All Categories</option>
            <option value="training">Training</option>
            <option value="instruments">Instruments</option>
            <option value="bundles">Bundles</option>
            <option value="memberships">Memberships</option>
          </select>
        </div>
      </div>

      {/* Quote Builder Sidebar */}
      <AnimatePresence>
        {showQuoteBuilder && cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-brand-teal text-white rounded-xl p-6 sticky top-4 z-10"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-semibold">{totalItems} items selected</span> |{' '}
                <span className="font-bold">Total: ${calculateTotal().toLocaleString()}</span>
              </div>
              <button
                onClick={() => setShowQuoteBuilder(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={generateEmailQuote}
                className="px-4 py-2 bg-white text-brand-teal font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                📧 Email Quote
              </button>
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                🗑️ Clear All
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-brand-dark">⭐ BEST SELLERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const price = getPrice(product, customerType);
            const inCart = cart.find((item) => item.product.id === product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className={`bg-brand-surface rounded-xl p-6 border-2 transition-all ${
                  inCart
                    ? 'border-brand-teal bg-brand-teal/5'
                    : 'border-transparent hover:border-brand-teal/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-brand-dark flex-1">
                    {product.name}
                  </h3>
                  <div className="flex gap-2">
                    {product.bestSeller && (
                      <span className="px-2 py-1 bg-brand-teal text-white text-xs font-bold rounded">
                        BEST SELLER
                      </span>
                    )}
                    {product.financing && (
                      <span className="px-2 py-1 bg-brand-orange text-white text-xs font-bold rounded">
                        FINANCING
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {customerType === 'retail'
                        ? 'List Price:'
                        : customerType === 'corporate'
                        ? 'Corporate:'
                        : 'Student/Military:'}
                    </span>
                    <span className="text-lg font-bold text-brand-teal">
                      ${price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {product.savings && (
                  <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-semibold mb-4">
                    {product.savings}
                  </div>
                )}

                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal/90 transition-colors"
                >
                  {inCart ? `✓ Added (${inCart.quantity})` : 'Add to Quote'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cart Details Modal (if needed for full cart view) */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 bg-white rounded-xl shadow-2xl p-6 max-w-md border border-gray-200 z-50"
        >
          <h3 className="font-bold text-brand-dark mb-4">Quote Summary</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-medium text-sm">{item.product.name}</div>
                  <div className="text-xs text-gray-500">
                    ${getPrice(item.product, customerType).toLocaleString()} × {item.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Total:</span>
              <span className="font-bold text-xl text-brand-teal">
                ${calculateTotal().toLocaleString()}
              </span>
            </div>
            <button
              onClick={generateEmailQuote}
              className="w-full px-4 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal/90 transition-colors"
            >
              📧 Generate Email Quote
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartQuoter;

