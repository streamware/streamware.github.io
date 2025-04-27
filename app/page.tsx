import Image from "next/image";
import PublishedAt from "./publishedAt";

type Asset = {
  browser_download_url: string;
  name: string;
};

export default async function Home() {
  const data = await fetch(
    "https://api.github.com/repos/Streamware/Mirrors/releases?per_page=1"
  ).then((res) => res.json());

  console.log(data);

  const getReleaseAsset = data[0].assets.find((asset: Asset) =>
    asset.name.includes("app-release.apk")
  );

  return (
    <main className="flex min-h-screen flex-col items-center sm:p-24 p-10">
      <div className="flex items-center justify-center text-[60px] rounded pointer-events-none select-none bg-[#0049FF] text-white w-24 h-24 mb-3">
        S
      </div>
      <p className="text-xs sm:text-base text-center">
        Here the latest version of our application effortlessly and charmingly,
      </p>
      <p className="text-xs sm:text-base sm:block hidden">
        designed exclusively for testers. Seamlessly fetches the newest release
        from GitHub for instant access.
      </p>
      <div className="flex-col items-center content-center justify-center my-5">
        <a
          className="block bg-[#171717] text-gray-100 px-4 py-2 rounded-lg text-sm mb-2"
          href={getReleaseAsset.browser_download_url}
          download
        >
          Download APK
        </a>
        <p className="text-[11px] text-center text-gray-500 mr-3">
          Version {data[0].tag_name}
        </p>
      </div>
      <div className="relative flex place-items-center">
        <div className="flex">
          <Image
            className="rounded-full pointer-events-none select-none"
            src={data[0].author.avatar_url}
            alt="Next.js Logo"
            width={40}
            height={37}
            priority
          />
          <div className="ml-2">
            <h3 className="text-xs font-semibold mt-1">
              {data[0].author.login}
            </h3>
            <PublishedAt date={data[0].published_at} />
          </div>
        </div>
      </div>
    </main>
  );
}
