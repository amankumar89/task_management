export const generateUrl = (endpoint: string) => {
  if (!import.meta.env.VITE_BASE_URL) return endpoint;
  return `${import.meta.env.VITE_BASE_URL}${endpoint}`;
};
