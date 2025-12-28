import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      <header className="bg-white/80 border-b border-emerald-50 sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer group">
            <div className="bg-emerald-950 p-2.5 rounded-xl shadow-xl transition-transform group-hover:scale-105 border border-emerald-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">GEMINIFIT <span className="text-emerald-600">PRO</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em] mt-0.5">AI Health Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Workouts</span>
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">Diet Plans</span>
            <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
              Join Pro
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-16">
        {children}
      </main>

      <footer className="bg-emerald-950 border-t border-emerald-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
            <div className="max-w-sm">
              <h2 className="text-emerald-400 font-black tracking-tight mb-4 uppercase text-[11px]">Personalized Fitness</h2>
              <p className="text-sm text-emerald-100/60 leading-relaxed font-medium">
                Our AI helps you get healthy with easy workout and food plans. 
                Talk to a doctor before starting any hard exercise.
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <div className="flex space-x-8 mb-6">
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest hover:text-white cursor-pointer transition">Privacy</span>
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest hover:text-white cursor-pointer transition">Contact</span>
              </div>
              <p className="text-[11px] text-emerald-500/70 font-semibold tracking-wider">&copy; {new Date().getFullYear()} GEMINIFIT PRO. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-emerald-900/50 flex justify-between items-center">
             <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active Now</span>
             </div>
             <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Version 2.5</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;