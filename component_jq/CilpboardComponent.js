/**
 * Created by xiaowuzai on 2018/2/24.
 */
import React,{Component} from 'react';
import {StyleSheet,Text,View,Clipboard} from 'react-native';

export default class CilpboardComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            content:'需要保存的内容为：'
        }
    }

    async _setClipboardContent(){
        Clipboard.setString('hello word');

        try{
            var content=await Clipboard.getString();
            this.setState({
                content
            })
        }catch(e){
            this.setState({
                content:e.message
            })
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.welcome} onPress={this._setClipboardContent}>
                      clipboard粘贴板演示
                </Text>
                <Text style={{color:'blue',marginLeft:10}}>
                    {this.state.content}
                </Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    welcome:{
        fontSize:20,
        textAlign:'center',
        margin:10
    }
})