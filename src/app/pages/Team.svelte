<script lang="ts">
  import TeamMemberProfile from "../components/TeamMemberProfile.svelte";
</script>

<style>
  .privacy {
    width: 50%;
    margin: auto;
    margin-top: 20px;
  }

  a {
    text-decoration: none;
  }
  article {
    counter-reset: clause;
  }

  article h3::before {
    counter-increment: clause;
    content: counter(clause) ". ";
  }
</style>

<main>
  <nav style="text-align: center">
    <a href="/" class="button button--blue">Back</a>
  </nav>
  <header class="masthead">
    <h2>Meet the Team</h2>
    <p>Here are the contibuters for this project</p>
  </header>
  <section class="explanation" id="explanation">
    <h2>Core Maintainers</h2>
  </section>

  <section class="quick-start" id="get-started">
    <h2>Team Members</h2>
    <TeamMemberProfile githubUserName={'ChrisChrisLoLo'}/>
  </section>
</main>