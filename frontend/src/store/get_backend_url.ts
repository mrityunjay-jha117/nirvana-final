const isDevelopment = import.meta.env.MODE === "development";

export default function get_dev_backend() {
  if (isDevelopment) return "http://localhost:8787/api/v1";
  return "https://backend.mrityunjay-jha2005.workers.dev/api/v1";
}
