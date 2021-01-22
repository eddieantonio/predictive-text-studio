<script lang="ts">
  import { onMount } from "svelte";
  import worker from "../spawn-worker";
  import { createEventDispatcher } from "svelte";
  import type { KeyboardDataWithTime } from "@common/types";

  enum keyboardKey {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Enter = "Enter",
  }
  export let label = "";
  export let subtext = "";
  export let dataCy = "autocomplete-label";

  // To store filtered array
  let filtered: KeyboardDataWithTime[] = [];
  // To store Keyman Keyboard data
  let results: KeyboardDataWithTime[] = [];
  // To store selected language
  let selected: string = "";
  // Toggle to show search list
  let show = false;
  // Index of focus element
  let index = -1;
  // To store input text
  let inputText: string = "";
  const dispatch = createEventDispatcher();
  onMount(async () => {
    results = await worker.getDataFromStorage();
  });

  // Does a prefix search with autocomplete suggestions.
  function filterAutocompleteSuggestions(event: Event) {
    show = true;
    filtered = results.filter((element) => {
      // Using regular expressing for search method
      const target = event.target as HTMLTextAreaElement;
      const regExp = new RegExp("^" + target.value.toUpperCase());
      inputText = target.value;
      return regExp.test(element.language.toUpperCase());
    });
  }

  function closeSuggestion() {
    show = false;
  }

  // If anywhere on the screen is clicked
  // Derived from https://github.com/rster2002/svelte-outside-click
  function clickOutside(node: HTMLUListElement, onEventFunction: Function) {
    const handleClick = (event: MouseEvent) => {
      // If the language does not exist in Keyman database
      dispatch("message", {
        key: "languages",
        value: [{ name: inputText, id: "" }],
      });
      const path = event.composedPath();
      if (!path.includes(node)) {
        onEventFunction();
      }
    };
    document.addEventListener("click", handleClick);
    return {
      destroy() {
        document.removeEventListener("click", handleClick);
      },
    };
  }

  // On select item in list
  function selectedList(data: KeyboardDataWithTime) {
    show = false;
    selected = data.language;
    subtext = data.bcp47Tag;
    dispatch("message", {
      key: "languages",
      value: [{ name: selected, id: subtext }],
    });
  }

  const mod = (a: number, n: number) => {
    return a - n * Math.floor(a / n);
  };

  // Up/Down arraow
  function handleKeydown({ key }: KeyboardEvent) {
    if (key === keyboardKey.Down) {
      index += 1;
    } else if (key === keyboardKey.Up) {
      if (index == -1) {
        index = -1;
      } else {
        index -= 1;
      }
    } else if (key === keyboardKey.Enter) {
      selectedList(filtered[index]);
    } else {
      /* Not a key we care about */
      return;
    }

    const numberOfSuggestions = document.getElementsByClassName(
      "autocomplete__suggestion-item"
    ).length;

    index = numberOfSuggestions > 0 ? mod(index, numberOfSuggestions) : 0;
  }
</script>

<style>
  .autocomplete {
    position: relative;
    width: fit-content;
  }
  .autocomplete__label {
    font-family: var(--main-font), sans-serif;
    font-weight: bold;
    font-size: var(--xs);
  }
  .autocomplete__input {
    font-family: var(--secondary-font), sans-serif;
    font-size: var(--m);
    padding: var(--sb-xs);
    border-radius: var(--sb-xs);
    border-width: 1px;
    border-color: var(--gray);
  }
  .autocomplete__suggestion-list {
    position: absolute;
    padding: 0 0 var(--sb-xs) 0;
    margin: 0;
    width: 100%;
    height: 11rem;
    overflow: scroll;
    background: white;
    box-shadow: 0px var(--sb-xs) var(--sb-m) rgba(0, 0, 0, 0.2);
    border-radius: 0 0 var(--sb-xs) var(--sb-xs);
    list-style-type: none;
    text-decoration: none;
    z-index: 5;
  }
  .autocomplete__suggestion-item {
    font-size: var(--m);
    font-style: bold;
    padding: var(--sb-xs) var(--sb-s);
    overflow: hidden;
    border-right: solid var(--sb-s) rgba(0, 0, 0, 0);
  }
  .autocomplete__suggestion-item--active {
    margin: 0;
    background-color: var(--gray-highlight);
  }
  .autocomplete__suggestion-item:hover {
    cursor: pointer;
    background-color: var(--gray-highlight);
  }
  .autocomplete__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div class="autocomplete mb-m">
  {#if label !== ''}
    <p class="autocomplete__label">{label}</p>
  {/if}
  <input
    class="autocomplete__input"
    value={selected}
    type="text"
    on:input={filterAutocompleteSuggestions}
    data-cy={dataCy} />
  {#if show}
    <ul
      class="autocomplete__suggestion-list"
      use:clickOutside={closeSuggestion}>
      {#each filtered as result, i}
        <li
          class="autocomplete__suggestion-item"
          class:autocomplete__suggestion-item--active={i == index}
          data-cy="autocomplete-suggestions">
          <div on:click={() => selectedList(result)}>{result.language}</div>
        </li>
      {/each}
    </ul>
  {/if}
  <p class="autocomplete__subtext" data-cy="autocomplete-subtext">
    BCP47Tag:
    {subtext}
  </p>
</div>
