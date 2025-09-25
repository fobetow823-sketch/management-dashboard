
import createCache from "@emotion/cache";

// Create a client-side cache for Emotion (MUI styling engine)
export default function createEmotionCache() {
  return createCache({ key: "mui", prepend: true });
}
