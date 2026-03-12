'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardNav } from '@/components/DashboardNav';
import { SEOHead } from '@/components/SEOHead';
import { authApi } from '@/lib/api';

type ViewState = 'MAIN' | 'LOGIN' | 'REGISTER';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [view, setView] = useState<ViewState>('MAIN');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authApi.getCurrentUser();
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          const returnUrl = searchParams.get('returnUrl');
          if (returnUrl) {
            router.push(decodeURIComponent(returnUrl));
          } else {
            router.push('/profile');
          }
        }
      } catch (err) {
        // Not logged in, stay on login page
      }
    };

    checkAuth();
  }, [router, searchParams]);

  // Handle Form Submissions (Placeholders since backend is required)
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Backend login integration required for email/password.");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Backend registration integration required.");
  };

  const renderMainView = () => (
    <div className="bg-[#2a2f3b] rounded-xl p-8 mb-4 w-full mt-4 shadow-xl flex flex-col items-center">
      <button
        onClick={() => setView('LOGIN')}
        className="w-full bg-[#FFB540] hover:bg-[#F2A93B] text-white font-bold text-xl tracking-wide rounded border border-transparent py-3.5 transition-colors mb-4 shadow"
      >
        Login
      </button>
      
      <div className="text-[#FFB540] font-medium my-1">Or</div>
      
      <button
        onClick={() => setView('REGISTER')}
        className="w-full bg-white hover:bg-gray-100 text-[#0f172a] font-bold tracking-wide text-xl rounded border border-transparent py-3.5 transition-colors shadow mt-4"
      >
        Register
      </button>
    </div>
  );

  const renderLoginView = () => (
    <div className="bg-[#2a2f3b] rounded-xl p-6 sm:p-8 mb-4 w-full mt-4 shadow-xl">
      <h2 className="text-white text-[26px] font-bold text-center mb-6">Login now & Play Quiz</h2>
      
      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-white hover:bg-gray-100 text-black font-extrabold text-xl py-3 rounded transition-colors mt-6 shadow"
        >
          Submit
        </button>
      </form>
      
      <button 
        onClick={() => setView('MAIN')}
        className="mt-6 text-gray-400 hover:text-white text-sm flex items-center justify-center w-full gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back
      </button>
    </div>
  );

  const renderRegisterView = () => (
    <div className="bg-[#2a2f3b] rounded-xl p-6 sm:p-8 mb-4 w-full mt-4 shadow-xl">
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <div>
          <label className="text-white text-sm font-semibold mb-1.5 block">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white text-black rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#FFB540]"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#FFB540] hover:bg-[#F2A93B] text-white font-extrabold text-xl py-3 rounded transition-colors mt-6 shadow"
        >
          Register
        </button>
      </form>
      
      <button 
        onClick={() => setView('MAIN')}
        className="mt-6 text-gray-400 hover:text-white text-sm flex items-center justify-center w-full gap-2 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back
      </button>
    </div>
  );

  return (
    <>
      <SEOHead 
        title="Sign In to Quizwala - Play Quizzes & Win Prizes"
        description="Sign in to Quizwala with Google to start playing quizzes, earning coins, and winning exciting prizes. Join thousands of players and test your knowledge today!"
        keywords="quiz login, sign in quiz, quiz account, google sign in, quiz app login"
      />
      <DashboardNav />

      <div className="min-h-fit bg-[#172030] py-12 px-5 sm:px-8 flex flex-col items-center justify-center">
        <div className="max-w-md w-full mx-auto animate-slide-in-up">
          {view === 'MAIN' && renderMainView()}
          {view === 'LOGIN' && renderLoginView()}
          {view === 'REGISTER' && renderRegisterView()}
        </div>
      </div>
      
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-[#FFF6D9] p-5 bg-[#172030] min-h-screen">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
