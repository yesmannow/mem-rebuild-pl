'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DndContext, closestCenter, useDroppable, useDraggable } from '@dnd-kit/core';
// TODO: node-vibrant default export issue - using dynamic import workaround
// @ts-ignore - node-vibrant has incorrect default export types
import Vibrant from 'node-vibrant';

// --- Types ---
type MoodboardImage = {
  id: string;
  src: string;
  palette: string[];
};

// --- Sortable Item (inline, can be moved to SortableItem.tsx) ---
function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...(listeners as any)} {...(attributes as any)}>
      {children}
    </div>
  );
}

// --- Droppable Area ---
function DroppableArea({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="grid grid-cols-3 gap-4 p-4 border-2 border-dashed rounded-lg">
      {children}
    </div>
  );
}

// --- Main Component ---
export default function MoodboardModule() {
  const [images, setImages] = useState<MoodboardImage[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      const src = URL.createObjectURL(file);

      // Extract palette with node-vibrant
      const palette = await Vibrant.from(src).getPalette();
      // TODO: Guard swatch usage - node-vibrant types may not be fully accurate
      const colors: string[] = [];
      Object.values(palette).forEach(swatch => {
        if (swatch && typeof (swatch as any).getHex === 'function') {
          colors.push((swatch as any).getHex());
        }
      });

      setImages(prev => [...prev, { id: `${file.name}-${Date.now()}`, src, palette: colors }]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Moodboard</h2>

      {/* Dropzone */}
      <div
        {...(getRootProps() as any)}
        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${
          isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-slate-50 border-slate-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-slate-600">
          {isDragActive ? 'Drop your images here…' : 'Drag & drop images, or click to upload'}
        </p>
      </div>

      {/* Images + Palettes */}
      <DndContext collisionDetection={closestCenter}>
        <DroppableArea id="moodboard">
          {images.map(img => (
            <SortableItem key={img.id} id={img.id}>
              <div className="rounded-lg shadow overflow-hidden bg-white">
                <img src={img.src} alt="" className="w-full h-32 object-cover" />
                <div className="flex">
                  {img.palette.map((c, i) => (
                    <div key={i} className="flex-1 h-6" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            </SortableItem>
          ))}
        </DroppableArea>
      </DndContext>
    </section>
  );
}
