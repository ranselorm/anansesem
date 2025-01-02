import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageSkill {
  language: string;
  reading: string;
  writing: string;
  listening: string;
  speaking: string;
}

interface UserState {
  bio: {
    fullName: string;
    nickName: string;
    email: string;
    password: string;
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
  languageSkills: LanguageSkill[];
  userResponse: Record<string, any> | null;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  bio: {
    fullName: "",
    nickName: "selooo",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    preferredLanguage: "ENGLISH",
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
  languageSkills: [
    {
      language: "English",
      reading: "INTERMEDIATE",
      writing: "INTERMEDIATE",
      listening: "INTERMEDIATE",
      speaking: "INTERMEDIATE",
    },
  ],
  userResponse: null,
  isLoggedIn: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBio(state, action: PayloadAction<Partial<UserState["bio"]>>) {
      state.bio = { ...state.bio, ...action.payload };
    },
    updateInterests(
      state,
      action: PayloadAction<Partial<UserState["interests"]>>
    ) {
      state.interests = { ...state.interests, ...action.payload };
    },
    updateStoryPreferences(
      state,
      action: PayloadAction<Partial<UserState["storyPreferences"]>>
    ) {
      state.storyPreferences = {
        ...state.storyPreferences,
        ...action.payload,
      };
    },
    updateLanguageSkills(
      state,
      action: PayloadAction<UserState["languageSkills"]>
    ) {
      state.languageSkills = [...action.payload];
    },
    setUser(state, action: PayloadAction<Record<string, any> | null>) {
      state.userResponse = action.payload;
    },
    updateReference(state, action: PayloadAction<string>) {
      state.reference = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  updateBio,
  updateInterests,
  updateStoryPreferences,
  updateLanguageSkills,
  setUser,
  updateReference,
  setLoading,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
