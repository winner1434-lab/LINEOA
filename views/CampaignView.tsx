
import React, { useState } from 'react';
import { Trophy, History, Star, Gift } from 'lucide-react';
import { WinningRecord } from '../types';

interface CampaignViewProps {
  points: number;
  deductPoints: (amount: number) => boolean;
  onWin: (prize: string) => void;
  history: WinningRecord[];
}

const CampaignView: React.FC<CampaignViewProps> = ({ points, deductPoints, onWin, history }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const startDraw = () => {
    if (deductPoints(50)) {
      setSpinning(true);
      setResult(null);
      
      // Simulate spinning
      setTimeout(() => {
        setSpinning(false);
        const win = Math.random() > 0.4;
        if (win) {
          const prize = ['LINE POINTS 50點', '10點回饋', '再抽一次', '星巴克買一送一'][Math.floor(Math.random() * 4)];
          setResult(prize);
          onWin(prize);
        } else {
          setResult('很遺憾，沒中獎');
        }
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold px-2">活動中心</h2>

      {/* Lucky Draw Box */}
      <div className="bg-gradient-to-b from-indigo-600 to-indigo-900 rounded-3xl p-6 text-white text-center shadow-xl">
        <div className="flex justify-center mb-6">
          <div className={`relative ${spinning ? 'animate-spin' : ''}`}>
            <div className="w-32 h-32 rounded-full border-4 border-yellow-400 border-dashed flex items-center justify-center bg-white/10 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
              <Star className="text-yellow-400 fill-yellow-400" size={48} />
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">盛夏轉轉樂</h3>
        <p className="text-indigo-200 text-sm mb-6">每次抽獎僅需 50 點，好禮拿不完！</p>

        {result ? (
          <div className="bg-white/10 p-4 rounded-2xl mb-6 border border-white/20 animate-pulse">
            <p className="text-yellow-300 font-bold text-lg">{result}</p>
          </div>
        ) : null}

        <button 
          onClick={startDraw}
          disabled={spinning || points < 50}
          className="w-full bg-yellow-400 text-indigo-900 py-4 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {spinning ? '開獎中...' : '立即抽獎 (50點)'}
        </button>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <History size={20} className="text-[#06C755]" />
          <h3 className="font-bold">中獎紀錄</h3>
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            <Gift size={32} className="mx-auto mb-2 opacity-20" />
            <p>尚無中獎紀錄</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((record) => (
              <div key={record.id} className="flex justify-between items-center text-sm border-b pb-3 last:border-0">
                <div>
                  <p className="font-bold text-gray-700">{record.prize}</p>
                  <p className="text-xs text-gray-400">{record.date}</p>
                </div>
                <button className="text-[#06C755] text-xs font-bold border border-[#06C755] px-3 py-1 rounded-full">查看獎項</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start space-x-3">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Trophy size={20} />
        </div>
        <div>
          <p className="font-bold text-sm text-blue-800">累積活動點數換大獎</p>
          <p className="text-xs text-blue-600">參與 5 次活動可解鎖「資深玩家」勳章與專屬 500 點獎勵！</p>
        </div>
      </div>
    </div>
  );
};

export default CampaignView;
