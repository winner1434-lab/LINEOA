
import React, { useState } from 'react';
import { Reward } from '../types';
import { QrCode, X, CheckCircle2 } from 'lucide-react';

interface RedeemViewProps {
  points: number;
  rewards: Reward[];
  deductPoints: (amount: number) => boolean;
}

const RedeemView: React.FC<RedeemViewProps> = ({ points, rewards, deductPoints }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showQr, setShowQr] = useState(false);

  const handleRedeem = () => {
    if (selectedReward && deductPoints(selectedReward.pointsNeeded)) {
      setShowQr(true);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-end px-2">
        <h2 className="text-2xl font-bold">點數兌換</h2>
        <div className="text-right">
          <p className="text-xs text-gray-500">當前可用點數</p>
          <p className="text-xl font-black text-[#06C755]">{points.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {rewards.map((reward) => (
          <div 
            key={reward.id} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
            onClick={() => setSelectedReward(reward)}
          >
            <div className="relative h-28">
              <img src={reward.image} alt={reward.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                剩餘 10+
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm mb-1 leading-tight">{reward.name}</h4>
                <p className="text-[10px] text-gray-400 line-clamp-2 mb-2">{reward.description}</p>
              </div>
              <p className="text-[#06C755] font-black text-sm">{reward.pointsNeeded} pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Redemption Modal */}
      {selectedReward && !showQr && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-bold">兌換確認</h3>
              <button onClick={() => setSelectedReward(null)} className="p-1"><X /></button>
            </div>
            
            <div className="flex space-x-4 mb-8">
              <img src={selectedReward.image} className="w-24 h-24 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-lg">{selectedReward.name}</h4>
                <p className="text-gray-500 text-sm mb-2">{selectedReward.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-black text-[#06C755]">{selectedReward.pointsNeeded}</span>
                  <span className="text-sm text-gray-400">點數</span>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-xl mb-8 text-xs text-orange-600">
              提示：兌換後將立即扣除點數，且不可取消退還。請確認商品資訊。
            </div>

            <button 
              onClick={handleRedeem}
              disabled={points < selectedReward.pointsNeeded}
              className="w-full bg-[#06C755] text-white py-4 rounded-xl font-bold text-lg disabled:opacity-40"
            >
              {points < selectedReward.pointsNeeded ? '點數不足' : '確認兌換'}
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal (Success) */}
      {showQr && selectedReward && (
        <div className="fixed inset-0 bg-white z-[110] flex flex-col items-center justify-center p-8">
          <button 
            onClick={() => { setShowQr(false); setSelectedReward(null); }}
            className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"
          >
            <X />
          </button>
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#06C755] mb-6">
            <CheckCircle2 size={40} />
          </div>
          
          <h3 className="text-2xl font-bold mb-2">兌換成功</h3>
          <p className="text-gray-500 mb-10 text-center">請向櫃檯出示此核銷碼</p>
          
          <div className="bg-white p-6 rounded-3xl shadow-2xl border-2 border-gray-50 mb-10">
            <QrCode size={180} />
            <p className="mt-4 text-center font-mono font-bold tracking-[0.5em] text-gray-400">#882-991-03</p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between border-b pb-2 text-sm">
              <span className="text-gray-400">兌換商品</span>
              <span className="font-bold">{selectedReward.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2 text-sm">
              <span className="text-gray-400">有效期限</span>
              <span className="font-bold">2024-06-30</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default RedeemView;
