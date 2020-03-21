<script>
  import Card from "./components/Card.svelte";
  import BetButton from "./components/BetButton.svelte";
  import { game } from "./stores";
</script>

<style>
  h1 {
    color: green;
  }
</style>

<main>
  <h1>Blackjack</h1>
  <div>chips: {$game.chips}</div>
  <div>
    {#if $game.bet}BET: {$game.bet}{/if}
  </div>

  {#if $game.phase === 'BET'}
    <div>
      <BetButton bet={10} />
      <BetButton bet={100} />
      <BetButton bet={500} />
    </div>
    <button on:click={game.startGame}>DEAL</button>
  {/if}

  {#if ['WIN', 'LOSE', 'PLAYING'].includes($game.phase)}
    <h2>Player:</h2>
    {#each $game.playerCards as card}
      <Card symbol={card.symbol} value={card.value} />
    {/each}
    <h2>House:</h2>
    {#each $game.houseCards as card}
      <Card symbol={card.symbol} value={card.value} isHidden={card.isHidden} />
    {/each}
  {/if}

  {#if $game.phase === 'PLAYING'}
    <div>
      <button on:click={game.stand}>STAND</button>
      <button on:click={game.hit}>HIT</button>
    </div>
  {/if}

</main>
