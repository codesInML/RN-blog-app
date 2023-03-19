import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blog_posts":
      return action.payload;
    case "add_blog_post":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
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

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: "add_blog_post", payload: { title, content } });
    callback();
  };
};

const deleteBlogPost = (dispatch) => (id) =>
  dispatch({ type: "delete_blog_post", payload: id });

const editBlogPost = (dispatch) => (id, title, content, callback) => {
  dispatch({ type: "edit_blog_post", payload: { id, title, content } });
  callback();
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
