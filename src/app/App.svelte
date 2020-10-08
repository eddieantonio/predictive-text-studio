<script>
  import { Router, Route, Link } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Languages from "./pages/Languages.svelte";
  import routes from "./routes";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <Route path={routes.landingPage} component={LandingPage} />
  <Route path={routes.projectInfo} component={Languages} />
</Router>
