import ZeroEntropy from 'zeroentropy';
import { SearchResults, SnippetInfo } from '@/types';

class ZeroEntropyClient {
	static instance: ZeroEntropy | null = null;
	static getClient(): ZeroEntropy {
		if (!this.instance) {
			return this.instance = new ZeroEntropy({
				apiKey: "ze_h5qlSrLzs7wDNMtA",
			});
		}
		return this.instance;
	}
}

async function getTopSnippets(collection_name: string, query: string, k: number = 10): Promise<SearchResults> {
	const zclient = ZeroEntropyClient.getClient();

	try {
		const response:ZeroEntropy.QueryTopSnippetsResponse = await zclient.queries.topSnippets({
			collection_name,
			query,
			k,
			precise_responses: true,
		});

		const snippets = response.results.map((result: ZeroEntropy.QueryTopSnippetsResponse.Result, index): SnippetInfo => ({
			id: index.toString(),
			title: result.path,
			path: result.path,
			snippet: result.content || "",
		}));

		return {
			type: "Success",
			results: snippets,
		};
	} catch (e: unknown) {
		console.error("Error fetching top snippets:", e);
		return {
			type: "Error",
			errorMessage: e as string,
		};
	}
}

export { getTopSnippets };
