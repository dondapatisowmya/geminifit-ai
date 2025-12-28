import React, { useState } from 'react';
import Layout from './components/Layout';
import UserForm from './components/UserForm';
import PlanDisplay from './components/PlanDisplay';
import { UserProfile, FitnessPlan, GroundingSource } from './types';
import { generateFitnessPlan } from './services/geminiService';

const App: React.FC = () => {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (profile: UserProfile) => {
    setIsLoading(true);
    setError(null);
    setUserProfile(profile);
    try {
      const result = await generateFitnessPlan(profile);
      setPlan(result.plan);
      setSources(result.sources);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your internet and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setSources([]);
    setUserProfile(null);
    setError(null);
  };

  return (
    <Layout>
      {!plan ? (
        <div className="max-w-6xl mx-auto animate-fadeIn">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-sm border border-emerald-100">
              Personalized AI Fitness
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-950 mb-8 tracking-tighter leading-[0.9]">
              Reach Your <br/><span className="text-emerald-600">Health Goals.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              Get a custom workout and food plan made just for you by our AI. 
              Easy to follow and effective for everyone.
            </p>
          </div>
          
          <UserForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          
          {error && (
            <div className="mt-12 p-8 bg-emerald-950 border border-emerald-900 text-emerald-400 rounded-3xl text-center max-w-lg mx-auto font-bold text-sm tracking-tight luxury-shadow">
              <span className="font-black uppercase mr-3 text-emerald-500">Alert:</span> {error}
            </div>
          )}

          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-20 text-center border-t border-emerald-50 pt-24">
            <div className="group">
              <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">🧬</div>
              <h3 className="font-black text-emerald-700 mb-4 uppercase text-[11px] tracking-[0.3em]">Smart Mapping</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed px-6 opacity-80">Our AI picks the right food and calories for your body type.</p>
            </div>
            <div className="group">
              <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">📹</div>
              <h3 className="font-black text-emerald-700 mb-4 uppercase text-[11px] tracking-[0.3em]">Easy Videos</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed px-6 opacity-80">We find the best videos to show you how to do every exercise correctly.</p>
            </div>
            <div className="group">
              <div className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">🔋</div>
              <h3 className="font-black text-emerald-700 mb-4 uppercase text-[11px] tracking-[0.3em]">Custom Diet</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed px-6 opacity-80">Meal plans that fit your daily schedule and the food you like.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-emerald-50 pb-12">
            <div>
              <p className="text-[11px] text-emerald-600 font-black uppercase tracking-[0.5em] mb-4 flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3 animate-pulse"></span>
                Plan Created
              </p>
              <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter">Your New Plan</h1>
            </div>
            <button 
              onClick={handleReset}
              className="px-10 py-4.5 bg-emerald-950 text-emerald-400 rounded-2xl font-black text-[11px] hover:bg-black transition-all tracking-[0.25em] uppercase shadow-2xl active:scale-95 border border-emerald-900"
            >
              Start Over
            </button>
          </div>
          {userProfile && <PlanDisplay plan={plan} sources={sources} userProfile={userProfile} />}
        </div>
      )}
    </Layout>
  );
};

export default App;