<script lang="ts">
  export let name: string;
  export let selectedLanguage: string = "";

  export let isSelected: boolean = name === selectedLanguage;
  export let className: string = "avatar";
  if (isSelected) {
    className = className + " selected";
  }

  /**
   * Handles the click when a language is selected from the sidebar.
   * Should change the selected language variable and change content in the Languages component.
   * TODO: Replace stub
   *
   * @param {string} languageName - A the name of the language selected.
   * @return {void}
   */
  const handleClick = (languageName: string): void => {
    console.log(languageName + " button selected");
  };
</script>

<style>
  .avatar {
    width: 50px;
    height: 50px;
    display: flex;
    background-color: var(--white);
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin-top: 40px;
    font-family: Cabin, sans-serif;
    font-size: 20px;
  }

  .avatar:hover {
    cursor: pointer;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  .selected {
    background-color: var(--primary-blue);
    color: var(--white);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
</style>

<div
  class={className}
  on:click={() => {
    handleClick(name);
  }}>
  {name.substring(0, 1)}
</div>
