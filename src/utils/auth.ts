type StoredUser = {
  user_id: number;
  email: string;
  nickname: string;
  profile_url: string;
};

export const getCurrentUser = (): StoredUser | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};

export const getCurrentUserId = (): number | null => {
  const user = getCurrentUser();
  return user?.user_id ?? null;
};
