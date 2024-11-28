export const validateLocation = (location: string): string | null => {
  if (!location.trim()) {
    return 'Please enter a location';
  }

  if (location.length < 2) {
    return 'Location must be at least 2 characters long';
  }

  if (!/^[a-zA-Z\s,.-]+$/.test(location)) {
    return 'Location should only contain letters, spaces, and basic punctuation';
  }

  return null;
};