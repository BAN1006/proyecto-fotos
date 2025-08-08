import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
          <div className="flex flex-col items-center justify-center">
            <Image
              className="border-2 flex-2/3"
              src="https://media.tenor.com/2aSuT7p_a_UAAAAm/peachcat-cat.web"
              width={350}
              height={350}
              alt="Picture of the author"
            />
            <h1>🐸 No seas sapo 🐸</h1>
          </div>
        </div>
  );
}
