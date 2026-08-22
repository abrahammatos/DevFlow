import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles: string;
  href?: string;
  isAuthor?: boolean;
  imgStyles?: string;
}
const Metric = ({ imgUrl, alt, value, title, textStyles, href, isAuthor, imgStyles }: Props) => {
  const metricContent = (
    <>
      <Image src={imgUrl} alt={alt} className={`rounded-full object-contain ${imgStyles}`} width={16} height={16} />
      <p className={`flex items-center gap-1 ${textStyles}`}>
        {value} <span className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>{title}</span>
      </p>
    </>
  );

  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
};
export default Metric;
