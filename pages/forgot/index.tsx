import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Label } from "@relume_io/relume-ui";
import { toast } from 'sonner';
import { useRouter } from "next/router";
import Link from 'next/link';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success('Password reset instructions sent!');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <AuthLayout 
        title="CHECK YOUR EMAIL" 
        subtitle="We've sent password reset instructions"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-20 h-20 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-black" />
          </div>
          <p className="text-base text-muted-foreground mb-8">
            If an account exists for <strong>{email}</strong>, you will receive an email with instructions to reset your password.
          </p>
          <Link href="/login">
            <Button
              data-testid="back-to-login-button"
              className="w-full h-12 rounded-none bg-black text-white hover:bg-[#CCFF00] hover:text-black border-2 border-transparent hover:border-black font-bold uppercase tracking-wider text-sm transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK TO LOGIN
            </Button>
          </Link>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="RESET PASSWORD" 
      subtitle="Enter your email to receive reset instructions"
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
              data-testid="forgot-password-email-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-12 h-12 rounded-none border-2 border-zinc-200 bg-transparent focus-visible:ring-0 focus-visible:border-black transition-all"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          data-testid="forgot-password-submit-button"
          className="w-full h-12 rounded-none bg-black text-white hover:bg-[#CCFF00] hover:text-black border-2 border-transparent hover:border-black font-bold uppercase tracking-wider text-sm transition-colors duration-300"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'SEND RESET LINK'
          )}
        </Button>

        <div className="text-center">
          <Link 
            href="/login" 
            className="text-sm font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent transition-colors inline-flex items-center"
            data-testid="back-to-login-link"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Link>
        </div>
      </motion.form>
    </AuthLayout>
  );
};

export default ForgotPassword;
