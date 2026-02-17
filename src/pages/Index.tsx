import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { CartDrawer } from "@/components/CartDrawer";
import { TestimonialCard } from "@/components/TestimonialCard";
import { Sparkles, Truck, Shield, Star } from "lucide-react";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import heroImage from "@/assets/hero-fragrance.jpg";
import logoMain from "@/assets/logo-main.jpg";
import oudProsperityImg from "@/assets/oud-prosperity-new.png";
import richesRevealedImg from "@/assets/riches-revealed-new.png";
import originalQualityImg from "@/assets/original-quality-new.png";
import diplomaticEditionImg from "@/assets/diplomatic-edition-new.png";
import discoveryBlackImg from "@/assets/discovery-set-black.png";
import discoveryWhiteImg from "@/assets/discovery-set-white.png";
import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";
import customer3 from "@/assets/customer-3.jpg";
import customer4 from "@/assets/customer-4.jpg";
import customer5 from "@/assets/customer-5.jpg";
import customer6 from "@/assets/customer-6.jpg";
import customer7 from "@/assets/customer-7.jpg";
import customer8 from "@/assets/customer-8.jpg";

// Local image overrides by product title keyword
const IMAGE_OVERRIDES: Record<string, string> = {
  'oud prosperity': oudProsperityImg,
  'riches revealed': richesRevealedImg,
  'original quality': originalQualityImg,
  'diplomatic edition': diplomaticEditionImg,
};

function getProductImage(product: ShopifyProduct): string {
  const title = product.node.title.toLowerCase();
  for (const [key, img] of Object.entries(IMAGE_OVERRIDES)) {
    if (title.includes(key)) return img;
  }
  return product.node.images.edges[0]?.node.url || '';
}

