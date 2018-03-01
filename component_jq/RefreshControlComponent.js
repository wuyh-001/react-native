/**
 * Created by xiaowuzai on 2018/2/24.
 */
/**
 * Created by xiaowuzai on 2018/2/24.
 */
import React,{Component} from 'react';
import {StyleSheet,Text,View,ScrollView,ListView,RefreshControl} from 'react-native';

export class Row extends Component{
    constructor(props){
        super(props)
    }
    _onClick(){
        this.props.onClick(this.props.data)
    }
    render(){
        return (
            <View style={styles.row}>
                <Text style={styles.text}>
                    {this.props.data.text}
                </Text>
            </View>
        )
    }
}

const arr=[
    {text:'初始行：21'},{text:'初始行：31'},{text:'初始行：41'},{text:'初始行：51'},{text:'初始行：61'},{text:'初始行：71'},{text:'初始行：81'},
    {text:'初始行：12'},{text:'初始行：13'},{text:'初始行：14'},{text:'初始行：15'},{text:'初始行：16'},{text:'初始行：17'},{text:'初始行：18'},
]
const arr1=[
    {text:'下拉刷新：21'},{text:'下拉刷新：31'},{text:'下拉刷新：41'},{text:'下拉刷新：51'},{text:'下拉刷新：61'},{text:'下拉刷新：71'},{text:'下拉刷新：81'}
]

export default class RefreshControlComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            isRefreshing:false,
            loaded:0,
            //rowData:Array.from(new Array(20)).map((val,i)=>{text:'初始行：'+i})
            rowData:arr
        }
    }

    _onRefresh(){
        //this.setState({isRefreshing:true});
        this.setState({isRefreshing: true});
        setTimeout(()=>{
            /*const rowData=Array.from(new Array(5)).map((val,i)=>{
                text:'下拉刷新：'+this.state.loaded+i
            }).concat(this.state.rowData);*/
            const rowData=arr1.concat(this.state.rowData);
            this.setState({
                isRefreshing:false,
                loaded:this.state.loaded+5,
                rowData:rowData
            });
        },5000);
    }

    render(){
        const rows=this.state.rowData.map((row,ii)=>{
            return <Row key={ii} data={row} />
        })
        return (
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        color={['#ff000','#00ff00','#0000ff','#123456']}
                        progressBackgroundColor={'#fff'}
                    />
                }
            >
                {rows}
            </ScrollView>
        )
    }
}
var styles=StyleSheet.create({
    row:{
        padding:20,
        backgroundColor:'#f6f6f6',
        borderWidth:2,
        borderColor:'red',
        margin:5
    },
    text:{
        alignSelf:'center',
    },
    layout:{
        flex:1
    },
    scrollView:{
        flex:1
    }
})
