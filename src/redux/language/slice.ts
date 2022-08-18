import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  language: 'en'|'zh';
  languageList: { name: string; code: string }[];
}

const initialState : LanguageState = {
  language: 'zh',
  languageList: [
    { name: '中文', code: 'zh' },
    { name: 'English', code: 'en' },]
}

// first step of createSlice, 1: create initialState


export const languageSlice = createSlice({

  name: 'language',
  initialState,
  // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
  reducers: {
    // Redux Toolkit允许我们在reducers中直接写改变state的逻辑.
    // 由于使用了Immer库,所以并没有真的改变state
    // 而是检测到“草稿state”的更改并根据这些更改生成一个全新的不可变state
    // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变，不需要每一次都返回一个新的state数据。
    changeLanguage: (state,action: PayloadAction<'en'|'zh'>)=> { 
      state.language = action.payload;
      // state.language: the language is the name above
      //这边有点看不懂，记得回头看
      // payloadaAction is only the type 
      console.log(action)
    }
  }
}) 


// reducer方法的每一个case都会生成一个Action
export const {changeLanguage} = languageSlice.actions




























// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface LanguageState {
//   language: 'en' | 'zh';
//   languageList: { name: string; code: string }[];
// }

// const initialState: LanguageState = {
//   language: 'zh',
//   languageList: [
//     { name: '中文', code: 'zh' },
//     { name: 'English', code: 'en' },
//   ],
// };

// export const languageSlice = createSlice({
//   name: 'language',
//   initialState,
//   reducers: {
//     changeLanguage: (state, action: PayloadAction<'en' | 'zh'>) => {
//       state.language = action.payload;
//     },
//     addLanguage: (
//       state,
//       action: PayloadAction<{ name: string; code: string }>
//     ) => {
//       state.languageList = [...state.languageList, action.payload];
//     },
//   },
// });
