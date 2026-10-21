import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { GameBoard } from '@/components/game/GameBoard';
import {
  BoardState,
  createEmptyBoard,
  DEFAULT_BLOCK_COLOR,
  POINTS_PER_CELL,
} from '@/types/game';
import { BottomTabInset, Spacing } from '@/constants/theme';

export default function GameScreen() {
  // 1. Separate state for the 8x8 board matrix
  const [board, setBoard] = useState<BoardState>(createEmptyBoard);

  // 2. Separate state for the game score
  const [score, setScore] = useState<number>(0);

  /**
   * Handle user tap on a grid cell at (rowIndex, colIndex).
   * - If the cell is empty (null): fill it with a block color and add points.
   * - If the cell is filled: clear it back to null and subtract points.
   */
  const handleCellPress = (rowIndex: number, colIndex: number) => {
    const isCurrentlyFilled = board[rowIndex][colIndex] !== null;

    // Immutable state update for the board
    setBoard((prevBoard) => {
      // Create a shallow copy of each row to maintain immutability
      const nextBoard = prevBoard.map((row) => [...row]);
      nextBoard[rowIndex][colIndex] = isCurrentlyFilled ? null : DEFAULT_BLOCK_COLOR;
      return nextBoard;
    });

    // Immutable state update for score
    setScore((prevScore) => {
      if (isCurrentlyFilled) {
        // Prevent score from dropping below 0
        return Math.max(0, prevScore - POINTS_PER_CELL);
      }
      return prevScore + POINTS_PER_CELL;
    });
  };

  /**
   * Reset board and score back to their initial empty states
   */
  const handleReset = () => {
    setBoard(createEmptyBoard());
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* Header Section: Title & Reset */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>BLOCK BLAST</Text>
            <Text style={styles.subtitle}>Mobile Puzzle Game</Text>
          </View>

          <Pressable
            onPress={handleReset}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.resetButtonPressed,
            ]}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>

        {/* Score Display Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>

        {/* 8x8 Game Board */}
        <View style={styles.boardWrapper}>
          <GameBoard board={board} onCellPress={handleCellPress} />
        </View>

        {/* Placeholder Tray for Future Block Pieces (Phase 2) */}
        <View style={styles.traySection}>
          <View style={styles.trayHeader}>
            <Text style={styles.trayTitle}>PIECE TRAY</Text>
            <Text style={styles.phaseBadge}>Phase 2 Placeholder</Text>
          </View>

          <View style={styles.traySlots}>
            <View style={styles.traySlot}>
              <Text style={styles.slotText}>Piece 1</Text>
            </View>
            <View style={styles.traySlot}>
              <Text style={styles.slotText}>Piece 2</Text>
            </View>
            <View style={styles.traySlot}>
              <Text style={styles.slotText}>Piece 3</Text>
            </View>
          </View>

          <Text style={styles.trayHint}>
            Tap any cell on the grid above to toggle blocks on and off!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080D1A', // Rich dark puzzle background
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 380,
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resetButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resetButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#334155',
  },
  resetButtonText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scoreCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    alignItems: 'center',
    marginBottom: Spacing.four,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    minWidth: 160,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#38BDF8', // Matching cyan accent
    letterSpacing: 1,
  },
  boardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  traySection: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: Spacing.three,
    borderWidth: 1.5,
    borderColor: '#1E293B',
  },
  trayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  trayTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#94A3B8',
  },
  phaseBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    overflow: 'hidden',
  },
  traySlots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  traySlot: {
    flex: 1,
    height: 72,
    backgroundColor: '#162032',
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  trayHint: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
  },
});
