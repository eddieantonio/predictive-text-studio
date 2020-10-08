<script>
  import { Router, Route, Link } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Languages from "./pages/Languages.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<main>
  <Router {url}>
    <Route path="/" component={LandingPage} />
    <Route path="languages" component={Languages} />
  </Router>
</main>
