
import React, { useState } from 'react';

interface RegisterViewProps {
  onComplete: (name: string, phone: string) => void;
  initialUid: string;
}

const RegisterView: React.FC<RegisterViewProps> = ({ onComplete, initialUid }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onComplete(name, phone);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">填寫基本資料</h2>
        <p className="text-gray-500">最後一步，完成註冊即可領取開卡禮</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LINE UID (自動擷取)</label>
          <input
            type="text"
            value={initialUid}
            disabled
            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">手機號碼 <span className="text-red-500">*</span></label>
          <input
            type="tel"
            placeholder="請輸入 10 位數手機號碼"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#06C755] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">真實姓名 <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="請輸入您的姓名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#06C755] focus:border-transparent outline-none"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#06C755] text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-transform disabled:opacity-50"
            disabled={!name || !phone}
          >
            完成註冊
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;
