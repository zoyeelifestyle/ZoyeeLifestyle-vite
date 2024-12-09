/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "4ec8io8c",
  dataset: "production",
  apiVersion: "2024-03-10",
  useCdn: true,
  token:
    "skQH3Kyz9MYoxPjlnmHT8jFZPfPANeT2guvNlIUJtRFW8qoawouZyo1xPECYyfiQVhiRRxm8wYUk9kxPl1q3LAUuqELPI5ZaIjAtUjg5qrj6dijklQC5djDciFwJPMcvDoVao4y0Oq3uBSy6PKWyLc3U1ER5FrYNUwvxPZ7vOjsnfZjwTAek",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
