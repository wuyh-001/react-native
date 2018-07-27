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
import MoreMenu,{MORE_MENU} from './../common/MoreMenu.js';
import ViewUtil from './../util/ViewUtil.js';
import {FLAG_TAB} from './HomePage.js';

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
    renderRightButton=()=>{
        let that=this;
        return (<View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{padding:5}} onPress={()=>{this.props.navigate('SearchPage')}}>
                        <Image source={require('../../res/images/ic_search_white_48pt.png')} style={{width:24,height:24}}/>
                    </TouchableOpacity>
                    {ViewUtil.getMoreButton(()=>that.refs.moreMenu.open())}
                </View>)
    }

    renderLeftButton=()=>{
        return <View></View>
    }
    renderMoreView=()=>{
        return <MoreMenu
                    menus={[MORE_MENU.Custom_Key,MORE_MENU.Sort_Key,MORE_MENU.Remove_Key,MORE_MENU.Custom_Theme]}
                    anchorView={()=>this.refs.moreMenuButton}
                    fromPage={FLAG_TAB.flag_popularTab}
                    ref="moreMenu"
                    jumpToPage={this.props.navigate}
                />
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
                        backgroundColor:'#2196f3'
                    }}
                    leftButton={this.renderLeftButton()}
                    rightButton={this.renderRightButton()}
                />
                {content}
                {this.renderMoreView()}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});