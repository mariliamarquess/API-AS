// src/components/shared/RightSidebar.tsx
import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RightSidebar = () => {
  const [postCountToday, setPostCountToday] = useState(0);
  const [streakDays, setStreakDays] = useState(1);
  const DAILY_GOAL = 5; // Meta diária de posts

  // Timer desde o login
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 3600);
  const { seconds, minutes, hours, start, pause } = useTimer({ expiryTimestamp, autoStart: true });

  // Dados para o gráfico circular
  const chartData = [
    { name: "Completado", value: postCountToday },
    { name: "Restante", value: Math.max(0, DAILY_GOAL - postCountToday) }
  ];

  const COLORS = ["#6366F1", "#374151"]; // Cores: roxo (primário) e cinza

  // Simulação de eventos de post
  useEffect(() => {
    const handlePost = () => setPostCountToday(prev => prev + 1);
    window.addEventListener("post-criado", handlePost);
    return () => window.removeEventListener("post-criado", handlePost);
  }, []);

  return (
    <aside className="hidden lg:flex flex-col gap-6 p-4 w-64 bg-dark-3 text-white shadow-lg rounded-xl">
      {/* Timer online */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm uppercase tracking-wide text-light-3">Tempo online</span>
        <div className="text-2xl font-mono font-semibold text-primary-500">
          {`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </div>
      </div>

      {/* Gráfico Circular de Posts */}
      <div className="flex flex-col items-center">
        <span className="text-sm text-light-3 mb-1">Progresso diário</span>
        <div className="w-full h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Contador central */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-xl font-semibold block">{postCountToday}</span>
            <span className="text-xs text-light-3">de {DAILY_GOAL}</span>
          </div>
        </div>
        <span className="text-sm text-light-3 mt-1">Posts hoje</span>
      </div>

      {/* Dias consecutivos */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm text-light-3">Dias seguidos postando</span>
        <span className="text-xl font-semibold text-yellow-400">{streakDays}</span>
      </div>
    </aside>
  );
};

export default RightSidebar;