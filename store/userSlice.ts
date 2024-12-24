import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  bio: {
    fullName: string;
    nickName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    preferredLanguage: string;
    avatar: string;
    readingLevel: string;
    phoneNumber: string;
  };
  reference: string;
  interests: {
    favoriteStoryGenre: string;
    favoriteCharacter: string;
    creativePreference: string;
    favoriteColor: string;
  };
  storyPreferences: {
    mood: string;
    themeOfInterest: string;
  };
  languageSkills: Array<{
    language: string;
    reading: string;
    writing: string;
    listening: string;
    speaking: string;
  }>;
}

const initialState: UserState = {
  // Same as above
  bio: {
    fullName: "",
    nickName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    preferredLanguage: "",
    avatar: "",
    readingLevel: "",
    phoneNumber: "",
  },
  reference: "",
  interests: {
    favoriteStoryGenre: "",
    favoriteCharacter: "",
    creativePreference: "",
    favoriteColor: "",
  },
  storyPreferences: {
    mood: "",
    themeOfInterest: "",
  },
  languageSkills: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    updateBio(state, action: PayloadAction<Partial<UserState["bio"]>>) {
      state.bio = { ...state.bio, ...action.payload };
    },
  },
});

export const { setUser, updateBio } = userSlice.actions;
export default userSlice.reducer;
