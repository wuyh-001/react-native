/**
 * Created by xiaowuzai on 2018/4/8.
 */
export default class Utils{
    //检查item是否被收藏过
    static checkFavourite(item,items){
        for(var i=0;i<items.length;i++){
            let id=item.id?item.id.toString():item.fullName;
            if(id===items[i]){
                return true;
            }
        }
        return false;
    }
}