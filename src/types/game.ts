/**
 * Block Blast - Game Types & Constants
 *
 * This file defines the core data structures for our puzzle board.
 * Keeping types separate makes the code modular, reusable, and easy to maintain.
 */

// An 8x8 grid is the classic dimension for Block Blast
export const GRID_SIZE = 8;

// Points awarded when filling a cell (for Phase 1 learning interactions)
export const POINTS_PER_CELL = 10;

// Default vibrant color used when filling empty cells in Phase 1
export const DEFAULT_BLOCK_COLOR = '#38BDF8'; // Sky blue jewel tone

/**
 * A cell can either be:
 * - null: the cell is empty
 * - string: hex color code representing a filled block (e.g., '#38BDF8')
 */
export type CellValue = string | null;

/**
 * A 2D array representing the 8x8 game board:
 * board[rowIndex][colIndex]
 */
export type BoardState = CellValue[][];

/**
 * Factory helper function that creates a fresh, empty 8x8 board.
 * Each of the 8 rows contains an array of 8 nulls.
 */
export const createEmptyBoard = (): BoardState => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );
};
