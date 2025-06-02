
import { Shield, Lock, CheckCircle, CreditCard, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const SecurePayments = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: '256-bit SSL Encryption',
      description: 'Bank-level security for all transactions'
    },
    {
      icon: Shield,
      title: 'PCI DSS Compliant',
      description: 'Meeting the highest security standards'
    },
    {
      icon: CheckCircle,
      title: 'Fraud Protection',
      description: 'AI-powered fraud detection system'
    },
    {
      icon: Award,
      title: 'Money Back Guarantee',
      description: '30-day refund policy'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', logo: '/visa.svg' },
    { name: 'Mastercard', logo: '/mastercard.svg' },
    { name: 'American Express', logo: '/amex.svg' },
    { name: 'PayPal', logo: '/paypal.svg' },
    { name: 'Apple Pay', logo: '/apple-pay.svg' },
    { name: 'Google Pay', logo: '/google-pay.svg' }
  ];

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-4 animate-glow">
            <Shield className="w-6 h-6 text-white" />
          </div>
          Secure Payments
          <Badge className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500">
            Protected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Security Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground">Security Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg glass">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground">Accepted Payment Methods</h4>
            <div className="grid grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="aspect-video glass p-3 rounded-lg flex items-center justify-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <CreditCard className="w-6 h-6 mx-auto mb-1 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-xs font-medium">{method.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-muted-foreground">Trust & Compliance</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                PCI Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                SSL Secured
              </Badge>
              <Badge variant="outline" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified Merchant
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Award className="w-3 h-3 mr-1" />
                A+ Rating
              </Badge>
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            Learn More About Security
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurePayments;
