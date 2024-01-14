import { queryOptions } from "@tanstack/react-query";
import { ClientResponse } from "hono/client";
import { api } from "../utils/frontend";

class FetchError<T> extends Error {
	constructor(
		public res: ClientResponse<T>,
		message?: string,
	) {
		super(message);
	}
}

export const userQueryOpts = queryOptions({
	queryKey: ["loggedInUser"],
	queryFn: async () => {
		const resp = await api.user.$get();
		const data = await resp.json();
		if (!resp.ok) {
			throw new FetchError(resp);
		}
		return data;
	},
});
