
import Header from '@/components/Header';
import AIRecommendations from '@/components/AIRecommendations';
import InstantSearch from '@/components/InstantSearch';
import SecurePayments from '@/components/SecurePayments';

const Features = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Powerful Features</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of e-commerce with AI-powered recommendations, 
              instant search capabilities, and bank-level security.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 mb-12">
            <AIRecommendations />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <InstantSearch />
            <SecurePayments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
