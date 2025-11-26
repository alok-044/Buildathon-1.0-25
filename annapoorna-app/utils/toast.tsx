// utils/toast.tsx
import Toast from 'react-native-toast-message';

// Define the acceptable types so TypeScript can help us
export type ToastType = 'success' | 'error' | 'info';

/**
 * Displays a toast notification at the top of the screen.
 *
 * @param message - The main, bold heading text of the toast.
 * @param type - The variant of the toast: 'success' | 'error' | 'info'. Defaults to 'info'.
 * @param description - (Optional) Smaller body text below the heading.
 */
export const showToast = (
  message: string,
  type: ToastType = 'info',
  description?: string
) => {
  Toast.show({
    type: type,
    text1: message, // The main title
    text2: description, // The subtitle (optional)
    position: 'top', // 'top' or 'bottom'
    visibilityTime: 4000, // How long it stays visible (ms)
    autoHide: true,
    topOffset: 60, // Adjust spacing from the very top of the screen (useful for notches)
    bottomOffset: 40,
  });
};

/**
 * Optional: Helper functions for quicker usage
 */
export const toastHelpers = {
  success: (message: string, description?: string) =>
    showToast(message, 'success', description),
  error: (message: string, description?: string) =>
    showToast(message, 'error', description),
  info: (message: string, description?: string) =>
    showToast(message, 'info', description),
};