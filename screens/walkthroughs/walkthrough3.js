import React from 'react';
import {
  Image,
  View,
  Dimensions,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import { scaleModerate } from './../../utils/scale';


export class Walkthrough3 extends React.Component {
  render() {
    /*
    let image = RkTheme.current.name === 'light'
      ? <Image source={require('../../assets/images/kittenImage.png')}/>
      : <Image source={require('../../assets/images/kittenImageDark.png')}/>;
    */
    const contentHeight = scaleModerate(375, 1);
    const height = Dimensions.get('window').height - contentHeight;
    const { width } = Dimensions.get('window');
    const heightSub = height / 2;
    const widthSub = width - 40;

    const image = <Image style={[styles.image, { height, width }]} source={require('../../assets/images/backgroundLoginV6.png')} />;
    const imageQuality = <Image style={{ resizeMode: 'contain', height: heightSub, width: widthSub }} source={require('../../assets/images/valueForMoney.png')} />;
    return (
      <View style={styles.screen}>
        {image}
        {imageQuality}
        <RkText rkType="header2" style={styles.text}>Value for your money</RkText>
      </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  text: {
    marginTop: 20,
  },
}));
