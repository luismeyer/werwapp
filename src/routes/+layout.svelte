<script>
    import "../app.css";

    let tabs = ["Spiel", "Einstellungen"]
    let activeTab = 1;
</script>
  
<slot />

<div class="btm-nav">

    {#each tabs as tab, index }
        <button on:click={() => (activeTab = index)} class:active={index===activeTab}>{tab}</button>
    {/each}
  </div>