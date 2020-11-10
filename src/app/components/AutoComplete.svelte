<script lang="ts">
  interface dataObj {
    bcp47Tag: string;
    langauge: string;
  }
  enum keyboardKey {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Enter = "Enter",
  }

  // Testing Data
  export let results: dataObj[] = [];
  // To Store Filted array
  let filetred: dataObj[] = [];
  let selected: string = "";
  // Toggle to show search list
  let show = false;
  //  Index of Previous focus element
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

  function toggle() {
    show = false;
  }

  // To close
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
  function selectedList(type: string) {
    show = false;
    selected = type;
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

  .autocomplete__input {
    font-family: var(--secondary-font), sans-serif;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
  }
  .autocomplete__suggestion-list {
    position: absolute;
    padding: 0 0 10px 0;
    margin: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 10px 10px;
    list-style-type: none;
    text-decoration: none;
    z-index: 5;
  }
  .autocomplete__suggestion-item {
    font-size: 18px;
    font-style: bold;
    padding: 10px 15px;
    overflow: hidden;
    border-right: solid 15px rgba(0, 0, 0, 0);
  }
  .autocomplete__suggestion-item:hover {
    cursor: pointer;
    background-color: var(--gray-highlight);
  }
  :global(.autocomplete-active) {
    margin: 0;
    background-color: var(--gray-highlight);
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div class="autocomplete">
  <input
    class="autocomplete__input"
    value={selected}
    type="text"
    on:input={(event) => onChange(event)}
    data-cy="autocomplete-input" />
  {#if show}
    <ul class="autocomplete__suggestion-list" use:clickOutside={toggle}>
      {#each filetred as result}
        <li
          class="autocomplete__suggestion-item"
          data-cy="autocomplete-suggestions">
          <div on:click={() => selectedList(result.langauge)}>
            {result.langauge}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
