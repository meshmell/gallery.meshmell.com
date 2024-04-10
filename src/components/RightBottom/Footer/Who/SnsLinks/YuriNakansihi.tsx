"use client"
import Link from "next/link";
import { BsGithub, BsLinkedin, BsYoutube } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const SnsLinksForYuri = () => {

  return (
    <>
      <div className="flex gap-2 sm:gap-4 text-xl sm:text-2xl">
        <div className="">
          <Link href="https://twitter.com/yurinakanishi58">
            <RiTwitterXFill />
          </Link>
        </div>
        <div className="">
          <Link href="https://github.com/yurinakanishi">
            <BsGithub />
          </Link>
        </div>
        <div className="">
          <Link href="https://www.linkedin.com/in/yurinakanishi">
            <BsLinkedin />
          </Link>
        </div>
        <div className="">
          <Link href="https://www.youtube.com/@user-st8gh7iu3s">
            <BsYoutube />
          </Link>
        </div>
      </div>
    </>
  )
}

export default SnsLinksForYuri
