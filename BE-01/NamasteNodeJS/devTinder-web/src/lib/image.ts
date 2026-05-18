const FALLBACK_PROFILE_PHOTO = "/logo.svg";

export const getProfilePhotoUrl = (photoUrl?: string | null) => {
    const value = photoUrl?.trim();

    if (!value || value === "Default profile photo URL.") {
        return FALLBACK_PROFILE_PHOTO;
    }

    if (value.startsWith("/")) {
        return value;
    }

    try {
        const url = new URL(value);
        if (url.protocol === "http:" || url.protocol === "https:") {
            return value;
        }
    } catch {
        return FALLBACK_PROFILE_PHOTO;
    }

    return FALLBACK_PROFILE_PHOTO;
};
