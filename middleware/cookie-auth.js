/**
 * Perform cookie authentication
 *
 * @param {object} ctx - route context
 */
export default async function cookieAuth(ctx) {
    // If all routes in the path have explicitly disabled auth, no need to check
    const allRoutesNoAuth = ctx.route.meta.every(m => m && m.auth === false);
    if (allRoutesNoAuth) { return; }

    if (process.server) { return handleServer(ctx); }
    if (process.client) { return handleClient(ctx); }

    throw new Error("[middleware/cookie-auth] Unrecognized context");
}


/ Server-side cookie handling logic
async function handleServer(ctx) {
    // if we somehow don't have a route, let the request through
    if (!ctx.route) { return; }

    // Get the auth cookie (if it's present)
    const authCookie = ctx.app.$cookies.get(AUTH_COOKIE_NAME);
    const cacheKey = `auth.${authCookie}`;

    // If there's no auth cookie we know we can go right to login
    // we know the page requires auth of some kind at this point
    if (!authCookie) {
        ctx.redirect(FRONTEND_URLS.login);
        return;
    }

    // Attempt to verify authentication cookie
    try {
        // Perform an actual auth check
        const result = await ctx.app.$axios.get(URLS.v1.authCheckCookie, { headers: ctx.req.headers });

        // Ensure that the auth check was actually successful
        if (result.data.status !== "success" || result.data.data !== true) {
            throw new Error("Unexpected error during auth check");
        }

        // Redirect to app if our cookie is still valid and we're trying to hit login
        if (authCookie && ctx.route.path === FRONTEND_URLS.login) {
            ctx.redirect(FRONTEND_URLS.app);
            return;
        }

    } catch (err) {
        // If a 401 was returned the cookie is likely expired/invalid
        if (err.response.status === 401) {
            ctx.app.$cookies.remove(AUTH_COOKIE_NAME);
        }

        // If login failed because the backend server had an error then we need to make sure
        console.log("[middleware/cookie-auth/server] Authentication error:", err);

        // If the auth check fails, then user is not logged in, so redirect
        ctx.redirect(FRONTEND_URLS.login);
    }
}

// Client-side cookie handling logic
async function handleClient(ctx) {
    // TODO: check if there's a current user as far as we can tell (some CurrentUserService ?)
    // (this isn't stricly necessary since API requests will be checked there, and initial load should cover initial checks)
    return;
}
