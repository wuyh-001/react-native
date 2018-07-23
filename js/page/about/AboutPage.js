/**
 * Created by xiaowuzai on 2018/7/19.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,Platform,ScrollView,Dimensions,Linking} from 'react-native';

import ViewUtil from './../../util/ViewUtil.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {MORE_MENU} from './../../common/MoreMenu.js';
import GlobalStyles from './../../../res/styles/GlobalStyles.js';
import AboutCommon,{FLAG_ABOUT} from './AboutCommon.js';
import config from './../../../res/data/config.json';
import AboutAuthorPage from './AboutAuthorPage.js';


export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon=new AboutCommon(props,(dic)=>{this.updateState(dic)},FLAG_ABOUT.flag_about,config)
        this.state={
            projectModal:[]
        }
    }

    static navigationOptions = {
        //headerTitle:'PopularPage'
        header: null
    }

    updateState=(dic)=>{
        this.setState(dic)
    }

    componentDidMount(){
        this.aboutCommon.componentDidMount();
    }

    clickEvent=(tab)=>{
        let TargetComponent,params={};
        switch(tab){
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.WebSite:
                break;
            case MORE_MENU.Feedback:
                let url="mailto://15171009823@163.com";
                Linking.canOpenURL(url).then(supported=>{
                    if(!supported){
                        console.log("failed")
                    }else{
                        return Linking.openURL(url)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                break;

        }
        if(TargetComponent){
            this.props.navigate(TargetComponent,params)
        }
    }

    render() {
        let that=this;
        let configView=<View>
                            {that.aboutCommon.renderRepository(that.state.projectModel)}
                            {ViewUtil.getSettingItem(()=>{this.clickEvent(MORE_MENU.WebSite)},require('./../../../res/images/ic_computer.png'),MORE_MENU.WebSite,{tintColor:'#2196f3'})}
                            <View style={GlobalStyles.line} />
                            {ViewUtil.getSettingItem(()=>{this.clickEvent(MORE_MENU.About_Author)},require('./../my/img/ic_insert_emoticon.png'),MORE_MENU.About_Author,{tintColor:'#2196f3'})}
                            <View style={GlobalStyles.line} />
                            {ViewUtil.getSettingItem(()=>{this.clickEvent(MORE_MENU.Feedback)},require('./../../../res/images/ic_feedback.png'),MORE_MENU.Feedback,{tintColor:'#2196f3'})}
                            <View style={GlobalStyles.line} />
                        </View>
        return (
            that.aboutCommon.render({
                "name":"GitHub Popular",
                "description":"这是一个用来查看GitHub最受欢迎和最热项目的app",
                "backgroundImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531980473587&di=e42190a180f26e2aafbfaf5f26efbe8a&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131128%2F3822951_110816841000_2.jpg" ,
                "avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531977958012&di=2556c9bdf5356898b060671f6ed3be51&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Dac5f6e2d60600c33e474d68873343463%2Fcb8065380cd7912350e1394da6345982b2b78082.jpg"
            },configView)
        );
    }
}
