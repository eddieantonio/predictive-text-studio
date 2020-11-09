<script lang="ts">
  // Testing Data
  export let results: any = [
    {
      bcp47Tag: "en",
      langauge: "english",
    },
  ];
  // To Store Filted array
  let filetred: any[] = [];
  let selected: any = "";
  // Toggle to show search list
  let show = false;
  // Previous focus list
  let prev = -1;

  let i = 0;

  // Input to search
  function onChange(event: any) {
    show = true;
    filetred = results.filter((item: any) => {
      console.log(item.langauge);
      let a = new RegExp("^" + event.target.value.toUpperCase());
      return a.test(item.langauge.toUpperCase());
    });
  }
  function toggle() {
    show = false;
  }
  // To close
  function clickOutside(node: any, onEventFunction: any) {
    const handleClick = (event: any) => {
      var path = event.composedPath();

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

  // on click list
  function selectedList(type: any) {
    show = false;
    selected = type;
  }

  // down arraow
  function handleKeydown({ keyCode }: any) {
    if (keyCode !== 38 && keyCode !== 40) return;
    const current: any = document.getElementsByClassName("item")[i];
    const items = [...document.getElementsByClassName("item")];
    i += 1;
    const currentIndex = items.indexOf(current);
    console.log(current);
    // let newIndex;
    if (prev !== -1) {
      document.getElementsByClassName("item")[prev].classList.remove("active");
    }

    current.classList.add("active");
    if (currentIndex === -1) {
      i = 0;
    } else {
      if (keyCode === 38) {
        i = (currentIndex + items.length - 1) % items.length;
        prev = currentIndex;
        current.classList.add("active");
        console.log(current);
      } else {
        // Next key
        prev = currentIndex;
        i = (currentIndex + 1) % items.length;
        console.log(i);
      }
    }
  }
</script>

<style>
  li:hover {
    cursor: pointer;
    background-color: var(--gray-highlight);
  }
  :global(.active) {
    /*when navigating through the items using the arrow keys:*/
    margin: 0;
    background-color: var(--gray-highlight);
  }

  input {
    font-family: var(--secondary-font), sans-serif;
    font-size: 18px;
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2);
  }

  ul {
    position: absolute;
    padding: 0 0 10px 0;
    margin: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    border-radius: 0 0 10px 10px;
    list-style-type: none;
    text-decoration: none;
    z-index: 99;
  }

  li {
    font-size: 18px;
    font-style: bold;
    padding: 10px 15px;
    overflow: hidden;
    border-right: solid 15px rgba(0, 0, 0, 0);
  }
  .main {
    position: relative;
    width: fit-content;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div class="main">
  <input value={selected} type="text" on:input={(event) => onChange(event)} />
  {#if show}
    <ul use:clickOutside={toggle}>
      {#each filetred as result}
        <li class="item">
          <div on:click={() => selectedList(result.langauge)}>
            {result.langauge}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
