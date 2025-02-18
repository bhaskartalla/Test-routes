import Link from 'next/link'

const App = () => {
  return (
    <div>
      <nav>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/react-copy-to-clipboard'>react-copy-to-clipboard</Link>
        </li>
        <li>
          <Link href='/react-webcam'>react-webcam</Link>
        </li>
        <li>
          <Link href='/todo-list'>todo-list</Link>
        </li>
        <li>
          <Link href='/email-input'>email-input</Link>
        </li>
        <li>
          <Link href='/carousel'>Image Carousel</Link>
        </li>
        <li>
          <Link href='/login'>Login Page</Link>
        </li>
        <li>
          <Link href='/iframe'>Iframe Page</Link>
        </li>
        <li>
          <Link href='/dfs-bfs'>DFS and BFS</Link>
        </li>
        <li>
          <Link href='/infinite-scroll'>Inifinite Scroll</Link>
        </li>
        <li>
          <Link href='/http2'>HTTP 2</Link>
        </li>
      </nav>
    </div>
  )
}

export default App
