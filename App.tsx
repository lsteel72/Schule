
import React, { useState, useEffect } from 'react';
import { WebQuest, AdminUser, StudentResult } from './types';
import { webQuests } from './data/webquests';
import WebQuestCard from './components/WebQuestCard';
import WebQuestDetail from './components/WebQuestDetail';
import MediaPass from './components/MediaPass';
import { jsPDF } from 'https://esm.sh/jspdf';
import autoTable from 'https://esm.sh/jspdf-autotable';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [lockedMissions, setLockedMissions] = useState<number[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<WebQuest | null>(null);
  const [showMediaPass, setShowMediaPass] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [selectedKlasseFilter, setSelectedKlasseFilter] = useState('Todas');
  const [showResultsPanel, setShowResultsPanel] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
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
  }, [isAdmin, showResultsPanel]);

  const toggleLock = (id: number) => {
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
      alert("✅ ¡Docente registrado! Ya puedes administrar el Hub.");
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

  const filteredResults = selectedKlasseFilter === 'Todas' 
    ? studentResults 
    : studentResults.filter(r => r.klasse === selectedKlasseFilter);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();
    
    // Configuración del PDF
    doc.setFontSize(18);
    doc.text('Colegio Alemán de Barranquilla', 14, 20);
    doc.setFontSize(14);
    doc.text(`Resultados de WebQuests - Klassen 3 (${selectedKlasseFilter})`, 14, 30);
    doc.setFontSize(10);
    doc.text(`Fecha de exportación: ${dateStr}`, 14, 38);

    const tableData = filteredResults.map(res => [
      res.studentName,
      res.klasse,
      res.questTitle,
      `${res.score}%`,
      `${res.reflection}/10`,
      res.date
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Estudiante', 'Klasse', 'Misión', 'Quiz', 'Reflexión', 'Fecha']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillStyle: 'fill', fillColor: [79, 70, 229] }, // Indigo 600
      styles: { fontSize: 8 },
    });

    doc.save(`Resultados_K3_${selectedKlasseFilter.replace(' ', '_')}_${dateStr}.pdf`);
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-slate-900">
      <header className="relative py-16 px-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Barra Alemania - Colombia Header */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-black via-red-600 via-yellow-400 via-blue-600 to-red-600 shadow-2xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 mb-8 relative z-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="w-40 h-40 bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(255,255,255,0.1)] animate-bounce-slow flex items-center justify-center border-4 border-yellow-400">
            <span className="text-8xl">🦎</span>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-blue-500 uppercase italic leading-none">KLASSEN 3</h1>
            <p className="text-3xl font-bold text-white/90 tracking-[0.3em] pixel-font">HUB DE AVENTURAS</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center relative z-10">
          <button onClick={() => setShowMediaPass(true)} className="group px-10 py-5 bg-gradient-to-br from-yellow-400 to-orange-600 text-white rounded-2xl font-black text-xl shadow-[0_10px_0_rgb(194,120,3)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-4 hover:scale-105">
            <span className="text-3xl">🪪</span> PASAPORTE DIGITAL
          </button>
          
          <button onClick={() => isAdmin ? setIsAdmin(false) : setIsAuthModalOpen(true)} className={`px-10 py-5 rounded-2xl font-black text-xl transition-all flex items-center gap-4 ${isAdmin ? 'bg-red-500 text-white shadow-[0_10px_0_rgb(153,27,27)] hover:bg-red-600' : 'bg-white/10 text-white/80 hover:bg-white/20 border-4 border-white/20'} active:translate-y-1 active:shadow-none`}>
            <span className="text-3xl">{isAdmin ? '🔒' : '👤'}</span>
            {isAdmin ? 'SALIR ADMIN' : 'DOCENTE'}
          </button>

          {isAdmin && (
            <button onClick={() => setShowResultsPanel(!showResultsPanel)} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-[0_10px_0_rgb(49,46,129)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-4 hover:bg-indigo-500">
              <span className="text-3xl">{showResultsPanel ? '🏠' : '📊'}</span> 
              {showResultsPanel ? 'IR AL HUB' : 'VER RESULTADOS'}
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {showResultsPanel ? (
          <div className="bg-white rounded-[4rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] p-12 text-slate-800 animate-in zoom-in duration-500 border-8 border-indigo-100">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl">📝</div>
                <h2 className="text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Base de Datos <span className="text-indigo-600">K3</span></h2>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-3xl shadow-inner border-2 border-slate-200">
                  <span className="font-black text-slate-400 ml-4 uppercase text-[10px] tracking-widest">Filtro Klasse:</span>
                  {['Todas', 'K3A', 'K3B', 'K3C', 'K3D'].map(k => (
                    <button key={k} onClick={() => setSelectedKlasseFilter(k)} className={`px-5 py-2 rounded-xl font-black text-sm transition-all ${selectedKlasseFilter === k ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'text-slate-500 hover:bg-white hover:text-indigo-600'}`}>
                      {k}
                    </button>
                  ))}
                </div>
                <button onClick={exportToPDF} className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-emerald-700 transition-all active:scale-95 uppercase tracking-widest">
                   <span>📥</span> EXPORTAR PDF
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border-4 border-slate-50 shadow-sm">
              <table className="w-full text-left" id="results-table">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest">Estudiante</th>
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest">Klasse</th>
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest">Misión</th>
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest text-center">Quiz (%)</th>
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest text-center">Reflexión (1-10)</th>
                    <th className="py-6 px-8 font-black uppercase text-xs tracking-widest text-right">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-50">
                  {filteredResults.length > 0 ? filteredResults.map(res => (
                    <tr key={res.id} className="hover:bg-indigo-50/50 transition-colors group">
                      <td className="py-6 px-8 font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{res.studentName}</td>
                      <td className="py-6 px-8"><span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-black text-sm">{res.klasse}</span></td>
                      <td className="py-6 px-8 font-bold text-slate-400 italic">{res.questTitle}</td>
                      <td className="py-6 px-8 text-center">
                        <div className={`text-3xl font-black ${res.score >= 80 ? 'text-emerald-500' : res.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                          {res.score}%
                        </div>
                      </td>
                      <td className="py-6 px-8 text-center">
                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-3xl font-black text-2xl shadow-lg border-b-4 ${res.reflection >= 8 ? 'bg-emerald-500 text-white border-emerald-700' : res.reflection >= 5 ? 'bg-yellow-400 text-slate-900 border-yellow-600' : 'bg-red-500 text-white border-red-700'}`}>
                           {res.reflection}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-right text-slate-300 text-[10px] font-black uppercase leading-tight">{res.date}</td>
                    </tr>
                  )).reverse() : (
                    <tr>
                      <td colSpan={6} className="py-32 text-center">
                         <div className="text-8xl opacity-10 mb-4">📭</div>
                         <p className="text-2xl font-black text-slate-200 uppercase italic tracking-widest">Aún no hay misiones completadas</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-slate-50 p-8 rounded-[2.5rem] border-4 border-dashed border-slate-200">
               <div className="text-slate-400 text-sm font-black uppercase tracking-widest">Registros Totales: {filteredResults.length}</div>
               <button onClick={() => { if(confirm('⚠️ ¿BORRAR TODO? Esta acción eliminará permanentemente todos los resultados de los estudiantes.')) { localStorage.removeItem('studentResults'); setStudentResults([]); } }} className="px-8 py-3 bg-white text-red-500 border-2 border-red-100 hover:bg-red-500 hover:text-white rounded-2xl font-black flex items-center gap-3 transition-all shadow-sm">
                 🗑️ REINICIAR TODA LA BASE DE DATOS
               </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {webQuests.map(quest => (
              <WebQuestCard key={quest.id} quest={quest} isLocked={lockedMissions.includes(quest.id)} isAdmin={isAdmin} onToggleLock={toggleLock} onClick={setSelectedQuest} />
            ))}
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="mt-40 text-center py-20 border-t border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <p className="text-white/40 font-black tracking-[0.5em] text-sm uppercase mb-4">Colegio Alemán de Barranquilla</p>
        <div className="flex justify-center gap-3 mb-8">
           <div className="w-12 h-2 bg-black rounded-full"></div>
           <div className="w-12 h-2 bg-red-600 rounded-full"></div>
           <div className="w-12 h-2 bg-yellow-400 rounded-full"></div>
           <div className="w-12 h-2 bg-blue-600 rounded-full"></div>
           <div className="w-12 h-2 bg-red-600 rounded-full"></div>
        </div>
        <p className="text-white/10 text-[10px] uppercase font-black tracking-widest italic">Sistema de Gestión de WebQuests Médianpass • Klassen 3 • Versión 2.0</p>
      </footer>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] p-12 text-slate-800 relative">
            <div className="absolute top-0 left-0 w-full h-4 bg-indigo-600"></div>
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] mx-auto flex items-center justify-center mb-6 text-5xl shadow-inner animate-pulse">
                {authMode === 'register' ? '✍️' : '🛡️'}
              </div>
              <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
                {authMode === 'register' ? 'Nuevo Administrador' : 'Panel de Control'}
              </h2>
              <p className="text-slate-400 font-bold mt-2">Solo para docentes del Colegio Alemán</p>
            </div>
            <form onSubmit={handleAuth} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Nombre de Usuario</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-4 border-transparent focus:border-indigo-600 focus:bg-white transition-all outline-none text-xl font-bold text-slate-800" placeholder="Ej: Herr Master" required />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-4">Contraseña Maestra</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-8 py-5 bg-slate-50 rounded-2xl border-4 border-transparent focus:border-indigo-600 focus:bg-white transition-all outline-none text-xl font-bold text-slate-800" placeholder="••••••••" required />
              </div>
              <div className="pt-6 flex flex-col gap-6">
                <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-2xl shadow-xl hover:bg-indigo-700 active:scale-95 transition-all uppercase tracking-tighter">
                  {authMode === 'register' ? 'CREAR ACCESO' : 'ENTRAR AL PANEL'}
                </button>
                <button type="button" onClick={() => setIsAuthModalOpen(false)} className="w-full py-4 text-slate-300 font-black hover:text-slate-500 transition-colors uppercase text-sm tracking-widest">CANCELAR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedQuest && <WebQuestDetail quest={selectedQuest} onClose={() => setSelectedQuest(null)} />}
      {showMediaPass && <MediaPass onClose={() => setShowMediaPass(false)} />}
    </div>
  );
};

export default App;
