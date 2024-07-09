import { BasicKeyHandler, DataGrid } from '@lumino/datagrid';

/**
 * ipydatagrid specific KeyHandler class for handling
 * key events. Only polymorphed events are listed here,
 * the rest are ihnerited and used as is from the
 * parent class.
 */
export class KeyHandler extends BasicKeyHandler {
  constructor() {
    super();
  }

  /**
   * Handle the `'Escape'` key press for the data grid.
   *
   * @param grid - The data grid of interest.
   *
   * @param event - The keyboard event of interest.
   */
  protected onEscape(grid: DataGrid, event: KeyboardEvent): void {
    // console.log('Escape key event detected');

    // Bail if no selection model exists
    if (!grid.selectionModel) {
      return;
    }

    // Returns the first selection from the model, if selections exist
    const selections = grid.selectionModel.selections().next();

    if (selections) {
      grid.selectionModel.clear();
    } else {
      // Chrome's implementation of focus() requires the
      // target element to have the tabIndex attribute set.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=467043
      if (document.body.tabIndex === -1) {
        document.body.tabIndex = 0;
      }
      document.body.focus();
    }
  }

  /**
   * Handle the `'Ctrl + C'` key combination for the data grid.
   *
   * @param grid - The data grid of interest.
   *
   * @param event - The keyboard event of interest.
   */
  onKeyDown(grid: DataGrid, event: KeyboardEvent): void {
    // console.log('KeyDown event detected');

    // Bail if no selection model exists
    if (!grid.selectionModel) {
      // console.log('No selection model found, exiting');
      return;
    }

    // Check for Ctrl + C key combination
    if (event.ctrlKey && event.key === 'c') {
      // console.log('Ctrl + C detected');
      grid.copyToClipboard();
      event.preventDefault();  // Prevent default browser copy behavior
      event.stopPropagation(); // Stop event propagation to other listeners
      return;  // Exit after handling Ctrl + C
    } else {
      // Handle other key events if necessary
      // console.log('Other key combination detected, passing to base handler');
      super.onKeyDown(grid, event);  // Optionally call the base method for other keys
    }
  }
}
