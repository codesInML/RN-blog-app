import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blog_posts":
      return action.payload;
    case "delete_blog_post":
      return state.filter((item) => item.id !== action.payload);
    case "edit_blog_post":
      return state.map((blogPost) =>
        blogPost.id == action.payload.id ? action.payload : blogPost
      );
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => async () => {
  const { data } = await jsonServer.get("/blogposts");

  dispatch({ type: "get_blog_posts", payload: data });
};

const addBlogPost = (dispatch) => async (title, content, callback) => {
  await jsonServer.post("/blogposts", { title, content });

  if (callback) callback();
};

const deleteBlogPost = (dispatch) => async (id) => {
  await jsonServer.delete(`/blogposts/${id}`);
  dispatch({ type: "delete_blog_post", payload: id });
};

const editBlogPost = (dispatch) => async (id, title, content, callback) => {
  await jsonServer.put(`/blogposts/${id}`, { title, content });
  dispatch({ type: "edit_blog_post", payload: { id, title, content } });

  if (callback) callback();
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
