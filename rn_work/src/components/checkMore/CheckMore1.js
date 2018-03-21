import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,ListView,Animated,Easing,TouchableOpacity} from 'react-native';

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
var getContainerHeight=[];

export default class DetailsList extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: ds.cloneWithRows([]),
            dataArr:props.detailsListData,
            isShow:true,
            isDown:true,
            containerHeight:new Animated.Value(0),
            num:3,
            flag:true
        }
        this._renderItem=this._renderItem.bind(this);
        this._renderImg=this._renderImg.bind(this);
        this._itemLayout=this._itemLayout.bind(this);
        this._containerLayout=this._containerLayout.bind(this);
        this._onClick=this._onClick.bind(this);
    }

    componentDidMount(){
        this.setState({
            data:ds.cloneWithRows(this.state.dataArr)
        });
    }

    _renderItem(rowData){
        let subTitleComponent,subTitle,titleComponent,title;
        if(rowData.titleComponent){
            titleComponent=rowData.titleComponent;
        };
        if(rowData.title){
            title=<Text style={styles.title}>{rowData.title}</Text>
        };
        if(rowData.subTitleComponent){
            subTitleComponent=rowData.subTitleComponent;
        };
        if(rowData.subTitle){
            subTitle=<Text style={styles.subTitle}>{rowData.subTitle}</Text>
        };
        return (
            <View style={styles.item} onLayout={this._itemLayout}>
                {title}
                {titleComponent}
                {subTitle}
                {subTitleComponent}
            </View>
        );
    }
    _renderImg(){
        let icon=this.state.isDown?require('./img/down.png'):require('./img/up.png');
        let imgComponent;
        imgComponent=<Image style={styles.img} source={icon}></Image>
        return (
            <View style={styles.imgContainer}>
                {imgComponent}
            </View>
        );
    };
    _itemLayout(event){
        //获取每一个item的高度，放到集合中
        getContainerHeight.push(event.nativeEvent.layout.height);
    }
    _containerLayout(event){
        let height=0;
        for(let i=0;i<this.state.num;i++){
            height+=getContainerHeight[i]
        };
        //取到集合中的前num项的值，赋值给父级容器
        if(this.state.isDown){
            this.state.containerHeight.setValue(height);
        };
    }
    _onClick(){
        let height=0;
        let len=0;
        if(this.state.flag){
            len=this.state.dataArr.length;
            for(let i=0;i<len;i++){
                height+=getContainerHeight[i]
            };
            this.setState({isDown:false,flag:false});
            Animated.timing(this.state.containerHeight, {
                toValue: height,
                duration: 500,
                easing: Easing.linear// 线性的渐变函数
            }).start()

        }else{
            len=this.state.num;
            for(let i=0;i<len;i++){
                height+=getContainerHeight[i]
            };
            this.setState({isDown:true,flag:true});
            Animated.timing(this.state.containerHeight, {
                toValue: height,
                duration: 500,
                easing: Easing.linear// 线性的渐变函数
            }).start()

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[{height:this.state.containerHeight}]} onLayout={this._containerLayout}>
                    <ListView
                        enableEmptySections={true}
                        dataSource = {this.state.data}
                        renderRow={this._renderItem}
                        />
                </Animated.View>
                <TouchableOpacity onPress={this._onClick}>
                    {this._renderImg()}
                </TouchableOpacity>
            </View>
        );
    }

}
DetailsList.propTypes={
    detailsListData:PropTypes.array
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column'
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

