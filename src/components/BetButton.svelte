<script>
  export let bet;
  import { game } from "../stores";
</script>

<button on:click={() => game.placeBet(bet)}>BET {bet}</button>
