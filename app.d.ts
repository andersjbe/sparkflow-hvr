// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lib/lucia").Auth;
	type DatabaseUserAttributes = {
		firstName: string;
		lastName: string;
		avatarUrl: string;
		email: string | undefined;
	};
	// biome-ignore lint/complexity/noBannedTypes: <explanation>
	type DatabaseSessionAttributes = {};
}
