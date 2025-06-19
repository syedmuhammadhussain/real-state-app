'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../../../context/ApartmentContext';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function MediaLocationForm({ apartment, setApartment, handleSubmit }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const { loading } = useApartment();
  const { toast } = useToast();
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

  // Convert existing URLs to Blob Files on edit
  useEffect(() => {
    async function convertExistingImagesToBlobs() {
      if (!apartment.images?.length) return;

      const updatedImages = await Promise.all(
        apartment.images.map(async (img) => {
          if (typeof img === 'object' && img instanceof File) return img;

          const url = typeof img === 'string' ? img : img.url;
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const name = url.split('/').pop()?.split('?')[0] || 'image.jpg';
            return new File([blob], name, { type: blob.type });
          } catch (error) {
            console.error('Error converting image URL to Blob:', error);
            return null;
          }
        })
      );

      const validImages = updatedImages.filter(Boolean);
      const urls = validImages.map(file => URL.createObjectURL(file));
      setApartment(prev => ({ ...prev, images: validImages }));
      setPreviewUrls(urls);
    }

    convertExistingImagesToBlobs();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setError(`Некоторые файлы превышают 20МБ: ${oversizedFiles.map(f => f.name).join(', ')}`);
      toast({
        title: "Ошибка загрузки",
        description: `Максимальный размер файла: 20МБ`,
        variant: "destructive",
      });
      return;
    }

    setError('');

    try {
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      const updatedImages = [...(apartment.images || []), ...files];
      setApartment({ ...apartment, images: updatedImages });
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    } catch (err) {
      setError('Ошибка обработки файлов');
      console.error('File processing error:', err);
    }
  };

  const handleRemoveImage = (index) => {
    const fileToRemove = apartment.images[index];
    setApartment(prev => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { ...prev, images: updatedImages };
    });

    setPreviewUrls(prev => {
      const updatedPreviews = [...prev];
      if (updatedPreviews[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(updatedPreviews[index]);
      }
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
          <ImagePlus className="w-6 h-6 mr-2 text-primary-dark" /> Загрузка фотографий
        </h2>

        <div className="flex flex-col gap-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors hover:border-primary-light ">
            <label className="cursor-pointer">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden"
                aria-label="Загрузка изображений"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <ImagePlus className="w-10 h-10 text-primary-dark" />
                <p className="text-primary-dark font-medium">
                  <span className="text-primary-dark font-bold">Нажмите для загрузки</span> или перетащите файлы
                </p>
                <p className="text-sm text-primary-default">
                  Поддерживаются JPG, PNG, WEBP. Макс. размер: 20МБ
                </p>
              </div>
            </label>
          </div>

          {error && (
            <div className="mt-2 text-red-500 text-sm font-medium bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}
          
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg text-primary-dark font-bold">Предпросмотр</h3>
                <span className="text-sm text-primary-dark">
                  {previewUrls.length} изображений
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {previewUrls.map((url, index) => (
                  <div 
                    key={index} 
                    className="relative group border rounded-lg overflow-hidden aspect-square shadow-sm transition-transform hover:shadow-md"
                  >
                    <img
                      src={url}
                      alt={`Превью ${index + 1}`}
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Удалить изображение"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 truncate">
                      {index < apartment.images?.length ? `Изображение ${index + 1}` : 'Новое'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mt-6 w-full sm:w-auto"
          disabled={loading || previewUrls.length === 0}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : "Сохранить и продолжить"}
        </Button>
      </div>
    </form>
  );
}
