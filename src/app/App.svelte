<script>
  import { init, dictionary } from "svelte-i18n";
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Languages from "./pages/Languages.svelte";
  import Privacy from "./pages/Privacy.svelte";
  import Team from "./pages/Team.svelte";
  import Help from "./pages/Help.svelte";

  import en from "./lang/en";
  import ko from "./lang/ko";

  const [initialLocale] = window.navigator.languages;

  dictionary.set({ en, ko });
  init({
    fallbackLocale: "en",
    initialLocale,
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
