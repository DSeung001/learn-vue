import {discoverAPI, gerenAPI, movieAPI, searchAPI, trendingAPI} from "@/api/index";

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

// 비슷한 작품
export function getSimilarMovies(id, parameters = null){
  return movieAPI.get(`/${id}/similar`, {
    params: {
      ...parameters
    }
  })
}

// 리뷰 받기
export function getMovieRevoiews(id, parameters = null){
  return movieAPI.get(`/${id}/reviews`, {
    params: {
      language: 'en-US',
      ...parameters
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
  return discoverAPI.get("movie",{
    params : {
      ...parameters
    }
  });
}

// 트렌드
export function getTrendingList(media = 'all', time = 'week'){
  return  trendingAPI.get(`${media}/${time}`);
}