import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import {
  RkText,
  RkCard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import {FontAwesome} from './../assets/icons';
import {saveVendorDetail} from '../actions/VendorActions';
import NavigatorService from '../utils/navigator';

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
        // console.log(res.results)
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

  handleOnPress = (selectedItemID, item) => {
    this.setState({ selectedItemID });
    this.props.saveVendorDetail(item);
    NavigatorService.reset('vendor_screen');
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
              onPress={() => this.handleOnPress(item.email, item)}
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

export default connect(null, {saveVendorDetail})(Menu_Screen);
