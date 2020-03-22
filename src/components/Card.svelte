<script>
  export let value;
  export let symbol;
  export let isHidden = false;

  const redSymbols = ["&#9829", "&#9830"];
  const isRed = redSymbols.includes(symbol);
</script>

<style>
  .wrapper {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;

    border-radius: 8px;
    padding: 16px;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
    width: 100px;
    height: 150px;
    margin: 8px;
    background: white;
  }

  .symbol {
    font-size: 40px;
    align-self: center;
  }

  .isRed {
    color: red;
  }

  .isHidden {
    background: #f44336;
    box-shadow: inset 0 0 0 5px white;
  }

  .number-bottom {
    align-self: flex-end;
  }
</style>

{#if isHidden}
  <div class="wrapper" class:isHidden />
{:else}
  <div class="wrapper" class:isRed>
    <div>{value}</div>
    <div class="symbol">
      {@html symbol}
    </div>
    <div class="number-bottom">{value}</div>
  </div>
{/if}
