import {
  convertLexicalToHTMLAsync,
  defaultHTMLConvertersAsync,
} from "@payloadcms/richtext-lexical/html-async";
import type { SerializedEditorState } from "lexical";

type Props = {
  data: SerializedEditorState;
  className?: string;
};

export async function LexicalRichText({ data, className }: Props) {
  const html = await convertLexicalToHTMLAsync({
    data,
    converters: defaultHTMLConvertersAsync,
  });
  return (
    // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML from Payload Lexical (trusted CMS output).
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
