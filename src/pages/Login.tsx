
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm border border-gray-200 mx-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
            <p className="text-gray-600 mt-2">Sign in to your WorkZap account</p>
          </div>
          
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-workzap-blue hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label 
                htmlFor="remember" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-workzap-blue hover:bg-workzap-blue/90"
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-workzap-blue hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
