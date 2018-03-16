import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,ListView,TouchableOpacity,Platform,UIManager,LayoutAnimation} from 'react-native';


export default class CheckMore_1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:props.detailsListData,
            isShow:true,
            isDown:true,
            limitNum:3,
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


        if(this.state.isDown){
            this.setState({isDown:false});
        }else{
            this.setState({isDown:true});
        };
    }


    render() {
        return (
        <View style={{flex:1}}>
            <View style={[styles.container]}>
                <View>
                    { this._renderItem(this.state.data,0,this.state.limitNum)}
                </View>
                {
                    !this.state.isDown?
                        <View>
                            { this._renderItem(this.state.data,this.state.limitNum,this.state.data.length)}
                        </View>
                    :null
                }
            </View>
            <TouchableOpacity onPress={this._onClick}>
                {this._renderImg()}
            </TouchableOpacity>
            </View>
        );
    }
}
/*DetailsList.propTypes={
    detailsListData:PropTypes.array
}*/


const styles = StyleSheet.create({
    container:{
        overflow:'hidden'
    },
    item:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        borderColor:'#e3e3e5',
        borderBottomWidth:1,
        paddingLeft:13,
        paddingRight:14,
        paddingTop:6,
        paddingBottom:6
    },
    title:{
        fontSize:14,
        color:'#333',
        fontFamily:'PingFangSC-Medium'
    },
    subTitle:{
        fontSize:12,
        color:'#c0cbcb',
        fontFamily:'PingFangSC-Medium'
    },
    imgContainer:{
        paddingTop:15,
        paddingBottom:15,
        alignItems:'center',
        backgroundColor:'#fff',
        borderColor:'#e3e3e5',
        borderBottomWidth:1,
    },
    img:{
        width:15,
        height:15
    }
});

