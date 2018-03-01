import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight} from 'react-native';
import Accordion from './Accordion.js';

export default class FolderContainer extends Component {
    constructor(props){
        super(props)
        this._renderHeader=this._renderHeader.bind(this);
        this._renderContent=this._renderContent.bind(this);
        this._toggle=this._toggle.bind(this);
    }

    _renderHeader(section,index,isActive) {
        let icon=!isActive?require('./ic_polular.png'):require('./ic_my.png');

        let style=this.props.imgPos=="right"?true:false;
        let imgComponent;

        if(this.props.hasImg){
            if(this.props.imgPos=='center'){
                imgComponent=<View style={{alignItems:'center',height:20}}><Image style={styles.headerImage} source={icon}></Image></View>
            }else if(this.props.imgPos=='right'){
                imgComponent=<Image style={styles.headerImage} source={icon}></Image>
            };
        }

        return (
            <View style={style?styles.headerRow:styles.headerCol}>
                <Text style={style?styles.headerTitleRow:styles.headerTitleCol}>{section.title}</Text>
                {imgComponent}
            </View>
        );
    }

    _renderContent(section) {
        let component,content;
        if(section.contentComponent){
            component=section.contentComponent
        }
        if(section.content){
            content=<Text>{section.content}</Text>
        }

        return (
            <View>
                {component}
                {content}
            </View>
        );
    }

    _toggle(index){
        if(this.props.clickFunc){
            this.props.clickFunc(index)
        };
    }

    render() {
        return (
            <Accordion
                sections={this.props.section}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                underlayColor="transparent"
                onChange={this._toggle}
                initiallyActiveSection={this.props.initiallyActiveSection}
            />
        );
    }
}

FolderContainer.propTypes={
    hasImg:PropTypes.bool,
    imgPos:PropTypes.string,
    sections:PropTypes.array,
    initiallyActiveSection:PropTypes.number,
    clickFunc:PropTypes.func
}

FolderContainer.defaultProps = {
    hasImg:true,
    imgPos:'right',
    initiallyActiveSection:0
};

const styles = StyleSheet.create({
    headerRow:{
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        flexDirection: 'row',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#e3e3e5'
    },
    headerTitleRow:{
        flex : 1,
        color :'#2a2f43',
        padding:5,
    },
    headerCol:{
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        flexDirection: 'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        borderBottomWidth:1,
        borderColor:'#e3e3e5'
    },
    headerTitleCol:{
        color :'#2a2f43',
        marginTop:8,
        marginBottom:8,
        padding:5,
        borderBottomWidth:1,
        borderColor:'#e3e3e5'
    },
    headerImage : {
        width : 15,
        height : 15
    },
    content:{
        backgroundColor:'white',
        marginLeft:5,
        marginRight:5,
        padding:5,
        minHeight:30,
        justifyContent:'center'
    }
})