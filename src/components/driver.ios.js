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

import Drawer from 'react-native-drawer';
import MyControlPanel from './ControlPanel';
import tweens from './tweens';

import menuImg from '../assets/menu.png';

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
          drawerType: 'overlay',
          openDrawerOffset:100,
          closedDrawerOffset:0,
          panOpenMask: .1,
          panCloseMask: .9,
          relativeDrag: false,
          panThreshold: .25,
          tweenHandlerOn: false,
          tweenDuration: 350,
          tweenEasing: 'linear',
          disabled: false,
          tweenHandlerPreset: null,
          acceptDoubleTap: false,
          acceptTap: false,
          acceptPan: true,
          tapToClose: false,
          negotiatePan: false,
          side: "right",
          selected: -1
        };
    }

    setDrawerType(type){
        this.setState({
            drawerType: type
        })
    }

    tweenHandler(ratio){
        if(!this.state.tweenHandlerPreset){ return {} }
        return tweens[this.state.tweenHandlerPreset](ratio)
    }

    noopChange(){
        this.setState({
            changeVal: Math.random()
        })
    }

    openDrawer(){
        this.drawer.open()
    }

    setStateFrag(frag) {
        this.setState(frag);
    }

    render() {
        var controlPanel = <MyControlPanel closeDrawer={() => {
            this.drawer.close();
        }} />
        return (
            
        <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.side}
        >  
            <View style={styles.drawer}>
                <View style={styles.header} key={0}>
                    
                    <Icon name="search" size={50} color="#fff" />
                    
                    <View style={styles.headerInfo} key={1}>
                        <Text style={styles.headerTitle} key={0}>
                        PICK A DRIVER?
                        </Text>
                    </View>
                    <TouchableHighlight
                        underlayColor="#B5B5B5"
                        onPress={() => {
                        this.openDrawer();
                    }}>
                        <Image source={menuImg}
							style={styles.inlineImg} />    
                    </TouchableHighlight>
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
        </Drawer>    
            
        );
    }
}

  
  const drawerStyles = {
    drawer: {
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 0,
    }
  }
  const styles = StyleSheet.create({
    drawer: {
      flex: 1,
      backgroundColor: '#1E88E5'
    },
    header: {
      
      flex: 1,
      padding: 16,
      backgroundColor: '#1565C0',
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
      fontSize: 30
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
		width: 30,
		height: 30,
    },
    next: {
        color: '#fff',
        fontSize: 30
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
