interface ProfileProps {
  name: string;
  imageUrl?: string;
  props?: React.HTMLProps<HTMLDivElement>;
  actionClick?: () => void;
}

export function Profile({ name, imageUrl, props }: ProfileProps) {
  const nameParts = name.split(" ");
  const firstLetter = nameParts[0].split("")[0];

  return (
    <>
      <div className="h-12 w-12 rounded-full" {...props}>
        {!imageUrl && (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
            <span className="lg:text-2xl+ text-sm uppercase text-white sm:text-base md:text-lg">
              {firstLetter}
            </span>
          </div>
        )}

        {imageUrl && (
          <img
            className="h-full w-full rounded-full object-cover"
            src={imageUrl}
            alt={name}
          />
        )}
      </div>
    </>
  );
}
