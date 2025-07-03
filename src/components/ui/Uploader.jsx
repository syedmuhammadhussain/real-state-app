import { ImagePlus } from 'lucide-react'
import React from 'react'

const Uploader = ({handleImageChange , multiple = true}) => {
  return (
    <div className="rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-primary-light">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple = {multiple}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              aria-label="Загрузить изображения"
            />
            <div className="flex flex-col items-center gap-2">
              <ImagePlus className="h-10 w-10 text-primary-dark" />
              <p className="font-medium text-primary-dark">
                <span className="font-bold">Нажмите для загрузки</span>
              </p>
              <p className="text-sm text-primary-default">
                Поддерживаются JPG, PNG, WEBP. Макс. размер — 20 МБ.
              </p>
            </div>
          </label>
        </div>
  )
}

export default Uploader