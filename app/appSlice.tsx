import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/configure-store";
import { ReactNode } from "react";
import { RenderModal } from "@/utils/renderHelper";
import { offScroll, onScroll } from "@/components/hooks/useScroll";
interface reducerState {
  modal: any;
  refresh: boolean;
  isLogin: boolean;
  loadingLogin: boolean;
  loading: number;
  tabNew: string;
  checkNull: boolean;
  token: string;
  accountName: string;
  emailRegister: string;
}

const initialState: reducerState = {
  modal: null,
  refresh: true,
  isLogin: false,
  loadingLogin: true,
  loading: 0,
  tabNew: "new1",
  checkNull: true,
  token: "",
  accountName: "",
  emailRegister: "",
};

let setTime1: any;
let setTime2: any;
let setTime3: any;
let setTime4: any;
let setTime5: any;
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateModalState: (state, action: PayloadAction<ReactNode>) => {
      if (action.payload === null) {
        onScroll();
      } else {
        offScroll();
      }
      state.modal = action.payload === null ? <></> : <>{action.payload}</>;
    },
    updateModalLayout: (state, action: PayloadAction<ReactNode>) => {
      if (action.payload === null) {
        onScroll();
      } else {
        offScroll();
      }
      state.modal = action.payload === null ? <></> : <>{action.payload}</>;
    },

    loadingCallAPI: (state) => {
      setTime1 = setTimeout(() => {
        state.loading = 25;
      }, 200);
      setTime2 = setTimeout(() => {
        state.loading = 50;
      }, 400);
      setTime3 = setTimeout(() => {
        state.loading = 75;
      }, 600);
      setTime4 = setTimeout(() => {
        state.loading = 90;
      }, 800);
      setTime5 = setTimeout(() => {
        state.loading = 100;
      }, 20000);
    },
    finishLoad: (state) => {
      clearTimeout(setTime1);
      clearTimeout(setTime2);
      clearTimeout(setTime3);
      clearTimeout(setTime4);
      clearTimeout(setTime5);
      state.loading = 100;
    },
    setLogin: (state) => {
      state.isLogin = true;
    },
    setLogout: (state) => {
      state.isLogin = false;
    },
    loadingLoginAPI: (state, action: PayloadAction<boolean>) => {
      state.loadingLogin = action.payload;
    },
    scrollToTab: (state, action: PayloadAction<string>) => {
      state.tabNew = action.payload;
    },
    checkNulls: (state, action: PayloadAction<string>) => {
      state.checkNull = true;
    },
    setTokenRedux: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setAccountName: (state, action: PayloadAction<string>) => {
      state.accountName = action.payload;
    },
    setEmailRegister: (state, action: PayloadAction<string>) => {
      state.emailRegister = action.payload;
    },
  },
});

export default appSlice;
