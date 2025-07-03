'use client';

import { useState, useEffect, useCallback } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../../../context/ApartmentContext';
import { useToast } from '@/hooks/use-toast';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { api } from '@/lib/api';
import { extractUrl } from '@/lib/utils';
import Uploader from '@/components/ui/Uploader';

const MAX_FILE_SIZE = 20 * 1024 * 1024; 

export default function MediaLocationForm({ apartment, setApartment, handleSubmit,}) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const { loading } = useApartment();
  const { toast } = useToast();
  /**
   *    Convert images that already live on Strapi into `File` objects once,
   *     so the component can treat *all* images the same way.
   *     We preserve the Strapi `id` on the File object so we can delete later.
   */
   const convertExistingImages = async () => {
      if (!Array.isArray(apartment.images) || !apartment.images.length) return;

      const converted = await Promise.all(
        apartment.images.map(async (img) => {
          if (img instanceof File) return img; // already a File

          const url = extractUrl(img);
          if (!url) return null;

          try {
            const res = await fetch(url);
            const blob = await res.blob();
            const filename = url.split('/').pop()?.split('?')[0] ?? 'image.jpg';
            const file = new File([blob], filename, { type: blob.type });

            if (typeof img === 'object' && 'id' in img) {
              Object.assign(file, { id: (img).id });
            }
            return file;
          } catch {
            return null;
          }
        })
      );

      const ready = converted.filter(Boolean);
      setApartment((prev) => ({ ...prev, images: ready }));
    };

  useEffect(() => {  void convertExistingImages();  }, []);

  /**
   * 2️⃣  Build preview URLs *every* time the images array changes.
   *     This fixes the bug where previews disappear after navigating back.
   */
  useEffect(() => {
    if (!Array.isArray(apartment.images)) return;

    // Revoke previous blob URLs to avoid leaks
    previewUrls.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u));

    const urls = apartment.images
      .map((img) => {
        if (img instanceof File) return URL.createObjectURL(img);
        return extractUrl(img);
      })
      .filter(Boolean) 

    setPreviewUrls(urls);

    return () => {
      urls.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartment.images]);

  // -------- actions --------------------------------------------------------
  const handleImageChange = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      // validate size
      const oversized = files.filter((f) => f.size > MAX_FILE_SIZE);
      if (oversized.length) {
        setError(
          `Некоторые файлы превышают 20 МБ: ${oversized
            .map((f) => f.name)
            .join(', ')}`
        );
        toast({
          title: 'Ошибка загрузки',
          description: 'Максимальный размер файла — 20 МБ.',
          variant: 'destructive',
        });
        return;
      }

      setError('');
      setApartment((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    },
    [setApartment, toast]
  );

  const handleRemoveImage = async (index) => {
    const target = apartment.images[index];

    // remove locally (also covers UI)
    setApartment((prev) => {
      const next = [...prev.images];
      next.splice(index, 1);
      localStorage.setItem(
        'apartmentForEdit',
        JSON.stringify({ ...prev, images: next })
      );
      return { ...prev, images: next };
    });

    // server removal only in edit mode
    const isEditMode = localStorage.getItem('apartmentForEdit') !== null;
    const idToDelete = target instanceof File ? (target).id ?? null : null;

    if (isEditMode && idToDelete) {
      try {
        await api.delete(`upload/files/${idToDelete}`);
      } catch {
        toast({
          title: 'Не удалось удалить файл на сервере',
          description: 'Файл удалён только локально.',
          variant: 'destructive',
        });
      }
    }
  };

  // -------- render ---------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-4 shadow-md"
    >
      <div className="rounded-xl bg-white  ">
        <h2 className="mb-4 flex items-center text-xl font-bold text-primary-dark">
          <ImagePlus className="mr-2 h-6 w-6 text-primary-dark" />
          Загрузка фотографий
        </h2>

        <Uploader handleImageChange = {handleImageChange}/>

        {/* -------------------- error -------------------- */}
        {error && (
          <div className="mt-2 rounded-xl bg-red-50 p-2 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* -------------------- preview -------------------- */}
        {previewUrls.length > 0 && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-dark">Предпросмотр</h3>
              <span className="text-sm text-primary-dark">
                {previewUrls.length} изображений
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {previewUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square overflow-hidden rounded-xl border shadow-sm transition-transform hover:shadow-md"
                >
                  <StrapiImage
                    src={url}
                    alt={`Превью ${idx + 1}`}
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                  <button
                    type="button"
                    aria-label="Удалить изображение"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 truncate bg-gradient-to-t from-black/80 to-transparent p-2 text-xs text-white">
                    {idx < apartment.images.length ? `Изображение ${idx + 1}` : 'Новая'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- submit -------------------- */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading || previewUrls.length === 0}
          className="mt-6 w-full sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение…
            </>
          ) : (
            'Сохранить и продолжить'
          )}
        </Button>
      </div>
    </form>
  );
}
