/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText, PortableTextReactComponents } from "@portabletext/react";

const PortableTextRenderer = ({ content }: { content: any }) => {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: { value: any }) => (
        <div className="sanity-image">
          <img src={value.asset.url} alt={value.alt || "Image"} />
        </div>
      ),
    },
    block: {
      h1: ({ children }: { children?: React.ReactNode }) => (
        <h1 className="sanity-h1">{children}</h1>
      ),
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="sanity-h2">{children}</h2>
      ),
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="sanity-paragraph">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }: { children?: React.ReactNode }) => (
        <strong className="sanity-strong">{children}</strong>
      ),
      em: ({ children }: { children?: React.ReactNode }) => (
        <em className="sanity-em">{children}</em>
      ),
    },
  };

  return <PortableText value={content} components={components} />;
};

export default PortableTextRenderer;
