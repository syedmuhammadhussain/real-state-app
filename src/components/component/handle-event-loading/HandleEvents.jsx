    import { Home, Loader2, AlertTriangle } from "lucide-react";

    export const ErrorState = ({ message }) => (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-lg font-medium text-destructive">{message}</p>
        </div>
    );

    export const LoadingState = () => (
        <div className="flex items-center justify-center  min-h-screen">
         <Loader2 className="h-10 w-10 animate-spin text-primary-hover" />
        </div>
    );

    export const EmptyState = () => (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
        <Home className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium text-muted-foreground">
            У вас пока нет объявлений
        </p>
        </div>
    );