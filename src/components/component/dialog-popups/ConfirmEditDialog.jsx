import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const ConfirmEditDialog = ({ 
  handleSubmit, 
  handlePopDown,
  title='Подтвердите изменения',
  description='Вы уверены, что хотите обновить ваши персональные данные?' ,
  buttonText= 'Подтвердите изменения',
  loading = false
}) => (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-end sm:items-center justify-center">
        <div className="bg-white w-full sm:max-w-md mx-auto rounded-t-2xl sm:rounded-xl p-6 shadow-lg animate-slide-up">
          <h2 className="text-xl text-primary-dark font-semibold mb-4 flex justify-start items-center gap-1">{title}</h2>
          <p className="text-sm text-primary-dark mb-4 "> {description}</p>
          <div className="flex justify-end space-x-3">
            <Button
              size="md"
              variant="outline"
              onClick={handlePopDown}
            >
              Отмена
            </Button>
            {/* <Button
              size="md"
              variant="primary"
              onClick={handleSubmit}
              >
             {buttonText}
            </Button> */}

          <Button
          onClick={handleSubmit}
          variant="primary"
          size="md"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {buttonText}
            </>
          ) : (
            'Сохранить '
          )}
        </Button>
          </div>
        </div>
      </div>
);