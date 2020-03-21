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
    {#if $game.bet > 0}BET: {$game.bet}{/if}
  </div>

  {#if $game.phase === 'BET'}
    <div>
      <BetButton bet={10} disabled={$game.chips < 10} />
      <BetButton bet={100} disabled={$game.chips < 100} />
      <BetButton bet={500} disabled={$game.chips < 500} />
    </div>
    {#if $game.bet > 0}
      <button on:click={game.startGame}>DEAL</button>
    {/if}
  {/if}

  {#if $game.phase !== 'BET'}
    <h2>Player:</h2>
    <h3>Points: {$game.playerPoints}</h3>
    {#each $game.playerCards as card}
      <Card symbol={card.symbol} value={card.value} />
    {/each}
    <h2>House:</h2>
    <h3>Points: {$game.housePoints}</h3>
    {#each $game.houseCards as card}
      <Card symbol={card.symbol} value={card.value} isHidden={card.isHidden} />
    {/each}
  {/if}

  {#if $game.phase === 'LOST'}
    <h2>YOU LOST</h2>
  {/if}

  {#if $game.phase === 'WIN'}
    <h2>YOU WIN</h2>
  {/if}

  {#if $game.phase === 'LOST' || $game.phase === 'WIN'}
    <button on:click={game.continue}>CONTINUE</button>
  {/if}

  {#if $game.phase === 'PLAYING'}
    <div>
      <button on:click={game.stand}>STAND</button>
      <button on:click={game.hit}>HIT</button>
    </div>
  {/if}

</main>
