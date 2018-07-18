/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository.js';

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
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
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

    render(){
        let navigate=this.props.navigate
        let content=this.state.language.length>0?<ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            initialPage={1}
            >
            {this.state.language.map((result,i,arr)=>{
                let lan=arr[i];
                return lan.checked?<PopularTab tabLabel={lan.name} key={i} navigate={navigate}/>:null
            })}
        </ScrollableTabView>:null

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'最热'}
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