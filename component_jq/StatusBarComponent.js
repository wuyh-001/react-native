/**
 * Created by xiaowuzai on 2018/2/24.
 */
import React,{Component} from 'react';
import {StyleSheet,Text,View,StatusBar,TouchableHighlight} from 'react-native';

export  class CustomButton extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
           <TouchableHighlight
                style={styles.button}
                underlayColor='#a5a5a5'
                onPress={this.props.onPress}
           >
                <Text style={styles.buttonText}>{this.props.text}</Text>
           </TouchableHighlight>
        )
    }
}

export default class StatusBarComponent extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View>
                <StatusBar
                    backgroundColor='#ff0000'
                    translucent={true}
                    hidden={true}
                    animated={true}
                />
                <CustomButton text='状态栏隐藏透明效果'/>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    button:{
        margin:5,
        backgroundColor:'white',
        padding:15,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#cdcdcd'
    }
})
