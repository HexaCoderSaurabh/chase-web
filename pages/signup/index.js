import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Label } from "@relume_io/relume-ui";
import { toast } from 'sonner';
import { useRouter } from "next/router";
import Link from 'next/link';

const Signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout 
      title="START YOUR JOURNEY" 
      subtitle="Create an account to unlock your fitness potential"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            FULL NAME
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              data-testid="signup-name-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="pl-12 h-12 rounded-none border-2 border-zinc-200 bg-transparent focus-visible:ring-0 focus-visible:border-black transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            EMAIL
          </Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              data-testid="signup-email-input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="pl-12 h-12 rounded-none border-2 border-zinc-200 bg-transparent focus-visible:ring-0 focus-visible:border-black transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            PASSWORD
          </Label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              data-testid="signup-password-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="pl-12 h-12 rounded-none border-2 border-zinc-200 bg-transparent focus-visible:ring-0 focus-visible:border-black transition-all"
            />
          </div>
          <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="signup-submit-button"
          className="w-full h-12 rounded-none bg-black text-white hover:bg-[#ffffff] hover:text-black border-2 border-transparent hover:border-black font-bold uppercase tracking-wider text-sm transition-colors duration-300"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              CREATE ACCOUNT
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
            data-testid="login-link"
          >
            Log in
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
};

export default Signup;
