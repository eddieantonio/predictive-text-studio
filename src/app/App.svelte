<script>
  import { init, addMessages } from "svelte-i18n";
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Languages from "./pages/Languages.svelte";
  import Privacy from "./pages/Privacy.svelte";
  import Team from "./pages/Team.svelte";
  import Help from "./pages/Help.svelte";

  import {
    registerAllLocalizationsUsing,
    determinePreferredLocale,
    FALLBACK_LOCALE,
  } from "./i18n";

  registerAllLocalizationsUsing(addMessages);
  init({
    fallbackLocale: FALLBACK_LOCALE, // hint: it's English
    initialLocale: determinePreferredLocale(),
  });

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={LandingPage} />
  <Route path="languages" component={Languages} />
  <Route path="privacy" component={Privacy} />
  <Route path="team" component={Team} />
  <Route path="help" component={Help} />
</Router>
