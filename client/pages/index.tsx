import Link from 'next/link'
import ChartContainer from '../containers/chart'

export default function Home() {

  return (
  <div>
      <ChartContainer />
      <div><Link href={"/client"}><a target="_blank" rel="noopener noreferrer">client</a></Link></div>
  </div>
  )}







