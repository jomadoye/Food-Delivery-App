import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  // Modal,
  Button,
} from 'react-native';
import {
  RkText,
  RkButton, RkStyleSheet
} from 'react-native-ui-kitten';
import { HeaderBackButton } from 'react-navigation';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import NavigatorService from '../utils/navigator';
import {Avatar} from '../components';
import {Gallery} from '../components';
import {FontIcons} from '../assets/icons';
import formatNumber from '../utils/textUtils';

export default class VendorProfile_Screen extends React.Component {
  static navigationOptions = {
    title: 'User Profile'.toUpperCase(),
    headerLeft: <HeaderBackButton
            onPress={() => NavigatorService.navigate('vendor_single_page_screen')}
          />,
  };

  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false
    };
    
  }

  componentWillMount() {
    let images = [
      require('../img/Image10.png'),
      require('../img/Image11.png'),
      require('../img/Image2.png'),
      require('../img/Image3.png'),
      require('../img/Image4.png'),
      require('../img/Image1.png'),
      require('../img/Image12.png'),
      require('../img/Image8.png'),
      require('../img/Image6.png'),
      require('../img/Image9.png'),
      require('../img/Image5.png'),
      require('../img/Image7.png'),
      require('../img/Image5.png'),
    ];
    this.user = {
      id: 1,
      firstName: 'Helen',
      lastName: 'Gilbert',
      phone: '+1 415 670 90 34',
      country: 'Belarus',
      email: 'h.gilbert@akveo.com',
      password: '123456',
      newPassword: '12345678',
      confirmPassword: '12345678',
      photo: require('../img/avatars/Image9.png'),
      postCount: 86,
      followersCount: 22102,
      followingCount: 536,
      images: images
    };
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  renderModal () {
    console.log('hit')
    return (
      <View style={styles.container}>
          <Modal
              visible={this.state.isModalVisible}
              animationType={'slide'}
              onRequestClose={() => this._toggleModal()}
              onBackButtonPress={() => this._toggleModal()}
              onBackdropPress={() => this._toggleModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text>This is content inside of modal component</Text>
                <Button
                    onPress={() => this._toggleModal()}
                    title="Close modal"
                >
                </Button>
              </View>
            </View>
          </Modal>
        </View>
    )
  }

  render() {
    let name = `${this.user.firstName} ${this.user.lastName}`;
    let images = this.user.images;
    return (
      <ScrollView style={styles.root}>
        <View style={[styles.header, styles.bordered]}>
          <View style={styles.row}>
            <View style={styles.buttons}>
              <RkButton
                style={styles.button}
                rkType='icon circle'
                onPress={this._toggleModal}>
                <RkText rkType='moon large primary'>{FontIcons.profile}</RkText>
              </RkButton>
            </View>
            <Avatar img={this.user.photo} rkType='big'/>
            <View style={styles.buttons}>
              <RkButton style={styles.button} rkType='icon circle'>
                <RkText rkType='moon large primary'>{FontIcons.mail}</RkText>
              </RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <RkText rkType='header2'>{name}</RkText>
          </View>
        </View>
        <View style={styles.userInfo}>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.postCount}</RkText>
            <RkText rkType='secondary1 hintColor'>Posts</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{formatNumber(this.user.followersCount)}</RkText>
            <RkText rkType='secondary1 hintColor'>Followers</RkText>
          </View>
          <View style={styles.section}>
            <RkText rkType='header3' style={styles.space}>{this.user.followingCount}</RkText>
            <RkText rkType='secondary1 hintColor'>Following</RkText>
          </View>
        </View>
        <Gallery items={images}/>
        {this.state.isModalVisible && this.renderModal()}
      </ScrollView>
    )
  }
}


let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  header: {
    paddingTop: 25,
    paddingBottom: 17,
  },
  row: {
    flexDirection: 'row',

  },
  userInfo: {
    flexDirection: 'row',
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: theme.colors.border.base
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  space: {
    marginBottom: 3
  },
  separator: {
    backgroundColor: theme.colors.border.base,
    alignSelf: 'center',
    flexDirection: 'row',
    flex: 0,
    width: 1,
    height: 42
  },
  buttons: {
    flex: 1
  },
  button: {
    marginTop: 27.5,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
}));

// const mapStateToProps = ({ vendor }) => {
//   const {
//     vendor_single_product_details } = vendor;
//   return { vendor_single_product_details };
// };

// export default connect(mapStateToProps, null)(VendorProfile_Screen);