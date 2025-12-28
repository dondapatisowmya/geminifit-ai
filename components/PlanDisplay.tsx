import React, { useState } from 'react';
import { FitnessPlan, GroundingSource, Exercise, UserProfile } from '../types';

interface PlanDisplayProps {
  plan: FitnessPlan;
  sources: GroundingSource[];
  userProfile: UserProfile;
}

const VideoEmbed: React.FC<{ url: string; title: string }> = ({ url, title }) => {
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(url);

  if (videoId) {
    return (
      <div className="mt-8 rounded-[2rem] overflow-hidden aspect-video bg-slate-900 shadow-2xl border border-slate-800 animate-fadeIn">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center px-8 py-4 bg-slate-950 text-emerald-400 text-[11px] font-black rounded-2xl hover:bg-black transition-all uppercase tracking-[0.2em] shadow-xl"
    >
      Watch Tutorial
      <svg className="w-4 h-4 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
    </a>
  );
};

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan, sources, userProfile }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedVideos, setExpandedVideos] = useState<Record<string, boolean>>({});
  const [waterDrank, setWaterDrank] = useState(0); // in Liters

  if (!plan) return null;

  const heightInMeters = userProfile.height / 100;
  const bmi = parseFloat((userProfile.weight / (heightInMeters * heightInMeters)).toFixed(1));
  
  let bmiCategory = "";
  let bmiColor = "";
  if (bmi < 18.5) { bmiCategory = "Underweight"; bmiColor = "text-emerald-400 bg-emerald-950/5 border border-emerald-400/20"; }
  else if (bmi < 25) { bmiCategory = "Healthy Weight"; bmiColor = "text-emerald-700 bg-emerald-100 border border-emerald-200"; }
  else if (bmi < 30) { bmiCategory = "Overweight"; bmiColor = "text-emerald-800 bg-emerald-200/50 border border-emerald-300"; }
  else { bmiCategory = "High BMI"; bmiColor = "text-emerald-950 bg-emerald-300 border border-emerald-400"; }

  const toggleVideo = (exerciseName: string) => {
    setExpandedVideos(prev => ({ ...prev, [exerciseName]: !prev[exerciseName] }));
  };

  const waterGoal = plan.nutritionGuidance?.waterIntakeLiters || 2;
  const waterProgress = Math.min((waterDrank / waterGoal) * 100, 100);

  const stats = [
    { label: 'Total Calories', value: `${plan.nutritionGuidance?.dailyCalories || 0} kcal`, icon: '🍽️' },
    { label: 'Daily Protein', value: `${plan.nutritionGuidance?.proteinGrams || 0}g`, icon: '🍗' },
    { label: 'Macros (C/F)', value: `${plan.nutritionGuidance?.carbsGrams || 0}g / ${plan.nutritionGuidance?.fatsGrams || 0}g`, icon: '🥗' },
    { label: 'Water Goal', value: `${waterGoal} L`, icon: '💧' },
  ];

  const handleAddWater = () => {
    setWaterDrank(prev => Math.min(prev + 0.25, waterGoal + 1));
  };

  const handleResetWater = () => {
    setWaterDrank(0);
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-slate-950 text-white p-12 rounded-[3rem] luxury-shadow flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-transparent pointer-events-none opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-6">Today's Goal</h2>
            <p className="text-3xl font-black text-white leading-tight mb-10 max-w-xl">
              "{plan.motivation || 'Small steps lead to big changes. Let\'s go!'}"
            </p>
          </div>
          <div className="flex space-x-2 relative z-10">
            {[1, 2, 3].map(i => <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === 1 ? 'w-12 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'w-3 bg-slate-800'}`}></div>)}
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] card-border border-slate-100 luxury-shadow text-center flex flex-col justify-center items-center group">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">BMI Score</p>
          <div className="text-6xl font-black text-slate-950 tracking-tighter mb-4 transition-transform group-hover:scale-105 duration-500">{bmi}</div>
          <div className={`text-[11px] font-black px-6 py-2.5 rounded-full uppercase tracking-wider ${bmiColor}`}>
            {bmiCategory}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] card-border border-slate-50 luxury-shadow text-center transition-all hover:-translate-y-2 hover:border-emerald-100 cursor-default">
            <div className="text-2xl mb-4 p-3 bg-emerald-50 inline-block rounded-2xl">{item.icon}</div>
            <p className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-widest">{item.label}</p>
            <p className="text-xl font-black text-slate-950">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Daily Water Tracker Component */}
      <div className="bg-white rounded-[3rem] luxury-shadow card-border border-emerald-50 p-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">💧</div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Daily Water Goal</h3>
              <p className="text-sm text-slate-400 font-medium">Drinking water helps your muscles and energy.</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-end mb-3">
              <p className="text-3xl font-black text-emerald-600">{waterDrank.toFixed(2)} <span className="text-sm text-slate-400 uppercase tracking-widest ml-1">Liters drank</span></p>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Goal: {waterGoal}L</p>
            </div>
            <div className="w-full h-4 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100/50">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                style={{ width: `${waterProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <button 
            onClick={handleAddWater}
            className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all"
          >
            Add 250ml
          </button>
          <button 
            onClick={handleResetWater}
            className="px-10 py-4 bg-white text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-slate-100 hover:text-emerald-600 hover:border-emerald-200 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-white rounded-[3.5rem] luxury-shadow card-border border-slate-100 p-12 md:p-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
              <div>
                <h2 className="text-3xl font-black text-slate-950 tracking-tight">Workout Plan</h2>
                <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-[0.3em] mt-2">Daily Exercises</p>
              </div>
              
              <div className="flex bg-emerald-50/50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar border border-emerald-100/50">
                {plan.workoutPlan?.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`px-5 py-3 rounded-xl text-[11px] font-black transition-all whitespace-nowrap ${
                      activeDay === idx 
                      ? 'bg-slate-950 text-emerald-400 shadow-xl scale-105' 
                      : 'text-slate-400 hover:text-emerald-600'
                    }`}
                  >
                    Day {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {plan.workoutPlan?.[activeDay] && (
              <div className="animate-fadeIn">
                <div className="mb-12 pb-8 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight">{plan.workoutPlan[activeDay].title}</h3>
                </div>
                
                <div className="space-y-8">
                  {plan.workoutPlan[activeDay].exercises?.map((ex, idx) => (
                    <div key={idx} className="group bg-slate-50/40 p-10 rounded-[2.5rem] border border-transparent hover:border-emerald-100 hover:bg-white transition-all hover:shadow-3xl">
                      <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-slate-950 text-emerald-400 rounded-[1.25rem] flex items-center justify-center font-black text-xl shadow-2xl">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap items-center justify-between gap-6 mb-5">
                            <h4 className="font-black text-slate-900 text-xl tracking-tight">{ex.name}</h4>
                            <div className="flex space-x-3">
                               <span className="bg-white border border-slate-100 text-emerald-800 text-[10px] px-5 py-2.5 rounded-xl font-black uppercase tracking-widest shadow-sm">{ex.sets} SETS</span>
                               <span className="bg-emerald-600 text-white text-[10px] px-5 py-2.5 rounded-xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20">{ex.reps} REPS</span>
                            </div>
                          </div>
                          <p className="text-base text-slate-500 leading-relaxed mb-8 font-medium">"{ex.instruction}"</p>
                          
                          {ex.videoUrl && (
                            <button 
                              onClick={() => toggleVideo(ex.name)}
                              className="inline-flex items-center text-slate-950 text-[11px] font-black uppercase tracking-[0.25em] border border-slate-200 px-7 py-3.5 rounded-2xl hover:bg-slate-950 hover:text-emerald-400 hover:border-slate-950 transition-all shadow-sm"
                            >
                              {expandedVideos[ex.name] ? 'Hide Video' : 'See How To Do It'}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {expandedVideos[ex.name] && ex.videoUrl && <VideoEmbed url={ex.videoUrl} title={ex.name} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-12 rounded-[3rem] card-border border-slate-100 luxury-shadow">
              <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-8 border-b border-emerald-50 pb-5">Stay Safe</h3>
              <ul className="space-y-5">
                {plan.safetyTips?.map((tip, idx) => (
                  <li key={idx} className="text-sm text-slate-500 flex items-start font-medium leading-relaxed">
                    <span className="bg-emerald-900 text-emerald-100 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-black mr-4 mt-0.5">!</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-12 rounded-[3rem] card-border border-slate-100 luxury-shadow">
              <h3 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-8 border-b border-emerald-50 pb-5">Daily Tips</h3>
              <ul className="space-y-5">
                {plan.lifestyleTips?.map((tip, idx) => (
                  <li key={idx} className="text-sm text-slate-500 flex items-start font-medium leading-relaxed">
                    <span className="bg-emerald-50 text-emerald-600 w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center text-[10px] font-black mr-4 mt-0.5">✓</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[3.5rem] luxury-shadow card-border border-slate-100 p-10 sticky top-28">
            <h2 className="text-2xl font-black text-slate-950 mb-10 border-b border-slate-50 pb-6 flex items-center">
              <span className="bg-emerald-600 w-2.5 h-7 rounded-full mr-4 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></span>
              Daily Meals
            </h2>

            <div className="space-y-12">
              {[
                { label: '01 // BREAKFAST', meal: plan.dietPlan.breakfast },
                { label: '02 // LUNCH', meal: plan.dietPlan.lunch },
                { label: '03 // DINNER', meal: plan.dietPlan.dinner },
              ].map((item, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] opacity-50">{item.label}</p>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full shadow-sm">{item.meal?.calories} KCAL</span>
                  </div>
                  <h4 className="font-black text-slate-900 text-lg mb-3 tracking-tight">{item.meal?.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium opacity-80">{item.meal?.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 p-8 bg-slate-950 rounded-[2rem] text-center relative overflow-hidden group">
               <div className="relative z-10">
                 <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em] mb-4">Healthy Tip</p>
                 <p className="text-base font-bold text-white italic leading-relaxed">"{plan.nutritionGuidance?.proTip || 'Drink water often and eat your greens!'}"</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {sources && sources.length > 0 && (
        <div className="mt-20 pt-16 border-t border-slate-100">
          <p className="text-center text-[10px] font-black text-emerald-400/50 uppercase tracking-[0.5em] mb-10">Helpful Links</p>
          <div className="flex flex-wrap justify-center gap-5">
            {sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-slate-400 hover:text-emerald-700 hover:border-emerald-200 hover:shadow-xl transition-all flex items-center gap-3 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
                {source.title.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanDisplay;