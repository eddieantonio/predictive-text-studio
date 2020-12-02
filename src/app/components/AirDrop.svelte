<script lang="ts">
  export let downloadURL: string;

  let sharedLink = {
    title: "KMP Package",
    text: "Share KMP Package via AirDrop.",
    url: downloadURL,
  };

  const shareKMPLink = () => {
    if (navigator.canShare) {
      navigator
        .share(sharedLink)
        .then(() => alert("Share was successful."))
        .catch((error) => alert("Sharing failed", error));
    } else {
      alert(`Your browser doesn't support AirDrop.`);
    }
  };
</script>

<style>
  .airdrop-component--disabled {
    cursor: not-allowed;
  }

  .airdrop-component__img--disabled {
    pointer-events: none;
  }
</style>

<div
  class="airdrop-component"
  class:airdrop-component--disabled={downloadURL == ''}>
  <p>Share the KMP package via</p>
  <img
    class:airdrop-component__img--disabled={downloadURL == ''}
    width="48px"
    height="48px"
    alt="AirDrop"
    src="/assets/AirDrop_logo.svg"
    on:click={shareKMPLink} />
</div>
