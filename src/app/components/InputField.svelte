<script lang="ts">
  export let label: string | undefined;
  /**
   * Component size options
   * Size option medium (default size) or large
   * ex: size = "large"
   */
  export let size: string | undefined = "";
  export let cyData: string | undefined = "";
  export let id: string;
  export let value: any;
  export let subtext = "";
  export let error = "";
  export let placeholder = "";
  import worker from "../spawn-worker"

  let isFocused = false;
  let tempObj: any = {};
  import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  const onInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    console.log(target.value);
  };
  const onFocus = () => {
    isFocused = true;
    console.log(isFocused);
  };
  const onBlur = (event: Event) => {
    isFocused = false;
    const target = event.target as HTMLTextAreaElement;
    const cleanId = target.id.split("-").pop()
    tempObj.append(tempObj[target.id] = value);
    
    console.log(tempObj)
    worker.setProjectData(tempObj)
  };
  function sayHello(event: Event) {
    const target = event.target as HTMLTextAreaElement;
		dispatch('message', {
      key: target.id,
      value: 'hello'
		});
	}
</script>

<style>
  label {
    font-family: var(--main-font), sans-serif;
    font-weight: bold;
    font-size: var(--xs);
  }

  input {
    display: block;
    font-family: var(--secondary-font), sans-serif;
    font-size: var(--m);
    padding: 10px;
    border-radius: 10px;
    border-width: 1px;
    border-color: var(--gray);
    border-style: solid;
  }

  .input-field__label--large {
    font: var(--main-font);
    font-size: var(--s);
    font-weight: normal;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-blue);
  }

  .input-field__subtext {
    font-family: var(--mono-font), monospace;
    color: var(--gray-secondary-text);
    font-size: var(--xxs);
  }

  .error {
    padding-left: 5px;
    font-family: var(--mono-font), monospace;
    font-size: 12px;
    color: var(--red-light);
  }
</style>

<div class="input-field mt-s mb-m">
  <label
    class="input-field__label--{size} mt-s"
    for="input-{id}">{label}</label>
  <input
    class="mt-s"
    type="text"
    id="input-{id}"
    bind:value
    {placeholder}
    data-cy={cyData}
    on:input={onInput}
    on:focus={onFocus}
    on:blur={sayHello} />
  {#if error !== ''}
    <p class:error>{error}</p>
  {/if}
  {#if subtext !== ''}
    <p class="input-field__subtext">{subtext}</p>
  {/if}
</div>
