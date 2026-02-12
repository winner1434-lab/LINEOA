
import React from 'react';
import { User, AppView } from '../types';
import { ChevronRight, Ticket, Bell, Sparkles, MessageCircle } from 'lucide-react';

interface HomeViewProps {
  user: User;
  navigateTo: (view: AppView) => void;
  onOpenAI: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, navigateTo, onOpenAI }) => {
  return (
    <div className="p-4 space-y-6">
      {/* Member Card */}
      <div className="bg-gradient-to-br from-[#06C755] to-[#05a647] rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 p-4">
          <Sparkles size={80} />
        </div>
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-sm opacity-80 mb-1">{user.level}</p>
            <h3 className="text-2xl font-bold">{user.name || '親愛的會員'}</h3>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80 mb-1">目前點數</p>
            <p className="text-3xl font-black">{user.points.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-4 border-t border-white/20">
          <div className="flex items-center">
            <Ticket size={14} className="mr-1" />
            <span>5 張優惠券可用</span>
          </div>
          <button 
            onClick={() => navigateTo(AppView.REDEEM)}
            className="bg-white/20 px-3 py-1 rounded-full font-bold hover:bg-white/30 transition-colors"
          >
            點數兌換
          </button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <button 
        onClick={onOpenAI}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg flex items-center justify-between text-white active:scale-95 transition-transform"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <MessageCircle size={22} />
          </div>
          <div className="text-left">
            <p className="font-bold text-sm">AI 智能小幫手</p>
            <p className="text-[10px] opacity-80">有任何點數問題？問我就對了！</p>
          </div>
        </div>
        <ChevronRight size={18} />
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigateTo(AppView.EARN)}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-3">
              <Ticket size={20} />
            </div>
            <span className="font-bold">發票集點</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </button>
        
        <button 
          onClick={() => navigateTo(AppView.CAMPAIGN)}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mr-3">
              <Bell size={20} />
            </div>
            <span className="font-bold">幸運大抽獎</span>
          </div>
          <ChevronRight size={18} className="text-gray-300" />
        </button>
      </div>

      {/* Latest Offers */}
      <div>
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-lg">熱門兌換</h3>
          <button onClick={() => navigateTo(AppView.REDEEM)} className="text-xs text-[#06C755] font-bold">查看全部</button>
        </div>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2 px-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-shrink-0 w-40 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={`https://picsum.photos/seed/offer${i}/200/150`} alt="Offer" className="w-full h-24 object-cover" />
              <div className="p-3">
                <p className="text-xs font-bold truncate mb-1">超值兌換商品 {i}</p>
                <p className="text-[#06C755] text-sm font-black">{(i * 100) + 200} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mx-2">
        <h3 className="font-bold mb-4">最近活動</h3>
        <div className="space-y-4">
          {[
            { title: '點數兌換：星巴克', date: '2024-03-20', points: -1200 },
            { title: '發票集點：消費獎勵', date: '2024-03-18', points: +150 }
          ].map((act, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <div>
                <p className="font-medium text-gray-700">{act.title}</p>
                <p className="text-xs text-gray-400">{act.date}</p>
              </div>
              <p className={`font-bold ${act.points > 0 ? 'text-[#06C755]' : 'text-red-500'}`}>
                {act.points > 0 ? `+${act.points}` : act.points}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
