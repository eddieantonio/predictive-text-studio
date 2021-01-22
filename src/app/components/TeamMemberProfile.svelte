<script lang="ts">
  import  { onMount } from 'svelte';

  interface GithubUser {
    avatarURL:string
    htmlURL:string
    login:string
    name:string
  }

  export let githubUserName: string;
  let githubUser: GithubUser;

  onMount(async () => {
    const res = await fetch(`https://api.github.com/users/${githubUserName}`);
    const githubUserJSON = await res.json();
    console.log(res,githubUserJSON)
		githubUser = {avatarURL : githubUserJSON.avatar_url, login: githubUserJSON.login, htmlURL: githubUserJSON.html_url, name: githubUserJSON.name}
  });
  
</script>

<style>
  .split-button-layout {
    display: flex;
    padding: 3%;
  }
  button {
    width: 160px;
    margin: 0;
    border-radius: 0;
  }
  button:first-child {
    border-top-left-radius: 0.625em;
    border-bottom-left-radius: 0.625em;
  }
  button:last-child {
    border-top-right-radius: 0.625em;
    border-bottom-right-radius: 0.625em;
  }
</style>

<div class="split-button-layout">
  {#if githubUser}
    <p>{githubUser.name}</p>
    <img src={githubUser.avatarURL} alt={`${githubUser.name}'s avatar`}/>
    <p>@<a href={githubUser.htmlURL}>{githubUser.login}</a></p>
  {/if}
</div>
