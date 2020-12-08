<script lang="ts">
  export let kmp: ArrayBuffer;

  let kmpFile = new File([kmp], "Example.kmp", { type: "application/zip" });

  let shareData = {
    files: [kmpFile],
    title: "Example KMP",
    text: "Share KMP package via AirDrop",
  };

  const shareKMPFile = () => {
    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => alert("Share was successful."))
        .catch((error) => console.log("Sharing failed", error));
    } else {
      alert(`Your browser doesn't support sharing KMP package via AirDrop.`);
    }
  };
</script>

<style>
  .airdrop-component__img--disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
</style>

<div class="airdrop-component">
  <p>Share the KMP package via</p>
  <img
    class:airdrop-component__img--disabled={kmp == undefined}
    width="48px"
    height="48px"
    alt="AirDrop"
    src="/assets/AirDrop_logo.svg"
    on:click={shareKMPFile} />
</div>
