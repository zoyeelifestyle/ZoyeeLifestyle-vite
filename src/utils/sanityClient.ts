/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
