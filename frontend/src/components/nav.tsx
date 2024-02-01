import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <header className="dark flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-transparent text-gray-200">
      <Link className="mr-6" href="#">
        <VideoIcon className="h-6 w-6" />
        <span className="sr-only">Pie-Pi</span>
      </Link>
      <div className="flex w-full justify-center">
        <form className="relative w-full max-w-[600px]">
          <Input className="dark:bg-gray-800 pl-10 pr-10" placeholder="Search videos..." type="search" />
          <SearchIcon className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500" />
        </form>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline" href="./home">
          Home
        </Link>
        <Link className="text-sm font-medium hover:underline" href="./upload">
          Upload
        </Link>
        <Link className="text-sm font-medium hover:underline" href="./profile">
          Profile
        </Link>
       
        
      </nav>
    </header>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}
