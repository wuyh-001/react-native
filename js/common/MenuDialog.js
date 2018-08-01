/**
 * Created by wuyanhua on 2018/8/1.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet,Text,View,Modal,ScrollView,Image,TouchableOpacity,DeviceInfo} from 'react-native';

export default class MenuDialog extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:false,
        }
    }

    show=()=>{
        this.setState({
            visible:true
        })
    }

    hide=()=>{
        this.setState({
            visible:false
        })
    }

    render(){
        const {menus,onSelect,theme,onClose}=this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={()=>onClose()}
            >
                <TouchableOpacity onPress={()=>{this.hide()}} style={styles.container}>
                    <Image
                        source={require('./../../res/images/ic_arrow_back_white_36pt.png')}
                        style={styles.arrow}
                    />
                    <View style={styles.content}>
                        {
                            menus.map((reault,i,arr)=>{
                                let menu=arr[i];
                                return(
                                    <TouchableOpacity onPress={()=>{onSelect(arr[i])}} key={i} style={{margin:5}}>
                                        <View style={{alignItems:'center',flexDirection:'row'}}>
                                            <Image
                                                source={menu.icon}
                                                style={[styles.icon]}
                                                resizeMode={'stretch'}
                                                />
                                            <Text style={styles.text}>{menu.name}</Text>
                                            {
                                                i!=menus.length-1?<View style={styles.line}/>:null
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.6)',
        alignItems:'flex-end'
    },
    arrow:{
        width:16,
        height:16,
        marginTop:56+(DeviceInfo.isIPhoneX_deprecated?24:0),
        marginRight:18,
        resizeMode:'contain'
    },
    content:{
        backgroundColor:'white',
        borderRadius:3,
        marginRight:3,
        paddingTop:3,
        paddingBottom:3
    },
    icon:{
        width:16,
        height:16,
    },
    text:{
        fontSize:16,
        color:'black',
        fontWeight:'400',
        paddingRight:15
    },
    line:{
        height:1,
        backgroundColor:'gray'
    }
})

MenuDialog.propTypes={
    menus:PropTypes.array.isRequired,
    onSelect:PropTypes.func.isRequired,
    theme:PropTypes.object,
    onClose:PropTypes.func,
}
MenuDialog.defaultProps={

}