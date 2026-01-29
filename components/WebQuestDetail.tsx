
import React, { useState } from 'react';
import { WebQuest, StudentResult } from '../types';
import { studentLists } from '../data/students';

interface WebQuestDetailProps {
  quest: WebQuest;
  onClose: () => void;
}

const WebQuestDetail: React.FC<WebQuestDetailProps> = ({ quest, onClose }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'tarea' | 'recursos' | 'proceso' | 'evaluacion' | 'reflexion'>('intro');
  const [quizScores, setQuizScores] = useState<number[]>(new Array(quest.evaluation.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reflectionValue, setReflectionValue] = useState(5);
  
  const [studentName, setStudentName] = useState('');
  const [klasse, setKlasse] = useState('K3A');
  const [duplicateError, setDuplicateError] = useState(false);

  const handleAnswer = (questionIdx: number, answerIdx: number) => {
    if (showResults) return;
    const newScores = [...quizScores];
    newScores[questionIdx] = answerIdx;
    setQuizScores(newScores);
  };

  const calculateScore = () => {
    let correct = 0;
    quest.evaluation.forEach((q, i) => {
      if (quizScores[i] === q.correctAnswer) correct++;
    });
    return (correct / quest.evaluation.length) * 100;
  };

  const saveResult = () => {
    if (!studentName) {
      alert("⚠️ ¡ALTO! Selecciona tu nombre antes de enviar la misión.");
      return;
    }

    if (quizScores.includes(-1)) {
      alert("⚠️ ¡Faltan preguntas! Responde toda la EVALUACIÓN primero.");
      setActiveTab('evaluacion');
      return;
    }

    const existingResults: StudentResult[] = JSON.parse(localStorage.getItem('studentResults') || '[]');
    const isDuplicate = existingResults.some(r => 
      r.studentName === studentName && 
      r.klasse === klasse && 
      r.questTitle === quest.title
    );

    if (isDuplicate) {
      setDuplicateError(true);
      setTimeout(() => setDuplicateError(false), 5000);
      return;
    }

    const result: StudentResult = {
      id: crypto.randomUUID(),
      studentName,
      klasse,
      questTitle: quest.title,
      score: Math.round(calculateScore()),
      reflection: reflectionValue,
      date: new Date().toLocaleString()
    };

    localStorage.setItem('studentResults', JSON.stringify([...existingResults, result]));
    setShowResults(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="max-w-5xl mx-auto my-8 bg-white rounded-[2rem] overflow-hidden text-slate-800 shadow-2xl relative border-8 border-yellow-400">
        
        {/* Cabecera */}
        <div className="bg-yellow-400 p-6 flex items-center gap-6 border-b-4 border-slate-800">
          <div className="bg-white p-3 rounded-xl border-4 border-slate-800 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <span className="text-4xl">🦎</span>
          </div>
          <h1 className="pixel-font text-2xl md:text-3xl text-slate-800 uppercase tracking-tighter">TECNOLOGIA</h1>
          <button onClick={onClose} className="ml-auto bg-slate-800 text-white p-3 rounded-full hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3"/></svg>
          </button>
        </div>

        <div className="p-8 bg-slate-50 border-b-2 border-slate-100 flex flex-col md:flex-row justify-between gap-6">
           <div>
             <h2 className="text-4xl font-black text-emerald-600 mb-2">{quest.title}</h2>
             <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full font-black text-sm uppercase tracking-widest">{quest.platform}</span>
           </div>
           <div className="bg-indigo-600 text-white p-5 rounded-3xl max-w-sm shadow-xl border-b-4 border-indigo-800">
              <p className="text-[10px] font-black uppercase mb-1 opacity-70 tracking-widest">Competencia KMK:</p>
              <p className="text-sm font-bold leading-tight italic">{quest.kmkDefinition}</p>
           </div>
        </div>

        {/* Pestañas */}
        {!showResults && (
          <div className="flex flex-wrap bg-white border-b-2 border-slate-100 p-2 gap-2">
            {[
              { id: 'intro', icon: '🌟', label: 'Inicio' },
              { id: 'tarea', icon: '🎒', label: 'Tarea' },
              { id: 'recursos', icon: '🛠️', label: 'Recursos' },
              { id: 'proceso', icon: '👣', label: 'PROCESO' },
              { id: 'evaluacion', icon: '📝', label: 'EVALUACIÓN' },
              { id: 'reflexion', icon: '🐱', label: 'Reflexión' }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex-1 min-w-[100px] p-4 rounded-xl transition-all border-b-4 ${activeTab === tab.id ? `bg-emerald-50 border-emerald-500 text-emerald-600 scale-105` : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'}`}
              >
                <div className="text-xl mb-1">{tab.icon}</div>
                <div className="font-black text-[10px] uppercase tracking-widest">{tab.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Contenido */}
        <div className="p-10 min-h-[550px]">
          {showResults ? (
            <div className="animate-in zoom-in duration-500">
              {!showReview ? (
                <div className="p-10 bg-emerald-50 rounded-[3rem] border-8 border-emerald-200 text-center">
                  <div className="text-9xl mb-6">🏆</div>
                  <h4 className="text-5xl font-black text-emerald-900 mb-4 uppercase">{studentName.split(',')[1] || studentName}</h4>
                  <p className="text-2xl font-bold text-emerald-600 mb-10 tracking-widest uppercase italic">¡MISIÓN ENVIADA CON ÉXITO!</p>
                  
                  <div className="flex flex-wrap justify-center gap-8 mb-10">
                      <div className="bg-white p-8 rounded-[2rem] border-4 border-emerald-500 shadow-xl min-w-[200px]">
                        <p className="text-xs font-black text-slate-400 uppercase mb-2">EVALUACIÓN</p>
                        <p className="text-6xl font-black text-emerald-600">{Math.round(calculateScore())}%</p>
                      </div>
                      <div className="bg-white p-8 rounded-[2rem] border-4 border-indigo-500 shadow-xl min-w-[200px]">
                        <p className="text-xs font-black text-slate-400 uppercase mb-2">Reflexión</p>
                        <p className="text-6xl font-black text-indigo-600">{reflectionValue}/10</p>
                      </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button onClick={() => setShowReview(true)} className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl flex items-center justify-center gap-3">
                      <span>👁️</span> REVISAR RESPUESTAS
                    </button>
                    <button onClick={onClose} className="px-12 py-5 bg-slate-800 text-white rounded-2xl font-black text-xl hover:bg-black transition-all shadow-2xl">
                      SALIR AL TABLERO
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-4xl font-black text-indigo-600 uppercase italic">Revisión de Misión</h3>
                    <button onClick={() => setShowReview(false)} className="text-slate-400 font-bold hover:text-slate-600 flex items-center gap-2">
                       <span>⬅️</span> VOLVER
                    </button>
                  </div>
                  <div className="space-y-8">
                    {quest.evaluation.map((q, qIdx) => {
                      const isCorrect = quizScores[qIdx] === q.correctAnswer;
                      return (
                        <div key={qIdx} className={`p-8 rounded-[2.5rem] border-4 ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                          <div className="flex items-start gap-4 mb-4">
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black flex-shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                              {isCorrect ? '✓' : '✗'}
                            </span>
                            <p className="text-xl font-black text-slate-800">{q.question}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-14">
                            {q.options.map((opt, oIdx) => {
                              let style = "bg-white border-slate-100 text-slate-400";
                              if (oIdx === q.correctAnswer) style = "bg-emerald-500 text-white border-emerald-600 shadow-md";
                              else if (oIdx === quizScores[qIdx] && !isCorrect) style = "bg-red-500 text-white border-red-600 shadow-md";
                              return (
                                <div key={oIdx} className={`p-4 rounded-xl font-bold border-2 text-sm ${style}`}>
                                  {opt}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={onClose} className="w-full py-8 bg-slate-800 text-white rounded-[2rem] font-black text-2xl hover:bg-black transition-all mt-10 uppercase tracking-widest">
                    FINALIZAR AVENTURA
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {activeTab === 'intro' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <h3 className="text-5xl font-black text-emerald-500 mb-6 uppercase italic">Introducción</h3>
                  <p className="text-2xl leading-relaxed text-slate-700 font-medium bg-white p-8 rounded-3xl border-l-8 border-emerald-500 shadow-xl">{quest.introduction}</p>
                  <div className="rounded-[3rem] overflow-hidden border-8 border-slate-100 shadow-2xl bg-white p-4">
                     <img src={quest.imageUrl} alt={quest.title} className="w-full h-auto object-contain max-h-[450px]" />
                  </div>
                </div>
              )}

              {activeTab === 'tarea' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <h3 className="text-5xl font-black text-emerald-500 mb-6 uppercase italic">La Gran Tarea</h3>
                  <div className="bg-emerald-500 text-white p-12 rounded-[3rem] shadow-2xl border-b-8 border-emerald-700">
                    <p className="text-3xl font-bold leading-tight italic">"{quest.task}"</p>
                  </div>
                </div>
              )}

              {activeTab === 'recursos' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <h3 className="text-5xl font-black text-emerald-500 mb-6 uppercase italic">Recursos</h3>
                  <div className="bg-slate-50 p-10 rounded-[3rem] border-4 border-dashed border-slate-200">
                    <h4 className="text-2xl font-black text-slate-800 mb-6 uppercase flex items-center gap-3">
                       <span className="text-4xl">🛠️</span> Herramientas Reales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {quest.resources.map((res, i) => (
                        <div key={i} className="flex items-center gap-5 bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
                          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-black">✔</div>
                          <span className="text-xl font-bold text-slate-700">{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'proceso' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <h3 className="text-5xl font-black text-emerald-500 mb-10 uppercase italic">PROCESO</h3>
                  <div className="space-y-6">
                    {quest.process.map((step, i) => (
                      <div key={i} className="p-8 rounded-[2.5rem] border-4 bg-white border-slate-100 shadow-md">
                        <div className="flex gap-8 items-center">
                          <span className="w-14 h-14 bg-emerald-500 text-white rounded-full flex-shrink-0 flex items-center justify-center font-black text-2xl shadow-lg">{i + 1}</span>
                          <p className="text-xl font-bold text-slate-700 leading-snug">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'evaluacion' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-12">
                  <h3 className="text-5xl font-black text-emerald-500 mb-6 uppercase italic">EVALUACIÓN</h3>
                  <div className="space-y-12">
                    {quest.evaluation.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-6 bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 shadow-sm">
                        <p className="text-2xl font-black text-slate-800 leading-tight">{qIdx + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((opt, oIdx) => (
                            <button 
                              key={oIdx} 
                              onClick={() => handleAnswer(qIdx, oIdx)} 
                              className={`p-6 rounded-2xl text-left font-bold border-4 text-lg transition-all ${quizScores[qIdx] === oIdx ? 'bg-emerald-600 text-white border-emerald-700 shadow-xl' : 'bg-white text-slate-600 border-slate-100'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reflexion' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-12">
                  <div className="text-center space-y-4">
                    <h3 className="text-5xl font-black text-emerald-500 uppercase italic">Reflexión Final</h3>
                    <p className="text-2xl font-bold text-slate-400 italic">¿Qué tan fácil fue esta misión?</p>
                  </div>
                  
                  <div className="bg-indigo-600 p-10 rounded-[3rem] border-b-8 border-indigo-900 shadow-2xl text-white">
                    <h4 className="text-2xl font-black mb-8 uppercase flex items-center gap-3">
                       <span className="text-4xl">🆔</span> Identidad
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-xs font-black uppercase mb-4 opacity-70 tracking-widest">Klasse</label>
                        <div className="grid grid-cols-2 gap-3">
                           {["K3A", "K3B", "K3C", "K3D"].map(k => (
                             <button key={k} onClick={() => { setKlasse(k); setStudentName(""); }} className={`py-4 rounded-2xl font-black border-4 transition-all ${klasse === k ? 'bg-white text-indigo-600 border-yellow-400' : 'bg-indigo-700 border-indigo-500 text-indigo-300'}`}>
                               {k}
                             </button>
                           ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase mb-4 opacity-70 tracking-widest">Nombre</label>
                        <select value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full px-6 py-5 rounded-2xl border-4 border-indigo-400 bg-indigo-800 text-white outline-none font-black text-xl appearance-none">
                          <option value="">-- BUSCA TU NOMBRE --</option>
                          {studentLists[klasse].map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* El Gatico */}
                  <div className="bg-white p-12 rounded-[3.5rem] border-8 border-slate-100 shadow-2xl relative overflow-hidden h-[500px]">
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 opacity-20 rotate-[-5deg]"></div>
                    <div className="absolute top-12 left-12 right-12 flex justify-between text-slate-300 font-black text-4xl opacity-30 pointer-events-none">
                       {[1,2,3,4,5,6,7,8,9,10].map(n => <span key={n}>{n}</span>)}
                    </div>
                    <div className="absolute z-20 transition-all duration-300 pointer-events-none" style={{ left: `${(reflectionValue - 1) * 11.11}%`, top: `${75 - (reflectionValue * 5)}%`, transform: 'translate(-50%, -50%)' }}>
                       <div className="relative group">
                          <div className="text-[160px] animate-bounce-slow drop-shadow-2xl">🐱</div>
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-black text-4xl border-4 border-slate-900 shadow-2xl">
                             {reflectionValue}
                          </div>
                       </div>
                    </div>
                    <input type="range" min="1" max="10" step="1" value={reflectionValue} onChange={(e) => setReflectionValue(parseInt(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" />
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between font-black uppercase tracking-widest text-slate-400">
                       <span className="bg-slate-100 px-4 py-2 rounded-xl">1 - Muy Difícil</span>
                       <span className="bg-slate-100 px-4 py-2 rounded-xl">10 - ¡Súper Fácil!</span>
                    </div>
                  </div>

                  <button 
                    onClick={saveResult} 
                    className="w-full py-10 bg-emerald-600 text-white rounded-[3rem] font-black text-4xl shadow-[0_15px_0_rgb(5,150,105)] active:translate-y-2 transition-all hover:bg-emerald-500 uppercase tracking-widest"
                  >
                    🚀 REFLEXIÓN Y ENVIAR
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebQuestDetail;
