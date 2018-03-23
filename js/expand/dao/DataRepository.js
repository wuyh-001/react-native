/**
 * Created by xiaowuzai on 2018/2/1.
 */
import {AsyncStorage} from 'react-native';

export default class DataRepository{
    /*
    * 获取网络数据
    * */
    fetchNetRepository(url) {
        return new Promise((resolve, reject)=> {
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('数据为空'))
                        return
                    };
                    resolve(result);
                    this.saveRepository(url,result.items)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    };
    saveRepository(url,items,callBack){
        if(!url||!items){
            return
        };
        let wrapData={item:items,update_data:new Date().getTime()};
        AsyncStorage.setItem(url,wrapData)
    }
    /*
    * 获取本地数据
    * */
    fetchLoaclRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result))
                    }catch(e){
                        reject(e)
                    }
                }else{
                    reject(e)
                }
            })
        })
    }
    fetchRepository(url){
        return new Promise((resolve,reject)=>{
             //获取本地数据
            this.fetchLoaclRepository(url)
                .then(result=>{//获取本地数据成功
                    if(!result){//如果本地数据不为空
                        resolve(result)
                    }else{//如果本地数据为空，就获取网络数据
                        this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result)
                        })
                        .catch(e=>{
                            reject(e)
                        })
                    }
                })
                .catch(e=>{//如果获取本地数据失败，就获取网络数据
                    this.fetchNetRepository(url)
                        .then(result=>{
                            resolve(result)
                        })
                        .catch(e=>{
                            reject(e)
                        })
                })
        })
    }
}