/**
 * Created by wuyanhua on 2018/7/19.
 */
import {AsyncStorage} from 'react-native';

import DataRepository,{FLAG_STORAGE} from './DataRepository.js';
import Utils from './../../util/Utils.js';

var itemMap=new Map();

export default class RepositoryUtils{
    constructor(aboutCommon){
        this.aboutCommon=aboutCommon;
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_my);
    }
    //更新数据
    updateData(k,v){
        itemMap.set(k,v);
        var arr=[];
        for(var value of itemMap.values()){
            arr.push(value);
            this.aboutCommon
        };
    }
    //获取制定URL下的数据
    fetchRepository(url){
        this.dataRepository.fetchRepository(url)
            .then(result=>{
                if(result){
                    this.updateData(url,result);
                    if(!Utils.checkData(result.update_date)){
                        return this.dataRepository.fetchNetRepository(url)
                    }
                }
            }).then((item)=>{
                if(!item){
                    this.updateData(url,item);
                }
            }).catch(err=>{

            })
    }
    //批量获取数据
    fetchRepositories(urls){
        for(let i=0;i<urls.length;i++){
            var url=urls[i];
            this.fetchRepository(url)
        }
    }


}