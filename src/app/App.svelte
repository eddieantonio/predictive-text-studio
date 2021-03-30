<script>
  import { Router, Route } from "svelte-routing";
  import LandingPage from "./pages/LandingPage.svelte";
  import Privacy from "./pages/Privacy.svelte";
  import Team from "./pages/Team.svelte";
  import Help from "./pages/Help.svelte";
  import Customize from "./pages/Customize.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <Route path="/" component={LandingPage} />
  <Route path="customize" component={Customize} />
  <Route path="privacy" component={Privacy} />
  <Route path="team" component={Team} />
  <Route path="help" component={Help} />
</Router>
