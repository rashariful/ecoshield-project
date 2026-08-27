// Gallery.tsx
'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from "@/lib/fetchAPI";
import { PageHeader } from "@/components/Common/PageHeader";
import { X, Play, Calendar, Clock, AlertCircle } from "lucide-react";

type GalleryItem = {
  _id: string;
  title: string;
  images: string[];
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
};

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const res = await fetchAPI<any>("/galleries");
        const rawData: GalleryItem[] = Array.isArray(res) ? res : res?.data || [];
        setGalleryItems(rawData);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const openVideoModal = (videoUrl: string) => {
    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id);
      setIsVideoModalOpen(true);
      setEmbedError(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Our Gallery"
        subtitle="Explore our work, events, and moments captured through the lens"
        backgroundImage="https://files.123freevectors.com/wp-content/original/148077-abstract-glowing-cool-blue-wave-background-design.jpg"
      />

      <section className="py-24  bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          {/* Gallery Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg border dark:border-gray-800">
              <div className="text-4xl font-bold text-primary mb-2">{galleryItems.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Projects</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg border dark:border-gray-800">
              <div className="text-4xl font-bold text-primary mb-2">
                {galleryItems.filter(item => item.images?.length > 0).reduce((acc, item) => acc + item.images.length, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Photos</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 text-center shadow-lg border dark:border-gray-800">
              <div className="text-4xl font-bold text-primary mb-2">
                {galleryItems.filter(item => item.videoUrl).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Videos</div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          {!galleryItems.length ? (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">No gallery items found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border dark:border-gray-800 group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.images[0] || "https://via.placeholder.com/800x450?text=No+Image"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {item.videoUrl && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                        </div>
                      </div>
                    )}

                    {item.images?.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        +{item.images.length - 1} more
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 capitalize line-clamp-1">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                      {item.videoUrl && (
                        <div className="flex items-center gap-1 text-primary">
                          <Play className="w-4 h-4" />
                          <span>Video</span>
                        </div>
                      )}
                    </div>

                    {item.images?.length > 1 && (
                      <div className="flex -space-x-2 mt-3">
                        {item.images.slice(1, 4).map((img, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 overflow-hidden">
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {item.images.length > 4 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium border-2 border-white dark:border-gray-900">
                            +{item.images.length - 4}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedItem(null)}>
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            
            <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Video Section - Auto Plays when modal opens */}
              {selectedItem.videoUrl && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-primary" />
                    Video Presentation
                  </h3>
                  
                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${extractVideoId(selectedItem.videoUrl)}?autoplay=1`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Images Gallery */}
              {selectedItem.images?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Gallery Images ({selectedItem.images.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedItem.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="aspect-video rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt={`${selectedItem.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="mt-8 pt-6 border-t dark:border-gray-800 flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Created: {formatDate(selectedItem.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Updated: {formatDate(selectedItem.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95" onClick={() => setSelectedImage(null)}>
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Gallery preview" 
            className="max-w-full max-h-full object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* Video Modal - Auto Plays when opened */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95" onClick={() => setIsVideoModalOpen(false)}>
          <button 
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-video" onClick={e => e.stopPropagation()}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;