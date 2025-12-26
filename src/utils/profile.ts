export type ProfileData = {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  phoneVerified?: boolean;
  bio?: string;
  country?: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

const PROFILE_KEY = "profile";

export function readProfile(): ProfileData | null {
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ProfileData;
  } catch {
    return null;
  }
}

export function writeProfile(p: ProfileData) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export function mergeProfile(patch: Partial<ProfileData>) {
  const current = readProfile();
  if (!current) return;
  writeProfile({ ...current, ...patch });
}
