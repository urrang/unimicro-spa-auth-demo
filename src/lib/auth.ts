import { User, UserManager } from 'oidc-client-ts';
import { writable } from 'svelte/store';
import { PUBLIC_CLIENT_ID } from '$env/static/public';

export const auth = writable<User | undefined>();

export const userManager = new UserManager({
	authority: 'https://test-login.unimicro.no',
	client_id: PUBLIC_CLIENT_ID,
	scope: 'AppFramework openid profile',
	redirect_uri: location.origin + '/auth/callback',
	silent_redirect_uri: location.origin + '/auth/renew',
	post_logout_redirect_uri: location.origin,
	automaticSilentRenew: true
});

export async function initAuth() {
	const user = await userManager.getUser();
	if (user && !user.expired) {
		auth.set(user);
	}

	userManager.events.addUserLoaded((user) => auth.set(user));
	userManager.events.addUserSignedOut(() => auth.set(undefined));
}

export async function login() {
	userManager.signinRedirect();
}
