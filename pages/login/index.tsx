import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Label } from "@relume_io/relume-ui";
import { toast } from 'sonner';
import { useRouter } from "next/router";
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout 
      title="WAKE UP & WORKOUT" 
      subtitle="Log in to track your fitness journey"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
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
              data-testid="login-email-input"
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
              data-testid="login-password-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="pl-12 h-12 rounded-none border-2 border-zinc-200 bg-transparent focus-visible:ring-0 focus-visible:border-black transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Link 
            href="/forgot" 
            className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
            data-testid="forgot-password-link"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="login-submit-button"
          className="cursor-pointer w-full h-12 rounded-none bg-black text-white hover:bg-[#FFFFFF] hover:text-black border-2 border-transparent hover:border-black font-bold uppercase tracking-wider text-sm transition-colors duration-300"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              LOG IN
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors"
            data-testid="signup-link"
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
};

export default Login;
