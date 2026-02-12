
import React, { useState } from 'react';
import { Camera, Ticket, ChevronRight, CheckCircle2 } from 'lucide-react';

interface EarnViewProps {
  onAddPoints: (amount: number) => void;
}

const EarnView: React.FC<EarnViewProps> = ({ onAddPoints }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [serialCode, setSerialCode] = useState('');

  const handleInvoiceUpload = () => {
    // Simulation: User clicks camera, starts upload, receives points
    setTimeout(() => {
      onAddPoints(50);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleSerialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (serialCode.length >= 8) {
      onAddPoints(100);
      setShowSuccess(true);
      setSerialCode('');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 px-2">累積點數</h2>

      {showSuccess && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center animate-bounce mb-4">
          <CheckCircle2 className="mr-2" />
          <span>恭喜！點數已入帳</span>
        </div>
      )}

      {/* Main Action: Invoice */}
      <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-gray-200 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-[#06C755] mb-4">
          <Camera size={40} />
        </div>
        <h3 className="text-xl font-bold mb-2">上傳發票</h3>
        <p className="text-gray-500 text-sm mb-6">拍攝實體發票或上傳載具條碼<br />每張可獲得 10-50 點</p>
        <button 
          onClick={handleInvoiceUpload}
          className="bg-[#06C755] text-white px-8 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          立即拍攝
        </button>
      </div>

      {/* Serial Code Action */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center mb-4">
          <Ticket className="text-[#06C755] mr-2" />
          <h3 className="font-bold">輸入活動序號</h3>
        </div>
        <form onSubmit={handleSerialSubmit} className="flex space-x-2">
          <input 
            type="text" 
            placeholder="請輸入 8-12 位序號"
            value={serialCode}
            onChange={(e) => setSerialCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#06C755] outline-none"
          />
          <button 
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50"
            disabled={serialCode.length < 8}
          >
            兌換
          </button>
        </form>
      </div>

      {/* Campaign List */}
      <div>
        <h3 className="font-bold mb-4 px-2">參加活動領點數</h3>
        <div className="space-y-4">
          {[
            { title: '問券調查', desc: '完成問券領 20 點', points: 20 },
            { title: '好友推薦', desc: '推薦一名新會員領 100 點', points: 100 }
          ].map((camp, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold">{camp.title}</p>
                <p className="text-xs text-gray-500">{camp.desc}</p>
              </div>
              <button className="text-[#06C755] font-bold text-sm bg-green-50 px-3 py-1 rounded-full">去參加</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EarnView;
