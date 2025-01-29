import React from "react";
import { SnippetInfo } from "@/types";
import { Loader2 } from "lucide-react";

export const SearchResultCard = ({ result }: { result: SnippetInfo }) => (
  <div className="p-2 mb-4 transition-colors">
    <h3 className="text-xl font-medium text-blue-600 mb-0">
      <a href={result.path} className="hover:underline">
        {result.title}
      </a>
    </h3>
    <p className="text-sm font-light text-gray-500 mb-3">{result.path}</p>
    <p className="text-sm text-gray-700">{result.snippet}</p>
  </div>
);

export const NoResults = ({
  suggestedQueries,
}: {
  suggestedQueries: string[];
}) => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
      Kicking the tires?
    </h2>
    <p className="text-gray-600 mb-4">
      Try queries such as{" "}
      {suggestedQueries.map((query, index) => (
        <React.Fragment key={query}>
          <span className="text-blue-600 font-medium">{query}</span>
          {index < suggestedQueries.length - 1 &&
            (index === suggestedQueries.length - 2 ? " or " : ", ")}
        </React.Fragment>
      ))}{" "}
      in the search bar, and explore a world of opportunities for your website.
    </p>
  </div>
);

export const SearchResultsComponent = ({
  results,
  currentQuery,
  resultQuery,
  isLoading,
}: {
  results: SnippetInfo[];
  currentQuery: string;
  resultQuery: string;
  isLoading: boolean;
}) => (
  <div>
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <span>
        Showing {results.length} results for &quot;{resultQuery}&quot;
      </span>
      {(currentQuery != resultQuery || isLoading) && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
    </div>
    <hr className="border-gray-200 mb-6" />
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </div>
  </div>
);
