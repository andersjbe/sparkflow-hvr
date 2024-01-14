import { prisma } from "@lucia-auth/adapter-prisma";
import { google } from "@lucia-auth/oauth/providers";
import dotenv from "dotenv";
import { lucia } from "lucia";
import { hono } from "lucia/middleware";
import db from "./prisma";

dotenv.config();

export const auth = lucia({
	env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
	middleware: hono(),
	adapter: prisma(db),
	getUserAttributes: (data) => {
		return {
			avatarUrl: data.avatarUrl,
			name: `${data.firstName} ${data.lastName}`,
		};
	},
});

export const googleAuth = google(auth, {
	clientId: process.env.GOOGLE_CLIENT_ID ?? "",
	clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
	redirectUri: process.env.GOOGLE_REDIRECT_URI ?? "",
});

export type Auth = typeof auth;
