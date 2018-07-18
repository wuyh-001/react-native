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

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedTab:'tb_popular'
        }
    }
    static navigationOptions={
        header:null
    }
    componentDidMount(){
        this.listener=DeviceEventEmitter.addListener('showToast',(text)=>{
            this.toast.show(text,DURATION.LENGTH_LONG)
        })
    }
    componentWillUnmount(){
        this.listener&&this.listener.remove();
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