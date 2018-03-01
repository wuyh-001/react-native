import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight} from 'react-native';
import Accordion from './Accordion.js';

export default class FolderContainer extends Component {
    constructor(props){
        super(props)
        this._renderHeader=this._renderHeader.bind(this);
        this._renderContent=this._renderContent.bind(this);
        this._toggle=this._toggle.bind(this);
        this._renderImg=this._renderImg.bind(this);

    }

    _renderImg(section,index,isActive){
        let icon=!isActive?require('./img/down.png'):require('./img/up.png');

        let imgComponent;
        let style=this.props.imgPos=="center"?true:false;
        if(this.props.hasImg){
            if(this.props.imgPos=='center'){
                imgComponent=<Image style={styles.headerImage} source={icon}></Image>
            };
        };
        return (
            <View style={style?styles.headerColImg:styles.null}>
                {imgComponent}
            </View>
        );

    }

    _renderHeader(section,index,isActive) {
        let icon=!isActive?require('./img/down.png'):require('./img/up.png');

        let style=this.props.imgPos=="right"?true:false;
        let styleHeader=style?styles.headerRow:styles.headerCol;
        let imgComponent,statusComponent,subTitleComponent,subTitle,titleComponent,title;
        let marginTop=this.props.marginTop;
        let headerPadding=this.props.isHasPadding?styles.headerPadding:null;

        if(this.props.hasImg){
             if(this.props.imgPos=='right'){
                imgComponent=<Image style={styles.headerImage} source={icon}></Image>
                statusComponent=section.status?<Text style={[styles.status,{color:section.statusColor?section.statusColor:null}]}>{section.status}</Text>:null
            };
        };

        if(section.titleComponent){
            titleComponent=section.titleComponent;
        };
        if(section.title){
            title=<Text style={style?styles.headerTitleRow:styles.titleColMain}>{section.title}</Text>
        };
        if(section.subTitleComponent){
            subTitleComponent=section.subTitleComponent;
        };
        if(section.subTitle){
            subTitle=<Text style={[style?styles.headerSubTitleRow:styles.headerTitleCol,styles.subTitle]}>{section.subTitle}</Text>
        };

        return (
            <View style={[styleHeader,{marginTop:marginTop},{borderBottomWidth:this.props.isShowHeaderLine?1:0},headerPadding]}>
                <View style={style?styles.flexContainer:null}>
                    {title}
                    {titleComponent}
                    {subTitle}
                    {subTitleComponent}
                </View>
                {statusComponent}
                {imgComponent}
            </View>
        );
    }

    _renderContent(section) {
        let component,content;

        let style=this.props.imgPos=="right"?true:false;
        let contentBottomLine=styles.contentBottomLine;

        let contentPadding=this.props.isHasPadding?styles.contentPadding:null;
        let contentMargin=this.props.isHasMargin?styles.contentMargin:null;

        if(section.contentComponent){
            component=section.contentComponent
        }
        if(section.content){
            content=<Text style={styles.contentText}>{section.content}</Text>
        }

        return (
            <View style={[styles.content,{backgroundColor:this.props.contentColor},{borderBottomWidth:this.props.isShowContentLine?1:0},contentPadding,contentMargin]}>
                {component}
                {content}
            </View>
        );
    }

    _toggle(index){
        if(this.props.clickFunc){
            this.props.clickFunc(index)
        };


    }

    render() {
        return (
            <View>
                <Accordion
                    sections={this.props.section}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    renderImg={this._renderImg}
                    underlayColor="transparent"
                    onChange={this._toggle}
                    initiallyActiveSection={this.props.initiallyActiveSection}
                    hasAccording={this.props.hasAccording}
                />
            </View>
        );
    }
}

FolderContainer.propTypes={
    hasImg:PropTypes.bool,
    isShowContentLine:PropTypes.bool,
    isShowHeaderLine:PropTypes.bool,
    isHasMargin:PropTypes.bool,
    isHasPadding:PropTypes.bool,
    hasAccording:PropTypes.bool,
    imgPos:PropTypes.string,
    marginTop:PropTypes.number,
    contentColor:PropTypes.string,
    sections:PropTypes.array,
    initiallyActiveSection:PropTypes.number,
    clickFunc:PropTypes.func
}

FolderContainer.defaultProps = {
    hasImg:true,
    imgPos:'right',
    initiallyActiveSection:0,
    marginTop:0,
    isShowContentLine:true,
    isShowHeaderLine:true,
    isHasMargin:false,
    isHasPadding:true,
    hasAccording:true,
    contentColor:'white'
};

const styles = StyleSheet.create({
    headerRow:{
        flexDirection: 'row',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        /*borderBottomWidth:1,*/
        borderColor:'#e3e3e5',
        /*marginTop:0*/
    },
    headerTitleRow:{
        color :'#2a2f43',
        paddingTop:8,
        paddingBottom:5,
        fontSize:14,
    },
    headerSubTitleRow:{
        paddingBottom:5
    },
    headerCol:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        /*marginTop:5,*/
        /*borderBottomWidth:1,*/
        borderColor:'#e3e3e5'
    },
    headerTitleCol:{
        marginBottom:5
    },
    headerImage : {
        width : 15,
        height : 15
    },
    headerColImg:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:1,
        borderColor:'#e3e3e5',
        backgroundColor:'white'
    },
    content:{
        /*backgroundColor:'#fff',*/
        /*paddingLeft:14,
        paddingRight:14,*/
        paddingTop:6,
        paddingBottom:6,
        justifyContent:'center',
        /*borderBottomWidth:1,*/
        borderColor:'#e3e3e5'
    },
    contentText:{
        color:'#969696'
    },
    status:{
        marginRight:10
    },
    subTitle:{
        fontSize:12,
        color:'#c0cbcb'
    },
    titleColMain:{
        color:'#ccc',
        paddingTop:5,
        paddingBottom:5,
        fontSize:14
    },
    flexContainer:{
        flex:1
    },
    headerPadding:{
        paddingLeft:13,
        paddingRight:13,
    },
    headerMargin:{
        marginLeft:13,
        marginRight:13
    },
    contentPadding:{
        paddingLeft:14,
        paddingRight:14,
    },
    contentMargin:{
        marginLeft:8,
        marginRight:8
    }
})