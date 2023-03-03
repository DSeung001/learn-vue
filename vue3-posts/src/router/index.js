import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PostCreateView from "@/views/posts/PostCreateView.vue";
import PostDetailView from "@/views/posts/PostDetailView.vue";
import PostEditView from "@/views/posts/PostEditView.vue";
import PostListView from "@/views/posts/PostListView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import NestedView from "@/views/nested/NestedView.vue";
import NestedOneView from "@/views/nested/NestedOneView.vue";
import NestedTwoView from "@/views/nested/NestedTwoView.vue";
import NestedHomeView from "@/views/nested/NestedHomeView.vue";


// 정규식도 가능
// /를 넣어야 절대경로로 정상 작동함!
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/about",
    name: "About",
    component: AboutView
  },
  {
    path: "/posts",
    name: "PostList",
    component: PostListView
  },
  {
    path: "/posts/create",
    name: "PostCreate",
    component: PostCreateView
  },
  {
    path: "/posts/:id",
    name: "PostDetail",
    component: PostDetailView,
    props: true,
    // props : (route) =>{
    //   return{
    //     id : parseInt(route.params.id),
    //   }
    // }

    // props: (route) => ({ id: parseInt(route.params.id) }),
  },
  {
    path: "/posts/:id/edit",
    name: "PostEdit",
    component: PostEditView
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView
  },
  {
    path: "/nested",
    name: "Nested",
    component: NestedView,
    children: [
      {
        path: "",
        name: "NestedHome",
        component: NestedHomeView
      },
      {
        path: "one",
        name: "NestedOne",
        component: NestedOneView
      }
      , {
        path: "two",
        name: "NestedTwo",
        component: NestedTwoView
      }
    ]
  }
];

// Hash와 History의 차이는 서버에 배포 방법의 차이
// # 뒤에 문구는 서버 요청에 안 붙음
// # 해시모드로 최적화시 => SEO에 악영향
// 그러므로 대부분 History 모드 사용
const router = createRouter({
  history: createWebHistory("/"),
  // history : createWebHashHistory('/base'),
  routes
});

export default router;