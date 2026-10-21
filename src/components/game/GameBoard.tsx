import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { BoardState, GRID_SIZE } from '@/types/game';

interface GameBoardProps {
  /** The 8x8 matrix representing board state */
  board: BoardState;
  /** Callback invoked when a user taps a cell at (rowIndex, colIndex) */
  onCellPress: (rowIndex: number, colIndex: number) => void;
}

// Spacing between individual cells
const CELL_GAP = 4;
// Padding inside the board container
const BOARD_PADDING = 8;

export function GameBoard({ board, onCellPress }: GameBoardProps) {
  const { width: windowWidth } = useWindowDimensions();

  // Responsive sizing:
  // On phones (e.g. 360px - 430px wide), the board takes up available width minus margins.
  // On tablets or larger screens, we cap the board at 380px so it remains a nice puzzle size.
  const maxBoardWidth = Math.min(windowWidth - 32, 380);
  const cellSize = Math.floor(
    (maxBoardWidth - BOARD_PADDING * 2 - (GRID_SIZE - 1) * CELL_GAP) / GRID_SIZE
  );
  const boardSize = cellSize * GRID_SIZE + (GRID_SIZE - 1) * CELL_GAP + BOARD_PADDING * 2;

  return (
    <View style={[styles.boardContainer, { width: boardSize, height: boardSize }]}>
      {board.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((cellValue, colIndex) => {
            const isFilled = cellValue !== null;

            return (
              <Pressable
                key={`cell-${rowIndex}-${colIndex}`}
                onPress={() => onCellPress(rowIndex, colIndex)}
                accessibilityRole="button"
                accessibilityLabel={`Row ${rowIndex + 1}, Column ${colIndex + 1}, ${
                  isFilled ? 'filled' : 'empty'
                }`}
                style={({ pressed }) => [
                  styles.cell,
                  { width: cellSize, height: cellSize },
                  isFilled ? styles.cellFilled : styles.cellEmpty,
                  isFilled && { backgroundColor: cellValue },
                  pressed && styles.cellPressed,
                ]}>
                {/* Visual 3D shine effect for filled blocks */}
                {isFilled && <View style={styles.blockShine} />}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    backgroundColor: '#0F172A', // Deep obsidian dark frame
    borderRadius: 16,
    padding: BOARD_PADDING,
    borderWidth: 2,
    borderColor: '#1E293B',
    // Subtle shadow for depth
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8, // Android shadow
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cellEmpty: {
    backgroundColor: '#1E293B', // Muted slate tile
    borderWidth: 1,
    borderColor: '#334155', // Subtle outline for grid lines
  },
  cellFilled: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    // Slight bevel shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  cellPressed: {
    transform: [{ scale: 0.92 }],
    opacity: 0.85,
  },
  blockShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
