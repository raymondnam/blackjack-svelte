<script>
  import Card from "./components/Card.svelte";
  import BetButton from "./components/BetButton.svelte";
  import { game } from "./stores";

  const messages = {
    LOST: "You lost.",
    WIN: "You won!"
  };
  $: message = messages[$game.phase];
</script>

<style>
  main {
    height: 100%;
    padding: 56px;
    margin: 0 auto;
    width: 400px;
    text-align: center;
  }

  h2 {
    color: white;
  }

  .hand {
    display: flex;
  }

  button {
    background-color: black;
    border: none;
    color: white;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    opacity: 0.9;
  }

  .actions {
    margin-top: 32px;
  }

  .chips {
    font-size: 18px;
    margin-bottom: 16px;
    font-weight: bold;
  }
</style>

<main>
  <img src="/images/logo.png" alt="logo" width="150" height="150" />

  <div class="chips">Chips: {$game.chips}</div>
  <div class="chips">
    {#if $game.bet > 0}You're betting: {$game.bet}{/if}
  </div>

  {#if $game.phase === 'BET'}
    <div>
      <BetButton bet={10} disabled={$game.chips < 10} />
      <BetButton bet={100} disabled={$game.chips < 100} />
      <BetButton bet={500} disabled={$game.chips < 500} />
    </div>
    {#if $game.bet > 0}
      <div class="actions">
        <button on:click={game.deal}>DEAL</button>
      </div>
    {/if}
  {/if}

  {#if $game.phase !== 'BET'}
    <h2>Player ({$game.playerPoints})</h2>
    <div class="hand">
      {#each $game.playerCards as card}
        <Card symbol={card.symbol} value={card.value} />
      {/each}
    </div>
    <h2>Dealer ({$game.housePoints})</h2>
    <div class="hand">
      {#each $game.houseCards as card}
        <Card
          symbol={card.symbol}
          value={card.value}
          isHidden={card.isHidden} />
      {/each}
    </div>
  {/if}

  {#if message}
    <h3>{message}</h3>
  {/if}

  <div class="actions">
    {#if $game.phase === 'LOST' || $game.phase === 'WIN'}
      <button on:click={game.nextHand}>CONTINUE</button>
    {/if}

    {#if $game.phase === 'PLAYING'}
      <button on:click={game.stand}>STAND</button>
      <button on:click={game.hit}>HIT</button>
    {/if}
  </div>

</main>
