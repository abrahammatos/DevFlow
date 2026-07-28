import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";
import React from "react";
import TagCard from "../cards/TagCard";

const hotQuestions = [
  {
    _id: "1",
    title: "How to create a custom hook in React?",
  },
  {
    _id: "2",
    title: "What is the difference between useEffect and useLayoutEffect?",
  },
  {
    _id: "3",
    title: "How to optimize performance in React applications?",
  },
  {
    _id: "4",
    title: "What are the best practices for state management in React?",
  },
  {
    _id: "5",
    title: "How to handle forms and validation in React?",
  },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "typeScript", questions: 80 },
  { _id: "3", name: "next.js", questions: 60 },
  { _id: "4", name: "javascript", questions: 50 },
  { _id: "5", name: "css", questions: 40 },
];

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 scrollbar-none flex-col gap-6 overflow-y-auto border-l p-6 pt-26 max-xl:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light800">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-7.5">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image src="/icons/chevron-right.svg" alt="Chevron" width={20} height={20} className="invert-colors" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="h3-bold text-dark200_light800">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard key={_id} _id={_id} name={name} questions={questions} showCount={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
