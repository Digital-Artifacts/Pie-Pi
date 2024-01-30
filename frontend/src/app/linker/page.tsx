import Link from "next/link";

export default function Linker() {
   const testid = 100
   
    return (
    <Link href={`/test/${testid}`}>test</Link>
    )
}