// library
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// store
import { useStore } from "@/components/store";

const API_BASE_URL = "https://strapi.arvanschool.ir/";

function getAuthHeaders() {
  const jwt = useStore.getState().jwt;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
  };
}

// Get All Posts
export function GetAllPost() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get(`${API_BASE_URL}api/posts`, {
          headers: getAuthHeaders(),
        })
        .then((res) => res.data.data),
  });
  return { data, isLoading, error, refetch };
}

// Get Post By ID
export function GetPostById(documentId) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", documentId],
    queryFn: () =>
      axios
        .get(`${API_BASE_URL}api/posts/${documentId}`, {
          headers: getAuthHeaders(),
        })
        .then((res) => res.data.data),
  });
  return { data, isLoading, error };
}

// Create a Post
export default function CreateOnePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postData) =>
      axios
        .post(
          `${API_BASE_URL}api/posts`,
          { data: postData },
          { headers: getAuthHeaders() }
        )
        .then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });
}

// Edit (update) a Post
export function EditPostById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentId, postData }) =>
      axios
        .put(
          `${API_BASE_URL}api/posts/${documentId}`,
          { data: postData },
          { headers: getAuthHeaders() }
        )
        .then((res) => res.data.data),

    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["post", variables.documentId],
      });
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });
}

// Delete a Post
export function DeletePostById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId) =>
      axios.delete(`${API_BASE_URL}api/posts/${documentId}`, {
        headers: getAuthHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });
}
