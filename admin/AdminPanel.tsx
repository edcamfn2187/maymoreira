import { useState } from "react";
import AdminVideos from "./AdminVideos";
import AdminStudents from "./AdminStudents";
import AdminPlans from "./AdminPlans";
import AdminAnamneses from "./AdminAnamneses";
import { supabase } from "../lib/supabase";

type Tab = "videos" | "students" | "plans" | "anamneses";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("videos");

return (
  <div className="min-h-screen bg-slate-950 text-white">
    
    {/* CONTAINER CENTRAL */}
    <div className="max-w-6xl mx-auto p-8 relative">

      <h1 className="text-3xl font-bold mb-8">Área Administrativa</h1>

      {/* ABAS */}
      <div className="flex gap-4 mb-10 flex-wrap">
        {[
          ["videos", "Vídeos"],
          ["students", "Alunos"],
          ["plans", "Planos"],
          ["anamneses", "Anamneses"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as Tab)}
            className={`px-6 py-2 rounded-full font-bold ${
              activeTab === key
                ? "bg-pink-600"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={async () => await supabase.auth.signOut()}
        className="absolute top-8 right-8 text-sm bg-slate-800 px-4 py-2 rounded hover:bg-slate-700"
      >
        Sair
      </button>

      {activeTab === "videos" && <AdminVideos />}
      {activeTab === "students" && <AdminStudents />}
      {activeTab === "plans" && <AdminPlans />}
      {activeTab === "anamneses" && <AdminAnamneses />}

    </div>
  </div>
);

};

export default AdminPanel;
