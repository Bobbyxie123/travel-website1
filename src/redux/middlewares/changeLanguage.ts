import  i18n  from "../../i18n/configs";
import { Middleware } from "redux";


export const changeLanguage: Middleware = (store) => (next) =>(action)=>{
    if(action.type === 'language/changeLanguage'){
        i18n.changeLanguage(action.payload);
    // payload 是一个对象，用作Action携带数据的载体
    
    }
    next(action)


}