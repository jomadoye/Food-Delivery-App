import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {GradientButton} from './../components/';
import {Walkthrough} from './../components/walkthrough';
import {Walkthrough1} from './walkthroughs/walkthrough1';
import {Walkthrough2} from './walkthroughs/walkthrough2';
import {Walkthrough3} from './walkthroughs/walkthrough3';
import {PaginationIndicator} from './../components';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions';
import AppSpinner from './../components/Loading/AppSpinner';
import NavigatorService from './../utils/navigator';
import ErrorMessage from './../components/ErrorMessage';
import loadAssetsAsync from './../utils/loadFonts';

class Welcome_Screen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {index: 0};
  }

  componentDidMount() {
      if ( !this.props.fontLoaded ) {
        loadAssetsAsync();
        this.props.fontLoadedChanged(true);
        this.props.authStateChanged();
    }
  }

  changeIndex(index) {
    this.setState({index})
  }

  render() {
    console.log('WalkthroughScreen:Line 30: Rendering WalkthroughScreen');
    if ( this.props.loginStatus == 'initial' || !this.props.fontLoaded ) {
        return ( <AppSpinner /> );
    }
    return (
      <View style={styles.screen}>
        <ErrorMessage />
        <Walkthrough onChanged={(index) => this.changeIndex(index)}>
          <Walkthrough1/>
          <Walkthrough2/>
          <Walkthrough3/>
        </Walkthrough>
        <PaginationIndicator length={3} current={this.state.index}/>
        <GradientButton
          rkType='large'
          style={styles.button}
          text="GET STARTED"
          onPress={() => {
            NavigatorService.reset('profile_screen');
          }}/>
      </View>
    )
  }
}


const mapStateToProps = ({ auth }) => {
  const { loginStatus, fontLoaded } = auth;
  return { loginStatus, fontLoaded };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base,
    paddingVertical: 0,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25
  }
}));

export default connect( mapStateToProps , {
  loginStatusChanged, authStateChanged, fontLoadedChanged
})(Welcome_Screen);
