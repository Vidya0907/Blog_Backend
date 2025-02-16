import React from "react";
import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Error: " + error.message;
  if (!data) return "No data";

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-blue-800">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image src={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>{data.content.replace(/<[^>]+>/g, "")}</p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-12">
              {data.user.img && (
                <img
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="User Avatar"
                  width="48"
                  height="48"
                />
              )}

              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            {/* <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur
            </p> */}
            <div className="flex gap-2">
              <Link>
                <Image src="facebook.svg" />
              </Link>
              <Link>
                <Image src="instagram.svg" />
              </Link>
            </div>
          </div>

          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/posts">
              All
            </Link>
            <Link className="underline" to="/posts?cat=crop-management">
              Crop Management
            </Link>
            <Link className="underline" to="/posts?cat=plant-diseases">
              Plant Diseases
            </Link>
            <Link className="underline" to="/posts?cat=sustainable-farming">
              Sustainable Farming
            </Link>
            <Link className="underline" to="/posts?cat=market-trends">
              Market Trends
            </Link>
            <Link className="underline" to="/posts?cat=community-experiences">
              Community Experiences
            </Link>
            <Link className="underline" to="/posts?cat=agri-technology">
              Agri-Technology
            </Link>
            <Link className="underline" to="/posts?cat=soil-health">
              Soil Health
            </Link>
            <Link className="underline" to="/posts?cat=success-stories">
              Success Stories
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
