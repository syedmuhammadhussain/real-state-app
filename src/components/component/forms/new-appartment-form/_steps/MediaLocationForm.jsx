'use client';

import { useState } from 'react';
import { ImagePlus, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Форма загрузки медиа‑файлов и ввода адреса (русская локализация)
 *
 * @param {{
 *   apartment: Record<string, any>,
 *   setApartment: (apartment: any) => void,
 *   handleSubmit: (e: React.FormEvent) => void,
 * }} props
 */
export default function MediaLocationForm({ apartment, setApartment, handleSubmit }) {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setApartment({ ...apartment, images: files });
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Загрузка изображений */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <ImagePlus className="w-5 h-5 mr-2 text-primary-dark" /> Загрузить фотографии
      </h2>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      {previewUrls.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {previewUrls.map((url, idx) => (
            <div key={idx} className="w-32 h-32 border rounded overflow-hidden">
              <img src={url} alt={`Превью ${idx + 1}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      )}

      <Button type="submit" variant="primary" size="md" className="mt-4 w-full sm:w-auto">
        Сохранить и продолжить
      </Button>
    </form>
  );
}