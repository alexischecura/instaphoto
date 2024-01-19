export const getEnvVariables = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_USER_IMAGE_URL: import.meta.env.VITE_USER_IMAGE_URL,
    VITE_POST_IMAGE_URL: import.meta.env.VITE_POST_IMAGE_URL,
  };
};
