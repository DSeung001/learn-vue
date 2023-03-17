import { review } from '@/api/local/index'

// 리뷰 생성
export function createReview(data) {
  return review.post('/', data)
}

// 리뷰 하나 읽기
export function getReviewById(id) {
  return review.get(`/${id}`)
}

// 리뷰 여러개 읽기
export function getReviews(params) {
  // console.log(params);
  return review.get('', {
    params: {
      ...params
    }
  })
}

// 리뷰 업데이트
export function setReviewWhereId(id, content) {
  return review.patch(`/${id}`, content)
}
