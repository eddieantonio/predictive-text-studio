<script lang="ts">
  export let name: string;
  export let selectedLanguage: string = "";

  let selected: boolean = name === selectedLanguage;
  let className: string = "avatar";

  /**
   * Returns the first letter / character of the language name.
   *
   * TODO: Handle non-BMP cases like "𐐆" for "𐐆𐑍𐑀𐑊𐐮𐑇" ("English" in the Deseret alphabet)
   * TODO: Handle multiple character grapheme clusters like "k̓"
   *
   * @return {string} - the first character of the language name
   */
  function getLanguageShorthand(): string {
    return name.substring(0, 1);
  }
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
    font-family: var(--main-font), sans-serif;
    font-size: var(--m);
    box-sizing: border-box;
    transition: border-color 0.2s ease;
    border: 3px solid var(--white);
  }

  .avatar:hover {
    cursor: pointer;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    border: 3px solid var(--primary-blue);
  }

  .selected {
    background-color: var(--primary-blue);
    border: 0px;
    color: var(--white);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
</style>

<div class={className} class:selected>{getLanguageShorthand()}</div>
