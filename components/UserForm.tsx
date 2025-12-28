import React, { useState } from 'react';
import { UserProfile, FitnessGoal, DietPreference, Lifestyle } from '../types';

interface UserFormProps {
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserProfile>({
    age: 25,
    gender: 'Male',
    weight: 70,
    height: 175,
    goal: FitnessGoal.GENERAL_FITNESS,
    dietPreference: 'Veg',
    lifestyle: 'Student'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-[2.5rem] luxury-shadow p-10 md:p-16 max-w-5xl mx-auto card-border border-emerald-50">
      <div className="mb-16">
        <h2 className="text-3xl font-black text-slate-950 mb-3 tracking-tight">Your Health Profile</h2>
        <p className="text-slate-400 font-medium max-w-lg">Tell us a bit about yourself to get your custom plan.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-10">
            <h3 className="text-[11px] font-black tracking-[0.3em] text-emerald-600 uppercase border-b border-emerald-50 pb-3">01 // About You</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-3 uppercase tracking-wider">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-6 py-4.5 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-3 uppercase tracking-wider">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-6 py-4.5 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900 appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-3 uppercase tracking-wider">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-6 py-4.5 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-slate-500 mb-3 uppercase tracking-wider">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-6 py-4.5 bg-slate-50 border border-emerald-50 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <h3 className="text-[11px] font-black tracking-[0.3em] text-emerald-600 uppercase border-b border-emerald-50 pb-3">02 // Habits</h3>
            <div>
              <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-wider">Diet Preference</label>
              <div className="grid grid-cols-3 gap-4">
                {(['Veg', 'Non-Veg', 'Vegan'] as DietPreference[]).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, dietPreference: pref }))}
                    className={`px-4 py-5 rounded-2xl text-[11px] font-black transition-all border-2 ${
                      formData.dietPreference === pref
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-950 shadow-xl'
                        : 'bg-white text-slate-500 border-emerald-50 hover:border-emerald-200 hover:text-emerald-700'
                    }`}
                  >
                    {pref.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-slate-500 mb-5 uppercase tracking-wider">Your Daily Routine</label>
              <div className="grid grid-cols-1 gap-4">
                {(['Student', 'Office Worker', 'Athlete'] as Lifestyle[]).map((life) => (
                  <button
                    key={life}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, lifestyle: life }))}
                    className={`px-6 py-5 rounded-2xl text-[11px] font-black border-2 text-left transition-all ${
                      formData.lifestyle === life
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-500'
                        : 'bg-white text-slate-500 border-emerald-50 hover:border-emerald-100 hover:text-emerald-700'
                    }`}
                  >
                    {life.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-emerald-50">
          <label className="block text-[11px] font-black text-emerald-400/60 mb-8 uppercase tracking-[0.4em] text-center">What is your main goal?</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.values(FitnessGoal).map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, goal }))}
                className={`px-8 py-7 rounded-[1.5rem] text-[12px] font-black transition-all border-2 ${
                  formData.goal === goal
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xl shadow-emerald-600/30 -translate-y-1'
                    : 'bg-white text-slate-900 border-emerald-50 hover:border-emerald-200'
                }`}
              >
                {goal.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full group relative overflow-hidden bg-emerald-950 hover:bg-black text-white font-black py-7 rounded-[1.5rem] transition-all shadow-2xl shadow-emerald-200 disabled:opacity-70 flex items-center justify-center text-sm tracking-[0.3em] uppercase mt-8 border border-emerald-900"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <svg className="animate-spin h-5 w-5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating your plan...</span>
            </div>
          ) : (
            'Make My Plan'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;