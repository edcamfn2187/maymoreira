import { useState } from "react";
import { VIDEOS } from "../constants";

const AdminVideos = () => {
  const [videos, setVideos] = useState(VIDEOS);

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    thumbnail: "",
    videoUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.title || !form.videoUrl) return;

    setVideos([
      ...videos,
      {
        id: crypto.randomUUID(),
        ...form,
      },
    ]);

    setForm({
      title: "",
      category: "",
      description: "",
      duration: "",
      thumbnail: "",
      videoUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Área Administrativa</h1>

      {/* FORM */}
      <div className="max-w-2xl grid gap-4 mb-12">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Título" className="p-3 bg-slate-800 rounded" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Categoria" className="p-3 bg-slate-800 rounded" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duração" className="p-3 bg-slate-800 rounded" />
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="Thumbnail URL" className="p-3 bg-slate-800 rounded" />
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="YouTube Embed URL" className="p-3 bg-slate-800 rounded" />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="p-3 bg-slate-800 rounded" />

        <button onClick={handleAdd} className="bg-pink-600 py-3 rounded font-bold">
          Adicionar Vídeo
        </button>
      </div>

      {/* LISTA */}
      <div className="grid gap-4">
        {videos.map((v) => (
          <div key={v.id} className="bg-slate-800 p-4 rounded">
            <strong>{v.title}</strong>
            <p className="text-sm text-slate-400">{v.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideos;
