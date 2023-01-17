import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_POST, UPDATE_POSTS } from "../../actions/types";
import PostView from "../../components/PostView";
import { Constants } from "../../constants";
import { sendRequest } from "../../services/fetch.service";
import store from "../../store";
import { deletePost } from "../../services/post.service";

function Home() {
  const postsState = useSelector((state) => state.postsReducer.posts);
  const [incr, setIncr] = useState(5)

  useEffect(() => {
    getPosts();
    window.addEventListener('scroll', handleScroll);
  }, [incr]);

  function handleScroll(e){
    const el = e.target.documentElement;
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
    if (bottom) {
      setIncr(prev => prev+5)
      getPosts()
    }
  }

  function getPosts() {
    sendRequest({
      url: Constants.http.url + Constants.path.post,
      method: "GET",
      queryParams: 'incr='+incr
    })
      .then((res) => {
        store.dispatch({ type: UPDATE_POSTS, posts: res.posts });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const deleteHandler = useCallback(async (postId) => {
    deletePost(postId, true)
  })

  useEffect(() => {
    console.log('postsState', postsState)
  }, [postsState])

  return (
    postsState && postsState.map((post) => {
        return (
          <PostView key={post._id} post={post} onDelete={deleteHandler}></PostView>
        );
      })
  );
}

export default memo(Home);