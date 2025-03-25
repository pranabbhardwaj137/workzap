
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Briefcase, User } from 'lucide-react';

const Signup = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultType = queryParams.get('type') === 'recruiter' ? 'recruiter' : 'worker';
  
  const [userType, setUserType] = useState(defaultType);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-200 mx-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join WorkZap and start connecting</p>
          </div>
          
          <form className="space-y-6">
            <div>
              <Label className="mb-2 block">I want to:</Label>
              <RadioGroup 
                value={userType} 
                onValueChange={setUserType}
                className="grid grid-cols-2 gap-4"
              >
                <div 
                  className={`border rounded-lg p-4 flex flex-col items-center transition-all cursor-pointer ${
                    userType === 'worker' 
                      ? 'border-workzap-blue bg-workzap-light-blue' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('worker')}
                >
                  <RadioGroupItem value="worker" id="worker" className="sr-only" />
                  <User className={`h-6 w-6 ${userType === 'worker' ? 'text-workzap-blue' : 'text-gray-500'}`} />
                  <Label 
                    htmlFor="worker" 
                    className={`mt-2 cursor-pointer ${userType === 'worker' ? 'text-workzap-blue' : 'text-gray-700'}`}
                  >
                    Find Work
                  </Label>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex flex-col items-center transition-all cursor-pointer ${
                    userType === 'recruiter' 
                      ? 'border-workzap-blue bg-workzap-light-blue' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setUserType('recruiter')}
                >
                  <RadioGroupItem value="recruiter" id="recruiter" className="sr-only" />
                  <Briefcase className={`h-6 w-6 ${userType === 'recruiter' ? 'text-workzap-blue' : 'text-gray-500'}`} />
                  <Label 
                    htmlFor="recruiter" 
                    className={`mt-2 cursor-pointer ${userType === 'recruiter' ? 'text-workzap-blue' : 'text-gray-700'}`}
                  >
                    Hire Talent
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="First name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Last name" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters and include a number and a symbol.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, State" />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-workzap-blue hover:bg-workzap-blue/90"
            >
              Create Account
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-workzap-blue hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
