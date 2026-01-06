import { useState } from "react";
import AdminVideos from "./AdminVideos";
import AdminStudents from "./AdminStudents";
import AdminPlans from "./AdminPlans";
import AdminAnamneses from "./AdminAnamneses";

type Tab = "videos" | "students" | "plans" | "anamneses";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("videos");

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Área Administrativa</h1>

      {/* ABAS */}
      <div className="flex gap-4 mb-10">
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

      {activeTab === "videos" && <AdminVideos />}
      {activeTab === "students" && <AdminStudents />}
      {activeTab === "plans" && <AdminPlans />}
      {activeTab === "anamneses" && <AdminAnamneses />}
    </div>
  );
};

export default AdminPanel;
