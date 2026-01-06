import { useEffect, useState } from "react";
import { ExerciseVideo } from "../types";
import { VIDEOS, VIDEO_CATEGORIES } from "../constants";

const VideoGrid = () => {
  const [videos, setVideos] = useState<ExerciseVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<ExerciseVideo | null>(null);
  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    const stored = localStorage.getItem("admin_videos");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setVideos(parsed);
      } catch {
        setVideos(VIDEOS);
      }
    } else {
      setVideos(VIDEOS);
    }
  }, []);

  const filteredVideos =
    filter === "Todos"
      ? videos
      : videos.filter((v) => v.category === filter);

  return (
    <section id="videos" className="py-20 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-oswald font-bold mb-8 text-white border-l-4 border-pink-500 pl-4 uppercase">
          Instruções em Vídeo
        </h2>

        {/* =======================
            CATEGORIAS
        ======================= */}
        <div className="flex flex-wrap gap-2 mb-10">
          {Array.isArray(VIDEO_CATEGORIES) &&
            VIDEO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                  filter === cat
                    ? "bg-pink-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
        </div>

        {/* =======================
            GRID DE VÍDEOS
        ======================= */}
        {filteredVideos.length === 0 ? (
          <p className="text-slate-400">
            Nenhum vídeo encontrado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-slate-800/40 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 transition border border-white/5 hover:border-pink-500/40"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="aspect-video bg-black">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                      Sem thumbnail
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-white">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {video.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =======================
            MODAL DE VÍDEO
        ======================= */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/70 text-white px-3 py-1 rounded hover:bg-pink-600"
              >
                Fechar
              </button>

              <iframe
                className="w-full h-full"
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoGrid;
