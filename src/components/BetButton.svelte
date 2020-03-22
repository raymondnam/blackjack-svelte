<script>
  export let bet;
  export let disabled = false;
  import { game } from "../stores";
</script>

<style>
  button {
    background-color: white;
    border: none;
    color: black;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    margin: 4px 2px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 0 5px black;
  }

  button:hover {
    background-color: #d6d6d6;
  }
</style>

<button on:click={() => game.placeBet(bet)} {disabled}>{bet}</button>
