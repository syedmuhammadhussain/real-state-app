import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";

export function DeleteDialog({isOpenDelete, setIsOpenDelete, onConfirm, isLoading ,}) {
  const handleConfirm = () => onConfirm();
  return (
    <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
      <DialogContent className="max-w-md bg-white  rounded-xl">
        <DialogHeader>
          <div className="mx-auto bg-red-50 bg-red-900/20 p-3 rounded-full mb-4">
            <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-primary-dark">
            Вы уверены, что хотите удалить?
          </DialogTitle>
          <DialogDescription className="text-center text-primary-default  mt-2">
            Это действие не может быть отменено. Все данные будут удалены навсегда.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6 sm:justify-center gap-3">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-6 min-w-[120px] border-gray-300 dark:border-gray-600"
              disabled={isLoading} >
                Отмена
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-6 min-w-[120px] shadow-sm"
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Удаление...
              </span>
            ) : (
              "Подтвердить удаление"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}