/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import DataRepository from './../expand/dao/DataRepository.js';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

import NavigationBar from './../common/NavigationBar.js';

import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import PopularTab from './PopularTab.js';

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.state={
            result:''
        }
        this.dataRepository=new DataRepository();
    };

    onLoad(){
        let url=this.genUrl(this.text);
        this.dataRepository.fetchNetRepository(url).then(result=>{
            this.setState({
                result:JSON.stringify(result)
            })
        }).catch(error=>{
            this.setState({
                result:JSON.stringify(error)
            })
        })
    };

    genUrl(key){
        return URL+key+QUERY_STR
    };
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'PopularPage'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                />
                 <ScrollableTabView
                     renderTabBar={() => <ScrollableTabBar/>}
                     initialPage={1}
                 >
                     <PopularTab tabLabel='JAVA'/>
                     <PopularTab tabLabel='IOS'/>
                     <PopularTab tabLabel='JavaScript'/>
                     <PopularTab tabLabel='Android'/>
                 </ScrollableTabView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});