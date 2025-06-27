import Link from 'next/link'
import { slug } from 'github-slugger'
interface TocEntry {
  value: string
  url: string
  depth: number
}

const Toc = (entry: TocEntry) => {
  return (
    <li>
      <Link
        href={`#${slug(entry.url)}`}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 block"
        style={{ paddingLeft: `${(entry.depth - 1)}rem` }}
      >
        {entry.value}
      </Link>
    </li>
  )
}

export default Toc
