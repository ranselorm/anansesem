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
  reference: "testkskskluser2kksksksksjhfj2",
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
      state.storyPreferences = { ...state.storyPreferences, ...action.payload };
    },
    updateLanguageSkills(
      state,
      action: PayloadAction<UserState["languageSkills"]>
    ) {
      state.languageSkills = action.payload;
    },
  },
});

export const {
  updateBio,
  updateInterests,
  updateStoryPreferences,
  updateLanguageSkills,
} = userSlice.actions;

export default userSlice.reducer;
