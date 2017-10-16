import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	Image,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthAction from '../actions/auth';

// import bgSrc from '../assets/light-bg.jpg';
// import logoImg from '../assets/logo2.png';
import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

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

class Login extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			isBusy: false,
		  	username: '',
		  	password: '',
		}
	  }
	
	  componentDidMount() {
		this.setState({isBusy: false});
	  }
	
	  login(email, password) {
		if(email==null || email==''){			
			alert("email is required");
		}
		else if(password==null || password==''){			
			alert("Password is required");
		}
		else if(password.length<6){
			alert("Password must be at least 6 characters");
		}		
		else{
			Actions.home();
			// this.setState({isBusy:true});
			// this.props.actions.Auth.login(email, password, () => {
			// 	this.setState({isBusy: false});
			// })
		}
		
	  }

	render() {
		return (
			<View style={styles.picture}>
				<View style={styles.logo_container}>
				</View>
				
				<KeyboardAvoidingView behavior='padding'
					style={styles.form_container}>
					<View style={styles.inputWrapper}>
						<Image source={usernameImg}
							style={styles.inlineImg} />
						<TextInput style={styles.form_input}
							value={this.state.username}
							placeholder='Email'
							autoCorrect={false}
							autoCapitalize='none'
							returnKeyType='done'
							placeholderTextColor='white'
							underlineColorAndroid='transparent' 
							onChangeText={(value) => this.setState({username: value})}/>
					</View>
					
					<View style={styles.inputWrapper}>
						<Image source={passwordImg}
							style={styles.inlineImg} />
						<TextInput style={styles.form_input}
							value={this.state.password}
							secureTextEntry={true}
							placeholder='Password'
							autoCorrect={false}
							autoCapitalize='none'
							returnKeyType='done'
							placeholderTextColor='white'
							onChangeText={(value) => this.setState({password: value})} />
					</View>
					
				</KeyboardAvoidingView>
				
				
				<View style={styles.button_container}>
				
						<TouchableOpacity disabled={this.state.isFetching} style={styles.buttonL}>
								
									<Text style={styles.text} onPress={() => this.login(this.state.username, this.state.password)}>LOGIN</Text>
								
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonS} onPress={() => Actions.signup()}>
						
							<Text style={styles.text}>SIGN UP</Text>
						
						</TouchableOpacity>
						
					
				</View>
				<View style={styles.forgot_container}>
					<TouchableOpacity onPress={() => Actions.forgot()}>
						
						<Text style={styles.forgot_text}>Forgot Password?</Text>
						
					</TouchableOpacity>
					
				</View>
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
		height: null,
	},
	logo_container: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo_image: {
		width: DEVICE_WIDTH * 0.7,
		height: 200,
	},
	form_container: {
		flex: 1,
		alignItems: 'center',
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
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
	forgot_container: {
		flex: 1,
		
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop:20,
	},
	forgot_text: {
		color: 'blue',
		backgroundColor: 'transparent',
	},
	button_container: {
		
		
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);