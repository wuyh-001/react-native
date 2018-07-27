/**
 * Created by wuyanhua on 2018/7/27.
 */

//可取消异步操作
export default function makeCancelable(promise){
    let hasCanceled_=false;
    const wrappedPromise=new Promise((resolve,reject)=>{
        promise.then((val)=>hasCanceled_?reject({hasCanceled_:true}):resolve(val));
        promise.catch((error)=>hasCanceled_?reject({hasCanceled_:true}):resolve(error))
    });
    return {
        promise:wrappedPromise,
        cancel(){
            hasCanceled_=true;
        }
    }
}