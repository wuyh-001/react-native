/**
 * Created by xiaowuzai on 2018/2/24.
 */
import React,{Component} from 'react';
import {StyleSheet,Text,View,Image,ListView} from 'react-native';

const ds=new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
const THUMB_URLS=[
    require('./../res/images/ic_star.png'),
    require('./../res/images/ic_code.png'),
    require('./../res/images/ic_computer.png'),
    require('./../res/images/ic_favorite.png'),
    require('./../res/images/ic_contacts.png'),
    require('./../res/images/ic_feedback.png'),
    require('./../res/images/ic_my.png'),
    require('./../res/images/ic_star.png'),
    require('./../res/images/ic_code.png'),
    require('./../res/images/ic_computer.png'),
    require('./../res/images/ic_favorite.png'),
    require('./../res/images/ic_contacts.png'),
    require('./../res/images/ic_feedback.png'),
    require('./../res/images/ic_my.png'),
    require('./../res/images/ic_star.png'),
    require('./../res/images/ic_code.png'),
    require('./../res/images/ic_computer.png'),
    require('./../res/images/ic_favorite.png'),
    require('./../res/images/ic_contacts.png'),
    require('./../res/images/ic_feedback.png'),
    require('./../res/images/ic_my.png'),
    require('./../res/images/ic_star.png'),
    require('./../res/images/ic_code.png'),
    require('./../res/images/ic_computer.png'),
    require('./../res/images/ic_favorite.png'),
    require('./../res/images/ic_contacts.png'),
    require('./../res/images/ic_feedback.png'),
    require('./../res/images/ic_my.png')
]

export default class ListViewComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            dataSource:ds.cloneWithRows(this._genRows())
        }
    }
    _genRows(){
        var dataBolb=[];
        for(var ii=0;ii<THUMB_URLS.length;ii++){
            dataBolb.push('单元格：'+ii)
        };
        return dataBolb;
    };

    renderItem(rowData,sectionID,rowID){
        var img=THUMB_URLS[rowID]
       return (
           <View>
               <View style={styles.row}>
                    <Image source={img} style={styles.thumb}/>
                   <Text style={styles.text}>{rowID}</Text>
               </View>
           </View>
       )
    }
    _onChangeVisibleRows(isibleRows,changedRows){
        console.log('当可见的行发生变化的时候回调该方法onChangeVisibleRows'+isibleRows+changedRows)
    }
    render(){
        return (
            <View style={{flex:1}}>
                <ListView
                    initialListSize={THUMB_URLS.length}
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    onChangeVisibleRows={this._onChangeVisibleRows}
                />
            </View>
        )
    }
}
var styles=StyleSheet.create({
    list:{
        marginTop:5,
        justifyContent:'space-around',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    row:{
        justifyContent:'center',
        padding:8,
        margin:8,
        width:100,
        height:100,
        backgroundColor:'#f6f6f6',
        alignItems:'center',
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ccc'
    },
    thumb:{
        width:24,
        height:24
    },
    text:{
        flex:1,
        marginTop:5,
        fontWeight:'bold'
    }
})
