import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  View,
} from 'react-native';
import Colors from '../../styles/Colors';
import AssetsHeader from './AssetsHeader';
import TotalSection from './TotalSection';
import AirdropsSection from './AirdropsSection';
import PositionsSection from './PositionsSection';
import useAssets from '../../store';
const {height} = Dimensions.get('window');

const DynamicHeader = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 135],
    outputRange: [205, 60],
    extrapolate: 'clamp',
  });
  const paddingTop = scrollY.interpolate({
    inputRange: [0, 135],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });
  const marginBottom = scrollY.interpolate({
    inputRange: [0, 135],
    outputRange: [28, 0],
    extrapolate: 'clamp',
  });
  const bottom = scrollY.interpolate({
    inputRange: [0, 135],
    outputRange: [-24, 0],
    extrapolate: 'clamp',
  });

  return {scrollY, headerHeight, paddingTop, bottom, marginBottom};
};
export type flexType =
  | Animated.AnimatedInterpolation<string | number>
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse';
export type alignType =
  | Animated.AnimatedInterpolation<string | number>
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch';

const AssetsScreen = () => {
  const [flexDirection, setFlexDirection] = useState<flexType>('column');
  const [alignItems, setAlignItems] = useState<alignType>('stretch');
  const [isLabels, setIsLabels] = useState(true);
  const {getAssets, getPositions} = useAssets();
  const {scrollY, headerHeight, paddingTop, marginBottom, bottom} =
    DynamicHeader();
  useEffect(() => {
    getAssets();
  }, [getAssets, getPositions]);
  useEffect(() => {
    const id = scrollY.addListener(({value}) => {
      setFlexDirection(value > 75 ? 'row' : 'column');
      setAlignItems(value > 75 ? 'center' : 'stretch');
      setIsLabels(value > 75 ? false : true);
    });

    return () => scrollY.removeListener(id);
  }, [scrollY]);
  return (
    <SafeAreaView style={styles.container}>
      <AssetsHeader
        height={headerHeight}
        paddingTop={paddingTop}
        flexDirection={flexDirection}
        alignItems={alignItems}
        marginBottom={marginBottom}
        bottom={bottom}
        isLabels={isLabels}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        style={styles.mainContent}>
        <View style={{height: 240}}></View>

        <TotalSection />
        <PositionsSection />
        <AirdropsSection />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
export default AssetsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purple,
    flex: 1,
  },
  scrollViewContent: {
    height: height,
  },
  mainContent: {
    // PaddingTop: 260,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
});
