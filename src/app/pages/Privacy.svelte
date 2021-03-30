<script lang="ts">
  import { _ } from "svelte-i18n";
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
  <article class="privacy">
    <nav style="text-align: center">
      <a href="/" class="button button--blue">{$_('common.back')}</a>
    </nav>
    <h2>{$_('page.privacy.title')}</h2>
    <p>
      <strong>{$_('page.privacy.effective_as_of')}:</strong>
      <time datetime="2020-12-08">{$_('page.privacy.date')}</time>
    </p>
    <h3>{$_('page.privacy.introduction.title')}</h3>
    <p>{$_('page.privacy.introduction.head.0')}</p>
    <p>{$_('page.privacy.introduction.head.1')}</p>
    <p>{$_('page.privacy.introduction.head.2')}</p>
    <a
      href="mailto:easantos+ptstudio@ualberta.ca">easantos+ptstudio@ualberta.ca</a>
    <p>{$_('page.privacy.introduction.head.3')}</p>
    <p>{$_('page.privacy.introduction.head.4')}</p>
    <ul>
      <li>{$_('page.privacy.introduction.policy.0')}</li>
      <li>{$_('page.privacy.introduction.policy.1')}</li>
      <li>{$_('page.privacy.introduction.policy.2')}</li>
      <li>{$_('page.privacy.introduction.policy.3')}</li>
    </ul>
    <p>{$_('page.privacy.introduction.foot.0')}</p>
    <p>{$_('page.privacy.introduction.foot.1')}</p>
    <h3>{$_('page.privacy.information.title')}</h3>
    <p>{$_('page.privacy.information.main')}</p>
    <h3>{$_('page.privacy.personal_data.title')}</h3>
    <p>{$_('page.privacy.personal_data.main')}</p>
    <h3>{$_('page.privacy.purpose_of_processing.title')}</h3>
    <p>{$_('page.privacy.purpose_of_processing.main')}</p>
    <p />
    <h3>{$_('page.privacy.cookies.title')}</h3>
    <p>{$_('page.privacy.cookies.main')}</p>
    <h3>{$_('page.privacy.log_files.title')}</h3>
    <p>{$_('page.privacy.log_files.main')}</p>
    <p />
    <h3>{$_('page.privacy.children.title')}</h3>
    <p>{$_('page.privacy.children.main')}</p>
    <h3>{$_('page.privacy.data_sharing.title')}</h3>
    <p>{$_('page.privacy.data_sharing.main.0')}</p>
    <p>{$_('page.privacy.data_sharing.main.1')}</p>
    <h3>{$_('page.privacy.data_transmission.title')}</h3>
    <p>{$_('page.privacy.data_transmission.main')}</p>
    <h3>{$_('page.privacy.your_rights.title')}</h3>
    <p>{$_('page.privacy.your_rights.main')}</p>
    <p>{$_('page.privacy.your_rights.request')}</p>
    <a
      href="mailto:easantos+ptstudio@ualberta.ca">easantos+ptstudio@ualberta.ca</a>.

    <ol type="a">
      <li>{$_('page.privacy.your_rights.rights.0')}</li>
      <li>{$_('page.privacy.your_rights.rights.1')}</li>
      <li>{$_('page.privacy.your_rights.rights.2')}</li>
      <li>{$_('page.privacy.your_rights.rights.3')}</li>
      <li>{$_('page.privacy.your_rights.rights.4')}</li>
      <li>{$_('page.privacy.your_rights.rights.5')}</li>
    </ol>
    <h3>{$_('page.privacy.changes_to_policy.title')}</h3>
    <p>
      {$_('page.privacy.changes_to_policy.main')}
      <a
        href="http://livechat.com/privacy-policy-generator/?ppg"
        target="_blank">{$_('page.privacy.changes_to_policy.source')}</a>.
    </p>
  </article>
</main>
