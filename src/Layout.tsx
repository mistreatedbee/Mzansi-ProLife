import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  currentPageName?: string;
}

export default function Layout({ children, currentPageName }: LayoutProps) {
  // Admin pages don't need the full layout
  const isAdminPage = currentPageName === 'AdminDashboard';
  
  // Auth pages (login, signup, forgot-password) don't need header/footer
  const isAuthPage = currentPageName === 'Login' || 
                     currentPageName === 'Signup' || 
                     currentPageName === 'Forgot password';
  
  if (isAdminPage || isAuthPage) {
    return (
      <>
        <Toaster position="top-right" richColors />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" richColors />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

