'use client';

import { useState } from 'react';
import { ImagePlus, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../../../context/ApartmentContext';

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

  const {loading} = useApartment()
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setApartment({ ...apartment, images: files });
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
        <ImagePlus className="w-7 h-7 mr-2 text-primary-dark" /> Загрузить фотографии
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
        <Button
        type="submit"
        variant="primary"
        size="md"
        className="mt-4 w-full sm:w-auto"
        disabled={loading}
      >
        {loading &&
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />  
        }
        {loading ? "Сохранение..." : "Сохранить и продолжить"}
      </Button>
    </form>
  );
}