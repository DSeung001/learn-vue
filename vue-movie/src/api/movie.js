import { discoverAPI, gerenAPI, movieAPI, searchAPI } from "@/api/index";

export function getSearchList(parameters){
  return searchAPI.get("movie",{
    params : {
      ...parameters
    }
  })
}

// 개봉작
export function getMovieUpcoming(page) {
  return movieAPI.get("upcoming", {
    params: {
      page: page
    }
  })
}

// 상세보기
export function getMovieDetail(id) {
  return movieAPI.get(`/${id}`, {
    params: {
      append_to_response: "videos"
    }
  })
}

// 인기작
export function getMovieTopRated(page) {
  return movieAPI.get("top_rated", {
    params: {
      page: page
    }
  });
}

// 영화별 키워드 리스트
export function getMovieKeywords(id) {
  return movieAPI.get(`${id}/keywords`);
}

// 장르 리스트 가져오기
export function getGenreList() {
  return gerenAPI.get("movie/list")
}

// 영화 리스트 가져오기
export function getDiscoverList(parameters = null){
  const test =  discoverAPI.get("movie",{
    params : {
      ...parameters
    }
  });
  return test;
}
