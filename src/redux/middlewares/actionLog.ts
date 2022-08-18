import { Middleware } from "redux";

export const actionlog: Middleware = (store)=> (next) => (action) => {
  console.log('state before', store.getState());
  console.log('first',action);
  next(action)
  // 经过reducer后的状态。表示“此中间件执行完毕，将开始下一个中间件的操作”
  console.log('state after',store.getState());
}