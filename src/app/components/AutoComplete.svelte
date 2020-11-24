<script lang="ts">
  // TODO: the following interface should be removed once #33 is done
  interface dataObj {
    bcp47Tag: string;
    language: string;
  }
  enum keyboardKey {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Enter = "Enter",
  }
  export let label = "";
  export let subtext = "";
  // Testing Data
  export let results: dataObj[] = [];
  // To store filtered array
  let filtered: dataObj[] = [];
  // To store selected language
  let selected: string = "";
  // Toggle to show search list
  let show = false;
  // Index of Previous focus element
  let prevIndex = -1;
  // Index of focus element
  let index = -1;

  // Input to search
  function onChange(event: Event) {
    show = true;
    filtered = results.filter((item: any) => {
      const target = event.target as HTMLTextAreaElement;
      const a = new RegExp("^" + target.value.toUpperCase());
      return a.test(item.language.toUpperCase());
    });
  }

  function closeSuggestion() {
    show = false;
  }

  // If anywhere on the screen is clicked
  // Derived from https://github.com/rster2002/svelte-outside-click
  function clickOutside(node: HTMLUListElement, onEventFunction: Function) {
    const handleClick = (event: MouseEvent) => {
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
  function selectedList(data: dataObj) {
    show = false;
    selected = data.language;
    subtext = data.bcp47Tag;
  }

  const mod = (a: number, n: number) => {
    return a - n * Math.floor(a / n);
  };

  // Up/Down arraow
  function handleKeydown({ key }: KeyboardEvent) {
    if (key === keyboardKey.Down) {
      prevIndex = index;
      index += 1;
    } else if (key === keyboardKey.Up) {
      if (index == -1) {
        index = -1;
      } else {
        prevIndex = index;
        index -= 1;
      }
    } else if (key === keyboardKey.Enter) {
      selectedList(filtered[index]);
    } else {
      /* Not a key we care about */
      return;
    }
    const allItems = [
      ...document.getElementsByClassName("autocomplete__suggestion-item"),
    ];

    index = mod(index, allItems.length);
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
    border-color: rgba(0, 0, 0, 0.2);
  }
  .autocomplete__suggestion-list {
    position: absolute;
    padding: 0 0 var(--sb-xs) 0;
    margin: 0;
    width: 100%;
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
<div class="autocomplete">
  {#if label !== ''}
    <p class="autocomplete__label">{label}</p>
  {/if}
  <input
    class="autocomplete__input"
    value={selected}
    type="text"
    on:input={(event) => onChange(event)}
    data-cy="autocomplete-input" />
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
