import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
