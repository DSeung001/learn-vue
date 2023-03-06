import {discoverAPI} from "@/api/index";


// 영화 리스트 가져오기
export function getList(parameters = null){
    const test =  discoverAPI.get("movie",{
        params : {
            ...parameters
        }
    });
    return test;
}
