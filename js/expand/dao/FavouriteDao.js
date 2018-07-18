/**
 * Created by xiaowuzai on 2018/4/8.
 */
import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';


const FAVOURITE_KEY_FREFIX= 'favourite_';
export default class FavouriteDao {
    constructor(flag) {
        this.flag = flag;
        this.favouriteKey = FAVOURITE_KEY_FREFIX+flag;
    }
    //保存收藏项目 key为id或者是名称  value为收藏的项目
    saveFavouriteItem(key,value,callback){
        AsyncStorage.setItem(key,value,(err)=>{
            if(!err){
                this.updateFavouriteKeys(key,true)
            };
        })
    }
    //更新favourite的key集合   isAdd为true是添加
    updateFavouriteKeys(key,isAdd){
       AsyncStorage.getItem(this.favouriteKey,(err,result)=>{
           if(!err){
               var favouriteKeys=[];
               if(result){
                   console.log('result:'+result)
                   favouriteKeys=JSON.parse(result);
               };
               var index=favouriteKeys.indexOf(key);
               if(isAdd){
                   if(index===-1){
                       favouriteKeys.push(key)
                   }
               }else{
                   if(index!==-1){
                       favouriteKeys.splice(index,1)
                   }
               };
               AsyncStorage.setItem(this.favouriteKey,JSON.stringify(favouriteKeys))
           };
       })
    }
    //取消收藏
    removeFavouriteItem(key){
        AsyncStorage.removeItem(key,(err)=>{
            if(!err){
                this.updateFavouriteKeys(key,false)
            };
        })
    }
    //获取收藏的item对应的key
    getFavouriteKeys(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.favouriteKey,(error,result)=>{
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                }else {
                    reject(error);
                }
            })
        })
    }
    //获取用户收藏的所有item
    getAllFavouriteItems(){
        return new Promise((reslove,reject)=>{
            this.getFavouriteKeys().then(keys=>{
                var items=[];
                if(keys){
                    AsyncStorage.multiGet(keys,(err,stores)=>{
                        if(!err){
                            try{
                                stores.map((result,i,stores)=>{
                                    let value=stores[i][1];
                                    if(value){
                                        items.push(JSON.parse(value))
                                    }
                                })
                                reslove(items)
                            }catch(e){
                                reject(e)
                            }
                        }
                    })
                }else{
                    reslove(items)
                }
            }).catch(e=>{
                reslove(e)
            })
        })
    }
}