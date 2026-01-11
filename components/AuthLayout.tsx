import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

type AuthLayoutProps = React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
}>;

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full md:w-2/5 flex flex-col justify-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <img
              className="h-auto w-[250px]"
              src="logo.jpeg"
              alt="Logo image"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base text-muted-foreground mb-8 font-body">
              {subtitle}
            </p>
          )}

          {/* Form Content */}
          {children}
        </motion.div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden md:block md:w-3/5 relative h-screen overflow-hidden bg-black">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1700784795176-7ff886439d79?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Fitness training"
            className="w-full h-full object-cover"
          />
          {/* Overlay with volt effect on hover */}
          <motion.div
            className="absolute inset-0 bg-[#CCFF00] mix-blend-multiply opacity-0 hover:opacity-30 transition-opacity duration-500"
          />
          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
              backgroundSize: 'cover'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
