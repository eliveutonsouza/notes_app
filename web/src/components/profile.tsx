interface ProfileProps {
  name: string;
  imageUrl?: string;
}

export function Profile({ name, imageUrl }: ProfileProps) {
  const nameParts = name.split(" ");
  const firstLetter = nameParts[0].split("")[0];
  const lastLetter = nameParts[nameParts.length - 1].split("")[0];

  return (
    <div className="rounded-full w-9">
      {!imageUrl && (
        <div className="rounded-full bg-black w-9 h-9 flex items-center justify-center">
          <span className="text-white text-xs">{firstLetter + lastLetter}</span>
        </div>
      )}

      {imageUrl && (
        <img className="rounded-full w-9 h-9" src={imageUrl} alt={name} />
      )}
    </div>
  );
}
