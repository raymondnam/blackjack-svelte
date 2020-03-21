<script>
  export let bet;
  export let disabled = false;
  import { game } from "../stores";
</script>

<button on:click={() => game.placeBet(bet)} {disabled}>BET {bet}</button>
