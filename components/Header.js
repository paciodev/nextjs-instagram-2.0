/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon
} from '@heroicons/react/outline'
import { HomeIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

const Header = () => {
  const {data: session} = useSession()
  const [isModalOpened, setIsModalOpened] = useRecoilState(modalState)
  const router = useRouter()

  const routeToHome = () => {
    router.push('/')
  }

  return (
    <div className="shadow-sm border-b sticky top-0 z-50 bg-white">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <Image
            src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit='contain'
            alt=""
            onClick={routeToHome}
          />
        </div>
        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit='contain'
            alt=""
            onClick={routeToHome}
          />
        </div>

        <div className="max-w-xs">
          <div className='relative mt-1 p-3 rounded-md'>
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black" type="text" placeholder="Search" />
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navIcon" onClick={routeToHome} />

          {session ? (
            <>
              <div className="relative navIcon">
                <PaperAirplaneIcon className="rotate-45 navIcon" />
                <div className="absolute -top-1 -right-3 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white animate-bounce">3</div>
              </div>
              <PlusCircleIcon
                className="h-6 w-6 flex-shrink-0 cursor-pointer hover:scale-110 transition-all duration-150"
                onClick={() => setIsModalOpened(true)}
              />
              <UserGroupIcon className="navIcon" />
              <HeartIcon className="navIcon" />
              <img
                src={session?.user.image}
                alt=""
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Header;