import React from "react";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const dummyTestimonialData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "John Doe",
      title: "Marketing Director, TechCorp",
      content:
        "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Jane Smith",
      title: "Content Creator, TechCorp",
      content:
        "ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
      name: "David Lee",
      title: "Content Writer, TechCorp",
      content:
        "ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.",
      rating: 4,
    },
  ];

  return (
    <div className="px-4 py-24 sm:px-20 xl:px-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[42px]">
          Loved by Creators
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
          Don't just take our word for it. Here's what our users are saying.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {dummyTestimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="m-2 w-full max-w-75 cursor-pointer rounded-2xl border border-slate-200 bg-white/90 p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < testimonial.rating
                        ? assets.star_icon
                        : assets.star_dull_icon
                    }
                    className="h-4 w-4"
                    alt="star"
                  />
                ))}
            </div>

            <p className="my-5 text-sm leading-6 text-slate-600">
              "{testimonial.content}"
            </p>

            <hr className="mb-5 border-slate-200" />

            <div className="flex items-center gap-4">
              <img
                src={testimonial.image}
                className="h-12 w-12 rounded-full object-cover"
                alt={testimonial.name}
              />
              <div className="text-sm">
                <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                <p className="text-xs text-slate-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
