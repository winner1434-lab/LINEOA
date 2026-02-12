
import React from 'react';
import { Home, Wallet, Gift, Trophy } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const tabs = [
    { id: AppView.HOME, label: '首頁', icon: <Home size={20} /> },
    { id: AppView.EARN, label: '累點', icon: <Wallet size={20} /> },
    { id: AppView.REDEEM, label: '兌換', icon: <Gift size={20} /> },
    { id: AppView.CAMPAIGN, label: '活動', icon: <Trophy size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-20 max-w-md mx-auto z-50 pb-safe">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            currentView === tab.id ? 'text-[#06C755]' : 'text-gray-400'
          }`}
        >
          <div className="mb-1">{tab.icon}</div>
          <span className="text-[10px] font-medium">{tab.label}</span>
          {currentView === tab.id && (
            <div className="w-1 h-1 bg-[#06C755] rounded-full mt-1" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
