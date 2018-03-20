/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import DataRepository from '../expand/dao/DataRepository.js';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

import NavigationBar from '../common/NavigationBar.js';
import LanguangeDao,{FLAG_LANGUAGE} from '../expand/dao/LanguangeDao.js';

import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import PopularTab from './PopularTab.js';

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.state={
            language:[]
        }
        this.dataRepository=new DataRepository();
        this.languageDao=new LanguangeDao(FLAG_LANGUAGE.flag_key);
    };
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch().then(result=>{
            this.setState({language:result})
        }).catch(e=>console.log(e))
    }

    genUrl(key){
        return URL+key+QUERY_STR
    };
    render(){
        let content=this.state.language.length>0?<ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            initialPage={1}
            >
            {this.state.language.map((result,i,arr)=>{
                let lan=arr[i];
                return lan.checked?<PopularTab tabLabel={lan.name} key={i}/>:null
            })}
        </ScrollableTabView>:null
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'PopularPage'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                />
                {content}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});