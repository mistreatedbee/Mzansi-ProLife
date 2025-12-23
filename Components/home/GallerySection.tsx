import React, { useState } from 'react';
import { X, Play, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const galleryItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
    title: 'Community Activities',
    category: 'Community Engagement'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80',
    title: 'Training Sessions',
    category: 'Skills Development'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&auto=format&fit=crop&q=80',
    title: 'Agricultural Projects',
    category: 'Farming & Agriculture'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
    title: 'Sports Development',
    category: 'Youth Engagement'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop&q=80',
    title: 'Business Development',
    category: 'Entrepreneurship'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    title: 'Community Help Centres',
    category: 'Sizanani Centres'
  },
  {
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video
    title: 'Community Impact Video',
    category: 'Impact Stories'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    title: 'Ambassador Training',
    category: 'Ambassadors'
  }
];

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-green-600 font-semibold mb-4">OUR IMPACT</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See our work in action across communities, training sessions, agricultural projects, and sports development
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white" />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-green-200">{item.category}</p>
                </div>
              </div>

              {/* Icon Badge */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type === 'image' ? (
                  <ImageIcon className="w-4 h-4 text-green-600" />
                ) : (
                  <Play className="w-4 h-4 text-green-600" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
          {selectedItem && (
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={selectedItem.src}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{selectedItem.title}</h3>
                <p className="text-green-200 text-sm">{selectedItem.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

