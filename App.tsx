
import React, { useState, useEffect } from 'react';
import { WebQuest, AdminUser, StudentResult } from './types';
import { webQuests } from './data/webquests';
import WebQuestCard from './components/WebQuestCard';
import WebQuestDetail from './components/WebQuestDetail';
import { jsPDF } from 'https://esm.sh/jspdf';
import autoTable from 'https://esm.sh/jspdf-autotable';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [lockedMissions, setLockedMissions] = useState<number[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<WebQuest | null>(null);
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

  const sendEmailNotification = (user: string, pass: string) => {
    const subject = encodeURIComponent("ACCESO ADMIN TECNOLOGIA - KLASSEN 3");
    const body = encodeURIComponent(`Nuevas credenciales configuradas:\n\nUsuario: ${user}\nContraseña: ${pass}\n\nEste correo es para soporte administrativo.`);
    window.location.href = `mailto:lsteel72@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      const newUser = { username, passwordHash: btoa(password) };
      setAdminUser(newUser);
      localStorage.setItem('adminUser', JSON.stringify(newUser));
      setIsAdmin(true);
      setIsAuthModalOpen(false);
      if (confirm("✅ Registro exitoso. ¿Enviar copia a soporte (lsteel72@gmail.com)?")) {
        sendEmailNotification(username, password);
      }
    } else {
      if (adminUser && username === adminUser.username && btoa(password) === adminUser.passwordHash) {
        setIsAdmin(true);
        setIsAuthModalOpen(false);
      } else {
        alert("❌ Error de acceso");
      }
    }
    setUsername('');
    setPassword('');
  };

  const exportResultsToPDF = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text(`Resultados TECNOLOGIA K3 - ${selectedKlasseFilter}`, 14, 20);
    doc.setFontSize(10);
    doc.text(`Fecha de exportación: ${dateStr}`, 14, 28);
    
    autoTable(doc, {
      startY: 35,
      head: [['Nombre', 'Klasse', 'Misión Realizada', 'EVALUACIÓN (%)', 'Reflexión (1-10)']],
      body: filteredResults.map(r => [r.studentName, r.klasse, r.questTitle, `${r.score}%`, r.reflection]),
      headStyles: { fillColor: [79, 70, 229] },
      theme: 'grid'
    });
    doc.save(`K3_Resultados_TECNOLOGIA_${selectedKlasseFilter}_${dateStr}.pdf`);
  };

  const exportQuestsToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229);
    doc.text("GUÍA PEDAGÓGICA - TECNOLOGIA K3", 14, 25);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Hub de Aventuras Digitales - Klassen 3", 14, 33);
    
    let yPos = 45;
    webQuests.forEach((q, index) => {
      if (yPos > 240) {
        doc.addPage();
        yPos = 25;
      }
      doc.setFontSize(14);
      doc.setTextColor(30);
      doc.setFont("helvetica", "bold");
      doc.text(`${q.title} (${q.platform})`, 14, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`KMK: ${q.kmkDefinition}`, 14, yPos);
      yPos += 10;
      
      doc.setFontSize(11);
      doc.setTextColor(60);
      const taskLines = doc.splitTextToSize(`Tarea: ${q.task}`, 180);
      doc.text(taskLines, 14, yPos);
      yPos += (taskLines.length * 5) + 5;
      
      doc.setFont("helvetica", "bold");
      doc.text("PROCESO:", 14, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");
      q.process.forEach(step => {
        const stepLines = doc.splitTextToSize(`• ${step}`, 175);
        doc.text(stepLines, 18, yPos);
        yPos += (stepLines.length * 5);
      });
      yPos += 10;
      doc.line(14, yPos, 196, yPos);
      yPos += 15;
    });
    
    doc.save("Guia_TECNOLOGIA_K3.pdf");
  };

  const filteredResults = selectedKlasseFilter === 'Todas' 
    ? studentResults 
    : studentResults.filter(r => r.klasse === selectedKlasseFilter);

  return (
    <div className="min-h-screen pb-20 bg-slate-900 overflow-x-hidden">
      <header className="py-16 px-6 flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-black via-red-600 via-yellow-400 via-blue-600 to-red-600"></div>
        <div className="flex flex-col md:flex-row items-center gap-10 mb-8 animate-in fade-in duration-1000">
          <div className="w-40 h-40 bg-white rounded-[2.5rem] p-6 shadow-2xl animate-bounce-slow flex items-center justify-center border-4 border-yellow-400">
            <span className="text-8xl">🦎</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-500 to-blue-500 uppercase italic">KLASSEN 3</h1>
            <p className="text-3xl font-bold text-white/90 tracking-[0.3em] pixel-font">TECNOLOGIA</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-10 justify-center">
          <button onClick={() => isAdmin ? setIsAdmin(false) : setIsAuthModalOpen(true)} className="px-10 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl shadow-lg active:translate-y-1 transition-all hover:bg-slate-700">
            {isAdmin ? '🔒 SALIR' : '👤 ADMIN'}
          </button>
          {isAdmin && <button onClick={() => setShowResultsPanel(!showResultsPanel)} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-lg hover:bg-indigo-700 transition-all">
            {showResultsPanel ? '🏠 INICIO' : '📊 DATOS'}
          </button>}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {showResultsPanel ? (
          <div className="bg-white rounded-[3rem] p-12 text-slate-800 shadow-2xl border-8 border-indigo-100 overflow-hidden animate-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
               <h2 className="text-4xl font-black uppercase italic">Base de Datos <span className="text-indigo-600">K3</span></h2>
               <div className="flex flex-wrap gap-4 justify-center">
                 <button onClick={exportQuestsToPDF} className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-black transition-colors">📜 GUÍA PDF</button>
                 <select onChange={(e) => setSelectedKlasseFilter(e.target.value)} className="px-4 py-2 rounded-xl bg-slate-100 font-bold outline-none border-2 border-slate-200">
                   {['Todas', 'K3A', 'K3B', 'K3C', 'K3D'].map(k => <option key={k} value={k}>{k}</option>)}
                 </select>
                 <button onClick={exportResultsToPDF} className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors">📥 RESULTADOS PDF</button>
               </div>
            </div>
            <div className="overflow-x-auto rounded-2xl border-4 border-slate-50">
               <table className="w-full text-left">
                 <thead className="bg-slate-900 text-white">
                   <tr>
                     <th className="p-4">Estudiante</th>
                     <th className="p-4">Klasse</th>
                     <th className="p-4">Misión</th>
                     <th className="p-4 text-center">EVALUACIÓN</th>
                     <th className="p-4 text-center">Refl.</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y-2">
                   {filteredResults.length > 0 ? filteredResults.map(r => (
                     <tr key={r.id} className="hover:bg-slate-50">
                       <td className="p-4 font-black">{r.studentName}</td>
                       <td className="p-4"><span className="bg-indigo-100 px-3 py-1 rounded-lg font-bold">{r.klasse}</span></td>
                       <td className="p-4 text-slate-400 italic">{r.questTitle}</td>
                       <td className="p-4 text-center font-black text-emerald-600">{r.score}%</td>
                       <td className="p-4 text-center"><span className="w-10 h-10 bg-yellow-400 inline-flex items-center justify-center rounded-lg font-black">{r.reflection}</span></td>
                     </tr>
                   )) : (
                     <tr><td colSpan={5} className="p-10 text-center text-slate-300 font-bold italic">No hay resultados registrados aún.</td></tr>
                   )}
                 </tbody>
               </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {webQuests.map(quest => <WebQuestCard key={quest.id} quest={quest} isLocked={lockedMissions.includes(quest.id)} isAdmin={isAdmin} onToggleLock={toggleLock} onClick={setSelectedQuest} />)}
          </div>
        )}
      </main>

      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-6 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative">
             <div className="absolute top-0 left-0 w-full h-3 bg-indigo-600"></div>
             <h2 className="text-3xl font-black text-center mb-8 uppercase italic">{authMode === 'register' ? 'Registro Admin' : 'Acceso Admin'}</h2>
             <form onSubmit={handleAuth} className="space-y-6">
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none text-slate-900 font-bold" placeholder="Usuario" required />
               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-2 outline-none text-slate-900 font-bold" placeholder="Contraseña" required />
               <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95">{authMode === 'register' ? 'CREAR ADMIN' : 'ENTRAR'}</button>
               <button type="button" onClick={() => setIsAuthModalOpen(false)} className="w-full text-slate-400 font-bold uppercase text-xs hover:text-slate-600">Cancelar</button>
             </form>
           </div>
        </div>
      )}

      {selectedQuest && <WebQuestDetail quest={selectedQuest} onClose={() => setSelectedQuest(null)} />}
    </div>
  );
};

export default App;
