import { revalidatePath } from "next/cache";

type UnsplashResponse = {
  urls: {
    full: string;
  };
};

export default async function Page() {
  const photos = await fetch(
    "https://api.unsplash.com/photos?client_id=a4jE-bkPYmqenDgoR_oLT9NmjYtbjNaG8f54XKf7r-I&page=1&per_page=12",
    {
      cache: "force-cache",
    }
  );

  const json = await photos.json();

  const updateSearch = async (e: FormData) => {
    "use server";

    const search = e.get("search");
    revalidatePath(
      "/search/" +
        search
          ?.toString()
          .toLowerCase()
          .replace(/\s{2,}/gm, "")
    );
  };

  const groupImages = (json: UnsplashResponse[]): string[][] => {
    let group = [];
    const images: string[][] = [];

    for (let i = 0; i < json.length; i++) {
      group.push(json[i]?.urls?.full);

      if ((i + 1) % 3 == 0 && i != 0) {
        images.push(group);
        group = [];
      }
    }

    return images;
  };

  return (
    <main className="w-screen h-screen bg-gray-100 p-4 flex flex-col gap-6 overflow-x-hidden">
      <div>
        <form action={updateSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search high-resolution images!"
            className="w-full p-3 border-slate-900 border-2 bg-gray-100"
          />
        </form>
      </div>
      <div className="grid w-full grid-cols-2 md:grid-cols-4 gap-4">
        {groupImages(json).map((group, _) => (
          <div className="grid gap-4" key={`group_${_}`}>
            {group.map((src: string, idx: number) => (
              <div key={`image_${idx}`}>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={src}
                  alt=""
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
