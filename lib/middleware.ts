import { MiddlewareHandler } from "hono";
import { User } from "lucia";
import { auth } from "./lucia";

export const withSession: MiddlewareHandler<{
	Variables: {
		user: User;
	};
}> = async (c, next) => {
	const authRequest = auth.handleRequest(c);
	const session = await authRequest.validate();
	if (session === null) {
		c.redirect("/");
		return;
	}
	c.set("user", session.user);
	await next();
};
