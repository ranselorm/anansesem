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
  userResponse: Record<string, any> | null; // Refined type
}

const initialState: UserState = {
  bio: {
    fullName: "",
    nickName: "selooo",
    email: "",
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
  languageSkills: [],
  userResponse: null,
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
    storeUserResponse(
      state,
      action: PayloadAction<Record<string, any> | null>
    ) {
      state.userResponse = action.payload;
    },
    updateReference(state, action: PayloadAction<string>) {
      state.reference = action.payload;
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
  storeUserResponse,
  updateReference,
  resetState,
} = userSlice.actions;

export default userSlice.reducer;
