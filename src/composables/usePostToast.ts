import { useToast } from 'primevue/usetoast';

export type PostAction = 'created' | 'updated' | 'deleted';

export const usePostToast = () => {
  const toast = useToast();

  const showSuccess = (action: PostAction) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `Post ${action} successfully`,
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
