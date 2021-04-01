<script lang="ts">
  import { _ } from "svelte-i18n";
  import { PAGE_URLS } from "../pages/page-urls";
</script>

<style>
  :global(:root) {
    --body-max-width: 960px;
    background-color: var(--white);
    scroll-behavior: smooth;
  }

  .footer {
    padding: 1rem;
    color: var(--white, #fff);
    background-color: var(--lite-black);
  }

  .footer a:link,
  .footer a:visited,
  .footer a:active {
    color: inherit;
  }

  .footer a:hover {
    color: var(--gray-light);
  }

  .footer__copyright {
    margin: auto;
    max-width: var(--body-max-width);
  }
</style>

<footer class="footer">
  <p class="footer__copyright">
    <small>
      <a href={PAGE_URLS.privacy}>{$_('page.main.privacy_policy')}</a>
      <br />
      <a
        href={PAGE_URLS.team}
        data-cy="team-page-link">{$_('page.main.about_the_team')}</a>
      <br />
      © 2020–{new Date().getFullYear()}
      <a
        href="https://nrc.canada.ca/en/research-development/research-collaboration/programs/canadian-indigenous-languages-technology-project">
        National Research Council Canada</a>.
    </small>
  </p>
</footer>
