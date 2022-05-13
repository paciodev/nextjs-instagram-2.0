import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'

const Home = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-auto scrollbar-hide">
      <Head>
        <title>Pacio&apos;s Instagram 2.0</title>
        <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" />
      </Head>

      <Header />
      <Feed />

      <Modal />
    </div>
  )
}

export default Home
