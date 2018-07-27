/**
 * Created by xiaowuzai on 2018/1/31.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,DeviceEventEmitter} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Toast,{DURATION} from 'react-native-easy-toast';

import PopularPage from './PopularPage.js';
import FavouritePage from './FavouritePage.js';
import MyPage from './my/MyPage.js';
import TrendingPage from './TrendingPage.js';

import { StackActions, NavigationActions } from 'react-navigation';

export const ACTION_HOME={
    A_SHOW_TOAST:"showToast",
    A_RESTART:'restart'
}

export const FLAG_TAB={
    flag_popularTab:'tb_popular',
    flag_trending:'tb_trending',
    flag_favorite:'tb_favorite',
    flag_my:'tb_my'
}

export default class HomePage extends Component{
    constructor(props){
        super(props)
        let selectedTab=this.props.selectedTab?this.props.selectedTab:'tb_popular'
        this.state={
            selectedTab:selectedTab
        }
    }
    static navigationOptions={
        header:null
    }
    componentDidMount(){
        let that=this;
        this.listener=DeviceEventEmitter.addListener('ACTION_HOME',(action,params)=>that.onAction(action,params))
    }
    componentWillUnmount(){
        this.listener&&this.listener.remove();
    }
    //通知回调事件处理
    onAction(action,params){
        if(action==ACTION_HOME.A_RESTART){
            this.onRestart(params.jumpToTab);
        }else if(action==ACTION_HOME.A_SHOW_TOAST){
            this.refs.toast.show(params.text)
        }
    }
    //重启首页，默认显示的页面
    onRestart(jumpToTab){
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: jumpToTab})
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }
    _rendTab(Component,selectTab,title,renderIcon,navigate){
        return(
            <TabNavigator.Item
                selected={this.state.selectedTab === selectTab}
                title={title}
                selectedTitleStyle={{color:'#2196f3'}}
                renderIcon={() => <Image source={renderIcon} style={styles.image}/>}
                renderSelectedIcon={() => <Image source={renderIcon} style={[styles.image,{tintColor:'#2196f3'}]}/>}
                onPress={() => this.setState({selectedTab: selectTab})}>
                <View style={{flex:1}}>
                    <Component navigate={navigate}/>
                </View>
            </TabNavigator.Item>
        )
    }
    render() {
        let {selectedTab}=this.state;
        let {navigate}=this.props.navigation;
        return (
            <View style={{flex:1}}>
                <TabNavigator>
                    {this._rendTab(PopularPage,'tb_popular','最热',require('./../../res/images/ic_polular.png'),navigate)}
                    {this._rendTab(TrendingPage,'tb_trending','趋势',require('./../../res/images/ic_trending.png'),navigate)}
                    {this._rendTab(FavouritePage,'tb_favorite','收藏',require('./../../res/images/ic_favorite.png'),navigate)}
                    {this._rendTab(MyPage,'tb_my','我的',require('./../../res/images/ic_my.png'),navigate)}
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page1:{
        flex:1,
        backgroundColor:'red',
    },
    page2:{
        flex:1,
        backgroundColor:'yellow',
    },
    image:{
        width:22,
        height:22
    }

});