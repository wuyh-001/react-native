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
    /*
     * 判断数据是否过期   longTime数据的时间戳
     * true  不需要更新
     * false 需要更新
     * */
    static checkData(longTime){
        return false;
        let cDate=new Date();
        let tDate=new Date();
        tDate.setTime(longTime);
        if(cDate.getMonth()!=tDate.getMonth()){return false};
        if(cDate.getDay()!=tDate.getDay()){return false};
        if(cDate.getHours()-tDate.getHours()>4){return false};
        return true;
    }
}