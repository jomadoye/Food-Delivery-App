import React from 'react';
import {
  ScrollView,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import moment from 'moment';
import {Avatar} from '../components';
import {SocialBar} from '../components';


class VendorSinglePage_Screen extends React.Component {
  static navigationOptions = {
    title: 'Single Article View'.toUpperCase()
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { vendor_single_product_details } = this.props;
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

    this.data = {
      // vendor_single_product_details,
      'id': 9,
      'photo': require('../img/photo47.png'),
      'type': 'fact',
      'time': -565,
      'header': 'Elephant',
      'text': 'Elephant is one of the few mammals that can\'t jump.',
      'comments': [],
      user: {
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
      }
    };
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <RkCard rkType='article'>
          <Image rkCardImg source={this.data.photo}/>
          <View rkCardHeader>
            <View>
              <RkText style={styles.title} rkType='header4'>{this.data.header}</RkText>
              <RkText rkType='secondary2 hintColor'>{moment().add(this.data.time, 'seconds').fromNow()}</RkText>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileV1', {id: this.data.user.id})}>
              <Avatar rkType='circle' img={this.data.user.photo}/>
            </TouchableOpacity>
          </View>
          <View rkCardContent>
            <View>
              <RkText rkType='primary3 bigLine'>{this.data.text}</RkText>
            </View>
          </View>
          <View rkCardFooter>
            <SocialBar/>
          </View>
        </RkCard>
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));

const mapStateToProps = ({ vendor }) => {
  const {
    vendor_single_product_details } = vendor;
    console.log(vendor_single_product_details, '=;;;;')
  return { vendor_single_product_details };
};

export default connect(mapStateToProps, null)(VendorSinglePage_Screen);