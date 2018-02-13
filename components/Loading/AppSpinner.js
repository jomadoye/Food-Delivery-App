import React, { Component } from 'react';
import { View, Dimensions, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';


class AppSpinner extends Component {
  render() {
    const width = Dimensions.get('window').width / 3;
    if (Platform.OS === 'ios') {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={{
flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
}}
      >
        <View>
          <Image style={[styles.image, { width }]} source={require('./../../assets/icons/loading-icon.png')} />
        </View>
        <View />
      </View>
    );
  }
}

const styles = {
  image: {
    resizeMode: 'contain',
  },
};


const mapStateToProps = ({ auth }) => {
  const { loginStatus } = auth;
  return { loginStatus };
};

export default connect(mapStateToProps, null)(AppSpinner);
