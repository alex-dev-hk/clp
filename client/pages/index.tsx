import Link from 'next/link'
import ChartContainer from '../containers/chart'

export default function Home() {

  return (
  <div>
      <ChartContainer />
      <div style={{position:'absolute',top:'85%',right:'50%',transform: 'translate(80%, 50%)'}}><Link href={"/client"}><a target="_blank" rel="noopener noreferrer">client</a></Link></div>
  </div>
  )}







