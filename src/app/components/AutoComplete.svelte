<script lang="ts">
  // TODO: the following interface should be removed once #33 is done
  interface dataObj {
    bcp47Tag: string;
    langauge: string;
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
  // To store Filted array
  let filetred: dataObj[] = [];
  // To store selected language
  let selected: string = "";
  // Toggle to show search list
  let show = false;
  // Index of Previous focus element
  let prevIndex = -1;
  // Index of focus element
  let index = -1;

  // Input to search
  function onChange(event: any) {
    show = true;
    filetred = results.filter((item: any) => {
      let a = new RegExp("^" + event.target.value.toUpperCase());
      return a.test(item.langauge.toUpperCase());
    });
  }

  function closeSuggestion() {
    show = false;
  }

  // If anywhere on the screen is clicked
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
    selected = data.langauge;
    subtext = data.bcp47Tag;
  }

  const mod = (a: number, n: number) => {
    return a - n * Math.floor(a / n);
  };
  // Up/Down arraow
  function handleKeydown({ key }: KeyboardEvent) {
    console.log(key);
    if (
      key !== keyboardKey.Down &&
      key !== keyboardKey.Up &&
      key !== keyboardKey.Enter
    )
      return;
    if (key == keyboardKey.Down) {
      prevIndex = index;
      index += 1;
    } else if (key == keyboardKey.Up) {
      if (index == -1) {
        index = -1;
      } else {
        prevIndex = index;
        index -= 1;
      }
    } else if (key == keyboardKey.Enter) {
      selected = filetred[index].langauge;
      subtext = filetred[index].bcp47Tag;
      show = false;
    }
    const allItems = [
      ...document.getElementsByClassName("autocomplete__suggestion-item"),
    ];

    index = mod(index, allItems.length);
    document
      .getElementsByClassName("autocomplete__suggestion-item")
      [index].classList.add("autocomplete-active");
    if (prevIndex !== -1) {
      document
        .getElementsByClassName("autocomplete__suggestion-item")
        [prevIndex].classList.remove("autocomplete-active");
    }
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
  .autocomplete__suggestion-item:hover {
    cursor: pointer;
    background-color: var(--gray-highlight);
  }
  .autocomplete__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray);
    font-size: var(--xxs);
  }
  /*In Sevelte, dynamic class will only work if it's a global style*/
  :global(.autocomplete-active) {
    margin: 0;
    background-color: var(--gray-highlight);
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
      {#each filetred as result}
        <li
          class="autocomplete__suggestion-item"
          data-cy="autocomplete-suggestions">
          <div on:click={() => selectedList(result)}>{result.langauge}</div>
        </li>
      {/each}
    </ul>
  {/if}
  <p class="autocomplete__subtext" data-cy="autocomplete-subtext">BCP47Tag: {subtext}</p>
</div>
