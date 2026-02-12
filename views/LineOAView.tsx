
import React from 'react';
import { ChevronLeft, MoreHorizontal, Phone, MessageCircle, User, Grid, Info, Gift, Award, Calendar } from 'lucide-react';

interface LineOAViewProps {
  onEnterLiff: () => void;
}

const LineOAView: React.FC<LineOAViewProps> = ({ onEnterLiff }) => {
  return (
    <div className="flex flex-col h-full bg-[#8CABD9] relative">
      {/* LINE Chat Header */}
      <div className="bg-[#2B3545] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <ChevronLeft size={24} />
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/brand/100/100" alt="Brand" />
            </div>
            <div>
              <p className="font-bold text-sm">品牌官方帳號</p>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                <span className="text-[10px] text-gray-400">正在回覆...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone size={20} />
          <MoreHorizontal size={20} />
        </div>
      </div>

      {/* Chat History Simulation */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto no-scrollbar pb-80">
        <div className="flex justify-center">
          <span className="bg-black/20 text-white text-[10px] px-3 py-1 rounded-full">2024年3月21日 星期四</span>
        </div>

        <div className="flex items-start space-x-2 max-w-[85%]">
          <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 overflow-hidden mt-1">
             <img src="https://picsum.photos/seed/brand/100/100" alt="Brand" />
          </div>
          <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm relative">
            <p className="text-sm">歡迎加入我們的官方帳號！點擊下方選單即可查看最新優惠與會員權益 😊</p>
            <span className="absolute bottom-0 -right-8 text-[10px] text-white/60">10:00</span>
          </div>
        </div>

        <div className="flex items-start space-x-2 max-w-[85%]">
          <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 overflow-hidden mt-1">
             <img src="https://picsum.photos/seed/brand/100/100" alt="Brand" />
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none shadow-sm overflow-hidden w-full">
            <img src="https://picsum.photos/seed/welcome/400/200" alt="Welcome" className="w-full h-32 object-cover" />
            <div className="p-3">
              <p className="font-bold text-sm mb-1">新會員募集活動中！</p>
              <p className="text-xs text-gray-500">完成註冊立即送 500 點開卡禮，還有眾多商品等您來兌換。</p>
            </div>
          </div>
        </div>
      </div>

      {/* LINE Input Bar Area */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-white flex items-center px-4 py-2 border-t border-gray-200">
          <Grid size={24} className="text-gray-400 mr-4" />
          <div className="flex-1 bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-400 text-sm">
            請輸入訊息...
          </div>
          <MessageCircle size={24} className="text-gray-400 ml-4" />
        </div>

        {/* Rich Menu Simulation */}
        <div className="bg-gray-100 h-64 grid grid-cols-3 grid-rows-2 gap-[1px]">
          {/* Item 1: Member Center - CLICKABLE */}
          <button 
            onClick={onEnterLiff}
            className="bg-white flex flex-col items-center justify-center p-2 active:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center text-white mb-2 shadow-sm">
              <User size={24} />
            </div>
            <span className="text-xs font-bold">會員中心</span>
            <span className="text-[9px] text-gray-400">點擊登入/註冊</span>
          </button>

          <button className="bg-white flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-2">
              <Gift size={24} />
            </div>
            <span className="text-xs font-bold text-gray-700">最新優惠</span>
          </button>

          <button className="bg-white flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-2">
              <Award size={24} />
            </div>
            <span className="text-xs font-bold text-gray-700">集點任務</span>
          </button>

          <button className="bg-white flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-2">
              <Calendar size={24} />
            </div>
            <span className="text-xs font-bold text-gray-700">門市查詢</span>
          </button>

          <button className="bg-white flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-2">
              <Info size={24} />
            </div>
            <span className="text-xs font-bold text-gray-700">常見問題</span>
          </button>

          <button className="bg-white flex flex-col items-center justify-center p-2">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-2">
              <MoreHorizontal size={24} />
            </div>
            <span className="text-xs font-bold text-gray-700">其他設定</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineOAView;
