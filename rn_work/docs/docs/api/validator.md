# Validator

##Example
![Validator](../img/Validator.jpg)

##Usage

    #js
    import React, { Component } from 'react';
    import {Validator} from 'IFTide';

    export default class Validator_Demo extends Component{
        constructor(props) {
            super(props);
        }

        handleFunc(){
            console.log('给我狠狠的刷新')
        }

        render(){
            let icon=require('./fj.jpg');
            let validator={
                errorMsg:'网络不给力啊',
                tips:'世界上最遥远的距离,就是我有网而你没有',
                handleTips:'给我狠狠的刷新',
                handleFunc:this.handleFunc,
                img:icon
            }
            return(
                    <Validator {...validator}/>
            );
        }
    }

## Validator Props
| prop | default | type | description |
| ------------ | ------------ | ------------ | ------------ |
| errorMsg | none | string | 错误提示信息 |
| tips | none | string | 提示语 |
| handleTips | none | arr | 操作提示语 |
| handleFunc | none | fun | 操作回调函数 |
| img | none | str | 图片路径 |