import {searchAPI} from "@/api/index";


// 영화 리스트 가져오기
export function getList(parameters){
    return searchAPI.get("movie",{
        params : {
            ...parameters
        }
    })
}