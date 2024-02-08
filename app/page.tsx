import { revalidatePath } from "next/cache";

export default async function Page() {
  const photos = await fetch(
    "https://api.unsplash.com/photos?client_id=a4jE-bkPYmqenDgoR_oLT9NmjYtbjNaG8f54XKf7r-I&page=1&per_page=12",
    {
      cache: "force-cache",
    }
  );

  const json = await photos.json();

  console.log(json);

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
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[0].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[1].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[2].urls["full"]}
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[3].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[4].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[5].urls["full"]}
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[6].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[7].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[8].urls["full"]}
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[9].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[10].urls["full"]}
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src={json[11].urls["full"]}
              alt=""
            />
          </div>
        </div>
      </div>
    </main>
  );
}
