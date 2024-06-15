const Profile = ({ email }) => {
  return (
    <div className="flex flex-col items-start justify-start max-w-full w-full">
      <p className="font-extrabold leading-5 mt-5 text-5xl text-black first-letter:uppercase sm:text-6xl">
        <span className="bg-clip-text bg-gradient-to-r from-blue-600 leading-tight text-transparent to-cyan-600">
          Profile
        </span>
      </p>
      <p className="max-w-md mt-5 text-gray-600 text-lg first-letter:uppercase sm:text-xl">
        Welcome to the personalized profile page of {email}.
      </p>
    </div>
  );
};

export default Profile;
