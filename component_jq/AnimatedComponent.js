/**
 * Created by xiaowuzai on 2018/2/28.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,Animated,View} from 'react-native';

export default class AnimatedComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            fadeAnim:new Animated.Value(0)
        }
    }
    componentDidMount(){
        Animated.timing(
            this.state.fadeAnim,
            {toValue:1}
        ).start()
    }
    render(){
        return(
            <Animated.View style={{opacity:this.state.fadeAnim,flex:1}}>
                {this.props.children}
                <Text>123</Text>
            </Animated.View>
        )
    }
}


