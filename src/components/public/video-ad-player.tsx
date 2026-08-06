import { Play } from "lucide-react";

type VideoAdPlayerProps = {
  thumbnailUrl: string;
  title: string;
  adUrl: string;
  duration?: string;
};

export function VideoAdPlayer({ thumbnailUrl, title, adUrl, duration = "10:32" }: VideoAdPlayerProps) {
  return (
    <a 
      href={adUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block w-full max-w-[800px] mx-auto my-8 relative rounded-xl overflow-hidden aspect-video bg-black group cursor-pointer shadow-lg hover:shadow-xl transition-all"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={thumbnailUrl || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 transition-opacity" 
      />
      
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <Play className="h-8 w-8 text-white ml-1 fill-white" />
        </div>
      </div>
      
      <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
        {duration}
      </div>
      
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent">
        <h3 className="text-white text-lg font-medium truncate drop-shadow-md">{title}</h3>
      </div>
    </a>
  );
}
