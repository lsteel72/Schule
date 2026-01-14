
import React from 'react';
import { WebQuest } from '../types';

interface WebQuestCardProps {
  quest: WebQuest;
  isLocked: boolean;
  isAdmin: boolean;
  onToggleLock: (id: number) => void;
  onClick: (quest: WebQuest) => void;
}

const WebQuestCard: React.FC<WebQuestCardProps> = ({ quest, isLocked, isAdmin, onToggleLock, onClick }) => {
  return (
    <div 
      className={`relative group rounded-3xl overflow-hidden transition-all duration-300 h-64 cursor-pointer
        ${isLocked && !isAdmin ? 'opacity-50 grayscale' : 'hover:-translate-y-2 hover:shadow-2xl'}
      `}
      onClick={() => isLocked && !isAdmin ? null : onClick(quest)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-90`}></div>
      
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {quest.platform}
          </span>
          {isLocked && (
            <div className="bg-black/40 p-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-1 leading-tight">{quest.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2">{quest.description}</p>
        </div>

        {isAdmin && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock(quest.id);
            }}
            className={`mt-4 w-full py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors
              ${isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'}
            `}
          >
            {isLocked ? 'Desbloquear Misión' : 'Bloquear Misión'}
          </button>
        )}
      </div>

      {!isLocked && !isAdmin && (
        <div className="absolute bottom-4 right-4 bg-white text-indigo-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default WebQuestCard;
