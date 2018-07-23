/**
 * Created by wuyanhua on 2018/7/20.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,Platform,ScrollView,Dimensions,Linking,Clipboard} from 'react-native';

import ViewUtil from './../../util/ViewUtil.js';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {MORE_MENU} from './../../common/MoreMenu.js';
import GlobalStyles from './../../../res/styles/GlobalStyles.js';
import AboutCommon,{FLAG_ABOUT} from './AboutCommon.js';
import config from './../../../res/data/config.json';
import Toast,{DURATION} from 'react-native-easy-toast';


const FLAG = {
    REPOSITORY: '开源项目',
    BLOG: {
        name: '技术博客',
        items: {
            PERSONAL_BLOG: {
                title: '个人博客',
                url: 'http://jiapenghui.com',
            },
            CSDN: {
                title: 'CSDN',
                url: 'http://blog.csdn.net/fengyuzhengfan',
            },
            JIANSHU: {
                title: '简书',
                url: 'http://www.jianshu.com/users/ca3943a4172a/latest_articles',
            },
            GITHUB: {
                title: 'GitHub',
                url: 'https://github.com/crazycodeboy',
            }
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: 'QQ',
                account: '1586866509',
            },
            Email: {
                title: 'Email',
                account: 'crazycodeboy@gmail.com',
            }
        }
    },
    QQ: {
        name: '技术交流群',
        items: {
            MD: {
                title: '移动开发者技术分享群',
                account: '335939197',
            },
            RN: {
                title: 'React Native学习交流群',
                account: '165774887',
            }
        },
    },
}


export default class AboutAuthorPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon=new AboutCommon(props,(dic)=>{this.updateState(dic)},FLAG_ABOUT.flag_about_me,config)
        this.state={
            projectModel:[],
            author:config.author,
            showRepository:false,
            showBlog:false,
            showQQ:false,
            showContact:false
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

    //获取右侧图标
    getClickEvent=(isShow)=>{
        return isShow?require('./../../../res/images/ic_tiaozhuan_up.png'):require('./../../../res/images/ic_tiaozhuan_down.png');
    }

    clickEvent=(tab)=>{
        let TargetComponent,params={};
        switch(tab){
            case FLAG.REPOSITORY:
                this.updateState({showRepository:!this.state.showRepository})
                break;
            case FLAG.REPOSITORY.items.Email:
                let url="mailto://"+tab.account;
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
            case FLAG.BLOG:
                this.updateState({showBlog:!this.state.showBlog})

                break;
            case FLAG.QQ:
                this.updateState({showQQ:!this.state.showQQ})
                break;
            case FLAG.CONTACT:
                this.updateState({showContact:!this.state.showContact})
                break;
            case FLAG.CONTACT.items.QQ:
                Clipboard.setString(tab.account);
                this.toast.show("QQ:"+tab.account+'已复制到剪切板')
                break;

        }
        if(TargetComponent){
            this.props.navigate(TargetComponent,params)
        }
    }
    //显示列表数据
    renderItems=(dic,isShowAccount)=>{
        if(!dic){return null};
        let views=[];
        for(let i in dic){
            let title=isShowAccount?dic[i].title+':'+dic[i].account:dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(()=>{this.clickEvent(dic[i])},'',title,{tintColor:'#2196f3'})}
                    <View style={GlobalStyles.line} />
                </View>
            )
        };
        return views;
    }

    render() {
        let that=this;
        let configView=<View>
            {ViewUtil.getSettingItem(()=>{this.clickEvent(FLAG.BLOG)},require('./../../../res/images/ic_computer.png'),FLAG.BLOG.name,{tintColor:'#2196f3'},this.getClickEvent(this.state.showBlog))}
            <View style={GlobalStyles.line} />
            {this.state.showBlog?this.renderItems(FLAG.BLOG.items):null}

            {ViewUtil.getSettingItem(()=>{this.clickEvent(FLAG.REPOSITORY)},require('./../../../res/images/ic_code.png'),FLAG.REPOSITORY,{tintColor:'#2196f3'},this.getClickEvent(this.state.showRepository))}
            <View style={GlobalStyles.line} />
            {this.state.showRepository?this.aboutCommon.renderRepository(this.state.projectModel):null}

            {ViewUtil.getSettingItem(()=>{this.clickEvent(FLAG.QQ)},require('./../../../res/images/ic_computer.png'),FLAG.QQ.name,{tintColor:'#2196f3'},this.getClickEvent(this.state.showQQ))}
            <View style={GlobalStyles.line} />
            {this.state.showQQ?this.renderItems(FLAG.QQ.items,true):null}

            {ViewUtil.getSettingItem(()=>{this.clickEvent(FLAG.CONTACT)},require('./../../../res/images/ic_contacts.png'),FLAG.CONTACT.name,{tintColor:'#2196f3'},this.getClickEvent(this.state.showContact))}
            <View style={GlobalStyles.line} />
            {this.state.showContact?this.renderItems(FLAG.CONTACT.items,true):null}

        </View>
        return (
            <View style={styles.container}>
                {
                    that.aboutCommon.render(this.state.author,configView)
                }
                <Toast ref={(e)=>this.toast=e}/>
            </View>

        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    }
});
