/**
 * Created by xiaowuzai on 2018/2/24.
 */
import React,{Component} from 'react';
import {StyleSheet,Text,View,Modal,TouchableHighlight,Switch} from 'react-native';


export class Button extends Component{
    constructor(props){
        super(props)
        this.state={
            active:false
        }
        this._onHightlight=this._onHightlight.bind(this);
        this._onUnhightlight=this._onUnhightlight.bind(this);
    }
    _onHightlight(){
        this.setState({
            active:true
        })
    }
    _onUnhightlight(){
        this.setState({
            active:false
        })
    }
    render(){
        var colorStyle={
            color:this.state.active?'#fff':'#000'
        }
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhightlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHightlight}
                style={[styles.button,this.props.style]}
                underlayColor={'#a9d9d4'}
            >
                <Text style={[styles.buttonText,colorStyle]}>{this.props.children}</Text>
            </TouchableHighlight>
        )
    }
}
export default class ModalComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            animationType:false,
            modalVisible:false,
            transparent:false
        }
        this._toggleTransparent=this._toggleTransparent.bind(this);
    }
    _setModalVisible(visible){
        this.setState({modalVisible:visible})
    }
    _setAnimationType(type){
        this.setState({animationType:type})
    }
    _toggleTransparent(){
        this.setState({transparent:!this.state.transparent})
    }
    render(){
        const modalBackgroundStyle={
            backgroundColor:this.state.transparent ? 'rgba(0,0,0,0.5)' : '#f5fcff'
        };
        const innerContainerTransparentStyle=this.state.transparent?{backgroundColor:'red',padding:20}:null
        return(
            <View style={{paddingTop:20,paddingLeft:10,paddingRight:10}}>
                <Text style={{color:'red'}}>Modal演示实例</Text>
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{this._setModalVisible(false)}}
                >
                    <View style={[styles.container,modalBackgroundStyle]}>
                        <View style={[styles.innerContainer,innerContainerTransparentStyle]}>
                            <Text>
                                modal视图被显示{this.state.animationType===false?'没有':'有'}动画效果
                            </Text>
                            <Button onPress={this._setModalVisible.bind(this,false)}>
                                关闭Modal
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>动画类型</Text>
                    <Button onPress={this._setAnimationType.bind(this,false)} style={this.state.animationType === false ? {backgroundColor:'red'}: {}}>
                        无动画
                    </Button>
                    <Button onPress={this._setAnimationType.bind(this, true)} style={this.state.animationType === true ? {backgroundColor:'yellow'} : {}}>
                        滑动效果
                    </Button>
                </View>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>透明</Text>
                    <Switch value={this.state.transparent} onValueChange={this._toggleTransparent} />
                </View>

                <Button onPress={this._setModalVisible.bind(this, true)}>
                    显示Modal
                </Button>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
});

