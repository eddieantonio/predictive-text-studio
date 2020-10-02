<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Testing from "./pages/Testing.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  const url = "";
</script>

<main role="application">
  <Router {url}>
    <div>
      <Route path="/" component={LandingPage} />
      <Route path="about" component={Testing} />
    </div>
  </Router>
</main>
