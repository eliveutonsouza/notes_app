import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

export function Pagination() {
  return (
    <div className="flex items-center gap-8">
      <button className="bg-black p-3 rounded">
        <ArrowLeft size={17} weight="bold" className="text-white" />
      </button>

      <button className="underline font-bold">1</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>...</button>

      <button className="bg-black p-3 rounded">
        <ArrowRight size={17} weight="bold" className="text-white" />
      </button>
    </div>
  );
}
