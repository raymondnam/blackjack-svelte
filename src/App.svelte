<script>
  import Card from "./components/Card.svelte";
  import BetButton from "./components/BetButton.svelte";
  import { game } from "./stores";
</script>

<style>
  main {
    background: #008240;
    height: 100%;
    padding: 56px;
  }

  h1 {
    color: black;
    margin: 0;
  }

  .hand {
    display: flex;
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
      <button on:click={game.deal}>DEAL</button>
    {/if}
  {/if}

  {#if $game.phase !== 'BET'}
    <h2>Player:</h2>
    <h3>Points: {$game.playerPoints}</h3>
    <div class="hand">
      {#each $game.playerCards as card}
        <Card symbol={card.symbol} value={card.value} />
      {/each}
    </div>
    <h2>House:</h2>
    <h3>Points: {$game.housePoints}</h3>
    <div class="hand">
      {#each $game.houseCards as card}
        <Card
          symbol={card.symbol}
          value={card.value}
          isHidden={card.isHidden} />
      {/each}
    </div>
  {/if}

  {#if $game.phase === 'LOST'}
    <h2>YOU LOST</h2>
  {/if}

  {#if $game.phase === 'WIN'}
    <h2>YOU WIN</h2>
  {/if}

  {#if $game.phase === 'LOST' || $game.phase === 'WIN'}
    <button on:click={game.nextHand}>CONTINUE</button>
  {/if}

  {#if $game.phase === 'PLAYING'}
    <div>
      <button on:click={game.stand}>STAND</button>
      <button on:click={game.hit}>HIT</button>
    </div>
  {/if}

</main>
