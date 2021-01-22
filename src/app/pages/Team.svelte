<script lang="ts">
  import TeamMemberProfile from "../components/TeamMemberProfile.svelte";

  const coreMaintainerGithubUserNames: string[] = ["ChrisChrisLoLo"];
  const teamMemberGithubUserNames: string[] = [
    "ChrisChrisLoLo",
    "ChrisChrisLoLo",
    "ChrisChrisLoLo",
    "ChrisChrisLoLo",
    "ChrisChrisLoLo",
  ];
</script>

<style>
  .team-page {
    width: 75%;
    margin: auto;
    margin-top: 20px;
  }

  .profile-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    /* justify-content: center;
    text-align: center;
    padding: 3%;
    width: 160px; */
  }
</style>

<main>
  <article class="team-page">
    <nav style="text-align: center">
      <a href="/" class="button button--blue">Back</a>
    </nav>
    <header class="masthead">
      <h2>Team</h2>
      <p>These are people who have contributed to the project</p>
    </header>
    <section class="explanation" id="explanation">
      <h2>Core Maintainers</h2>
      <div class="profile-container">
        {#each coreMaintainerGithubUserNames as githubUserName}
          <TeamMemberProfile {githubUserName} />
        {/each}
      </div>
    </section>

    <section class="quick-start" id="get-started">
      <h2>Team Members</h2>
      <div class="profile-container">
        {#each teamMemberGithubUserNames as githubUserName}
          <TeamMemberProfile {githubUserName} />
        {/each}
      </div>
    </section>
  </article>
</main>
