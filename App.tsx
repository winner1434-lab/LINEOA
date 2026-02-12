
import React, { useState, useEffect } from 'react';
import { AppView, User, WinningRecord } from './types';
import { MOCK_REWARDS } from './constants';
import { 
  User as UserIcon, 
  X,
  MessageCircle,
  Settings
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import EarnView from './views/EarnView';
import RedeemView from './views/RedeemView';
import CampaignView from './views/CampaignView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import LineOAView from './views/LineOAView';
import AIChatView from './views/AIChatView';

const App: React.FC = () => {
  // 從 LocalStorage 初始化狀態
  const [currentView, setCurrentView] = useState<AppView>(AppView.LINE_OA);
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('line_member_user');
    return saved ? JSON.parse(saved) : {
      name: '',
      phone: '',
      lineUid: 'U1234567890abcdef',
      points: 850,
      level: '金卡會員',
      isRegistered: false,
    };
  });

  const [winningHistory, setWinningHistory] = useState<WinningRecord[]>(() => {
    const saved = localStorage.getItem('line_member_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [showAI, setShowAI] = useState(false);

  // 當狀態改變時存入 LocalStorage
  useEffect(() => {
    localStorage.setItem('line_member_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('line_member_history', JSON.stringify(winningHistory));
  }, [winningHistory]);

  const navigateTo = (view: AppView) => {
    if (!user.isRegistered && 
        view !== AppView.REGISTER && 
        view !== AppView.LOGIN && 
        view !== AppView.LINE_OA) {
      setCurrentView(AppView.LOGIN);
    } else {
      setCurrentView(view);
    }
  };

  const handleRegister = (name: string, phone: string) => {
    setUser(prev => ({ ...prev, name, phone, isRegistered: true, points: prev.points + 500 })); // 註冊送500點
    setCurrentView(AppView.HOME);
  };

  const addPoints = (amount: number) => {
    setUser(prev => ({ ...prev, points: prev.points + amount }));
  };

  const deductPoints = (amount: number) => {
    if (user.points >= amount) {
      setUser(prev => ({ ...prev, points: prev.points - amount }));
      return true;
    }
    return false;
  };

  const closeLiff = () => {
    setCurrentView(AppView.LINE_OA);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-gray-100">
      {/* 外部網域開啟時的優化 Header */}
      {currentView !== AppView.LINE_OA && (
        <header className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#06C755] flex items-center justify-center text-white">
              <UserIcon size={18} />
            </div>
            <span className="font-bold text-lg">會員中心</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {user.isRegistered ? user.level : '訪客'}
            </div>
            <button 
              onClick={closeLiff}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
            >
              <X size={20} />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 ${user.isRegistered && currentView !== AppView.LINE_OA ? 'pb-24' : ''} overflow-y-auto no-scrollbar`}>
        {currentView === AppView.LINE_OA && (
          <LineOAView onEnterLiff={() => setCurrentView(user.isRegistered ? AppView.HOME : AppView.LOGIN)} />
        )}

        {currentView === AppView.LOGIN && (
          <LoginView onLogin={() => setCurrentView(AppView.REGISTER)} />
        )}
        
        {currentView === AppView.REGISTER && (
          <RegisterView onComplete={handleRegister} initialUid={user.lineUid} />
        )}

        {currentView === AppView.HOME && (
          <HomeView user={user} navigateTo={navigateTo} onOpenAI={() => setShowAI(true)} />
        )}

        {currentView === AppView.EARN && (
          <EarnView onAddPoints={addPoints} />
        )}

        {currentView === AppView.REDEEM && (
          <RedeemView 
            points={user.points} 
            deductPoints={deductPoints} 
            rewards={MOCK_REWARDS} 
          />
        )}

        {currentView === AppView.CAMPAIGN && (
          <CampaignView 
            points={user.points} 
            deductPoints={deductPoints}
            onWin={(prize) => setWinningHistory(prev => [{
              id: Math.random().toString(36).substr(2, 9),
              prize,
              date: new Date().toLocaleDateString()
            }, ...prev])}
            history={winningHistory}
          />
        )}
      </main>

      {/* AI 客服彈窗 */}
      {showAI && <AIChatView user={user} onClose={() => setShowAI(false)} />}

      {/* Navigation Bar */}
      {user.isRegistered && currentView !== AppView.LINE_OA && (
        <Navbar currentView={currentView} onNavigate={navigateTo} />
      )}

      {/* 開發測試用：清除資料按鈕 (僅在外部網域模擬時有用) */}
      <button 
        onClick={() => { localStorage.clear(); window.location.reload(); }}
        className="fixed bottom-4 left-4 z-[100] w-8 h-8 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-400 opacity-20 hover:opacity-100"
        title="重置資料"
      >
        <Settings size={14} />
      </button>
    </div>
  );
};

export default App;
