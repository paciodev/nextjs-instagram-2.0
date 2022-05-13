import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import Header from "../../components/Header"

export default function SignIn({ providers }) {
  return (
    <>
    <Header />
    <div className='flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center'>
      <Image
        src="https://links.papareact.com/ocw"
        alt=""
        width={320}
        height={120}
      />
      <p className="font-xs italic">
        This is not a REAL Instagram, it is built for educational purposes only.
      </p>

      <div className='mt-40'>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className='p-3 bg-blue-500 rounded-lg text-white hover:opacity-80 transition-opacity'
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}