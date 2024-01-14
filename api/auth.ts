import { OAuthRequestError } from "@lucia-auth/oauth";
import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { nanoid } from "nanoid";
import { auth, googleAuth } from "../lib/lucia";

const routes = new Hono()
	.get("/login/google", async (c) => {
		const [url, state] = await googleAuth.getAuthorizationUrl();
		setCookie(c, "google_oauth_state", state, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60,
		});
		return c.redirect(url.toString());
	})

	.get("/login/google/callback", async (c) => {
		const storedState = getCookie(c, "google_oauth_state");
		const { code, state } = c.req.query();

		if (
			!storedState ||
			!state ||
			storedState !== state ||
			typeof code !== "string"
		) {
			return c.text("Bad request, 400");
		}

		try {
			const { getExistingUser, googleUser, createUser } =
				await googleAuth.validateCallback(code);

			const getUser = async () => {
				const existingUser = await getExistingUser();
				if (existingUser) return existingUser;
				const user = await createUser({
					attributes: {
						avatarUrl: googleUser.picture,
						firstName: googleUser.given_name,
						lastName: googleUser.family_name,
						email: googleUser.email,
					},
					userId: nanoid(),
				});
				return user;
			};

			const user = await getUser();
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {},
			});
			const authRequest = auth.handleRequest(c);
			authRequest.setSession(session);
			return c.redirect("/");
		} catch (e) {
			if (e instanceof OAuthRequestError) {
				return c.text("Bad request", 400);
			}
			return c.text("An unknown error occurred", 500);
		}
	})

	.get("/user", async (c) => {
		const authRequest = auth.handleRequest(c);
		const session = await authRequest.validate();
		if (session === null) {
			return c.json({ user: null });
		}
		const user = session.user;
		return c.json({ user });
	})

	.post("/logout", async (c) => {
		const authRequest = auth.handleRequest(c);
		const session = await authRequest.validate();
		if (!session) {
			return c.text("Unauthorized", 401);
		}
		await auth.invalidateSession(session.sessionId);
		authRequest.setSession(null);
		return c.status(200);
	});

export default routes;
