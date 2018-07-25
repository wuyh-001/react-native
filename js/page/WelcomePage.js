/**
 * Created by xiaowuzai on 2018/1/31.
 */
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight,TouchableOpacity,AsyncStorage,TextInput,PanResponder,processColor} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';

import NavigationBar from './../common/NavigationBar.js';

const KEY='text';


var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';

export default class WelcomePage extends Component{
    constructor(props){
        super(props)

        this._panResponder={}
        this._previousLeft= 0
        this._previousTop=0
        this._circleStyles={}

        this.state={
            isReciprocal:false,//是否是倒数
            initVal:0,
            endVal:60,
            stepVal:3,
            time:200
        }
    }
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.props.navigation.navigate('homePage')
        },500)
        this._updatePosition();


    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
        this.counterTimer&& clearInterval(this.counterTimer)
    }

    static navigationOptions={
        header:null
    }

    componentWillMount=()=>{
        this._panResponder = PanResponder.create({
            //在触摸事件开始询问组件是否需要成为事件响应者
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            //在触摸进行过程中询问组件是否要成为响应者
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            //表示申请成功，组件成为了事件处理响应者
            onPanResponderGrant: this._handlePanResponderGrant,
            //表示触摸手指移动的事件
            onPanResponderMove: this._handlePanResponderMove,
            //表示触摸完成
            onPanResponderRelease: this._handlePanResponderEnd,
            //同意释放响应者角色
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop
            }
        };
    }


    _highlight=()=>{
        const circle = this.circle;
        circle && circle.setNativeProps({
            style: {
                backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
            }
        });
    }

    _unHighlight=()=>{
        const circle = this.circle;
        circle && circle.setNativeProps({
            style: {
                backgroundColor: processColor(CIRCLE_COLOR)
            }
        });
    }

    _updatePosition=()=>{
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handlePanResponderGrant=(e, gestureState)=>{
        console.log(gestureState)
        this._highlight();
    }
    _handlePanResponderMove=(e, gestureState)=>{
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        this._updatePosition();
    }
    _handlePanResponderEnd=(e, gestureState)=>{
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    }

    onSave(){
       let that=this;
        AsyncStorage.setItem(KEY,that.text,(error)=>{
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('保存失败',DURATION.LENGTH_LONG)
            }
        })
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show('删除成功',DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('删除失败',DURATION.LENGTH_LONG)
            }
        })
    }
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error&&result){
                this.toast.show('取出的内容为：'+result,DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('取出失败',DURATION.LENGTH_LONG)
            }
        })
    }

    startTime=()=>{
        let {isReciprocal,initVal,endVal,stepVal,time}=this.state;
        let that=this;
        this.counterTimer&& clearInterval(this.counterTimer);
        this.counterTimer=setInterval(function(){
            if(initVal<endVal){
                that.setState({initVal:initVal+stepVal})
            }else if(initVal>=endVal){
                that.counterTimer&& clearInterval(this.counterTimer)
            };
        },time);
        return <Text style={{fontSize:30,color:'#ff7b7c',margin:100}}>{initVal}</Text>

    }

    render(){

        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'welcome'}
                    statusBar={{
                        backgroundColor:'#2196f3'
                    }}
                    leftButton={
                        <TouchableOpacity>
                            <Image source={require('./../../res/images/ic_arrow_back_white_36pt.png')} style={{width:22,height:22}}/>
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity>
                            <Image source={require('./../../res/images/ic_star.png')} style={{width:22,height:22}}/>
                        </TouchableOpacity>
                    }
                />
                <TextInput style={{borderColor:'#ddd',borderWidth:1,height:40}} onChangeText={text=>this.text=text}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text onPress={()=>this.onSave()}>save</Text>
                    <Text onPress={()=>this.onRemove()}>remove</Text>
                    <Text onPress={()=>this.onFetch()}>fetch</Text>
                </View>

                <View
                    ref={(circle) => {this.circle = circle}}
                    style={styles.circle}
                    {...this._panResponder.panHandlers}
                />

                {this.startTime()}

                <Toast ref={(toast)=>{this.toast=toast}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: 'absolute',
        left: 0,
        top: 0,
    }
});