/**
 * Created by wuyanhua on 2018/7/19.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,Platform,ScrollView,Dimensions} from 'react-native';

import ViewUtil from './../../util/ViewUtil.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {MORE_MENU} from './../../common/MoreMenu.js';
import GlobalStyles from './../../../res/styles/GlobalStyles.js';

import RespositoryCell from './../../common/RespositoryCell.js';


import FavouriteDao from '../../expand/dao/FavouriteDao.js';
import {FLAG_STORAGE} from './../../expand/dao/DataRepository.js';
import ProjectModel from '../../modal/ProjectModel.js';
import Utils from '../../util/Utils.js';
import RepositoryUtils from './../../expand/dao/RepositoryUtils.js';

export var FLAG_ABOUT={flag_about:'about',flag_about_me:'about_me'};

export default class AboutCommon{
    constructor(props,updateState,flag_about,config) {
        this.props=props;
        this.updateState=updateState;
        this.flag_about=flag_about;
        this.config=config;
        this.repositories=[];
        this.favouriteKeys=null;
        this.favouriteDao=new FavouriteDao(FLAG_STORAGE.flag_popular);
        this.repositoryUtils=new RepositoryUtils(this)
    }
    //通知数据发生改变 items为改变之后的数据
    noNotifyDataChanged(items){
        this.updateFavourite(items)
    }

    componentDidMount(){
        if(this.flag_about==FLAG_ABOUT.flag_about){
            this.repositoryUtils.fetchRepository(this.config.info.currentRepoUrl);
        }else{
            var urls=[];
            var items=this.config.items;
            for(let i=0;i<items.length;i++){
                urls.push(this.config.info.url+items[i]);
            };
            this.repositoryUtils.fetchRepositories(urls);

        }
    }

    //更新项目的用户收藏状态
    async updateFavourite(repositories){
        if(repositories){
            this.repositories=repositories
        };
        if(!this.repositories){
           return
        };
        if(!this.favouriteKeys){
            this.favouriteKeys= await this.favouriteDao.getFavouriteKeys()
        };
        let projectModel=[];
        let items=this.repositories;
        for(let i=0;i<items.length;i++){
            projectModel.push({
                item:items[i].item?items[i].item:items[i],
                isFavourite:Utils.checkFavourite(items[i].item?items[i].item:items[i],this.favouriteKeys?this.favouriteKeys:[])
            })
        };
        this.updateState({projectModel:projectModel})
    }

    onFavourite(item,isFavourite){
        if(isFavourite){
            this.favouriteDao.saveFavouriteItem(item.id.toString(),JSON.stringify(item))
        }else{
            this.favouriteDao.removeFavouriteItem(item.id.toString())
        };
    }
    //创建项目视图
    renderRepository(projectModel){
        if(!projectModel || projectModel.length==0){
            return null;
        };
        let views=[];
        for(let i=0;i<projectModel.length;i++){
            views.push(
                <RespositoryCell
                    projectModel={projectModel[i]}
                    key={projectModel[i].item.id}
                    onSelect={()=>{
                        this.props.navigation.navigate('RepositoryDetail',{data:projectModel[i]})
                    }}
                    onFavourite={(item,isFavourite)=>{
                        this.onFavourite(item,isFavourite)
                    }}
                />
            )
        };
        return views;
    }

    getParallaxConfig=(params)=>{
        let config={};
        let that=this;
        config.renderBackground=() => (
            <View key="background">
                <Image source={{uri: params.backgroundImg,width: window.width,height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',top: 0,width: window.width, backgroundColor: 'rgba(0,0,0,0.1)',height: PARALLAX_HEADER_HEIGHT}}/>
            </View>
        );
        config.renderForeground=() => (
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={{uri: params.avatar,width: AVATAR_SIZE,height: AVATAR_SIZE}}/>
                <Text style={ styles.sectionSpeakerText }>
                    {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                    {params.description}
                </Text>
            </View>
        );
        config.renderStickyHeader=() => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        );
        config.renderFixedHeader=() => (
            <View key="fixed-header" style={styles.fixedSection}>
                {ViewUtil.getLeftButton(()=>{
                    that.props.navigation.goBack()
                })}
            </View>
        );
        return config;
    }

    render=(params,configView)=>{
        let configParams=this.getParallaxConfig(params)
        return (
            <ParallaxScrollView
                headerBackgroundColor="#333"
                backgroundColor="#2196f3"
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
                parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                backgroundSpeed={10}
                {...configParams}
            >
                {configView}
            </ParallaxScrollView>
        );
    }
}
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center',
        alignItems:'center',
        paddingTop:(Platform.os=='ios'?20:0)
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    fixedSection: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        top:0,
        left:0,
        paddingRight:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:(Platform.os=='ios'?20:0)
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        paddingTop: 100
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'white',
        fontSize: 24,
        paddingVertical: 5
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    }
});