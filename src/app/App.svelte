<script>
  import { Router, Route, Link } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import ProjectInfo from "./pages/ProjectInfo.svelte";
  import routes from "./routes";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <Route path="project/*" component={ProjectInfo} />
  <Route path={routes.landingPage} component={LandingPage} />
</Router>
