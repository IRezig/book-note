import { useToast as useToastPrime } from 'primevue/usetoast';

export type action = 'created' | 'updated' | 'deleted';

export const useToast = () => {
  const toast = useToastPrime();

  const showSuccess = (action: action) => {
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
