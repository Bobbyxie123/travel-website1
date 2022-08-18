// import {
//   useSelector as useReduxSelector,
//   TypedUseSelectorHook,
// } from "react-redux";
// import { RootState } from "./store";

// export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;


// 这边的代码是为了让我们能复用组件，
// 重写 useSelector 时用 TypedUseSelectorHook 
// 给它加了 RootState 类型以后，
// 我们在使用这个加强版的useSelector以后，
// 它就会自带store中的所有类型，
// 我们就不需要在文件（组件）中引入store了。
// 当我们不再引用store的时候，store和组件就解绑了



import { useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch 
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
//export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
