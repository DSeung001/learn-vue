// axios로 데이터 조회
import axios from "axios";

const posts = [
  { id: 1, title: "제목1", content: "내용1", createdAt: "2020-01-01" },
  { id: 2, title: "제목2", content: "내용2", createdAt: "2021-01-01" },
  { id: 3, title: "제목3", content: "내용3", createdAt: "2022-01-01" },
  { id: 4, title: "제목4", content: "내용4", createdAt: "2023-01-01" },
  { id: 5, title: "제목5", content: "내용5", createdAt: "2024-01-01" },
  { id: 6, title: "제목6", content: "내용6", createdAt: "2025-01-01" },
  { id: 7, title: "제목7", content: "내용7", createdAt: "2026-01-01" }
];

const apiUrl = "http://localhost:5000";

export function getPosts() {
  return axios.get(apiUrl+"/posts");
}

export function getPostById(id) {
  return axios.get(apiUrl+`/posts/${id}`);
}

export function createPost(data) {
  return axios.post(apiUrl+`/posts`, data);
}

export function updatePost(id, data) {
  return axios.put(apiUrl+`/posts/${id}`, data);
}

export function deletePost(id) {
  return axios.delete(apiUrl+`/posts/${id}`);
}