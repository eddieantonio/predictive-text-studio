<script lang="ts">
  interface dataObj {
    bcp47Tag: string;
    langauge: string;
  }
  // Testing Data
  export let results: dataObj[] = [
    {
      bcp47Tag: "en",
      langauge: "english",
    },
    {
      bcp47Tag: "en",
      langauge: "enn",
    },
    {
      bcp47Tag: "en",
      langauge: "ewx",
    },
  ];
  // To Store Filted array
  let filetred: dataObj[] = [];
  let selected: string = "";
  // Toggle to show search list
  let show = false;
  //  Index of Previous focus element
  let prevIndex = -1;
  // Index of focus element
  let index = 0;

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
  function selectedList(type: any) {
    show = false;
    selected = type;
  }

  // Up/Down arraow
  function handleKeydown({ key }: KeyboardEvent) {
    if (key !== "ArrowDown" && key !== "ArrowUp") return;
    const currentElement: any = document.getElementsByClassName("autocomplete__suggestion-item")[index];
    const items = [...document.getElementsByClassName("autocomplete__suggestion-item")];
    const currentIndex = items.indexOf(currentElement);
    // let newIndex;
    if (prevIndex !== -1) {
      document
        .getElementsByClassName("autocomplete__suggestion-item")
        [prevIndex].classList.remove("autocomplete-active");
    }

    if (currentIndex === -1) {
      index = 0;
    } else {
      if (key === "ArrowUp") {
        prevIndex = currentIndex;
        index = (currentIndex + items.length - 1) % items.length;
        currentElement.classList.add("autocomplete-active");
      } else {
        // Next key
        prevIndex = currentIndex;
        index = (currentIndex + 1) % items.length;
        currentElement.classList.add("autocomplete-active");
      }
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
  .autocomplete__suggestion-item{
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
    on:input={(event) => onChange(event)} />
  {#if show}
    <ul class="autocomplete__suggestion-list" use:clickOutside={toggle}>
      {#each filetred as result}
        <li class="autocomplete__suggestion-item">
          <div on:click={() => selectedList(result.langauge)}>
            {result.langauge}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
