/**
 * Created by xiaowuzai on 2018/3/26.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,WebView,TouchableOpacity,DeviceEventEmitter} from 'react-native';
import NavigationBar from './../common/NavigationBar.js';
import ViewUtil from './../util/ViewUtil.js';

import DataRepository,{FLAG_STORAGE} from './../expand/dao/DataRepository.js';
import FavouriteDao from '../expand/dao/FavouriteDao.js';

const TRENDING_URL="https://github.com/";
//const favouriteDao=new FavouriteDao(FLAG_STORAGE.flag_popular);
export default class RepositoryDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            url:this.props.navigation.state.params.data.item.html_url?this.props.navigation.state.params.data.item.html_url:TRENDING_URL+this.props.navigation.state.params.data.item.fullName,
            canGoBack:false,
            title:this.props.navigation.state.params.data.item.full_name?this.props.navigation.state.params.data.item.full_name:this.props.navigation.state.params.data.item.fullName,
            isFavourite:this.props.navigation.state.params.data.isFavourite,
            favouriteIcon:this.props.navigation.state.params.data.isFavourite?require('../../res/images/ic_star.png'):require('../../res/images/ic_star_navbar.png')

        }
        this.search=this.search.bind(this);
        this.onNavigationStateChange=this.onNavigationStateChange.bind(this);
        this.favouriteDao=new FavouriteDao(FLAG_STORAGE.flag_popular);
    }
    static navigationOptions={
        header:null
    }
    search(){
        this.setState({
            url:this.searchText
        })
    }
    onNavigationStateChange(e){
        this.setState({
            url:e.url,
            canGoBack:e.canGoBack
        })
    }
    onBack(){
        let {goBack}=this.props.navigation;

        if(this.state.canGoBack){
            this.webView.goBack();  //走的是webview的上一个页面
        }else{
            goBack();//返回列表页
        };

    }
    setFavouriteState(isFavourite){
        this.setState({
            isFavourite:isFavourite,
            favouriteIcon:isFavourite?require('../../res/images/ic_star.png'):require('../../res/images/ic_star_navbar.png')
        })
    }
    onRightStart(){
        let projectModel=this.props.navigation.state.params.data;

        this.setFavouriteState(!this.state.isFavourite);
        let key=projectModel.item.fullName?projectModel.item.fullName:projectModel.item.id.toString();
        if(!this.state.isFavourite){
            this.favouriteDao.saveFavouriteItem(key,JSON.stringify(projectModel.item))
        }else{
            this.favouriteDao.removeFavouriteItem(key)
        }

    }
    render(){
        let data=this.props.navigation.state.params.data;
        let url=this.state.url;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    statusBar={{
                        backgroundColor:'#2196f3'
                    }}
                    leftButton={
                        ViewUtil.getLeftButton(()=>{this.onBack()})
                    }
                    rightButton={
                        <TouchableOpacity onPress={()=>{this.onRightStart()}}>
                            <Image
                                source={this.state.favouriteIcon}
                                style={{width:18,height:18}}
                            />
                        </TouchableOpacity>
                    }
                />
                <WebView
                    style={styles.webView}
                    startInLoadingState={false}
                    ref={webView=>this.webView=webView}
                    automaticallyAdjustContentInsets={false}
                    source={{uri:url}}
                    onNavigationStateChange={this.onNavigationStateChange}

                />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:16,
        color:'white'
    },
    webView:{
        backgroundColor: '#ccc',

    }
});