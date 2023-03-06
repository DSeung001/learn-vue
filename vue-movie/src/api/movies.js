import {movieAPI} from "@/api/index";


// 개봉작
export function getUpcoming(page) {
    return movieAPI.get("upcoming", {
        params: {
            page: page
        }
    })
}

// 상세보기
export function getDetail(id) {
    return movieAPI.get(`/${id}`, {
        params: {
            append_to_response: "videos"
        }
    })
}

// 인기작
export function getTopRated(page) {
    return movieAPI.get("top_rated", {
        params: {
            page: page
        }
    });
}

// 영화별 키워드 리스트
export function getKeywords(id) {
    return movieAPI.get(`${id}/keywords`);
}