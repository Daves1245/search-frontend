"use client";

import React, { useState, useReducer } from "react";
import { Search, Loader2 } from "lucide-react";
import { SnippetInfo } from "@/types";
import { SearchResultsComponent, NoResults } from "./Cards";
import { getTopSnippets } from "@/app/utils";
import { SearchState } from "@/types";
import { searchReducer } from "@/transitions";

// SearchBar Component
const SearchBar = ({ value, onChange, onKeyDown }) => (
  <div className="relative">
    <div className="relative flex items-center">
      {<Search className="absolute left-3 h-5 w-5 text-gray-400" />}
      <input
        type="text"
        className="w-full rounded-lg py-2 pl-10 pr-4
          focus:outline-none focus:ring-1 focus:ring-blue-500
          text-gray-800 placeholder:text-gray-500"
        placeholder="Search documentation..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => onKeyDown(e)}
      />
    </div>
  </div>
);

// Main Component
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const initialState: SearchState = {
    query: "",
    results: { type: "Idle" },
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const updateSearch = async (newQuery: string) => {
    setSearchQuery(newQuery);
    if (newQuery.length === 0) {
      dispatch({ type: "TO_IDLE" });
      return;
    }

    dispatch({ type: "TO_LOADING" });

    try {
      const collection_name = "guidelines";
      const searchResults = await getTopSnippets(collection_name, searchQuery);
      console.log("DONE!");

      dispatch({
        type: "UPDATE_RESULTS",
        payload: {
          query: newQuery,
          results: {
            type: "Success",
            results: searchResults,
          },
        },
      });
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      dispatch({
        type: "UPDATE_RESULTS",
        payload: {
          query: newQuery,
          results: {
            type: "Error",
            errorMessage,
          },
        },
      });
    }
  };

  // Render search interface
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar
            value={searchQuery}
            onChange={updateSearch}
            onKeyDown={() => {}}
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 min-h-[calc(100vh-4rem)]">
        {(() => {
          let results: SnippetInfo[];
          switch (state.results.type) {
            case "Idle":
              return (
                <NoResults
                  suggestedQueries={["crawler", "pricing", "support"]}
                />
              );
            case "Loading":
              if (state.results.previousResults !== null) {
                results = state.results.previousResults;
                break;
              } else {
                return (
                  <>
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-2">Searching...</p>
                  </>
                );
              }
            case "Success":
              results = state.results.results;
              break;
            case "Error":
              return (
                <div className="text-center py-8 text-red-600">
                  Error: {state.results.errorMessage}
                </div>
              );
          }
          return (
            <SearchResultsComponent
              results={results}
              currentQuery={searchQuery}
              resultQuery={state.query}
              isLoading={state.results.type === "Loading"}
            />
          );
        })()}
      </main>
    </div>
  );
};

export default SearchPage;
