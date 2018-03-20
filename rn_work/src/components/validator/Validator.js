/**
 * Created by xiaowuzai on 2018/3/20.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import color from '../../config/theme/standard/color.js';
import fontSize from '../../config/theme/standard/fonts.js';

export default class Validator extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        let icon=this.props.img;
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={icon}/>
                <Text style={styles.errorMsg}>{this.props.errorMsg}</Text>
                <Text style={styles.tips}>{this.props.tips}</Text>
                <TouchableOpacity onPress={this.props.handleFunc} activeOpacity={1}>
                    <Text style={styles.handleTips}>{this.props.handleTips}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

Validator.propTypes={
    errorMsg:PropTypes.string,
    tips:PropTypes.string,
    handleTips:PropTypes.string,
    handleFunc:PropTypes.func,
    img:PropTypes.number
}
Validator.defaultProps={

}


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        width:75,
        height:75,
        marginBottom:25
    },
    errorMsg:{
        fontSize:fontSize.secTitleFontSize,
        color :color.color.titleColor,
        fontFamily:'PingFangSC-Medium'
    },
    tips:{
        fontSize:fontSize.btnFontSize,
        color :color.color.explainColor,
        fontFamily:'PingFangSC-Medium',
        marginTop:15,
        marginBottom:20
    },
    handleTips:{
        fontSize:fontSize.btnFontSize,
        color :color.color.linkColor,
        fontFamily:'PingFangSC-Medium'
    }


});
