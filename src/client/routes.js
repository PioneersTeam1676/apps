import Login from './views/Login.svelte';
import Router from './views/apps/Router.svelte';
import NotFound from './views/errors/404.svelte';

export default {
    '/': Router,
    '/apps': Router,
    '/app/:app/:page?': Router,
    '/login': Login,
    // The catch-all route must always be last
    '*': NotFound
};
