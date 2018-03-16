import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,ListView,Animated,Easing,TouchableOpacity} from 'react-native';

var getContainerHeight=[];

export default class CheckMore_1 extends Component {
    constructor(props){
        super(props)
        this.icons = { //Step 2
            'up' : require('./img/down.png'),
            'down' : require('./img/up.png')
        };
        this.state = { //Step 3
            title : props.title,
            expanded : true,
            animation : new Animated.Value()
        };
    }
    toggle(){
        let initialValue = this.state.expanded? this.state.maxHeight +   this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        this.setState({
            expanded : !this.state.expanded //Step 2
        });

        this.state.animation.setValue(initialValue); //Step 3
        Animated.spring( //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start(); //Step 5
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight : event.nativeEvent.layout.height
        });
    }

    render() {
        let icon = this.icons['down']
        if(this.state.expanded){
            icon = this.icons['up']; //Step 4
        } //Step 5
        return (
             <View style={{height:30,borderColor:'red',borderWidth:1}}>
                <Text>layoutAnimation 只对布局的创建和更新事件起作用，对删除事件是不起作用的（如删除某个元素时，该元素会消失，可能会透明度逐渐减少 ，但是不会有其他复杂的消失）。 </Text>
             </View>
        );
    }
}



const styles = StyleSheet.create({

    container : {
        backgroundColor: '#fff',
        margin:10,
        /*overflow:'hidden'*/
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title : {
        flex : 1,
        padding : 10,
        color :'#2a2f43',
        fontWeight:'bold'
    },
    button : {
    },
    buttonImage : {
        width : 30,
        height : 25
    },
    body : {
        padding : 10,
        paddingTop : 0
    }






    /*container:{
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
    }*/
});

