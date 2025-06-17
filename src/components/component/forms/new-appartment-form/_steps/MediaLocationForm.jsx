'use client';
import { useState, useEffect, useCallback } from 'react';
import { ImagePlus, Loader2, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartment } from '../../../../../../context/ApartmentContext';
import Image from 'next/image';

export default function MediaLocationForm({ apartment, setApartment, handleSubmit }) {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { loading } = useApartment();
  const domain = process.env.NEXT_PUBLIC_STRAPI_URL;
  // Initialize existing images on component mount
  useEffect(() => {
    if (apartment.images && apartment.images.length > 0) {
      const validImages = apartment.images.filter(img => img?.url);
      setExistingImages(validImages);
    }
  }, [apartment.images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    
    // Create preview URLs for new files
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setPreviewUrls(prev => [...prev, ...newPreviews]);
  };

  const removeImage = useCallback((index, isPreview) => {
    if (isPreview) {
      // Remove preview image
      setPreviewUrls(prev => {
        const updated = [...prev];
        URL.revokeObjectURL(updated[index].url);
        updated.splice(index, 1);
        return updated;
      });
    } else {
      // Remove existing image
      setExistingImages(prev => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
      
      // Update apartment state
      setApartment(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  }, [setApartment]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previewUrls.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previewUrls]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold mb-4 flex items-center text-primary-dark">
        <ImagePlus className="w-7 h-7 mr-2 text-primary-dark" /> Загрузить фотографии
      </h2>
      
      {/* File input with custom styling */}
      <div className="flex flex-col gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="w-8 h-8 mb-2 text-gray-500" />
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Нажмите для загрузки</span> или перетащите фотографии
            </p>
          </div>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
      
      {/* Image preview grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {/* Existing images */}
        {existingImages.map((image, index) => (
          <div key={image.id || index} className="relative aspect-square border rounded-md overflow-hidden group">
            <Image
             src={`${domain}${image.url}`}
              alt={`Existing image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <button
              type="button"
              onClick={() => removeImage(index, false)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Удалить изображение"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {/* New image previews */}
        {previewUrls.map((preview, index) => (
          <div key={preview.url} className="relative aspect-square border rounded-md overflow-hidden group">
            <img
              src={preview.url}
              alt={`Превью ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeImage(index, true)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Удалить изображение"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="mt-4 w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Сохранение...
          </>
        ) : "Сохранить и продолжить"}
      </Button>
    </form>
  );
}