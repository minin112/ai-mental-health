import service from "@/utils/request";

export function login(data) {
  return service.post("/user/login", data); //登录接口
}
//获取文章分类树
export function categoryTree() {
  return service.get("/knowledge/category/tree"); //获取文章分类树接口
}

export function articlePage(params) {
  return service.get("/knowledge/article/page", { params }); //获取文章列表接口
}
