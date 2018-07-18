/**
 * Created by xiaowuzai on 2018/4/9.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository.js';

import NavigationBar from '../common/NavigationBar.js';

import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import FavouriteTab from './FavouriteTab.js';

export default class FavouritePage extends Component{
    constructor(props){
        super(props)
        this.state={
            language:[]
        }
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
    };
    componentDidMount(){

    }


    render(){
        let navigate=this.props.navigate
        let content=<ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            initialPage={1}

            >
            <FavouriteTab tabLabel={'最热'} navigate={navigate} flag={FLAG_STORAGE.flag_popular}/>
            <FavouriteTab tabLabel={'趋势'} navigate={navigate} flag={FLAG_STORAGE.flag_trending}/>
        </ScrollableTabView>

        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'收藏'}
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