import {discoverAPI, gerenAPI, keywordAPI, movieAPI, searchAPI, trendingAPI, tvAPI} from "@/api/index";

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
// 티비 상세보기
export function getTvDetail(id){
  return tvAPI.get(`/${id}`, {
    params: {
      append_to_response: "videos"
    }
  })
}
// 비슷한 작품
export function getSimilarTv(id, parameters = null){
  return tvAPI.get(`/${id}/similar`, {
    params: {
      ...parameters
    }
  })
}

export function getTvReviews(id, parameters = null){
  return tvAPI.get(`/${id}/reviews`, {
    params: {
      language: 'en-US',
      ...parameters
    }
  })
}

// tv에 대한 추천 작품
export function getRecommendationTv(id, parameters = null){
  return tvAPI.get(`/${id}/recommendations`, {
    params: {
      ...parameters
    }
  })
}

// 영화별 키워드 리스트
export function getTvKeywords(id) {
  return tvAPI.get(`${id}/keywords`);
}


// 영화 상세보기
export function getMovieDetail(id) {
  return movieAPI.get(`/${id}`, {
    params: {
      append_to_response: "videos"
    }
  })
}

// 영화의 비슷한 작품
export function getSimilarMovies(id, parameters = null){
  return movieAPI.get(`/${id}/similar`, {
    params: {
      ...parameters
    }
  })
}
// 영화에 대한 추천 작품
export function getRecommendationMovies(id, parameters = null){
  return movieAPI.get(`/${id}/recommendations`, {
    params: {
      ...parameters
    }
  })
}


// 리뷰 받기
export function getMovieReviews(id, parameters = null){
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
export function getDiscoverMovies(parameters = null){
  return discoverAPI.get("movie",{
    params : {
      ...parameters
    }
  });
}

// Tv discover
export function getDiscoverTv(parameters = null){
  return discoverAPI.get('tv', {
    params : {
      ...parameters
    }
  });
}

// 키워드에 맞는 영화들 가져오기
export function getKeywordMovies(id){
  return keywordAPI.get(`${id}/movies`);
}

// 트렌드
export function getTrendingList(media = 'all', time = 'week'){
  return  trendingAPI.get(`${media}/${time}`);
}