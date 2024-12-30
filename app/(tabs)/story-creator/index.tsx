import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CollapsibleCategory from "@/components/CollapsibleCategory";
import HomeLayout from "@/shared/HomeLayout";
import { Colors, Fonts, FontSizes } from "@/theme";
import { Button } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "@/store";

const StoryCreator: React.FC = () => {
  const [book, setBook] = useState({
    title: "",
    language: "",
    numberOfPages: 0,
    images: "",
    readingLevel: "",
    category: [] as string[],
    ambientMusic: "",
  });

  const [mainCharacter, setmainCharacter] = useState({
    name: "",
    gender: "",
    age: 0,
    species: "",
    traits: "",
  });

  const [story, setStory] = useState({
    prompt: "",
    moral: "",
  });
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (category: string) => {
    setBook((prev) => {
      const updatedCategories = prev.category.includes(category)
        ? prev.category.filter((item) => item !== category)
        : [...prev.category, category];
      return { ...prev, category: updatedCategories };
    });
  };

  const { submitStory } = useSubmitStory();
  const validateFields = () => {
    if (
      !book.title ||
      !book.language ||
      !book.numberOfPages ||
      !book.images ||
      !book.readingLevel ||
      !book.ambientMusic ||
      !book.category ||
      !mainCharacter.name ||
      !mainCharacter.gender ||
      !mainCharacter.age ||
      !mainCharacter.species ||
      !mainCharacter.traits ||
      !story.prompt ||
      !story.moral
    ) {
      Alert.alert("Required Fields", "Please all fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;
    console.log({ book, mainCharacter, story });
    setLoading(true);
    submitStory({
      book,
      mainCharacter,
      story,
      reference: "testkhgfdkl12jj4kkw",
    }).finally(() => setLoading(false));
  };

  const categories = ["ADVENTURE", "MYSTERY"];

  const sections = [
    {
      key: "Book",
      content: (
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the title of the book"
            value={book.title}
            onChangeText={(text) => setBook({ ...book, title: text })}
          />
          <Text style={styles.label}>Language</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={book.language}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setBook({ ...book, language: itemValue })
              }
            >
              <Picker.Item label="Select" value={null} />
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
            </Picker>
          </View>
          <Text style={styles.label}>Number of Pages</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={book.numberOfPages.toString()}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setBook({
                  ...book,
                  numberOfPages: parseInt(itemValue),
                })
              }
            >
              <Picker.Item label="Select" value="" />
              {[...Array(30)].map((_, i) => (
                <Picker.Item
                  key={i}
                  label={`${i + 1} pages`}
                  value={`${i + 1}`}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Images</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={book.images}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setBook({ ...book, images: itemValue })
              }
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Illustrations" value="illustrations" />
              <Picker.Item label="Photos" value="photos" />
            </Picker>
          </View>
          <Text style={styles.label}>Reading Level</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={book.readingLevel}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setBook({ ...book, readingLevel: itemValue })
              }
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Emergent" value="Emergent" />
              <Picker.Item label="Early Reader" value="Early Reader" />
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item
                label="Transitional Reader"
                value="Transitional Reader"
              />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Fluent Reader" value="Fluent Reader" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
          </View>
          <Text style={styles.label}>Ambient Music</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={book.ambientMusic}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setBook({ ...book, ambientMusic: itemValue })
              }
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Calm" value="calm" />
              <Picker.Item label="Dramatic" value="dramatic" />
            </Picker>
          </View>
          <TouchableOpacity
            onPress={() => setIsCategoryCollapsed(!isCategoryCollapsed)}
            style={styles.categoryToggle}
          >
            <Text style={styles.label}>Category select</Text>
          </TouchableOpacity>
          {!isCategoryCollapsed && (
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => toggleCategory(item)}
                  style={[
                    styles.categoryOption,
                    book.category.includes(item) && styles.categorySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      book.category.includes(item) &&
                        styles.categoryTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ),
    },
    {
      key: "Characters",
      content: (
        <View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the character's name"
            value={mainCharacter.name}
            onChangeText={(text) =>
              setmainCharacter({ ...mainCharacter, name: text })
            }
          />
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mainCharacter.gender}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setmainCharacter({ ...mainCharacter, gender: itemValue })
              }
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
          <Text style={styles.label}>Age</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mainCharacter.age.toString()}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setmainCharacter({
                  ...mainCharacter,
                  age: parseInt(itemValue),
                })
              }
            >
              {[...Array(100)].map((_, i) => (
                <Picker.Item
                  key={i}
                  label={`${i + 1} years`}
                  value={`${i + 1}`}
                />
              ))}
            </Picker>
          </View>
          <Text style={styles.label}>Species</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mainCharacter.species}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setmainCharacter({ ...mainCharacter, species: itemValue })
              }
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Dwarf" value="dwarf" />
              <Picker.Item label="Human" value="human" />
              <Picker.Item label="Elf" value="elf" />
              <Picker.Item label="Gnome" value="gnome" />
              <Picker.Item label="Animal" value="animal" />
            </Picker>
          </View>
          <Text style={styles.label}>Traits</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={mainCharacter.traits}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setmainCharacter({ ...mainCharacter, traits: itemValue })
              }
            >
              <Picker.Item label="Select" value={null} />
              <Picker.Item label="Evil" value="evil" />
              <Picker.Item label="Good" value="good" />
              <Picker.Item label="Neutral" value="neutral" />
            </Picker>
          </View>
        </View>
      ),
    },
    {
      key: "Story",
      content: (
        <View>
          <Text style={styles.label}>Story Prompt</Text>
          <TextInput
            style={styles.inputMultiline}
            multiline
            placeholder="Write a brief description of your story here"
            placeholderTextColor={"#fff"}
            value={story.prompt}
            onChangeText={(text) => setStory({ ...story, prompt: text })}
          />
          <Text style={styles.label}>Story Moral</Text>
          <TextInput
            style={styles.inputMultiline}
            multiline
            placeholder="e.g. the importance of telling the truth"
            placeholderTextColor={"#fff"}
            value={story.moral}
            onChangeText={(text) => setStory({ ...story, moral: text })}
          />
        </View>
      ),
    },
  ];

  const renderHeader = () => (
    <View style={styles.textContainer}>
      <Text style={styles.description}>
        Your story will be generated based on the options you select in the
        following 3 categories.
      </Text>
    </View>
  );

  return (
    <>
      <View style={styles.screen}>
        <HomeLayout isIcon title="AI Story Creator">
          <FlatList
            data={sections}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <CollapsibleCategory title={item.key} defaultOpen>
                {item.content}
              </CollapsibleCategory>
            )}
            contentContainerStyle={styles.flatListContainer}
            ListHeaderComponent={renderHeader}
          />
          {loading ? (
            <ActivityIndicator size="large" color={Colors.main} />
          ) : (
            <Button title="Generate" onPress={handleSubmit} />
          )}
        </HomeLayout>
      </View>
    </>
  );
};

const useSubmitStory = () => {
  const user = useSelector((state: RootState) => state.user.userResponse);

  const submitStory = async (data: any) => {
    try {
      const response = await axios.post(
        "https://anansesem-dev-api.azurewebsites.net/api/generate-story",
        data,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response);
      Alert.alert("Success", "Story submitted successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to submit the story.");
    }
  };

  return { submitStory };
};

const styles = StyleSheet.create({
  screen: { backgroundColor: "#fff", flex: 1 },

  textContainer: {},
  title: {
    textAlign: "center",
    fontFamily: Fonts.heading,
    color: Colors.main,
    fontSize: FontSizes.title,
  },
  description: {
    textAlign: "center",
    marginTop: -10,
    marginBottom: 20,
  },

  flatListContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 4,
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#d9d9d9",
  },

  inputMultiline: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  categoryToggle: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
  },
  categorySelected: {
    backgroundColor: Colors.main,
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    fontWeight: "bold",
    color: "#fff",
  },
});

export default StoryCreator;
