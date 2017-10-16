import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	ActivityIndicator,
	StyleSheet,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

// import bgSrc from '../assets/light-bg.jpg';
// import logoImg from '../assets/logo.png';
import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import default_avatar from '../assets/default_avatar.jpg';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

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

class Forgot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isBusy: false,
			avatarSource: default_avatar,
			email: null,
			password: null,
			fullName: null,
			address: null,
			phoneNumber: null,
			avatar:null,
			passwordCF: null
		}
	}

	componentDidMount() {
		this.setState({isBusy: false});		
		
		
	}

	

	sendForgot(email) {
		if(email==null || email==''){			
			alert("Email is required");
		}		
		else{
			this.setState({isBusy:true});
			this.props.actions.Auth.sendForgot(email, () => {
				this.setState({isBusy: false});
				alert("Please check your email");
			})		
		}

	}


	render() {
		return (
			<View style={styles.picture}>
                
				
				<KeyboardAvoidingView behavior='padding' style={styles.form_container}>
					
                    
                    
					
					<View style={styles.inputWrapper}>
						
						<TextInput style={styles.form_input}
							placeholder='Email'
							autoCorrect={false}
							autoCapitalize='none'
							returnKeyType='done'
							placeholderTextColor='white'
							underlineColorAndroid='transparent' 
							value={this.state.email}
							onChangeText={(value) => this.setState({email: value})}/>
					</View>
					
					
                    <View style={styles.button_container}>
				
                        <TouchableOpacity style={styles.buttonL} onPress={() => Actions.login()}>
						
							<Text style={styles.text}>Cancel</Text>
						
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonS} onPress={() => this.sendForgot(this.state.email)}>
						
							<Text style={styles.text}>Send</Text>
						
						</TouchableOpacity>
						
					
					</View>
						
					
						
				</KeyboardAvoidingView>
				
				
				{
					this.state.isBusy &&
					<ActivityIndicator
						animating={true}
						style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(250,250,250,0.7)'}}
					/>
				}
                
				
			</View>
			
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null
    },
	
	form_container: {
		flex: 1,
        alignItems: 'center',
        marginTop: 230,
        marginBottom:230
	},
	form_input: {
		backgroundColor: '#d3c4b8',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: 'white',
	},
	inputWrapper: {
		flex: 1,
	},
	
	
	button_container: {
		
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonL: {
		alignItems:'center',
		justifyContent: 'center',
		backgroundColor: '#00c3ff',
		height: MARGIN,
		borderRadius: 20,
		paddingLeft:20,
		paddingRight:20,
		marginRight:10,
	},
	buttonS: {
		alignItems:'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: MARGIN,
		borderRadius: 20,
		paddingLeft:20,
		paddingRight:20,
	},
	
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);