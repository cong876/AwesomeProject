import React, {
  AppRegistry,
  Alert,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Navigator
} from 'react-native';

import SampleComponent from './SampleComponent'

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://www.yeyetech.net/api/activities/current';
var PAGE_SIZE = 25;
var REQUEST_URL = API_URL;

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.details),
          loaded: true
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
      />
      // <Navigator
        // initialRoute={{name: 'My First Scene', index: 0}}
        // renderScene={(route, navigator) =>
          // <SampleComponent
            // name={route.name}
            // onForward={() => {
              // var nextIndex = route.index + 1;
              // navigator.push({
                // name: 'Scene ' + nextIndex,
                // index: nextIndex,
              // });
            // }}
            // onBack={() => {
              // if (route.index > 0) {
                // navigator.pop();
              // }
            // }}
          // />
        // }
      // />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading items...
        </Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={() => Alert.alert(
            item.title,
            item.description,
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ]
          )}
        >
          <Image
            source={{uri: item.pic_url}}
            style={styles.thumbnail}
          />
        </TouchableHighlight>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>{parseFloat(item.price).toFixed(2)}</Text>
          <Text style={styles.market_price}>{item.market_price}</Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  description: {
    textAlign: 'left'
  },
  thumbnail: {
    width: 100,
    height: 100
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);