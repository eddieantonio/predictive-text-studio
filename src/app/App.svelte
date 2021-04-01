<script>
  import { init, dictionary } from "svelte-i18n";
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Languages from "./pages/Languages.svelte";
  import Privacy from "./pages/Privacy.svelte";
  import Team from "./pages/Team.svelte";
  import Help from "./pages/Help.svelte";
  import Footer from "./components/Footer.svelte";

  import { locales, determinePreferredLocale, FALLBACK_LOCALE } from "./lang";

  dictionary.set(locales);
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
  <Footer />
</Router>
