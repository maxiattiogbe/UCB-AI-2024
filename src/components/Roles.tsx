const roles = [
  {
    id: 1,
    title: "Student",
    href: "students",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/354/354637.png",
  },
  {
    id: 2,
    title: "Teacher",
    href: "teachers",
    imageUrl:
      "https://cdn.iconscout.com/icon/free/png-256/free-teacher-240-1128987.png",
  },
];

//TODO: Need to add an update to the db!!

const Roles = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose the role that fits you.
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            What are you here for?
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-2 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {roles.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-50"
              //   className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 hover:opacity-50"
            >
              <></>
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-72 w-72"
                // className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              {/* <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" /> */}

              <h3 className="mt-3 text-5xl font-semibold leading-6 text-black">
                <a href={post.href}>
                  <span className="absolute inset-0" />
                  {post.title}
                </a>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roles;
