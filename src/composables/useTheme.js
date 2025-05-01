import { ref, watch } from 'vue';

const isDark = ref(false);

export const useTheme = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const updateTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  // Initialize theme based on system preference
  const initializeTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark.value = prefersDark;
    updateTheme();
  };

  // Watch for system theme changes
  watch(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    (newValue) => {
      isDark.value = newValue;
      updateTheme();
    },
  );

  return {
    isDark,
    toggleTheme,
    initializeTheme,
  };
};
