import service from "@/utils/request";

export function login(data) {
  return service.post("/user/login", data); //登录接口
}

export function categoryTree() {
  return service.get("/knowledge/category/tree"); //获取文章分类树接口
}

export function articlePage(params) {
  return service.get("/knowledge/article/page", { params }); //获取文章列表接口
}

export function uploadFile(file, businessInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");

  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}//上传文件接口

export  function createArticle(data) {
  return service.post("/knowledge/article", data); //创建文章接口
}

export function getArticleDetail(id){
  return service.get(`/knowledge/article/${id}`); //获取文章详情接口
}

export function updateArticle(id,data){
  return service.put(`/knowledge/article/${id}`,data); //更新文章接口
}