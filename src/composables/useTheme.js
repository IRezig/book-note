import { ref, watch } from 'vue';

const isDark = ref(false);

export const useTheme = () => {
  const updateTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  const toggleTheme = () => {
    updateTheme();
  };

  // Initialize theme based on system preference
  const initializeTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDark.value = prefersDark;
    updateTheme();
  };

  // Watch for system theme changes and isDark changes
  watch(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    (newValue) => {
      isDark.value = newValue;
      updateTheme();
    },
  );

  // Add a watch for isDark changes
  watch(isDark, () => {
    updateTheme();
  });

  return {
    isDark,
    toggleTheme,
    initializeTheme,
  };
};
