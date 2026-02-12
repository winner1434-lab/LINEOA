
import React from 'react';
import { MessageSquare } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-white">
      <div className="mb-10 text-center">
        <div className="w-24 h-24 bg-[#06C755] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <MessageSquare size={48} className="text-white fill-current" />
        </div>
        <h1 className="text-2xl font-bold mb-2">歡迎使用會員中心</h1>
        <p className="text-gray-500">加入會員享受更多專屬優惠與點數回饋</p>
      </div>

      <button
        onClick={onLogin}
        className="w-full bg-[#06C755] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center shadow-md active:scale-95 transition-transform"
      >
        <MessageSquare size={20} className="mr-2 fill-current" />
        使用 LINE 帳號登入
      </button>
      
      <p className="mt-8 text-xs text-center text-gray-400">
        點擊登入即代表您同意本服務的<br />
        <span className="underline">服務條款</span> 與 <span className="underline">隱私權政策</span>
      </p>
    </div>
  );
};

export default LoginView;
