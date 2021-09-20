<script>
  import { onMount, onDestroy } from 'svelte';
  import VirtualList from './VirtualList.svelte';

  let simulateFeed = true;
  let books = [];

  for (let i = 0; i < 10_000; i++) {
    books.push({
      id: i,
      title: String(Math.random()),
    });
  }

  // Fixed item height in pixels.
  // This could come directly from a store (e.g. if users can configure the height in the UI).
  // Or be derived from a store that holds the base font size (e.g. user can configure the font size in your app).
  // Or calculated using DOM. Whatever your requirements are.
  let itemHeight = 30;

</script>

<div class="books">
  <VirtualList items={books} {itemHeight} let:item let:y>
    <div class="book" style="top:{y}px;">
      #{item.id} - {item.title}
    </div>
  </VirtualList>
</div>

<style>
  .books {
    overflow: auto;

    /* This is just for the demo, your scrolling container can have any size  */
    width: 100%;
    height: 100%;
  }

  .book {
    /* You can also use inline-grid and define grid-template-* on the parent for easy virtual grid */
    display: inline-block;
    white-space: nowrap;

    /* One inline-block per line, no horizontal scrolling  */
    box-sizing: border-box;
    padding: 0 0.5rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;

    /* We re-use items when they leave the viewport by adjusting their "top" value */
    /* Depending on your use case you might achieve better results using translate3d + will-change */
    position: relative;

    /* Demo specific row styles  */
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    border: 1px solid #333;
  }

  .dummy {
    /* The dummy is just an invisible empty item */
    /* But if you want that look you can actually render it like an empty cell */
    border-color: transparent;
  }
</style>
