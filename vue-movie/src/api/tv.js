// 티비 상세보기
import { tvAPI } from "@/api/index";

export function getTvDetail(id) {
  return tvAPI.get(`/${id}`, {
    params: {
      append_to_response: "videos"
    }
  });
}

// 비슷한 작품
export function getSimilarTv(id, parameters = null) {
  return tvAPI.get(`/${id}/similar`, {
    params: {
      ...parameters
    }
  });
}

export function getTvReviews(id, parameters = null) {
  return tvAPI.get(`/${id}/reviews`, {
    params: {
      language: "en-US",
      ...parameters
    }
  });
}

// tv에 대한 추천 작품
export function getRecommendationTv(id, parameters = null) {
  return tvAPI.get(`/${id}/recommendations`, {
    params: {
      ...parameters
    }
  });
}

// 영화별 키워드 리스트
export function getTvKeywords(id) {
  return tvAPI.get(`${id}/keywords`);
}