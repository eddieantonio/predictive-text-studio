<script lang="ts">
  import { onMount } from "svelte";

  interface GithubUser {
    avatarURL: string;
    htmlURL: string;
    login: string;
    name: string;
  }

  export let githubUserName: string;
  let githubUser: GithubUser;

  onMount(async () => {
    const res = await fetch(`https://api.github.com/users/${githubUserName}`);
    const githubUserJSON = await res.json();
    githubUser = {
      avatarURL: githubUserJSON.avatar_url,
      login: githubUserJSON.login,
      htmlURL: githubUserJSON.html_url,
      name: githubUserJSON.name,
    };
  });
</script>

<style>
  .github-user-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    padding-left: 3%;
    padding-right: 3%;
    width: 10rem;

    text-align: center;
  }
  img {
    width: 10rem;
    border-radius: 2%;
  }
  p.profile-name {
    margin: 0.25rem;
  }
</style>

<div class="github-user-layout">
  {#if githubUser}
    <a href={githubUser.htmlURL} data-cy="contributor-image-{githubUser.login}">
      <img src={githubUser.avatarURL} alt={`${githubUser.name}'s avatar`} />
    </a>
    <p class="profile-name">{githubUser.name}</p>
    <a
      href={githubUser.htmlURL}
      data-cy="contributor-handle-{githubUser.login}">@{githubUser.login}</a>
  {:else}
    <p cy->@{githubUserName}</p>
  {/if}
</div>
