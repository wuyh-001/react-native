/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,ScrollView,Platform} from 'react-native';

import ViewUtil from './../util/ViewUtil.js';

import GlobalStyles from './../../res/styles/GlobalStyles.js'

export default class SearchPage extends Component{
    constructor(props){
        super(props)

    };
    static navigationOptions={
        header:null
    }
    onBackPress=()=>{

    }
    rendNavBar=()=>{
        let backButton=ViewUtil.getLeftButton(()=>{this.onBackPress()});
        let inputView=<TextInput style={styles.textInput}/>
        let rightButton=<TouchableOpacity>

                        </TouchableOpacity>
        return (
            <View style={styles.nav}>
                {backButton}
                {inputView}
            </View>
        )
    }


    render(){
        let statusBar=null;
        if(Platform.OS==="ios"){
            statusBar=<View style={[styles.statusBar,{backgroundColor:'#2196f3'}]}></View>
        };
        return (
            <View style={styles.container}>
                {statusBar}
                {this.rendNavBar()}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    nav:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#2196f3',
        alignItems:'center',
        height:(Platform.OS=='ios')?GlobalStyles.nav_bar_height_ios:GlobalStyles.nav_bar_height_android,
    },
    statusBar:{
        height:20
    },
    textInput:{
        flex:1,
        height:(Platform.OS=='ios')?30:30,
        borderWidth:1,
        borderColor:'white',
        marginLeft:15,
        marginRight:15,
        paddingLeft:5,
        color:'white',
        borderRadius:5
    }
});