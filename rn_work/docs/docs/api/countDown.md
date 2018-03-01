# CountDown

##Example
![CountDown](../img/countDown.jpg)

##Usage

    #js
    import React, {Component} from 'react';
    import {View} from 'react-native';

    import {CountDown} from 'IFTide';

    export default class CountDown_Demo extends Component{
        constructor(props) {
            super(props);
        }
        start(){
            console.log('start')
        }
        finished(){
            console.log('end')
        }

        render(){
            let countDown={
                startTime:5,
                tip:'获取验证码',
                width:100,
                bgColor:'#ff7b7b',
                onPress:this.start,
                finishedFun:this.finished
            };
            return(
                <View>
                    <CountDown {...countDown}/>
                </View>
            );
        }
    }

## CountDown Props
| prop | default | type | description |
| ------------ | ------------ | ------------ | ------------ |
| startTime | 60 | num | 倒计时时间 |
| width | 100 | num | 按钮宽度  |
| tip | 获取验证码 | string | 按钮文本 |
| bgColor | #ff7b7c | string | 按钮背景色 |
| startedFun | none | fun | 倒计时开始时的回调函数 |
| finishedFun | none | fun | 倒计时结束时的回调函数 |