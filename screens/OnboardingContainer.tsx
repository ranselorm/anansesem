import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';

import { useNavigation } from 'expo-router';
import OnboardingScreen from '../components/OnboardingScreen';
import OnboardingDots from '../components/OnboardingDots';
import ArrowRightIcon from '../components/icons/ArrowRight';



const { width } = Dimensions.get('window');

const onboardingData = [
  {
    image: '/images/onboarding1.png',
    title: 'Welcome to your storybook world',
    description: "Let's embark on a magical journey together!",
  },
  {
    image: 'https://example.com/onboarding2.png',
    title: 'Create your own adventures',
    description: 'Unleash your creativity and create your own stories.',
  },
  {
    image: 'https://example.com/onboarding3.png',
    title: 'Learn while you play',
    description: 'Fun educational stories to spark your curiosity.',
  },
  {
    image: 'https://example.com/onboarding4.png',
    title: 'A world of stories awaits you',
    description: 'Dive into a vast library of exciting tales.',
  },
];

interface OnboardingContainerProps {
  onFinish: () => void;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  onFinish,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      onFinish(); // Trigger the transition to the Welcome screen
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={{ width }}>
      <OnboardingScreen
        image={item.image}
        title={item.title}
        description={item.description}
        onNext={handleNext}
        isLast={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToInterval={width} // Ensure snapping to full screen
        decelerationRate="fast" // Smooth scrolling
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <View style={styles.buttonContainer}>
         <OnboardingDots total={onboardingData.length} activeIndex={currentIndex} />
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRightIcon size={32} color="white" />
        </Text>
      </TouchableOpacity>
      </View>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 20,
    backgroundColor:'white'
  },
  buttonContainer:{
    marginBottom:40,
    width:'60%'
  },
  button: {
    backgroundColor: '#d0ee30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:'100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default OnboardingContainer;
