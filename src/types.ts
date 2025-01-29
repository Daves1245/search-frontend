export interface SnippetInfo {
  id: string;
  title: string;
  path: string;
  snippet: string;
}

export type SearchResults =
  | {
      type: "Idle";
    }
  | {
      type: "Loading";
      previousResults: SnippetInfo[] | null;
    }
  | {
      type: "Success";
      results: SnippetInfo[];
    }
  | {
      type: "Error";
      errorMessage: string;
    };

export interface SearchState {
  query: string;
  results: SearchResults;
}
