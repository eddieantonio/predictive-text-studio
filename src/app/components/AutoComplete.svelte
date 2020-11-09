<script lang="ts">
  export let results: any = ["1111", "1122", "222"];
  let filetred: any[] = [];
  let selected: any = "";
  let show = false;
  let prev = -1;
  let i = 0;
  function onChange(event: any) {
    show = true;
    filetred = results.filter((item: any) => {
      let a = new RegExp("^" + event.target.value);
      return a.test(item);
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

    // current.blur();
    //current.classList.add("autocomplete-active");
  }
</script>

<style>
  li:hover {
    cursor: pointer;
    background: red;
  }
  :global(.active) {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }
</style>

<svelte:window on:keydown={handleKeydown} />
<div>
  <input value={selected} type="text" on:input={(event) => onChange(event)} />
  {#if show}
    <ul use:clickOutside={toggle}>
      {#each filetred as result}
        <li class="item">
          <div on:click={() => selectedList(result)}>{result}</div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
