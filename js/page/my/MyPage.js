/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import NavigationBar from './../../common/NavigationBar.js';


export default class MyPage extends Component{
    constructor(props){
        super(props)

    };

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    rightButton={
                        <TouchableOpacity>
                             <Text>Save</Text>
                        </TouchableOpacity>
                    }
                />
                <Text onPress={()=>this.props.navigate('CustomKey')}>自定义标签</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});