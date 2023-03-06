import {gerenAPI} from "@/api/index";


// 장르 리스트 가져오기
export function getList() {
  return gerenAPI.get("movie/list")
}