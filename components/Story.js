import Image from "next/image";

/* eslint-disable @next/next/no-img-element */
const Story = ({ img, username }) => {
  return (
    <div>
      <div className="h-14 w-14 p-[2px] hover:scale-110 transition-transform duration-200 ease-out rounded-full border-red-500 border-2">
        <Image
          className="rounded-full cursor-pointer"
          src={img}
          width={56}
          height={56}
          objectFit="contain"
          alt=""
        />
      </div>
      <p className='text-xs w-14 truncate text-center'>{username}</p>
    </div>
  );
}

export default Story;