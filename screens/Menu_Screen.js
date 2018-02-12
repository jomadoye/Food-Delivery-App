// import React, { Component } from 'react';
// import {
//   FlatList,
//   Image,
//   Text,
//   View,
//   TouchableOpacity,
//   Platform,
//   StatusBar
// } from 'react-native';
// import {
//   RkText,
//   RkCard,
//   RkStyleSheet,
//   RkTheme
// } from 'react-native-ui-kitten';
// import { Header } from 'react-navigation';

// import {SocialBar} from './../components/';
// import articles from './../data/raw/articles';
// import { Button } from 'react-native-elements';
// import {FontAwesome} from './../assets/icons';


// class Menu_Screen extends Component {

//   static navigationOptions = {
//     headerTitle: 'Items',
//     tabBarLabel: 'Home',
//     tabBarIcon: ({ tintColor }) => (
//       <RkText
//         rkType='awesome'
//         style={{
//           color: tintColor,
//           fontSize: 24,
//           marginBottom: 0,
//         }}>
//           {FontAwesome.home}
//       </RkText>
//     ),
//   };

//   constructor(props) {
//     super(props);
//     // this.data = data.getArticles('fact');
//     this.renderItem = this._renderItem.bind(this);
//     console.log(articles);
//   }

//   _keyExtractor(post) {
//     return post.id;
//   }

//   _renderItem(info) {
//     return (
//       <TouchableOpacity
//         delayPressIn={70}
//         activeOpacity={0.8}
//         onPress={() => this.props.navigation.navigate('Article', {id: info.item.id})}>
//       	<RkCard rkType='horizontal' style={styles.card}>
//         	<Image rkCardImg source={info.item.photo}/>

//           <View rkCardContent style={{justifyContent: 'space-around'}}>
//             <View style={{ flex: 1, justifyContent: 'flex-start'}}>
//               <RkText numberOfLines={1} rkType='h6'>{info.item.header}</RkText>
//               <RkText rkType='s6 hintColor'>{'Sandra Powers'}</RkText>
//             </View>
//             <View style={{ marginTop: 20, flex: 1, justifyContent: 'center'}}>
//               <RkText style={styles.post} numberOfLines={1} rkType={Platform.OS==='android' ? 's5':'s3'}>{'Hi There 1'}</RkText>
//             </View>
//             <View style={{ marginBottom: 0, flex: 1, justifyContent: 'flex-end'}}>
//               <RkText style={styles.post} numberOfLines={1} rkType={Platform.OS==='android' ? 's5  hintColor':'s3  hintColor'}>{'8 Oz / $2.99'}</RkText>
//             </View>
//           </View>
//           <View rkCardFooter>
//             <SocialBar rkType='space' showLabel={true}/>
//           </View >
//         </RkCard>
//       </TouchableOpacity>
//     )
//   }

//   render() {

//     return (
//       <View>
//         <FlatList
//           data={articles}
//           renderItem={this.renderItem}
//           keyExtractor={this._keyExtractor}
//           style={styles.container}/>
//         <Text>
//           Hello World
//         </Text>
//       </View>
//     )
//   }
// }


/*

<View>
  <Button
    large
    title="Log out"
    backgroundColor="#00aced"
    icon={{ type: 'font-awesome', color: "#ffffff", name: 'sign-out' }}
    onPress={ () => this.props.navigation.navigate('location_screen') }
  />
</View>

*/

// let styles = RkStyleSheet.create(theme => ({
//   container: {
//     backgroundColor: theme.colors.screen.scroll,
//     paddingVertical: 8,
//     paddingHorizontal: 14
//   },
//   card: {
//     marginVertical: 8,
//     height: 125
//   },
//   post: {
//     marginTop: 5,
//     marginBottom: 1
//   }
// }));

// export default Menu_Screen;

import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {FontAwesome} from './../assets/icons';


class Menu_Screen extends Component {
  static navigationOptions = {
    headerTitle: 'Items',
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <RkText
        rkType='awesome'
        style={{
          color: tintColor,
          fontSize: 24,
          marginBottom: 0,
        }}>
          {FontAwesome.home}
      </RkText>
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      allData: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      noData: false,
      serching: false,
      selectedItemID: null
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          allData: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar 
      round={false}
      onChangeText={this.handleSearch}
      onClearText={this.makeRemoteRequest}
      showLoadingIcon={this.state.searching}
      placeholder="Search Here..." 
      lightTheme />;
  };

  renderEmptyResultMessage = () => {
    return <Text>No Data.... </Text>;
  }

  handleSearch = (e) => {
    this.setState({
      searching: true,
      selectedItemID: null
    })
    console.log('text changed to :', e)
    let text = e.toLowerCase()
    let displayedResults = this.state.data
    let filteredName = displayedResults.filter((item) => {
      return item.name.first.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({
        data: this.state.allData
      })
    } else if (Array.isArray(filteredName) && filteredName.length === 0) {
      this.setState({
        noData: true,
        data: []
      })
    } else if (Array.isArray(filteredName)) {
      this.setState({
        noData: false,
        data: filteredName
      })
    }
    this.setState({
      searching: false
    })
  }

  handleOnPress = (selectedItemID) => {
    this.setState({ selectedItemID });
    console.log('Pressed', this.state.selectedItemID);
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
         <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              onPress={() => this.handleOnPress(item.email)}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
              avatar={{ uri: item.picture.thumbnail }}
              containerStyle={this.state.selectedItemID !== item.email ? { borderBottomWidth: 0 }
                : { borderBottomWidth: 0, backgroundColor: '#b4bbc6' }}
            />
          )}
          keyExtractor={item => item.email}
          extraData={this.state.selectedItemID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmptyResultMessage}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default Menu_Screen;
