import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableOpacity,Platform,UIManager,LayoutAnimation} from 'react-native';
import color from '../../config/theme/standard/color.js';
import fontSize from '../../config/theme/standard/fonts.js';


export default class CheckMore_1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:props.data,
            errorMsg:props.errorMsg,
            limitNum:props.limitNum,
            isShow:true,
            isDown:true,
            showErrorMsg:false,
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        this._renderItem=this._renderItem.bind(this);
        this._renderImg=this._renderImg.bind(this);
        this._onClick=this._onClick.bind(this);
    }


    _renderItem(rowData,startNum,length){
        let subTitleComponent,subTitle,titleComponent,title;
        let rowArr=[];

        for(let i=startNum;i<length;i++){
            if(rowData[i].titleComponent){
                titleComponent=<View>rowData[i].titleComponent</View>;
            };
            if(rowData[i].title){
                title=<Text style={styles.title}>{rowData[i].title}</Text>
            };
            if(rowData[i].subTitleComponent){
                subTitleComponent=<View>rowData[i].subTitleComponent</View>;
            };
            if(rowData[i].subTitle){
                subTitle=<Text style={styles.subTitle}>{rowData[i].subTitle}</Text>
            };
            rowArr.push(
                <View style={[styles.item]} key={i}>
                    {title}
                    {titleComponent}
                    {subTitle}
                    {subTitleComponent}
                </View>
            );
        };
        return  rowArr;
    }
    _renderImg(){
        let icon=this.state.isDown?require('./img/down.png'):require('./img/up.png');
        let imgComponent;
        imgComponent=<Image style={styles.img} source={icon}></Image>
        return (
            <View style={styles.imgContainer} >
                {imgComponent}
            </View>
        );
    };


    _onClick(){
        LayoutAnimation.configureNext({
            duration: 100, //持续时间
            create: { // 视图创建
                type: LayoutAnimation.Types.linear,//linear,spring
                property: LayoutAnimation.Properties.scaleXY,// opacity、scaleXY
            },
            update: { // 视图更新
                type: LayoutAnimation.Types.easeInEaseOut,
            },
        });
        if(this.state.errorMsg){
            if(this.state.isDown){
                this.setState({isDown:false,showErrorMsg:true});
            }else{
                this.setState({isDown:true,showErrorMsg:false});
            };
        }else{
            if(this.state.isDown){
                this.setState({isDown:false});
            }else{
                this.setState({isDown:true});
            };
        };
        this.props.clickFun(this.state.isDown);
    }


    render() {
        let errorMsg;
        if(this.state.errorMsg){
            errorMsg=<View style={styles.errorMsContainer}>
                <Text style={[styles.errorMsg,{color:this.props.errorMsgColor}]}>{this.props.errorMsg}</Text>
                <TouchableOpacity onPress={this.props.handleFunc}>
                    <Text style={styles.handle}>{this.props.handleTips}</Text>
                </TouchableOpacity>
            </View>
        }
        return (
        <View style={{flex:1}}>
            <View style={[styles.container]}>
                <View>
                    { this._renderItem(this.state.data,0,this.state.limitNum)}
                </View>
                {this.state.showErrorMsg&&!this.state.isDown?errorMsg:null}
                {
                    !this.state.showErrorMsg&&!this.state.isDown?
                        <View>
                            { this._renderItem(this.state.data,this.state.limitNum,this.state.data.length)}
                        </View>
                    :null
                }
            </View>
            <TouchableOpacity onPress={this._onClick} activeOpacity={1}>
                {this._renderImg()}
            </TouchableOpacity>
            </View>
        );
    }
}
CheckMore_1.propTypes={
    data:PropTypes.array,
    limitNum:PropTypes.number,
    clickFun:PropTypes.func,
    errorMsg:PropTypes.string,
    errorMsgColor:PropTypes.string,
    handleTips:PropTypes.string,
    handleFunc:PropTypes.func

}
CheckMore_1.defaultProps={
    limitNum:3,
    errorMsgColor:color.color.errorColor
}


const styles = StyleSheet.create({
    container:{
        overflow:'hidden'
    },
    item:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        borderColor:color.borderColor.normalBorderColor,
        borderBottomWidth:1,
        paddingLeft:13,
        paddingRight:14,
        paddingTop:6,
        paddingBottom:6
    },
    title:{
        fontSize:fontSize.formFontSize,
        color :color.color.titleColor,
        fontFamily:'PingFangSC-Medium'
    },
    subTitle:{
        fontSize:fontSize.percentFontSize,
        color:color.color.explainColor,
        fontFamily:'PingFangSC-Medium'
    },
    imgContainer:{
        paddingTop:15,
        paddingBottom:15,
        alignItems:'center',
        backgroundColor:'#fff',
        borderColor:color.borderColor.normalBorderColor,
        borderBottomWidth:1,
    },
    img:{
        width:15,
        height:15
    },
    errorMsg:{
        fontSize:fontSize.formFontSize,
        color:color.color.errorColor,
        fontFamily:'PingFangSC-Medium',
        paddingLeft:13,
        paddingRight:14,
        alignItems:'center',
        textAlign:'center'
    },
    errorMsContainer:{
        paddingTop:4,
        paddingBottom:3,
        borderColor:color.borderColor.normalBorderColor,
        borderBottomWidth:1,
        backgroundColor:'#fff'
    },
    handle:{
        textAlign:'center',
        color: color.color.linkColor,
        height:20,
        lineHeight:20,
        fontSize:fontSize.formFontSize,
        fontFamily:'PingFangSC-Medium'
    }
});

