import { useSuspenseQuery } from "@tanstack/react-query";
import { FileRoute } from "@tanstack/react-router";
import { userQueryOpts } from "../queries";

export const Route = new FileRoute('/').createRoute({
	loader: ({ context: { queryClient } }) =>
		queryClient.ensureQueryData(userQueryOpts),
	component: IndexPage,
});

function IndexPage() {
	const { data } = useSuspenseQuery(userQueryOpts);

	return (
		<>
			<h1>Hello World!</h1>
			{!data.user ? (
				<a href="/api/login/google">Login with Google </a>
			) : (
				<>
					<h2>User Data:</h2>
					<p>{data.user.name}</p>
				</>
			)}
		</>
	);
}
