import Link from "next/link";
import Image from "next/image";

const PromptCard = ({
  userId,
  email,
  name,
  imageUrl,
  promptId,
  prompt,
  category,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleClick = () => {
    onClick(category);
  };

  const handleEdit = () => {
    onEdit(promptId);
  };

  const handleDelete = () => {
    onDelete(promptId);
  };

  return (
    <div className="backdrop-blur bg-white/50 border border-gray-200 flex flex-1 flex-col items-start justify-center gap-7 p-5 rounded-lg shadow-lg w-full">
      <Link
        href={`/profile/${userId}`}
        className="flex gap-5 items-center justify-start"
      >
        <Image
          src={imageUrl}
          width={32}
          height={32}
          className="object-contain rounded-full"
          alt="profile"
        />
        <div className="flex flex-col">
          <p className="font-satoshi font-semibold text-gray-900">{name}</p>
          <p className="font-inter text-sm text-gray-500">{email}</p>
        </div>
      </Link>
      <p className="font-satoshi text-sm text-gray-700">{prompt}</p>
      <p
        className={`bg-clip-text bg-gradient-to-r cursor-pointer font-inter from-blue-600 text-sm text-transparent to-cyan-600`}
        onClick={handleClick}
      >
        {category}
      </p>
      <div className="flex gap-3 items-center justify-center">
        {onDelete && (
          <button
            className="bg-black border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-white transition-all rounded-full hover:bg-white hover:text-black"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
        {onEdit && (
          <button
            className="bg-transparent border border-black flex font-inter items-center justify-center px-5 py-1.5 text-center text-sm text-black transition-all rounded-full whitespace-nowrap hover:bg-black hover:text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
