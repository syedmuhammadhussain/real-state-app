"use client";
import { StrapiImage } from "@/components/ui/StrapiImage";
import Uploader from "@/components/ui/Uploader";
import { toast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";

const HandleProfileImage = ({ image, setImage }) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const { user } = useAuth();
  const [error, setError] = useState(null);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    // validate size
    const oversized = files.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length) {
      setError(`Некоторые файлы превышают 20 МБ: `);
      toast({
        title: "Ошибка загрузки",
        description: "Максимальный размер файла — 20 МБ.",
        variant: "destructive",
      });
      return;
    }
    // if(image.length  > 1   ) setError(`Некоторые файлы превышают 1:`);
    setImage(files);
  }, []);

  const handleRemoveImage = async (index) => {
    setImage(null);
    // server removal only in edit mode
    // const isEditMode = localStorage.getItem('apartmentForEdit') !== null;
    // const idToDelete = target instanceof File ? (target).id ?? null : null;

    // if (isEditMode && idToDelete) {
    //   try {
    //     await api.delete(`upload/files/${idToDelete}`);
    //   } catch {
    //     toast({
    //       title: 'Не удалось удалить файл на сервере',
    //       description: 'Файл удалён только локально.',
    //       variant: 'destructive',
    //     });
    //   }
    // }
  };

  useEffect(() => {
    if (user.image) setImage(user?.image?.formats?.small?.url);
  }, []);
  return (
    <div>
      <Uploader handleImageChange={handleImageChange} multiple={false} />

      {error && (
        <div className="mt-2 rounded-xl bg-red-50 p-2 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* -------------------- preview -------------------- */}
      {image?.length > 0 && (
        <div className="mt-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary-dark">
              Предпросмотр
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <div className="group relative aspect-square overflow-hidden rounded-xl border shadow-sm transition-transform hover:shadow-md">
              {image !== null && (
                <StrapiImage
                  src={
                    typeof image === "object"
                      ? URL.createObjectURL(image[0])
                      : image
                  }
                  alt={`Превью `}
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                />
              )}

              <button
                type="button"
                aria-label="Удалить изображение"
                onClick={() => handleRemoveImage()}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleProfileImage;
