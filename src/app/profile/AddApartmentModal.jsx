// components/AddApartmentModal.tsx
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import NewApartmentForm from '@/components/component/forms/new-appartment-form/NewApartmentForm';
export default function AddApartmentModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            {/* {initialData ? 'Edit Property' : 'Add New Property'} */}
            </DialogTitle>
        </DialogHeader>
        <DialogContent  className="max-w-8xl bg-white max-h-[90vh] overflow-scroll">
        <NewApartmentForm />
      </DialogContent>
      </DialogContent>
    </Dialog>
  );
}