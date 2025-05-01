import { useToast } from 'primevue/usetoast';

export type BookAction = 'created' | 'updated' | 'deleted';

export const useBookToast = () => {
  const toast = useToast();

  const showSuccess = (action: BookAction) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Book ${action} successfully`,
      life: 3000,
    });
  };

  const showError = (error: string) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 3000,
    });
  };

  return { showSuccess, showError };
};
