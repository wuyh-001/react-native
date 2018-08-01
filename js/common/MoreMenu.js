/**
 * Created by wuyanhua on 2018/7/18.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,TouchableOpacity,Linking} from 'react-native';

import Popover from './Popover.js';
import LanguangeDao,{FLAG_LANGUAGE} from '../expand/dao/LanguangeDao.js';


export const MORE_MENU={
    Custom_Language:'自定义语言',
    Sort_Language:'语言排序',
    Custom_Key:'自定义标签',
    Sort_Key:'标签排序',
    Remove_Key:'标签移除',
    About_Author:'关于作者',
    About:'关于',
    Custom_Theme:'自定义主题',
    WebSite:'WebSite',
    Feedback:'反馈',
    Share:'分享'
}

export default class MoreMenu extends Component{
    constructor(props){
        super(props)
        this.state={
            isVisible:false,
            buttonRect:{},
            theme:this.props.theme
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            theme:nextProps.theme
        })
    }

    open(){
        this.showPopover();
    }

    showPopover() {
        if(!this.props.anchorView){return};
        let anchorView=this.props.anchorView();
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({isVisible: false});
    }

    moreMenuSelected=(tab)=>{
        console.log('moreMenu:'+this.state.theme.themeColor)
        this.closePopover();
        if(typeof this.props.onMoreSelect=="function"){
            this.props.onMoreSelect(tab)
        };
        let TargetComponent,params={};
        switch(tab){
            case MORE_MENU.Custom_Language:
                TargetComponent='CustomKey';
                params={isRemove:false,title:'自定义语言',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_language,theme:this.state.theme}
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent='CustomKey';
                params={isRemove:false,title:'自定义标签',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_key,theme:this.state.theme}
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent='CustomKey';

                params={isRemove:true,title:'标签移除',btnTxt:'删除',flag:FLAG_LANGUAGE.flag_key,theme:this.state.theme}
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent='SortKeyPage';
                params={title:'标签排序',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_key,theme:this.state.theme}
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent='SortKeyPage';
                params={title:'语言排序',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_language,theme:this.state.theme}
                break;
            case MORE_MENU.Custom_Theme:

                break;
            case MORE_MENU.About_Author:
                params={theme:this.state.theme}
                TargetComponent='AboutAuthorPage';
                break;
            case MORE_MENU.About:
                params={theme:this.state.theme}
                TargetComponent='AboutPage';
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
            case MORE_MENU.Share:
                break;
        }
        if(TargetComponent){
            this.props.jumpToPage(TargetComponent,params)
        }

    }


    renderMoreView(){
        let that=this;
        let view=<Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            contentStyle={{backgroundColor:"#343434",opacity:0.8}}
            onClose={this.closePopover.bind(this)}>
            {
                this.props.menus.map(function(result,i,arr){
                    return(
                        <TouchableOpacity key={i} onPress={()=>{
                                            that.moreMenuSelected(arr[i])
                                        }}>
                            <Text style={{fontSize:14,color:'white',fontWeight:'200',padding:5}}>{arr[i]}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </Popover>

        return view
    }

    render(){
        return this.renderMoreView()
    }

}

MoreMenu.propTypes={
    contentStyle:View.propTypes.style,
    menus:PropTypes.array.isRequired,
    anchorView:PropTypes.func,
}

MoreMenu.defaultProps = {

};