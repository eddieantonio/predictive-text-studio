<script>
  import { Router, Route, Link } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Testing from "./pages/Testing.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Landing</Link>
      <Link to="testing">Testing Page</Link>
    </nav>
    <Route path="/" component={LandingPage} />
    <Route path="testing" component={Testing} />
  </Router>
</main>
