import { getMedia } from "@/actions/media";
import { MediaUploader } from "@/components/media/media-uploader";
import { MediaList } from "@/components/media/media-list";

export default async function MediaLibraryPage() {
  const mediaFiles = await getMedia();

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Upload New Media</h2>
          <MediaUploader />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Files</h2>
            <span className="text-sm text-muted-foreground">{mediaFiles.length} items</span>
          </div>
          <MediaList initialMedia={mediaFiles} />
        </section>
      </div>
    </div>
  );
}
