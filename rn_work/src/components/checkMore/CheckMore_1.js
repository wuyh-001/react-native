import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,ListView,Animated,Easing,TouchableOpacity} from 'react-native';

var getContainerHeight=[];

export default class CheckMore_1 extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:props.detailsListData,
            isShow:true,
            isDown:true,
            opacity:new Animated.Value(0),
            containerHeight:new Animated.Value(0),
            num:3,
            flag:true,
            getContainerHeight:[]
        }
        this._renderItem=this._renderItem.bind(this);
        this._renderImg=this._renderImg.bind(this);
        //this._itemLayout=this._itemLayout.bind(this);
        this._containerLayout=this._containerLayout.bind(this);
        this._onClick=this._onClick.bind(this);
    }
    componentDidMount(){

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
                <View style={[styles.item]} key={i} onLayout={(event)=>{
                        this.state.getContainerHeight.push(event.nativeEvent.layout.height);
                        console.log(this.state.getContainerHeight)
                    }
                }>
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

    _containerLayout(){
        console.log('containerHeight:'+this.state.containerHeight.value)
        let height=0;
        for(let i=0;i<this.state.num;i++){
            height+=this.state.getContainerHeight[i]
        };
        console.log(height)
        //取到集合中的前num项的值，赋值给父级容器
        if(this.state.isDown){
            this.state.containerHeight.setValue(height);
        };
    }
    _onClick(){
        let height=0;
        let len=0;
        if(this.state.flag){
            len=this.state.data.length;
            for(let i=0;i<len;i++){
                height+=getContainerHeight[i]
            };
            this.setState({isDown:false,flag:false,containerHeight:200});
            /*Animated.timing(this.state.containerHeight, {
                toValue:height,
                duration:100,
                easing: Easing.linear// 线性的渐变函数
            }).start();*/
        }else{
            len=this.state.num;
            for(let i=0;i<len;i++){
                height+=getContainerHeight[i]
            };
            this.setState({isDown:true,flag:true});
            /*Animated.timing(this.state.containerHeight, {
                toValue:height,
                duration:100,
                easing: Easing.linear// 线性的渐变函数
            }).start();*/
        };
    }


    render() {
        return (
            <Animated.View style={[styles.container,{ height:this.state.containerHeight}]} onLayout={this._containerLayout}>
                { this._renderItem(this.state.data,0,this.state.data.length)}
                <TouchableOpacity onPress={this._onClick}>
                    {this._renderImg()}
                </TouchableOpacity>
            </Animated.View>
        );
    }
}
/*DetailsList.propTypes={
    detailsListData:PropTypes.array
}*/


const styles = StyleSheet.create({
    container:{
        flex:1
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

