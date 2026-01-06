import { useState, useEffect } from "react";
import { ExerciseVideo, Student, Plan } from "../types";
import { VIDEOS } from "../constants";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { VIDEO_CATEGORIES } from "../constants";
import AdminAnamneses from "./AdminAnamneses";




type Tab = "videos" | "students" | "plans" | "anamneses";


const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<Tab>("videos");
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [youtubeInput, setYoutubeInput] = useState("");




  const toYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";

    // já está no formato correto
    if (url.includes("youtube.com/embed/")) {
      return url;
    }

    // formato curto youtu.be/ID
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // formato padrão youtube.com/watch?v=ID
    const match = url.match(/v=([^&]+)/);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return url; // fallback (não quebra)
  };


  // ----------------
  // ---- VÍDEOS ----
  // ----------------
  const [videos, setVideos] = useState<ExerciseVideo[]>(() =>
    loadFromStorage("admin_videos", VIDEOS)
  );
  
  const [videoForm, setVideoForm] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    thumbnail: "",
    videoUrl: "",
    
  });
  useEffect(() => {
    saveToStorage("admin_videos", videos);
  }, [videos]);

  // ----------------
  // ---- ALUNOS ----
  // ----------------
  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage("admin_students", [])
  );
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    notes: "",
  });
  useEffect(() => {
    saveToStorage("admin_students", students);
  }, [students]);

  // ----------------
  // ---- PLANOS ----
  // ----------------
  const [plans, setPlans] = useState<Plan[]>(() =>
    loadFromStorage("admin_plans", [])
  );

  const [planForm, setPlanForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  useEffect(() => {
    saveToStorage("admin_plans", plans);
  }, [plans]);

  /* =======================
     HANDLERS VÍDEOS
  ======================= */
  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  };

  const saveVideo = () => {
    if (!videoForm.title || !videoForm.videoUrl) return;
    if (!videoForm.category) {alert("Selecione uma categoria"); return;}


    if (editingVideoId) {
      setVideos(
        videos.map((v) =>
          v.id === editingVideoId
            ? {
                ...v,
                ...videoForm,
                videoUrl: toYoutubeEmbedUrl(videoForm.videoUrl),
              }
            : v
        )
      );
      setEditingVideoId(null);
    } else {
      setVideos([
        ...videos,
        {
          ...videoForm,
          id: crypto.randomUUID(),
          videoUrl: toYoutubeEmbedUrl(videoForm.videoUrl),
          allowedPlans: videoForm.allowedPlans ?? [],
        },
      ]);


    }

    setVideoForm({
      title: "",
      category: "",
      description: "",
      duration: "",
      thumbnail: "",
      videoUrl: "",
    });
  };


  /* =======================
     HANDLERS ALUNOS
  ======================= */
  const handleStudentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const saveStudent = () => {
    if (!studentForm.name || !studentForm.email) return;

    if (editingStudentId) {
      setStudents(
        students.map((s) =>
          s.id === editingStudentId ? { ...s, ...studentForm } : s
        )
      );
      setEditingStudentId(null);
    } else {
      setStudents([
        ...students,
        {
          id: crypto.randomUUID(),
          ...studentForm,
        },
      ]);
    }

    setStudentForm({
      name: "",
      email: "",
      phone: "",
      plan: "",
      notes: "",
    });
  };

  /* =======================
     HANDLERS PLANOS
  ======================= */
  const handlePlanChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlanForm({ ...planForm, [e.target.name]: e.target.value });
  };

  const formatPrice = (value: string) => {
    const cleanValue = value
      .replace(/[^\d,]/g, "")
      .replace(",", ".");

    if (!cleanValue) return "";

    const number = Number(cleanValue);

    if (isNaN(number)) return "";

    return `R$ ${number.toFixed(2).replace(".", ",")} / Mês`;
  };

  const savePlan = () => {
    if (!planForm.name || !planForm.price) return;

    const formattedPrice = formatPrice(planForm.price);

    if (editingPlanId) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlanId
            ? { ...p, ...planForm, price: formattedPrice }
            : p
        )
      );
      setEditingPlanId(null);
    } else {
      setPlans([
        ...plans,
        {
          id: crypto.randomUUID(),
          ...planForm,
          price: formattedPrice,
        },
      ]);
    }

    setPlanForm({
      name: "",
      price: "",
      description: "",
    });
  };



  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Área Administrativa</h1>

      {/* ABAS */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setActiveTab("videos")}
          className={`px-6 py-2 rounded-full font-bold ${
            activeTab === "videos"
              ? "bg-pink-600"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Vídeos
        </button>

        <button
          onClick={() => setActiveTab("students")}
          className={`px-6 py-2 rounded-full font-bold ${
            activeTab === "students"
              ? "bg-pink-600"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Alunos
        </button>

        <button
          onClick={() => setActiveTab("plans")}
          className={`px-6 py-2 rounded-full font-bold ${
            activeTab === "plans"
              ? "bg-pink-600"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Planos
        </button>

        <button
          onClick={() => setActiveTab("anamneses")}
          className={`px-6 py-2 rounded-full font-bold ${
            activeTab === "anamneses"
              ? "bg-pink-600"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          Anamneses
        </button>


      </div>

      {/* =======================
          ABA VÍDEOS
      ======================= */}
      {activeTab === "videos" && (
        <>
          <h2 className="text-xl font-bold mb-4">Cadastrar Vídeo</h2>

          <div className="max-w-2xl grid gap-4 mb-12">
            <input
              name="title"
              value={videoForm.title}
              onChange={handleVideoChange}
              placeholder="Título"
              className="p-3 bg-slate-800 rounded"
            />

            <select
              name="category"
              value={videoForm.category}
              onChange={handleVideoChange}
              className="p-3 bg-slate-800 rounded text-white"
            >
              <option value="">Selecione uma categoria</option>

              {Array.isArray(VIDEO_CATEGORIES) &&
                VIDEO_CATEGORIES
                  .filter((c) => c !== "Todos")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
            </select>


            <input
              name="duration"
              value={videoForm.duration}
              onChange={handleVideoChange}
              placeholder="Duração"
              className="p-3 bg-slate-800 rounded"
            />

            <input
              name="thumbnail"
              value={videoForm.thumbnail}
              onChange={handleVideoChange}
              placeholder="Thumbnail URL"
              className="p-3 bg-slate-800 rounded"
            />

            <input
              name="videoUrl"
              value={videoForm.videoUrl}
              onChange={handleVideoChange}
              placeholder="YouTube Embed URL"
              className="p-3 bg-slate-800 rounded"
            />

            <textarea
              name="description"
              value={videoForm.description}
              onChange={handleVideoChange}
              placeholder="Descrição"
              className="p-3 bg-slate-800 rounded"
            />

            {/* =======================
                ETAPA 4 — RESTRIÇÃO POR PLANO
            ======================= */}
            <div className="bg-slate-800/50 p-4 rounded">
              <p className="text-sm font-bold mb-2 text-pink-500">
                Restrição por plano
              </p>

              {plans.length === 0 ? (
                <p className="text-xs text-slate-400">
                  Nenhum plano cadastrado (vídeo liberado para todos)
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {plans.map((plan) => (
                    <label key={plan.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={videoForm.allowedPlans?.includes(plan.name) ?? false}
                        onChange={() => {
                          const current = videoForm.allowedPlans ?? [];
                          setVideoForm({
                            ...videoForm,
                            allowedPlans: current.includes(plan.name)
                              ? current.filter((p) => p !== plan.name)
                              : [...current, plan.name],
                          });
                        }}
                      />
                      <span>
                        {plan.name}
                        <span className="text-xs text-slate-400 ml-1">
                          ({plan.price})
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={saveVideo}
              className="bg-pink-600 py-3 rounded font-bold"
            >
              {editingVideoId ? "Salvar Alterações" : "Adicionar Vídeo"}
            </button>
          </div>

          {/* =======================
              LISTA DE VÍDEOS
          ======================= */}
          <div className="grid gap-3">
            {videos.map((v) => (
              <div
                key={v.id}
                className="bg-slate-800 p-4 rounded flex justify-between items-center"
              >
                <div>
                  <strong>{v.title}</strong>

                  {v.allowedPlans && v.allowedPlans.length === 0 && (
                    <p className="text-xs text-slate-500">
                      Sem restrição de plano
                    </p>
                  )}

                  {v.allowedPlans && v.allowedPlans.length > 0 && (
                    <p className="text-xs text-pink-400">
                      Restrito a: {v.allowedPlans.join(", ")}
                    </p>
                  )}

                  <span className="block text-xs text-slate-400">
                    {v.category}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingVideoId(v.id);
                      setVideoForm({
                        title: v.title,
                        category: v.category,
                        description: v.description,
                        duration: v.duration,
                        thumbnail: v.thumbnail,
                        videoUrl: v.videoUrl,
                        allowedPlans: v.allowedPlans ?? [],
                      });
                    }}
                    className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      setVideos(videos.filter((x) => x.id !== v.id))
                    }
                    className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}


      {/* =======================
          ABA ALUNOS
      ======================= */}
      {activeTab === "students" && (
        <>
          <h2 className="text-xl font-bold mb-4">Cadastrar Aluno</h2>

          <div className="max-w-2xl grid gap-4 mb-12">
            <input name="name" value={studentForm.name} onChange={handleStudentChange} placeholder="Nome" className="p-3 bg-slate-800 rounded" />
            <input name="email" value={studentForm.email} onChange={handleStudentChange} placeholder="E-mail" className="p-3 bg-slate-800 rounded" />
            <input name="phone" value={studentForm.phone} onChange={handleStudentChange} placeholder="Telefone" className="p-3 bg-slate-800 rounded" />
            <select name="plan" value={studentForm.plan} onChange={handleStudentChange} className="p-3 bg-slate-800 rounded text-white">
              <option value="">Selecione um plano</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name} — {plan.price}
                </option>
              ))}
            </select>

            <textarea name="notes" value={studentForm.notes} onChange={handleStudentChange} placeholder="Observações" className="p-3 bg-slate-800 rounded" />

            <button onClick={saveStudent} className="bg-pink-600 py-3 rounded font-bold">
              {editingStudentId ? "Salvar Alterações" : "Cadastrar Aluno"}
            </button>
          </div>

          <div className="grid gap-3">
            {students.map((s) => (
              <div key={s.id} className="bg-slate-800 p-4 rounded flex justify-between items-center">
                <div>
                  <strong>{s.name}</strong>
                  <span className="block text-xs text-slate-400">{s.email}</span>
                  <span className="block text-xs text-pink-500 font-bold">{s.plan}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingStudentId(s.id);
                      setStudentForm({
                        name: s.name,
                        email: s.email,
                        phone: s.phone,
                        plan: s.plan,
                        notes: s.notes,
                      });
                    }}
                    className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => setStudents(students.filter((x) => x.id !== s.id))}
                    className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>

        </>
      )}

      {/* =======================
          ABA PLANOS
      ======================= */}
      {activeTab === "plans" && (
        <>
          <h2 className="text-xl font-bold mb-4">Cadastrar Plano</h2>

          <div className="max-w-2xl grid gap-4 mb-12">
            <input
              name="name"
              value={planForm.name}
              onChange={handlePlanChange}
              placeholder="Nome do plano"
              className="p-3 bg-slate-800 rounded"
            />

            <input
              name="price"
              value={planForm.price}
              onChange={handlePlanChange}
              placeholder="Preço (ex: R$ 199/mês)"
              className="p-3 bg-slate-800 rounded"
            />

            <textarea
              name="description"
              value={planForm.description}
              onChange={handlePlanChange}
              placeholder="Descrição do plano"
              className="p-3 bg-slate-800 rounded"
            />

            <button onClick={savePlan} className="bg-pink-600 py-3 rounded font-bold">
              {editingPlanId ? "Salvar Alterações" : "Adicionar Plano"}
            </button>
          </div>

          <div className="grid gap-3">
            {plans.map((p) => (
              <div
                key={p.id}
                className="bg-slate-800 p-4 rounded flex justify-between items-center"
              >
                <div>
                  <strong>{p.name}</strong>
                  <span className="block text-xs text-slate-400">{p.price}</span>
                  <p className="text-xs text-slate-400">{p.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingPlanId(p.id);
                      setPlanForm({
                        name: p.name,
                        price: p.price,
                        description: p.description,
                      });
                    }}
                    className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => setPlans(plans.filter((x) => x.id !== p.id))}
                    className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* =======================
          ABA ANAMESES
      ======================= */}
      {activeTab === "anamneses" && <AdminAnamneses />}

    </div>
  );
};

export default AdminPanel;
