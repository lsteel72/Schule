
import React, { useState, useEffect } from 'react';
import { WebQuest, AdminUser, StudentResult } from './types';
import { webQuests } from './data/webquests';
import WebQuestCard from './components/WebQuestCard';
import WebQuestDetail from './components/WebQuestDetail';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeClass, setActiveClass] = useState(3);
  const [lockedMissions, setLockedMissions] = useState<number[]>([]);
  const [lockedLevels, setLockedLevels] = useState<number[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<WebQuest | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [forcedLevel, setForcedLevel] = useState<number | null>(null);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dashboardConfig = {
    3: { title: "KLASSEN 3", subtitle: "TECNOLOGIA", colors: "from-blue-500 to-emerald-500", icon: "🦎" },
    4: { title: "KLASSEN 4", subtitle: "TECNOLOGIA INICIAL", colors: "from-orange-500 to-red-600", icon: "🚀" },
    5: { title: "KLASSEN 5", subtitle: "TECNOLOGIA AVANZADA", colors: "from-yellow-400 to-lime-500", icon: "⚔️" },
    6: { title: "KLASSEN 6", subtitle: "TECNOLOGIA PROGRAMACION CREATIVA", colors: "from-blue-600 to-cyan-500", icon: "🎨" },
    7: { title: "KLASSEN 7", subtitle: "TECNOLOGIA HABILIDADES DIGITALES", colors: "from-magenta-500 to-purple-600", icon: "⌨️" }
  };

  useEffect(() => {
    // Captura el nivel desde la URL
    const params = new URLSearchParams(window.location.search);
    const kParam = params.get('k');
    if (kParam && dashboardConfig.hasOwnProperty(kParam)) {
      const lvl = parseInt(kParam);
      setForcedLevel(lvl);
      setActiveClass(lvl);
    }

    const savedLocks = localStorage.getItem('lockedMissions');
    if (savedLocks) setLockedMissions(JSON.parse(savedLocks));

    const savedLevelLocks = localStorage.getItem('lockedLevels');
    if (savedLevelLocks) setLockedLevels(JSON.parse(savedLevelLocks));

    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setAdminUser(JSON.parse(savedUser));
      setAuthMode('login');
    } else {
      setAuthMode('register');
    }

    const savedResults = localStorage.getItem('studentResults');
    if (savedResults) setStudentResults(JSON.parse(savedResults));
  }, []);

  const toggleLevelLock = (level: number) => {
    const newLevelLocks = lockedLevels.includes(level)
      ? lockedLevels.filter(l => l !== level)
      : [...lockedLevels, level];
    setLockedLevels(newLevelLocks);
    localStorage.setItem('lockedLevels', JSON.stringify(newLevelLocks));
  };

  const toggleMissionLock = (id: number) => {
    const newLocks = lockedMissions.includes(id) 
      ? lockedMissions.filter(mId => mId !== id) 
      : [...lockedMissions, id];
    setLockedMissions(newLocks);
    localStorage.setItem('lockedMissions', JSON.stringify(newLocks));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      const newUser = { username, passwordHash: btoa(password) };
      setAdminUser(newUser);
      localStorage.setItem('adminUser', JSON.stringify(newUser));
      setIsAdmin(true);
      setIsAuthModalOpen(false);
    } else {
      if (adminUser && username === adminUser.username && btoa(password) === adminUser.passwordHash) {
        setIsAdmin(true);
        setIsAuthModalOpen(false);
      } else {
        alert("❌ Credenciales incorrectas");
      }
    }
    setUsername('');
    setPassword('');
  };

  const filteredQuests = webQuests.filter(q => q.targetClass === activeClass);
  const activeConfig = dashboardConfig[activeClass as keyof typeof dashboardConfig];
  const isCurrentLevelLocked = lockedLevels.includes(activeClass);

  return (
    <div className="min-h-screen pb-20 bg-slate-900 overflow-x-hidden text-white font-['Fredoka']">
      <header className="py-12 px-6 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 shadow-[0_5px_20px_rgba(251,191,36,0.5)]"></div>
        
        {/* Nav de Niveles: Se oculta para estudiantes en Modo Enfocado */}
        {(!forcedLevel || isAdmin) && (
          <div className="flex bg-slate-800/40 p-2 rounded-[2.5rem] mb-12 gap-3 backdrop-blur-xl border border-white/5 shadow-2xl overflow-x-auto max-w-full no-scrollbar animate-in slide-in-from-top duration-500">
            {[3, 4, 5, 6, 7].map(num => (
              <div key={num} className="flex items-center gap-1 group">
                <button 
                  onClick={() => { setActiveClass(num); setShowResultsPanel(false); }}
                  className={`px-6 py-3 rounded-2xl font-black text-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${activeClass === num ? 'bg-white text-slate-900 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'text-slate-500 hover:text-white'}`}
                >
                  KLASSEN {num}
                  {lockedLevels.includes(num) && <span className="text-red-500 animate-pulse">🔒</span>}
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => toggleLevelLock(num)}
                    className={`p-2 rounded-xl transition-all ${lockedLevels.includes(num) ? 'bg-red-500' : 'bg-emerald-500'} shadow-lg hover:rotate-12 active:scale-90`}
                    title="Bloquear/Desbloquear Nivel"
                  >
                    {lockedLevels.includes(num) ? '🔓' : '🔒'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Badge de Modo Enfocado */}
        {forcedLevel && !isAdmin && (
          <div className="mb-6 bg-yellow-400/10 border border-yellow-400/30 px-6 py-2 rounded-full text-yellow-400 font-black text-xs tracking-widest uppercase animate-pulse">
            Acceso Exclusivo • Klassen {forcedLevel}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-12 mb-8 animate-in zoom-in duration-1000">
          <div className="w-48 h-48 bg-white rounded-[3.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-bounce-slow flex items-center justify-center border-4 border-white/20">
            <span className="text-[100px] drop-shadow-2xl">{activeConfig.icon}</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeConfig.colors} uppercase italic leading-none drop-shadow-2xl`}>
              {activeConfig.title}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white/50 tracking-[0.3em] pixel-font mt-4 uppercase">
              {activeConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-12 justify-center">
          <button onClick={() => isAdmin ? setIsAdmin(false) : setIsAuthModalOpen(true)} className={`px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:translate-y-1 ${isAdmin ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-slate-800 text-white border border-white/5 hover:bg-slate-700'}`}>
            {isAdmin ? '🔒 SALIR MODO ADMIN' : '👤 ACCESO DOCENTE'}
          </button>
          
          {isAdmin && (
            <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-right duration-500">
              <button onClick={() => setShowResultsPanel(!showResultsPanel)} className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-500 border border-white/10">
                {showResultsPanel ? '🏠 VER CLASE' : '📊 VER REPORTES'}
              </button>
              
              <div className="bg-slate-800/80 backdrop-blur-md p-3 rounded-[2rem] flex gap-2 border border-white/10 shadow-2xl">
                 <span className="text-[10px] font-black uppercase self-center px-4 opacity-40 leading-tight">Copiar Link<br/>Enfocado:</span>
                 {[3,4,5,6,7].map(l => (
                   <button 
                    key={l}
                    onClick={() => {
                      const url = `${window.location.origin}${window.location.pathname}?k=${l}`;
                      navigator.clipboard.writeText(url);
                      alert(`¡Enlace para KLASSEN ${l} copiado!`);
                    }}
                    className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/20 font-black text-xl transition-all hover:scale-110 active:scale-90"
                    title={`Copiar URL para Klassen ${l}`}
                   >
                     {l}
                   </button>
                 ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {showResultsPanel ? (
          <div className="bg-white rounded-[4rem] p-12 text-slate-800 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-8 border-indigo-50 overflow-hidden animate-in zoom-in-95 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter">Panel de <span className="text-indigo-600">Resultados</span></h2>
               <div className="flex gap-4">
                 <div className="bg-slate-50 px-6 py-3 rounded-2xl font-black text-indigo-600 border border-slate-100">
                    MISIONES TOTALES: {studentResults.length}
                 </div>
               </div>
             </div>
             <div className="overflow-x-auto rounded-[2.5rem] border-4 border-slate-50 shadow-inner">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em]">
                   <tr>
                     <th className="p-8">Estudiante</th>
                     <th className="p-8">Grupo</th>
                     <th className="p-8">Misión Realizada</th>
                     <th className="p-8 text-center">EVAL.</th>
                     <th className="p-8 text-center">Refl.</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y-2 divide-slate-50 font-medium">
                   {studentResults.length > 0 ? [...studentResults].reverse().map(r => (
                     <tr key={r.id} className="hover:bg-indigo-50/30 transition-colors group">
                       <td className="p-8 font-black text-slate-900 group-hover:text-indigo-600">{r.studentName}</td>
                       <td className="p-8 font-bold text-slate-400">{r.klasse}</td>
                       <td className="p-8 italic text-slate-500">{r.questTitle}</td>
                       <td className="p-8 text-center">
                         <span className={`px-4 py-2 rounded-xl font-black text-xl ${r.score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                           {r.score}%
                         </span>
                       </td>
                       <td className="p-8 text-center">
                         <span className="w-12 h-12 bg-yellow-400 inline-flex items-center justify-center rounded-2xl font-black text-slate-900 shadow-lg border-2 border-white">
                           {r.reflection}
                         </span>
                       </td>
                     </tr>
                   )) : (
                     <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-bold italic text-3xl">Sin registros en la base de datos.</td></tr>
                   )}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="relative">
            {isCurrentLevelLocked && !isAdmin && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-xl rounded-[4rem] p-10 text-center border-4 border-dashed border-red-500/30 min-h-[600px] animate-in fade-in duration-500">
                <div className="text-[120px] mb-8 animate-pulse">🔒</div>
                <h2 className="text-6xl font-black text-white uppercase italic mb-6 leading-none">ACCESO RESTRINGIDO</h2>
                <p className="text-2xl text-slate-400 font-bold max-w-xl mx-auto leading-relaxed">
                  Esta sección de <span className="text-white italic">KLASSEN {activeClass}</span> ha sido bloqueada por el docente. 
                  <br/>Espera a recibir nuevas instrucciones.
                </p>
              </div>
            )}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 transition-all duration-700 ${isCurrentLevelLocked && !isAdmin ? 'blur-md grayscale scale-95 opacity-50' : ''}`}>
              {filteredQuests.map(quest => (
                <WebQuestCard 
                  key={quest.id} 
                  quest={quest} 
                  isLocked={lockedMissions.includes(quest.id)} 
                  isAdmin={isAdmin} 
                  onToggleLock={toggleMissionLock} 
                  onClick={setSelectedQuest} 
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[3.5rem] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative border-t-[12px] border-indigo-600 overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12"></div>
             <h2 className="text-4xl font-black text-center mb-10 uppercase italic text-slate-900">ADMIN LOGIN</h2>
             <form onSubmit={handleAuth} className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Usuario del Sistema</label>
                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-6 bg-slate-100 rounded-[2rem] border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg transition-all" placeholder="Admin User" required />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Contraseña Maestra</label>
                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-6 bg-slate-100 rounded-[2rem] border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg transition-all" placeholder="••••••••" required />
               </div>
               <button type="submit" className="w-full py-7 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl hover:bg-indigo-700 shadow-xl active:scale-95 transition-all uppercase italic tracking-widest">ENTRAR AL SISTEMA</button>
               <button type="button" onClick={() => setIsAuthModalOpen(false)} className="w-full text-slate-400 font-black uppercase text-xs tracking-widest mt-6 hover:text-slate-600 transition-colors">Volver a la clase</button>
             </form>
           </div>
        </div>
      )}

      {selectedQuest && <WebQuestDetail quest={selectedQuest} onClose={() => setSelectedQuest(null)} />}
    </div>
  );
};

export default App;
