import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = rootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<div className="p-2 flex gap-2 text-lg">
				<Link
					to="/"
					activeProps={{
						className: "font-bold",
					}}
					activeOptions={{ exact: true }}
				>
					Home
				</Link>{" "}
			</div>
			<hr />
			<Outlet />
			<ReactQueryDevtools buttonPosition="bottom-left" />
			<TanStackRouterDevtools position="bottom-right" />
		</>
	);
}
