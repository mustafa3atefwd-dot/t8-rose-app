import { AVATAR_COLORS, DEFAULT_AVATAR_COLOR } from '@/shared/lib/constants/user-avatar.constant';

/**
 * Get avatar color based on user ID
 * @param userId - User ID
 * @returns Avatar color class
 */
export function getAvatarColor(userId?: string | number | null): string {
  // Get default avatar color if user ID is not available
  if (userId === undefined || userId === null) {
    return DEFAULT_AVATAR_COLOR;
  }

  // Calculate hash from user ID
  const value = String(userId);

  let hash = 0;

  // Hash the user ID to get a pseudo-random color
  for (let index = 0; index < value.length; index++) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  // Return avatar color based on hash
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/**
 * Get user initial from name or username
 * @param firstName - First name
 * @param lastName - Last name
 * @param username - Username
 * @returns User initial
 */
export function getUserInitial(firstName?: string | null, lastName?: string | null, username?: string | null): string {
  // Get user initial from name or username
  const name = firstName?.trim() || lastName?.trim() || username?.trim();

  // Return user initial or '?' if not available
  return name?.charAt(0).toUpperCase() || '?';
}
