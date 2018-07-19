/**
 * Created by xiaowuzai on 2018/2/1.
 */
import {AsyncStorage} from 'react-native';
export var FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending',flag_my:'my'};
import GitHubTrending from 'GitHubTrending';
export default class DataRepository{
    constructor(flag){
        this.flag=flag;
        if(flag===FLAG_STORAGE.flag_trending){
            this.trending=new GitHubTrending();
        }
    }
    /*
    * 获取网络数据
    * */
    fetchNetRepository(url) {
        return new Promise((resolve, reject)=> {
            if(this.flag===FLAG_STORAGE.flag_trending){
                this.trending.fetchTrending(url)
                    .then(result=>{
                        if(!result){
                            reject(new Error('数据为空'))
                            return
                        };
                        resolve(result);
                        this.saveRepository(url,result)
                    })
            }else{
                fetch(url)
                    .then(response=>response.json())
                    .catch(err=>{
                        reject(err)
                    })
                    .then(result=>{
                        if(!result){
                            reject(new Error('数据为空'))
                            return
                        };
                        resolve(result.items);
                        this.saveRepository(url,result.items)
                    })
                    .done();
            }

        })
    };
    saveRepository(url,items,callBack){
        if(!url||!items){
            return
        };
        let wrapData={items:items,update_data:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }
    /*
    * 判断数据是否过期   longTime数据的时间戳
    * */
    checkData(longTime){
        return false;
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!=tDate.getMonth()){return false};
        if(cDate.getDay()!=tDate.getDay()){return false};
        if(cDate.getHours()-tDate.getHours()>4){return false};
        return true;
    }

    /*
    * 获取本地数据
    * */
    fetchLocalRepository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result))
                    }catch(e){
                        reject(error)
                    }
                }else{
                    reject(error)
                }
            })
        })
    }
    fetchRepository(url){
        return new Promise((resolve,reject)=>{
             //获取本地数据
            this.fetchLocalRepository(url)
                .then(result=>{//获取本地数据成功
                    if(result){//如果本地数据不为空
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