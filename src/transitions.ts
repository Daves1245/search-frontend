import { SearchState } from "./types";

// Define action types
type Action =
  | { type: "TO_IDLE" }
  | { type: "TO_LOADING" }
  | { type: "UPDATE_RESULTS"; payload: SearchState };

// Reducer function
export const searchReducer = (
  state: SearchState,
  action: Action,
): SearchState => {
  switch (action.type) {
    case "TO_IDLE":
      return {
        query: state.query,
        results: {
          type: "Idle",
        },
      };

    case "TO_LOADING":
      return {
        query: state.query,
        results: {
          type: "Loading",
          previousResults:
            state.results.type === "Success" ? state.results.results : null,
        },
      };

    case "UPDATE_RESULTS":
      return action.payload;
  }
};
