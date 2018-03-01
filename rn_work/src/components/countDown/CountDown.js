import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View} from 'react-native';


export default class CountDown extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.startTime,//开始时间
            isFinish: true,
            isFirst : true,//是否是第一次渲染
        }
    }

    onTimer = () => {
        if (this.state.count > 0) {
            this.setState({count: this.state.count - 1});
        } else {
            clearInterval(this.timer);
            //倒计时结束时的回调函数
            if(this.props.finishedFun){
                this.props.finishedFun()
            };
            this.setState({isFinish: true});
        }
    };

    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }

    againTime = () => {
        if (this.state.isFinish) {
            this.setState({
                count: this.props.startTime,
                isFinish : false,
                isFirst : false,
            });
            //倒计时开始时的回调，
            if (this.props.startedFun) {
                this.props.startedFun();
            }
          this.timer =  setInterval(this.onTimer,1000)
        }
    }
    render() {
        let mainView ;
        if(this.state.isFirst){
            mainView = <Text style={[styles.textMsg,{backgroundColor:this.props.bgColor,width:this.props.width}]} onPress={this.againTime}>{this.props.tip}</Text>;
        }else{
            mainView = this.state.count != 0 ? <Text style={[styles.textMsg,styles.disabled,{width:this.props.width}]}>剩余{this.state.count}s</Text> :  <Text style={[styles.textMsg,{backgroundColor:this.props.bgColor,width:this.props.width}]} onPress={this.againTime}>重新获取</Text>
        }
        return (
            <View style={styles.container}>
                {mainView}
            </View>
        );
    }
}

CountDown.propTypes={
    startTime:PropTypes.number,
    width:PropTypes.number,
    tip:PropTypes.string,
    bgColor:PropTypes.string,
    startedFun:PropTypes.func,
    finishedFun:PropTypes.func
}

CountDown.defaultProps = {
    startTime:60,
    tip:'获取验证码',
    bgColor:'#ff7b7b',
    width:100
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
    },
    textMsg: {
        fontSize: 16,
        textAlign:'center',
        lineHeight:40,
        color:'white',
        height:40
    },
    disabled:{
        backgroundColor:'#ccc'
    }
})

