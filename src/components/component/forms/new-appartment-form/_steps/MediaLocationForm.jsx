'use client';

import { useState, useEffect } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../../../context/ApartmentContext';
import { useToast } from '@/hooks/use-toast';
import { StrapiImage } from '@/components/ui/StrapiImage';
import { api } from '@/lib/api'; // убедитесь, что экспорт именно такой

export default function MediaLocationForm({ apartment, setApartment, handleSubmit }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [error, setError] = useState('');
  const { loading } = useApartment();
  const { toast } = useToast();
  const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 МБ

  /* ── 1. Извлекаем URL из строки или объекта Strapi ── */
  function extractUrl(img) {
    if (typeof img === 'string') return img;
    if (img?.url)               return img.url;
    return (
      img?.formats?.large?.url ??
      img?.formats?.medium?.url ??
      img?.formats?.small?.url ??
      img?.formats?.thumbnail?.url ??
      null
    );
  }

  /* ── 2. Конвертируем существующие URL в File и сохраняем id ── */
  async function convertExistingImagesToBlobs() {
    if (!apartment?.images?.length) return;

    const files = await Promise.all(
      apartment.images.map(async (img) => {
        const url = extractUrl(img);
        if (!url) return null;

        try {
          const res   = await fetch(url);
          const blob  = await res.blob();
          const name  = url.split('/').pop()?.split('?')[0] ?? 'image.jpg';
          const file  = new File([blob], name, { type: blob.type });

          /* ⭐ переносим id для последующего DELETE */
          if (typeof img === 'object' && img?.id) {
            Object.assign(file, { id: img.id });
          }
          return file;
        } catch (e) {
          console.error('convertExistingImagesToBlobs:', e);
          return null;
        }
      })
    );

    const ready = files.filter(Boolean);
    setApartment((prev) => ({ ...prev, images: ready }));
    setPreviewUrls(ready.map((f) => URL.createObjectURL(f)));
  }

  useEffect(() => { convertExistingImagesToBlobs(); }, []);

  /* ── 3. Добавление новых изображений ── */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const big = files.filter((f) => f.size > MAX_FILE_SIZE);
    if (big.length) {
      setError(`Некоторые файлы превышают 20 МБ: ${big.map(f => f.name).join(', ')}`);
      toast({
        title: 'Ошибка загрузки',
        description: 'Максимальный размер файла — 20 МБ.',
        variant: 'destructive',
      });
      return;
    }

    setError('');
    setApartment((p) => ({ ...p, images: [...(p.images || []), ...files] }));
    setPreviewUrls((p) => [...p, ...files.map((f) => URL.createObjectURL(f))]);
  };

  /* ── 4. Удаление изображения ── */
  const handleRemoveImage = async (index) => {
    const item = apartment.images[index];

    /* локально */
    setApartment((p) => {
      const arr = [...p.images];
      arr.splice(index, 1);
      return { ...p, images: arr };
    });

    setPreviewUrls((p) => {
      const arr = [...p];
      const cand = arr[index];
      if (cand?.startsWith('blob:')) URL.revokeObjectURL(cand);
      arr.splice(index, 1);
      return arr;
    });

    /* сервер — только если редактируем и есть id */
    const isEditMode = localStorage.getItem('apartmentForEdit') !== null;
    const idToDelete = typeof item === 'object' && item?.id ? item.id : null;

    if (isEditMode && idToDelete) {
      try {
        await api.delete(`upload/files/${idToDelete}`);
        console.info('DELETE /upload/files/%s → OK', idToDelete);
      } catch (err) {
        console.error('DELETE error:', err);
        toast({
          title: 'Не удалось удалить файл на сервере',
          description: 'Файл удалён только локально.',
          variant: 'destructive',
        });
      }
    }
  };

  /* ── 5. Очистка blob-URL при размонтировании ── */
  useEffect(() => () => {
    previewUrls.forEach((u) => u.startsWith('blob:') && URL.revokeObjectURL(u));
  }, [previewUrls]);

  /* ── 6. Интерфейс ── */
  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-xl p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
          <ImagePlus className="w-6 h-6 mr-2 text-primary-dark" />
          Загрузка фотографий
        </h2>

        <div className="flex flex-col gap-4">
          {/* Дропзона */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center transition-colors hover:border-primary-light">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                aria-label="Загрузить изображения"
              />
              <div className="flex flex-col items-center gap-2">
                <ImagePlus className="w-10 h-10 text-primary-dark" />
                <p className="text-primary-dark font-medium">
                  <span className="font-bold">Нажмите для загрузки</span> или перетащите файлы сюда
                </p>
                <p className="text-sm text-primary-default">
                  Поддерживаются JPG, PNG, WEBP. Макс. размер — 20 МБ.
                </p>
              </div>
            </label>
          </div>

          {/* Ошибка */}
          {error && (
            <div className="mt-2 text-red-600 text-sm font-medium bg-red-50 p-2 rounded-xl">
              {error}
            </div>
          )}

          {/* Превью */}
          {previewUrls.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-primary-dark">Предпросмотр</h3>
                <span className="text-sm text-primary-dark">
                  {previewUrls.length} изображений
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {previewUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group border rounded-xl overflow-hidden aspect-square shadow-sm transition-transform hover:shadow-md"
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
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 truncate">
                      {idx < apartment.images?.length ? `Изображение ${idx + 1}` : 'Новая'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Сохранить */}
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
