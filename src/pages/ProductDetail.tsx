import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu, X, Star, Coffee, Truck, Shield, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { coffeeBlends } from '../data/coffeeBlends';
import CryptoTicker from '../components/CryptoTicker';
import EventBookingModal from '../components/EventBookingModal';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState('whole-bean');
  const [selectedSize, setSelectedSize] = useState('12oz');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const product = coffeeBlends.find(blend => blend.id === Number(id));

  const menuItems = [
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Subscribe', path: '/subscribe' },
    { name: 'Rewards', path: '/rewards' },
    { name: 'Brew Paper', path: '/brew-paper' },
    { name: 'Event Booking', action: () => setIsEventModalOpen(true) },
  ];

  const grindOptions = [
    { value: 'whole-bean', label: 'Whole Bean', description: 'For maximum freshness' },
    { value: 'coarse', label: 'Coarse Grind', description: 'French Press, Cold Brew' },
    { value: 'medium', label: 'Medium Grind', description: 'Drip Coffee, Pour Over' },
    { value: 'fine', label: 'Fine Grind', description: 'Espresso, Moka Pot' },
  ];

  const sizeOptions = [
    { value: '12oz', label: '12oz Bag', price: product?.price || 24.99 },
    { value: '2lb', label: '2lb Bag', price: (product?.price || 24.99) * 2.5 },
    { value: '5lb', label: '5lb Bag', price: (product?.price || 24.99) * 5.5 },
  ];

  if (!product) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-amber-500 hover:text-amber-400"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = sizeOptions.find(size => size.value === selectedSize)?.price || product.price;

  const handlePreOrder = () => {
    console.log('Pre-order placed:', { product, quantity, selectedGrind, selectedSize });
    alert('Thank you for your pre-order! We\'ll contact you when your coffee is ready to ship.');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen animated-bg">
      {/* Shipping Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-green to-steel-blue py-2 sm:py-3">
        <div className="text-center">
          <p className="text-[#F5E6D3] font-semibold text-xs sm:text-sm md:text-base px-4">
            FREE SHIPPING on orders over $50 | $5 Flat Rate on all other orders | 10% discount on all $USDC
          </p>
        </div>
      </div>

      {/* Crypto Ticker */}
      <CryptoTicker />

      <div className="container mx-auto container-responsive spacing-responsive">
        {/* Navigation */}
        <div className="absolute top-12 sm:top-16 right-4 sm:right-6 z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-steel-blue/90 text-luxe-cream hover:bg-steel-blue hover:text-gold transition-colors p-2 rounded-lg border border-emerald-green/30"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-0 top-16 sm:top-20 bg-steel-blue/90 backdrop-filter backdrop-blur-8 border border-emerald-green/30 rounded-2xl py-2 min-w-[180px] sm:min-w-[200px] shadow-lg"
            >
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      navigate(item.path);
                    }
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-luxe-cream hover:text-gold hover:bg-steel-blue/60 transition-colors text-sm sm:text-base"
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-between items-start mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-[#F5E6D3] hover:text-emerald-green transition-colors"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Back to Home
          </button>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-luxe-cream/10">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[product.imageUrl, 
                  "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=600",
                  "https://images.pexels.com/photos/2159115/pexels-photo-2159115.jpeg?auto=compress&cs=tinysrgb&w=600",
                  "https://images.pexels.com/photos/2074120/pexels-photo-2074120.jpeg?auto=compress&cs=tinysrgb&w=600"
                ].map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-luxe-cream/10 cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-luxe-cream/70 text-sm">(47 reviews)</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-luxe-cream mb-2">{product.name}</h1>
                <p className="text-lg text-luxe-cream/80 mb-4">{product.origin} • Single Origin</p>
                <div className="text-3xl font-bold text-luxe-cream">${currentPrice.toFixed(2)}</div>
              </div>

              {/* Quick Description */}
              <div className="glass-card p-4 rounded-xl">
                <p className="text-luxe-cream/90 leading-relaxed">
                  {product.description} This exceptional single-origin coffee represents the pinnacle of Web3 coffee culture, 
                  where traditional craftsmanship meets blockchain innovation.
                </p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-luxe-cream mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {sizeOptions.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        selectedSize === size.value
                          ? 'border-emerald-green bg-emerald-green/20 text-luxe-cream'
                          : 'border-luxe-cream/30 text-luxe-cream/70 hover:border-emerald-green/50'
                      }`}
                    >
                      <div className="font-medium">{size.label}</div>
                      <div className="text-sm">${size.price.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selection */}
              <div>
                <h3 className="text-lg font-semibold text-luxe-cream mb-3">Grind</h3>
                <div className="space-y-2">
                  {grindOptions.map((grind) => (
                    <button
                      key={grind.value}
                      onClick={() => setSelectedGrind(grind.value)}
                      className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                        selectedGrind === grind.value
                          ? 'border-emerald-green bg-emerald-green/20'
                          : 'border-luxe-cream/30 hover:border-emerald-green/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-luxe-cream">{grind.label}</div>
                          <div className="text-sm text-luxe-cream/70">{grind.description}</div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedGrind === grind.value ? 'bg-emerald-green border-emerald-green' : 'border-luxe-cream/50'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-luxe-cream mb-3">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center glass-card rounded-xl">
                      <button
                        className="w-12 h-12 rounded-l-xl bg-emerald-green/20 text-luxe-cream font-bold text-xl hover:bg-emerald-green/30 transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <span className="w-16 text-center text-xl font-bold text-luxe-cream">{quantity}</span>
                      <button
                        className="w-12 h-12 rounded-r-xl bg-emerald-green/20 text-luxe-cream font-bold text-xl hover:bg-emerald-green/30 transition-colors"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-luxe-cream/70">
                      Total: <span className="font-bold text-luxe-cream">${(currentPrice * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePreOrder}
                  className="w-full bg-gradient-to-r from-emerald-green to-emerald-green text-luxe-cream font-bold py-4 px-8 rounded-xl text-lg hover:from-emerald-green/80 hover:to-emerald-green/80 transition-all shadow-lg"
                >
                  Pre-Order Now - Ships Spring 2025
                </motion.button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <Truck className="w-6 h-6 text-emerald-green mx-auto mb-2" />
                    <div className="text-xs text-luxe-cream/70">Free Shipping</div>
                    <div className="text-xs text-luxe-cream/70">Over $50</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-emerald-green mx-auto mb-2" />
                    <div className="text-xs text-luxe-cream/70">Satisfaction</div>
                    <div className="text-xs text-luxe-cream/70">Guaranteed</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-6 h-6 text-emerald-green mx-auto mb-2" />
                    <div className="text-xs text-luxe-cream/70">Premium</div>
                    <div className="text-xs text-luxe-cream/70">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Details Sections */}
          <div className="mt-12 lg:mt-16 space-y-4">
            {/* Description */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('description')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-luxe-cream/5 transition-colors"
              >
                <h2 className="text-xl font-bold text-luxe-cream">Description</h2>
                {expandedSection === 'description' ? (
                  <ChevronUp className="w-5 h-5 text-luxe-cream" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luxe-cream" />
                )}
              </button>
              {expandedSection === 'description' && (
                <div className="px-6 pb-6 space-y-4 text-luxe-cream/90">
                  <p>{product.detailedDescription || `Our ${product.name} represents the perfect fusion of traditional coffee craftsmanship and Web3 innovation. Sourced directly from premium farms in ${product.origin}, each bean is carefully selected and roasted to unlock its full potential.`}</p>
                  <p>
                    This exceptional single-origin coffee delivers a complex flavor profile that evolves with each sip, 
                    making it the perfect companion for your crypto trading sessions, blockchain development work, or 
                    simply enjoying a moment of clarity in the fast-paced digital world.
                  </p>
                  <p>
                    Every bag comes with exclusive access to our Coffee & Crypto community, where you can connect with 
                    like-minded individuals who share your passion for quality coffee and cutting-edge technology.
                  </p>
                </div>
              )}
            </div>

            {/* Tasting Notes */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('tasting')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-luxe-cream/5 transition-colors"
              >
                <h2 className="text-xl font-bold text-luxe-cream">Tasting Notes & Profile</h2>
                {expandedSection === 'tasting' ? (
                  <ChevronUp className="w-5 h-5 text-luxe-cream" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luxe-cream" />
                )}
              </button>
              {expandedSection === 'tasting' && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-luxe-cream mb-3">Flavor Profile</h3>
                      <ul className="space-y-2 text-luxe-cream/90">
                        {product.tastingNotes ? product.tastingNotes.map((note, idx) => (
                          <li key={idx}>• {note}</li>
                        )) : (
                          <>
                            <li>• Rich, full-bodied with excellent balance</li>
                            <li>• Notes of dark chocolate and bergamot</li>
                            <li>• Subtle hints of natural fruit sweetness</li>
                            <li>• Clean, lingering finish</li>
                            <li>• Complex aroma with floral undertones</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxe-cream mb-3">Coffee Details</h3>
                      <div className="space-y-2 text-luxe-cream/90">
                        <div className="flex justify-between">
                          <span>Origin:</span>
                          <span className="font-medium">{product.origin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Process:</span>
                          <span className="font-medium">{product.process || 'Washed'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Altitude:</span>
                          <span className="font-medium">{product.altitude || '1,800-2,100m'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Roast Level:</span>
                          <span className="font-medium">{product.roastLevel || 'Medium'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Acidity:</span>
                          <span className="font-medium">{product.acidity || 'Bright'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Body:</span>
                          <span className="font-medium">{product.body || 'Full'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Brewing Guide */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('brewing')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-luxe-cream/5 transition-colors"
              >
                <h2 className="text-xl font-bold text-luxe-cream">Brewing Guide</h2>
                {expandedSection === 'brewing' ? (
                  <ChevronUp className="w-5 h-5 text-luxe-cream" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luxe-cream" />
                )}
              </button>
              {expandedSection === 'brewing' && (
                <div className="px-6 pb-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-luxe-cream mb-3 flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Pour Over Method
                      </h3>
                      <ul className="space-y-2 text-luxe-cream/90 text-sm">
                        <li>• Coffee to water ratio: {product.brewingTips?.pourOver.ratio || '1:16'}</li>
                        <li>• Water temperature: {product.brewingTips?.pourOver.temperature || '200-205°F'}</li>
                        <li>• Grind size: {product.brewingTips?.pourOver.grindSize || 'Medium'}</li>
                        <li>• Bloom for {product.brewingTips?.pourOver.bloomTime || '30 seconds'}</li>
                        <li>• Total brew time: {product.brewingTips?.pourOver.totalTime || '3-4 minutes'}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-luxe-cream mb-3 flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        French Press Method
                      </h3>
                      <ul className="space-y-2 text-luxe-cream/90 text-sm">
                        <li>• Coffee to water ratio: {product.brewingTips?.frenchPress.ratio || '1:12'}</li>
                        <li>• Water temperature: {product.brewingTips?.frenchPress.temperature || '200°F'}</li>
                        <li>• Grind size: {product.brewingTips?.frenchPress.grindSize || 'Coarse'}</li>
                        <li>• Steep time: {product.brewingTips?.frenchPress.steepTime || '4 minutes'}</li>
                        <li>• Press slowly and serve</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-emerald-green/10 border border-emerald-green/20 rounded-xl">
                    <p className="text-luxe-cream/90 text-sm">
                      <strong>Pro Tip:</strong> For the ultimate Web3 coffee experience, use filtered water and grind your beans 
                      just before brewing. The fresher the grind, the more complex flavors you'll unlock - just like discovering 
                      new opportunities in the crypto market.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSection('shipping')}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-luxe-cream/5 transition-colors"
              >
                <h2 className="text-xl font-bold text-luxe-cream">Shipping & Returns</h2>
                {expandedSection === 'shipping' ? (
                  <ChevronUp className="w-5 h-5 text-luxe-cream" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luxe-cream" />
                )}
              </button>
              {expandedSection === 'shipping' && (
                <div className="px-6 pb-6 space-y-4 text-luxe-cream/90">
                  <div>
                    <h3 className="font-semibold text-luxe-cream mb-2">Shipping Information</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Free shipping on orders over $50</li>
                      <li>• $5 flat rate shipping on all other orders</li>
                      <li>• 10% discount when paying with USDC</li>
                      <li>• Pre-orders ship Spring 2025</li>
                      <li>• Tracking information provided via email</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-luxe-cream mb-2">Returns & Exchanges</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• 30-day return policy on unopened bags</li>
                      <li>• Satisfaction guarantee on all orders</li>
                      <li>• Easy returns process</li>
                      <li>• Store credit or full refund available</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Web3 Benefits Section */}
          <div className="mt-12 lg:mt-16 glass-card p-8 rounded-2xl text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-luxe-cream mb-6">Unlock Web3 Coffee Benefits</h2>
            <p className="text-luxe-cream/90 mb-8 max-w-2xl mx-auto">
              Every purchase includes exclusive access to our Coffee & Crypto ecosystem, where premium coffee meets blockchain innovation.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🪙</span>
                </div>
                <h3 className="font-semibold text-luxe-cream mb-2">Earn $BREW</h3>
                <p className="text-sm text-luxe-cream/70">Earn tokens with every purchase for exclusive rewards and discounts</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold text-luxe-cream mb-2">NFT Rewards</h3>
                <p className="text-sm text-luxe-cream/70">Collect unique Coffee & Crypto NFTs with special perks and utilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="font-semibold text-luxe-cream mb-2">Community Access</h3>
                <p className="text-sm text-luxe-cream/70">Join our exclusive Discord for crypto insights and coffee culture</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-steel-blue/90 border-t border-emerald-green/20 mt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand Column */}
              <div className="space-y-6">
                <img 
                  src="/Transparent Background Coffee and Crypto Coffee Co (high Res).png" 
                  alt="Coffee & Crypto Coffee Co." 
                  className="w-40 sm:w-48 md:w-56 h-auto"
                />
                <p className="text-luxe-cream/70 text-sm leading-relaxed">
                  Where blockchain meets exceptional coffee. Crafted for the ambitious and forward-thinking.
                </p>
              </div>

              {/* Coffee & Shop */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Coffee & Shop</h3>
                <ul className="space-y-3">
                  <li><a href="/shop" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Shop Coffee</a></li>
                  <li><a href="/merch" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Shop Merch</a></li>
                  <li><a href="/gift-cards" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Gift Cards</a></li>
                  <li><a href="/locations" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Cafe Locations</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Support</h3>
                <ul className="space-y-3">
                  <li><a href="/contact" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Contact Us</a></li>
                  <li><a href="/about" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">About Us</a></li>
                  <li><a href="/terms" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Terms of Service</a></li>
                  <li><a href="/refund-policy" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Refund Policy</a></li>
                </ul>
              </div>

              {/* Account & Community */}
              <div>
                <h3 className="text-[#F5E6D3] font-bold text-lg mb-4">Account & Community</h3>
                <ul className="space-y-3">
                  <li><a href="/login" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Account Login</a></li>
                  <li><a href="https://discord.gg/gaBCj5XYgb" target="_blank" rel="noopener noreferrer" className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] transition-colors">Join Our Discord</a></li>
                </ul>
                
                {/* Community Message */}
                <div className="mt-6 p-4 glass-card rounded-xl">
                  <p className="text-[#F5E6D3]/80 text-sm leading-relaxed">
                    Make friends, ask questions, drink coffee and share your story.
                  </p>
                </div>
              </div>
            </div>

            {/* Hashtag Section */}
            <div className="text-center py-8 border-t border-emerald-green/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gold via-emerald-green to-gold bg-clip-text text-transparent mb-2">
                  #SipAndSucceed
                </h2>
                <p className="text-[#F5E6D3]/60 text-sm">
                  Join the movement. Share your journey.
                </p>
              </motion.div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-8 border-t border-emerald-green/20 text-center">
              <p className="text-[#F5E6D3]/50 text-sm">
                © 2025 Coffee & Crypto Coffee Co. All rights reserved. | Powered by blockchain innovation.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Event Booking Modal */}
      <EventBookingModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
      />
    </div>
  );
}

export default ProductDetail;