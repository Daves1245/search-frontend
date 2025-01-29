export type SearchResults =
  | { type: "Idle" }
  | { type: "Loading" }
  | {
    type: "Success";
    results: SnippetInfo[];
  }
  | {
    type: "Error"; errorMessage: string;};

export interface SnippetInfo {
  id: string;
  title: string;
  path: string;
  snippet: string;
}
