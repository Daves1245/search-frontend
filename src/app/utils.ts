import ZeroEntropy from "zeroentropy";
import { SnippetInfo } from "@/types";

class ZeroEntropyClient {
  static instance: ZeroEntropy | null = null;
  static getClient(): ZeroEntropy {
    if (!this.instance) {
      return (this.instance = new ZeroEntropy({
        apiKey: "",
      }));
    }
    return this.instance;
  }
}

async function getTopSnippets(
  collection_name: string,
  query: string,
  k: number = 10,
): Promise<SnippetInfo[]> {
  const zclient = ZeroEntropyClient.getClient();

  const response: ZeroEntropy.QueryTopSnippetsResponse =
    await zclient.queries.topSnippets({
      collection_name,
      query,
      k,
      precise_responses: true,
    });

  const snippets = response.results.map(
    (
      result: ZeroEntropy.QueryTopSnippetsResponse.Result,
      index,
    ): SnippetInfo => ({
      id: index.toString(),
      title: result.path,
      path: result.path,
      snippet: result.content || "",
    }),
  );

  return snippets;
}

export { getTopSnippets };
