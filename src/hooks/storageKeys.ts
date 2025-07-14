/**
 * Centralized storage for all React Query keys used throughout the application
 */
export const storageKeys = {
  /**
   * Key for fetching all rooms
   */
  rooms: ['rooms'] as const,

  /**
   * Key for fetching questions in a specific room
   * @param roomId - The ID of the room
   */
  getQuestions: (roomId: string) => ['get-questions', roomId] as const,
} as const;