// Static discovery set products
const discoverySetProducts: ShopifyProduct[] = [
  {
    node: {
      id: 'discovery-black',
      title: 'Discovery Set (4x 5ml) Black Edition',
      description: 'Sample all 4 signature scents in sleek black packaging. Perfect for trying before committing.',
      handle: 'discovery-set-black',
      productType: 'Discovery Set',
      priceRange: { minVariantPrice: { amount: '55.00', currencyCode: 'USD' } },
      images: { edges: [{ node: { url: discoveryBlackImg, altText: 'Discovery Set Black Edition' } }] },
      variants: { edges: [{ node: { id: 'discovery-black-variant', title: 'Default', price: { amount: '55.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [] } }] },
      options: [],
    },
  },
  {
    node: {
      id: 'discovery-white',
      title: 'Discovery Set (4x 5ml) White Edition',
      description: 'Sample all 4 signature scents in clean white packaging. The perfect introduction to Hustlers Scent.',
      handle: 'discovery-set-white',
      productType: 'Discovery Set',
      priceRange: { minVariantPrice: { amount: '55.00', currencyCode: 'USD' } },
      images: { edges: [{ node: { url: discoveryWhiteImg, altText: 'Discovery Set White Edition' } }] },
      variants: { edges: [{ node: { id: 'discovery-white-variant', title: 'Default', price: { amount: '55.00', currencyCode: 'USD' }, availableForSale: true, selectedOptions: [] } }] },
      options: [],
    },
  },
];

const Index = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const fetchedProducts = await fetchProducts(20);
      setProducts(fetchedProducts);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-primary/30 shadow-2xl shadow-primary/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-primary to-secondary opacity-60 blur-2xl group-hover:opacity-100 transition-all duration-500 rounded-full" />
            <div className="absolute -inset-2 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300 rounded-full" />
            <img 
              src={logoMain} 
              alt="Hustlers Scent" 
              className="h-20 w-auto relative z-10 drop-shadow-[0_0_20px_hsl(40_40%_75%/0.8)] group-hover:drop-shadow-[0_0_35px_hsl(40_40%_75%/1)] transition-all duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-4">
            <CartDrawer />
            <Button variant="hero" size="lg">
              Order Online
            </Button>
          </div>
        </div>
      </nav>

      {/* Category Navigation */}
      <div className="fixed top-[88px] left-0 right-0 z-40 bg-background/98 backdrop-blur-xl border-b border-primary/30 shadow-lg">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-12 py-4">
            <a 
              href="#bundles" 
              className="text-base font-bold text-foreground hover:text-primary transition-all uppercase tracking-widest hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('bundles')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discovery Sets
            </a>
            <span className="text-primary text-xl">•</span>
            <a 
              href="#fragrances" 
              className="text-base font-bold text-foreground hover:text-primary transition-all uppercase tracking-widest hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('fragrances')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Fragrances
            </a>
            <span className="text-primary text-xl">•</span>
            <a 
              href="#reviews" 
              className="text-base font-bold text-foreground hover:text-primary transition-all uppercase tracking-widest hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Reviews
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Logo Showcase */}
            <div className="relative inline-block animate-in fade-in duration-1000">
              <div className="absolute -inset-8 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 blur-3xl rounded-full animate-pulse" />
              <div className="absolute -inset-4 bg-primary/40 blur-2xl rounded-full" />
              <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-primary/30 rounded-3xl p-8 shadow-2xl shadow-primary/20">
                <img 
                  src={logoMain} 
                  alt="Hustlers Scent" 
                  className="h-32 md:h-40 lg:h-48 w-auto mx-auto drop-shadow-[0_0_30px_hsl(40_40%_75%/0.8)] hover:drop-shadow-[0_0_50px_hsl(40_40%_75%/1)] transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: '200ms' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                FOR THE
                <br />
              <span className="inline-block mt-2 text-5xl md:text-7xl lg:text-9xl font-bebas tracking-wider text-primary drop-shadow-[0_4px_20px_hsl(40_40%_75%/0.6)] [text-shadow:_2px_2px_8px_rgba(0,0,0,0.8),_0_0_40px_hsl(40_40%_75%/0.4)]">
                HUSTLER$
              </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-foreground font-semibold max-w-3xl mx-auto leading-relaxed">
                Smell Like Success. Dress Like a Boss.
                <br />
                <span className="text-muted-foreground font-normal text-base md:text-lg mt-3 block">
                  Premium fragrance oils and exclusive apparel for those who grind hard and win harder.
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in duration-1000" style={{ animationDelay: '400ms' }}>
              <Button variant="hero" size="xl" className="min-w-[200px] shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all">
                Shop Now
              </Button>
              <Button variant="outline" size="xl" className="min-w-[200px] border-2 hover:border-primary/50">
                View Collection
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground animate-in fade-in duration-1000" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Sets Section */}
      <section id="bundles" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold font-bebas tracking-wider">
              DISCOVERY <span className="text-primary">SET$</span>
            </h2>
            <p className="text-xl text-muted-foreground">Try all 4 signature scents before you commit</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {discoverySetProducts.map((product) => (
              <div key={product.node.id} className="group">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 space-y-6">
            <p className="text-lg text-muted-foreground mb-4">Each discovery set includes:</p>
            <div className="flex flex-wrap justify-center gap-6 text-foreground font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl">✓</span>
                <span>4 x 5ml Fragrance Oils</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl">✓</span>
                <span>All 4 Signature Scents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">Premium quality meets unmatched service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="Premium Quality"
              description="Pure fragrance oils handcrafted with the finest ingredients"
            />
            <FeatureCard
              icon={Truck}
              title="Fast Delivery"
              description="Express shipping to your door within 2-3 business days"
            />
            <FeatureCard
              icon={Shield}
              title="Authentic Guarantee"
              description="100% genuine products with certificate of authenticity"
            />
            <FeatureCard
              icon={Star}
              title="Exclusive Scents"
              description="Limited edition fragrance oils you won't find anywhere else"
            />
          </div>
        </div>
      </section>

      {/* Fragrance Oils Section */}
      <section id="fragrances" className="py-24 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Signature Fragrance Oils</h2>
            <p className="text-xl text-muted-foreground">Discover our premium scents</p>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Loading products...</p>
            </div>
          ) : (
            (() => {
              const fragrances = products.filter(p => p.node.productType === 'Fragrance Oil');
              return fragrances.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">No fragrances found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {fragrances.map((product) => (
                    <ProductCard 
                      key={product.node.id} 
                      product={product} 
                      isBestSeller={product.node.title.toLowerCase().includes('original quality')}
                      imageOverride={getProductImage(product)}
                    />
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </section>


      {/* Testimonials Section */}
      <section id="reviews" className="py-24 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Real people, real results, real hustle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TestimonialCard
              image={customer1}
              name=""
              review="These oils are amazing! I get compliments everywhere I go. Oud Prosperity is my signature scent now."
            />
            <TestimonialCard
              image={customer2}
              name=""
              review="Quality is unmatched. Been using Hustlers Scent for months and nothing compares. Worth every penny!"
            />
            <TestimonialCard
              image={customer3}
              name=""
              review="We bought the whole collection for our shop! Our customers absolutely love the scents. Best fragrance oils in the game."
            />
            <TestimonialCard
              image={customer4}
              name=""
              review="Riches Revealed lives up to its name. The scent lasts all day and I always get asked what I'm wearing."
            />
            <TestimonialCard
              image={customer5}
              name=""
              review="Original Quality is my go-to. Bold, powerful, and makes a statement. This is what success smells like!"
            />
            <TestimonialCard
              image={customer6}
              name=""
              review="Been searching for the perfect oil and finally found it. Diplomatic Edition is smooth and sophisticated."
            />
            <TestimonialCard
              image={customer7}
              name=""
              review="Love these oils! They smell divine and last so much longer than anything else I've tried. Highly recommend!"
            />
            <TestimonialCard
              image={customer8}
              name=""
              review="The quality is incredible and the scents are unique. I've converted all my friends to Hustlers Scent!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">Ready to Elevate Your Presence?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who have discovered their signature oil
            </p>
            <Button variant="hero" size="xl">
              Order Online Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-background to-muted/50 border-t border-primary/20 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="relative group inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-40 blur-2xl group-hover:opacity-60 transition-opacity" />
                <img 
                  src={logoMain} 
                  alt="Hustlers Scent" 
                  className="h-24 w-auto relative z-10 drop-shadow-[0_0_20px_hsl(40_40%_75%/0.6)] group-hover:drop-shadow-[0_0_30px_hsl(40_40%_75%/0.9)] transition-all duration-300"
                />
              </div>
              <p className="text-muted-foreground text-lg">Luxury fragrance oils & apparel for the modern hustler</p>
            </div>
            <Button variant="hero" size="lg" className="shadow-xl shadow-primary/25">
              Order Online
            </Button>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-muted-foreground">
            <p>© 2024 Hustlers Scent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
