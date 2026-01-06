import React, { useState } from 'react';
import { generateWorkout } from "../services/workoutEngine";
import { WorkoutPlan } from "../types";

const WorkoutGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState('Hipertrofia');
  const [level, setLevel] = useState('Intermediário');
  const [duration, setDuration] = useState('60 minutos');
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

const handleGenerate = () => {
  setLoading(true);

  const plan = generateWorkout({
    goal,
    level,
    duration,
  });

  setWorkoutPlan(plan);
  setLoading(false);  
};

  return (
    <section id="ia-trainer" className="py-24 px-6 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-4 py-1.5 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="text-pink-500 text-xs font-bold uppercase tracking-widest">Tecnologia & Ciência</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white uppercase mb-4 tracking-tight">
            Consultoria <span className="text-pink-500">Personalizada</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            Personalize seu treino agora. Nossa IA utiliza a metodologia da Mayara Moreira para criar uma rotina eficiente e segura para você.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <label className="block text-slate-500 text-xs font-black uppercase tracking-widest ml-1">Foco Principal</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
            >
              <option>Hipertrofia</option>
              <option>Emagrecimento</option>
              <option>Condicionamento</option>
              <option>Mobilidade</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-slate-500 text-xs font-black uppercase tracking-widest ml-1">Nível de Treino</label>
            <select 
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
            >
              <option>Iniciante</option>
              <option>Intermediário</option>
              <option>Avançado</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-slate-500 text-xs font-black uppercase tracking-widest ml-1">Tempo Disponível</label>
            <select 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-800 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all appearance-none cursor-pointer"
            >
              <option>30 minutos</option>
              <option>45 minutos</option>
              <option>60 minutos</option>
              <option>90 minutos</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 text-white font-bold py-5 rounded-2xl transition-all duration-300 transform active:scale-[0.98] shadow-2xl shadow-pink-600/20 text-lg uppercase tracking-wider"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculando Protocolo...
            </span>
          ) : 'Prescrever Treino Personalizado'}
        </button>

        {plan && (
          <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-pink-500/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-3xl font-oswald font-bold text-white uppercase">{plan.name}</h3>
                <p className="text-pink-500 font-bold uppercase text-xs tracking-[0.2em] mt-1">{plan.goal}</p>
              </div>
              <div className="flex gap-2">
                <span className="bg-white/5 text-slate-300 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/10">Recomendação IA</span>
              </div>
            </div>
            
            <div className="grid gap-4">
              {plan.exercises.map((ex, idx) => (
                <div key={idx} className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-pink-500/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-pink-600/20 text-pink-500 flex items-center justify-center font-black text-xl border border-pink-500/20 group-hover:bg-pink-600 group-hover:text-white transition-all">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-bold text-white mb-2">{ex.name}</h4>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex items-center gap-2 px-3 py-1 bg-black/30 rounded-lg">
                        <span className="text-slate-500 text-[10px] font-black uppercase">Séries</span>
                        <span className="text-pink-500 font-mono font-bold">{ex.sets}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-black/30 rounded-lg">
                        <span className="text-slate-500 text-[10px] font-black uppercase">Reps</span>
                        <span className="text-pink-500 font-mono font-bold">{ex.reps}</span>
                      </div>
                    </div>
                    {ex.notes && (
                      <div className="mt-3 flex items-start gap-2 bg-pink-500/5 p-3 rounded-xl border border-pink-500/10">
                        <span className="text-pink-500">✨</span>
                        <p className="text-slate-400 text-xs italic">{ex.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-4 rounded-2xl bg-slate-900/80 border border-white/5 text-center">
              <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                Este programa foi gerado por inteligência artificial baseada em padrões de treinamento. <br />
                Execução supervisionada é sempre recomendada.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutGenerator;
