<script lang="ts">
  export let results: any = ["1111", "1122", "222"];
  let filetred: any[] = [];
  let selected: any = "";
  let show = false;
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
    console.log(type);
    show = false;
    selected = type;
  }
</script>

<style>
</style>

<div>
  <input value={selected} type="text" on:input={(event) => onChange(event)} />
  {#if show}
    <ul use:clickOutside={toggle}>
      {#each filetred as result, i}
        <li>
          <div on:click={() => selectedList(result)}>{result}</div>
        </li>
      {/each}
    </ul>
  {/if}
</div>
