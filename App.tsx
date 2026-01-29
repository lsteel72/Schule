
import React, { useState, useEffect, useMemo } from 'react';
import { WebQuest, AdminUser, StudentResult } from './types';
import { webQuests } from './data/webquests';
import WebQuestCard from './components/WebQuestCard';
import WebQuestDetail from './components/WebQuestDetail';

// Configuración fuera del componente para evitar recreaciones y facilitar el acceso
const DASHBOARD_CONFIG: Record<number, any> = {
  3: { title: "KLASSEN 3", subtitle: "TECNOLOGIA", colors: "from-blue-500 to-emerald-500", icon: "🦎" },
  4: { title: "KLASSEN 4", subtitle: "TECNOLOGIA INICIAL", colors: "from-orange-500 to-red-600", icon: "🚀" },
  5: { title: "KLASSEN 5", subtitle: "TECNOLOGIA AVANZADA", colors: "from-yellow-400 to-lime-500", icon: "⚔️" },
  6: { title: "KLASSEN 6", subtitle: "TECNOLOGIA PROGRAMACION CREATIVA", colors: "from-blue-600 to-cyan-500", icon: "🎨" },
  7: { title: "KLASSEN 7", subtitle: "TECNOLOGIA HABILIDADES DIGITALES", colors: "from-magenta-500 to-purple-600", icon: "⌨️" }
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeClass, setActiveClass] = useState(3);
  const [lockedMissions, setLockedMissions] = useState<number[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<WebQuest | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  const [forcedLevel, setForcedLevel] = useState<number | null>(null);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Sincronización robusta con la URL
  useEffect(() => {
    const initApp = () => {
      const params = new URLSearchParams(window.location.search);
      const kValue = params.get('k');
      
      if (kValue) {
        const level = parseInt(kValue);
        if (DASHBOARD_CONFIG[level]) {
          setForcedLevel(level);
          setActiveClass(level);
        }
      }

      // Cargar persistencia
      const savedLocks = localStorage.getItem('lockedMissions');
      if (savedLocks) setLockedMissions(JSON.parse(savedLocks));

      const savedUser = localStorage.getItem('adminUser');
      if (savedUser) {
        setAdminUser(JSON.parse(savedUser));
        setAuthMode('login');
      } else {
        setAuthMode('register');
      }

      const savedResults = localStorage.getItem('studentResults');
      if (savedResults) setStudentResults(JSON.parse(savedResults));
    };

    initApp();
  }, []);

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

  const filteredQuests = useMemo(() => 
    webQuests.filter(q => q.targetClass === activeClass),
    [activeClass]
  );

  const activeConfig = DASHBOARD_CONFIG[activeClass] || DASHBOARD_CONFIG[3];

  return (
    <div className="min-h-screen pb-20 bg-slate-900 overflow-x-hidden text-white font-['Fredoka']">
      <header className="py-12 px-6 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-orange-500 via-yellow-400 to-red-600 shadow-xl"></div>
        
        {/* Selector de Niveles: Solo para el Docente o si no hay nivel forzado */}
        {(!forcedLevel || isAdmin) && (
          <div className="flex bg-slate-800/60 p-2 rounded-[2.5rem] mb-12 gap-3 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-x-auto max-w-full no-scrollbar animate-in slide-in-from-top duration-700">
            {[3, 4, 5, 6, 7].map(num => (
              <button 
                key={num}
                onClick={() => { setActiveClass(num); setShowResultsPanel(false); }}
                className={`px-8 py-4 rounded-2xl font-black text-xl transition-all duration-300 whitespace-nowrap ${activeClass === num ? 'bg-white text-slate-900 scale-105 shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                KLASSEN {num}
              </button>
            ))}
          </div>
        )}

        {/* Indicador de Modo Enfocado para el Alumno */}
        {forcedLevel && !isAdmin && (
          <div className="mb-8 px-8 py-3 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl text-emerald-400 font-black text-sm tracking-[0.2em] uppercase animate-pulse flex items-center gap-3">
            <span className="text-xl">🎯</span> ACCESO DIRECTO ACTIVADO • KLASSEN {forcedLevel}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-12 mb-8 animate-in zoom-in duration-1000">
          <div className="w-44 h-44 bg-white rounded-[3.5rem] p-6 shadow-2xl animate-bounce-slow flex items-center justify-center border-4 border-white/20">
            <span className="text-9xl drop-shadow-2xl">{activeConfig.icon}</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeConfig.colors} uppercase italic leading-none`}>
              {activeConfig.title}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-white/40 tracking-[0.25em] mt-4 uppercase pixel-font">
              {activeConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setIsAuthModalOpen(true)} 
            className={`px-10 py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${isAdmin ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-slate-800 text-white border border-white/10 hover:bg-slate-700'}`}
          >
            {isAdmin ? '🔒 SALIR DEL PANEL' : '👤 ACCESO DOCENTE'}
          </button>
          
          {isAdmin && (
            <div className="flex flex-wrap gap-4 items-center animate-in fade-in slide-in-from-right duration-500">
              <button 
                onClick={() => setShowResultsPanel(!showResultsPanel)} 
                className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-500"
              >
                {showResultsPanel ? '🏠 VER ACTIVIDADES' : '📊 REPORTES ALUMNOS'}
              </button>
              
              <div className="bg-slate-800 p-3 rounded-[2rem] flex gap-3 border border-white/10 shadow-2xl items-center">
                 <span className="text-[10px] font-black uppercase px-4 opacity-40 leading-tight">Copiar Link<br/>Enfocado:</span>
                 {[3,4,5,6,7].map(l => (
                   <button 
                    key={l}
                    onClick={() => {
                      // Usar URL completa para asegurar que el parámetro persista en cualquier entorno
                      const url = new URL(window.location.href);
                      url.searchParams.set('k', l.toString());
                      navigator.clipboard.writeText(url.toString());
                      alert(`¡Enlace directo a KLASSEN ${l} copiado con éxito!`);
                    }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all hover:scale-110 active:scale-90 ${activeClass === l ? 'bg-white text-slate-900' : 'bg-white/5 text-white hover:bg-white/20'}`}
                    title={`Generar link para Klassen ${l}`}
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
          <div className="bg-white rounded-[4rem] p-10 text-slate-800 shadow-2xl border-8 border-indigo-50 overflow-hidden animate-in zoom-in-95 duration-500">
             <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
               <h2 className="text-4xl font-black uppercase italic">Dashboard de <span className="text-indigo-600">ProGRESO</span></h2>
               <div className="bg-slate-100 px-8 py-4 rounded-3xl font-black text-indigo-600 text-xl">
                  TOTAL: {studentResults.length} ACTIVIDADES
               </div>
             </div>
             <div className="overflow-x-auto rounded-[3rem] border-4 border-slate-50 shadow-inner">
               <table className="w-full text-left">
                 <thead className="bg-slate-900 text-white font-black uppercase text-xs">
                   <tr>
                     <th className="p-8">Estudiante</th>
                     <th className="p-8">Klassen</th>
                     <th className="p-8">Misión</th>
                     <th className="p-8 text-center">Nota</th>
                     <th className="p-8 text-center">Auto-Refl.</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y-2 divide-slate-50">
                   {studentResults.length > 0 ? [...studentResults].reverse().map(r => (
                     <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                       <td className="p-8 font-black text-slate-900">{r.studentName}</td>
                       <td className="p-8 font-bold text-slate-400">{r.klasse}</td>
                       <td className="p-8 italic text-slate-500">{r.questTitle}</td>
                       <td className="p-8 text-center">
                         <span className={`px-5 py-2 rounded-2xl font-black text-2xl ${r.score >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                           {r.score}%
                         </span>
                       </td>
                       <td className="p-8 text-center">
                         <span className="w-12 h-12 bg-yellow-400 inline-flex items-center justify-center rounded-2xl font-black text-2xl shadow-lg">
                           {r.reflection}
                         </span>
                       </td>
                     </tr>
                   )) : (
                     <tr><td colSpan={5} className="p-24 text-center text-slate-300 font-bold italic text-3xl">No hay registros para mostrar todavía.</td></tr>
                   )}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 animate-in fade-in duration-1000 delay-300">
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
        )}
      </main>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[4rem] p-12 shadow-2xl relative border-t-[16px] border-indigo-600">
             <h2 className="text-4xl font-black text-center mb-10 uppercase italic text-slate-900">ACCESO DOCENTE</h2>
             <form onSubmit={handleAuth} className="space-y-6">
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-6 bg-slate-100 rounded-3xl border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg" placeholder="Usuario" required />
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-6 bg-slate-100 rounded-3xl border-2 border-transparent focus:border-indigo-500 outline-none text-slate-900 font-bold text-lg" placeholder="••••••••" required />
               <button type="submit" className="w-full py-7 bg-indigo-600 text-white rounded-3xl font-black text-2xl hover:bg-indigo-700 shadow-xl active:scale-95 transition-all">INGRESAR</button>
               <button type="button" onClick={() => setIsAuthModalOpen(false)} className="w-full text-slate-400 font-black uppercase text-xs tracking-widest mt-6">Cerrar</button>
             </form>
           </div>
        </div>
      )}

      {selectedQuest && <WebQuestDetail quest={selectedQuest} onClose={() => setSelectedQuest(null)} />}
    </div>
  );
};

export default App;
