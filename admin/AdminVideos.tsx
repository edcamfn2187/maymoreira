import { useEffect, useState } from "react";
import { ExerciseVideo, Plan } from "../types";
import { VIDEO_CATEGORIES } from "../constants";
import { supabase } from "../lib/supabase";

const AdminVideos = () => {
  const [videos, setVideos] = useState<ExerciseVideo[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  const [videoForm, setVideoForm] = useState<{
    title: string;
    category: string;
    description: string;
    duration: string;
    thumbnail: string;
    videoUrl: string;
    allowedPlans: string[];
  }>({
    title: "",
    category: "",
    description: "",
    duration: "",
    thumbnail: "",
    videoUrl: "",
    allowedPlans: [],
  });

  /* =======================
     YOUTUBE CONVERTER
  ======================= */
  const toYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("youtube.com/embed/")) return url;

    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("shorts/")[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    const match = url.match(/[?&]v=([^&]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return url;
  };

  /* =======================
     LOADERS
  ======================= */
  useEffect(() => {
    loadVideos();
    loadPlans();
  }, []);

  const loadVideos = async () => {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setVideos(data || []);
  };

  const loadPlans = async () => {
    const { data, error } = await supabase.from("plans").select("*");
    if (!error) setPlans(data || []);
  };

  /* =======================
     FORM HANDLER
  ======================= */
  const handleVideoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setVideoForm({ ...videoForm, [e.target.name]: e.target.value });
  };

  /* =======================
     SAVE VIDEO
  ======================= */
  const saveVideo = async () => {
    if (!videoForm.title || !videoForm.videoUrl) {
      alert("Preencha título e link do vídeo");
      return;
    }

    const embedUrl = toYoutubeEmbedUrl(videoForm.videoUrl);

    const payload = {
      title: videoForm.title,
      category: videoForm.category || null,
      description: videoForm.description || null,
      duration: videoForm.duration || null,
      thumbnail: videoForm.thumbnail || null,
      video_url: embedUrl,
      allowed_plans: videoForm.allowedPlans,
    };

    let result;

    if (editingVideoId) {
      result = await supabase
        .from("videos")
        .update(payload)
        .eq("id", editingVideoId);
    } else {
      result = await supabase
        .from("videos")
        .insert([payload]);
    }

    if (result.error) {
      console.error("ERRO SUPABASE 👉", result.error);
      alert("Erro ao salvar vídeo: " + result.error.message);
      return;
    }

    setEditingVideoId(null);

    setVideoForm({
      title: "",
      category: "",
      description: "",
      duration: "",
      thumbnail: "",
      videoUrl: "",
      allowedPlans: [],
    });

    loadVideos();
  };


  /* =======================
     DELETE VIDEO
  ======================= */
  const deleteVideo = async (id: string) => {
    if (!confirm("Deseja realmente excluir este vídeo?")) return;
    await supabase.from("videos").delete().eq("id", id);
    loadVideos();
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Cadastrar / Editar Vídeo</h2>

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
          className="p-3 bg-slate-800 rounded"
        >
          <option value="">Selecione uma categoria</option>
          {VIDEO_CATEGORIES.filter((c) => c !== "Todos").map((cat) => (
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
          placeholder="Link do YouTube"
          className="p-3 bg-slate-800 rounded"
        />

        <textarea
          name="description"
          value={videoForm.description}
          onChange={handleVideoChange}
          placeholder="Descrição"
          className="p-3 bg-slate-800 rounded"
        />

        {/* RESTRIÇÃO POR PLANO */}
        <div className="bg-slate-800/50 p-4 rounded">
          <p className="text-sm font-bold mb-2 text-pink-500">
            Restrição por plano
          </p>

          {plans.length === 0 ? (
            <p className="text-xs text-slate-400">
              Nenhum plano cadastrado (liberado para todos)
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {plans.map((plan) => (
                <label
                  key={plan.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={videoForm.allowedPlans.includes(plan.name)}
                    onChange={() => {
                      const current = videoForm.allowedPlans;
                      setVideoForm({
                        ...videoForm,
                        allowedPlans: current.includes(plan.name)
                          ? current.filter((p) => p !== plan.name)
                          : [...current, plan.name],
                      });
                    }}
                  />
                  {plan.name}
                  <span className="text-xs text-slate-400 ml-1">
                    ({plan.price})
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
          {editingVideoId ? "Salvar alterações" : "Adicionar vídeo"}
        </button>
      </div>

      {/* LISTA DE VÍDEOS */}
      <div className="grid gap-3">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-slate-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <strong>{v.title}</strong>

              <span className="block text-xs text-slate-400">
                {v.category}
              </span>

              {v.allowed_plans?.length > 0 && (
                <p className="text-xs text-pink-400">
                  Restrito a: {v.allowed_plans.join(", ")}
                </p>
              )}
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
                    videoUrl: v.video_url,
                    allowedPlans: v.allowed_plans || [],
                  });
                }}
                className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600"
              >
                Editar
              </button>

              <button
                onClick={() => deleteVideo(v.id)}
                className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-500"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminVideos;
