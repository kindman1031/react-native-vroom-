import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableHighlight,
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

import { Colors, Device, FontSize, PaddingSize } from '../lib/device-info';

import logoImg from '../assets/logo.png';
import { menuItems } from '../data.service';


// map redux store to props
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

// map actions to props
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            Auth: bindActionCreators(AuthAction, dispatch),
        }
    }
}



class Driver extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: -1,
        };
    }
    render() {

        return (
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
                    <Image source={logoImg}
							style={styles.inlineImg} />
                    
                    <View style={styles.headerInfo} key={1}>
                        <Text style={styles.headerTitle} key={0}>
                        Welcome passenger
                        </Text>
                    </View>
                </View>
                <View style={styles.content} key={1}>
                    <ScrollView>
                        {menuItems.map((item, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={styles.listItem}
                            onPress={() => this.setState({selected:idx})}
                        >
                            <Image source={{ uri: item.thumb}} style={styles.listItemImage} />
                            <Text style={[styles.listItemTitle, {color: this.state.selected == idx ?'red' :'white'}]}>{item.label}</Text>
                        </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.header} key={2}>
                    <TouchableHighlight
                        underlayColor="#B5B5B5"
                        onPress={() => Actions.driver()}
                    >
                        <Text style={styles.headerTitle}>Next</Text>    
                    </TouchableHighlight>
                </View>
            </View>

            
        );
    }
}



  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
    },
    header: {
      
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      justifyContent:'space-around',
      alignItems:'center',
    },
    content: {
      flex: 8,
      padding: 16,
      backgroundColor: '#1E88E5'
    },
    headerTitle: {
      color: '#fff',
      fontSize: 20
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 50,
      marginBottom: 10
    },
    listItemTitle: {
      fontSize: 18,
      flexShrink: 1,
      color: '#fff'
    },
    listItemImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    inlineImg: {
		width: 100,
        height: 30,
        resizeMode: 'stretch'
    },
    next: {
        color: '#fff',
        fontSize: 30
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
