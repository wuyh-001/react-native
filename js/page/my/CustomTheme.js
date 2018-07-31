import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Modal,ScrollView,Platform,DeviceEventEmitter} from 'react-native';


import ThemeFactory,{ThemeFlags} from '../../../res/styles/ThemeFactory'
import ThemeDao from './../../expand/dao/ThemeDao.js';
import {ACTION_HOME} from './../../page/HomePage.js';

export default class CustomTheme extends Component{
    constructor(props){
        super(props)
        this.themeDao=new ThemeDao()
    };
    selectTheme(selectTheme){
        this.props.onClose();
        this.themeDao.save(ThemeFlags[selectTheme]);
        DeviceEventEmitter.emit('ACTION_BASE',ACTION_HOME.A_THEME,ThemeFactory.createTheme(ThemeFlags[selectTheme]));
    }
    getThemeItem(themeKey){
        return (
            <TouchableOpacity style={{flex:1}} onPress={()=>{this.selectTheme(themeKey)}}>
                <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeItem]}>
                    <Text style={{color:'white'}}>{themeKey}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    renderThemeItems(){
        var views=[];
        let keys=Object.keys(ThemeFlags);
        for(let i=0;i<keys.length;i+=3 ){
            var key1=keys[i],key2=keys[i+1],key3=keys[i+2];
            views.push(
                <View style={{flexDirection:'row'}} key={i}>
                    {this.getThemeItem(key1)}
                    {this.getThemeItem(key2)}
                    {this.getThemeItem(key3)}
                </View>
            )
        };
        return views;
    }
    renderContentView(){
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {this.props.closeEvent()}}
            >
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }


    render(){
        let view=this.props.visible?<View style={styles.container}>
            {this.renderContentView()}
        </View>:null
        return (
            view
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    modalContainer:{
        flex:1,
        margin:5,
        marginTop:Platform.OS=='ios'?20:10,
        shadowColor:'gray',
        shadowOffset:{width:3,height:3},
        shadowOpacity:0.8
    },
    themeItem:{
        flex:1,
        height:120,
        margin:3,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center'
    }
});



/*
* 房贷 3500
* 房租 5000
* 信用卡  1000+1000
* 信用卡  1000
* 花呗    500+1000
* 游泳    1400
*
* */

