import React from 'react';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';

const BlogCard = ({ videoSrc, title, tags }) => {
  return (
    <div className="bg-white h-full dark:bg-gray-950 border border-gray-100 dark:border-gray-900 duration-300 ease-linear hover:border-gray-200 dark:hover:border-gray-800 p-0.5 flex flex-col group">
      <video controls preload='metadata' className="w-full aspect-video object-cover relative ">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="px-4 lg:px-6 py-5 lg:py-8">
        <a className="text-gray-900 dark:text-white font-semibold text-2xl lg:text-3xl" href="#">{title}</a>
        <div className="flex flex-wrap gap-x-2 w-full gap-y-3 pt-5">
          {tags.map((tag, index) => (
            <span key={`tag${index}`} className="bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-gray-200 px-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const posts = [
  {
    id: 1,
    videoSrc: video1,
    title: "AI-Powered Medical Guidance",
    tags: ["AI", "Healthcare", "Innovation"]
  },
  {
    id: 2,
    videoSrc: video2,
    title: "How to Book an Appointment",
    tags: ["Appointments", "Doctors", "Booking"]
  },
  {
    id: 3,
    videoSrc: video3,
    title: "Using the User-Friendly Dashboard",
    tags: ["Dashboard", "User Experience", "Healthcare"]
  },
  {
    id: 4,
    videoSrc: video1,
    title: "Services Offered by Our Doctors",
    tags: ["Services", "Doctors", "Healthcare"]
  }
];

const BlogSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        <div className="flex md:justify-between">
          <div className="text-center space-y-6 max-w-2xl mx-auto md:mx-0 md:text-left">
            <div className="text-center md:text-left md:max-w-lg space-y-5">
              <span className="rounded-lg bg-blue-100 dark:bg-gray-600 px-2.5 py-1 text-xs font-semibold tracking-wide text-blue-800 dark:text-gray-100">
				toturial videos
			  </span>
              <h2 className="text-3xl font-semibold text-blue-950 dark:text-gray-200 md:text-4xl xl:text-5xl leading-tight">
					Learn How to Use Waslat Seha	
				</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 rounded-t-lg">
          {posts.map(post => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;