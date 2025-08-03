import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Image
      className="border-2 flex-2/3"
      src="https://media.tenor.com/2aSuT7p_a_UAAAAm/peachcat-cat.webp"
      width={350}
      height={350}
      alt="Picture of the author"
    />
  );
}
