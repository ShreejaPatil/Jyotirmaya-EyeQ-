import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Mail, Phone } from 'lucide-react';
import { api, setCurrentUser } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dataConsent, setDataConsent] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!dataConsent || !email) return;
    
    setIsLoading(true);
    try {
      const user = await api.auth.signup(email, phone || '', dataConsent);
      setCurrentUser(user);
      localStorage.setItem('user_onboarded', 'true');
      setLocation('/home');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <Eye className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-600">
            Welcome to jyotirmaya
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Early detection of eye conditions for healthier vision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 text-center">
                  Our AI-powered app helps detect cataracts, squint, and allergies early.
                  Simple, accessible, and designed for everyone.
                </p>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-lg"
                  data-testid="get-started-button"
                >
                  Get Started
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-base"
                      data-testid="email-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">Phone (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 text-base"
                      data-testid="phone-input"
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={dataConsent}
                    onCheckedChange={(checked) => setDataConsent(checked as boolean)}
                    className="mt-1"
                    data-testid="consent-checkbox"
                  />
                  <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                    I consent to share my data with Galaxy Hospital for appointment booking and health insights. 
                    This helps us provide better care. (GDPR/HIPAA compliant)
                  </Label>
                </div>

                <Button
                  onClick={handleSignup}
                  disabled={!dataConsent || !email || isLoading}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white text-lg disabled:opacity-50"
                  data-testid="continue-button"
                >
                  {isLoading ? 'Creating account...' : 'Continue'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
