interface ProfileProps {
  name: string;
  imageUrl?: string;
  props?: React.HTMLProps<HTMLDivElement>;
  actionClick?: () => void;
}

export function Profile({ name, imageUrl, props }: ProfileProps) {
  const nameParts = name.split(" ");
  const firstLetter = nameParts[0].split("")[0];
  const lastLetter = nameParts[nameParts.length - 1].split("")[0];

  return (
    <>
      <div className="w-12 rounded-full" {...props}>
        {!imageUrl && (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
            <span className="text-xs text-white">
              {firstLetter + lastLetter}
            </span>
          </div>
        )}

        {imageUrl && (
          <img className="h-12 w-12 rounded-full" src={imageUrl} alt={name} />
        )}
      </div>
    </>
  );
}
