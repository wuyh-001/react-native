/**
 * Created by xiaowuzai on 2018/2/1.
 */

export default class DataRepository{
    fetchNetRepository(url) {
        return new Promise((resolve, reject)=> {
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    resolve(result)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    };
}