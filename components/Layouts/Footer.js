import Link from "next/link";
export default function Footer() {
  return (
    <section className="w-full bg-custom2 lg:h-[415px]">
      <div className="max-w-screen-lg mx-auto pt-24 px-4  lg:px-0">
        {/* Logo / Text / Links*/}
        <div className="grid gap-10 md:grid-cols-2 pb-16 border-b lg:items-center">
          {/* Logo / Text */}
          <div className="grid gap-6">
            {/* Blog log */}
            <div>
              <div className="flex gap-1.5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 35 36"
                  className="lg:h-[35px] lg:w-[35px]"
                >
                  <ellipse
                    cx="17.3887"
                    cy="18"
                    rx="17.3887"
                    ry="18"
                    fill="url(#paint0_linear_11_233)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_11_233"
                      x1="2.60711e-07"
                      y1="12.5"
                      x2="30.4817"
                      y2="30.0729"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF2B2B" />
                      <stop offset="1" stopColor="#1A92AC" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-xl font-medium lg:text-2xl">Blog</div>
              </div>
            </div>
            {/* Text */}
            <div className="w-64">
              Join our newsletter to be at the forefront of accessing exclusive
              content and expert insights.
            </div>
            {/* Socials */}
            <div className="flex gap-3.5">
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="fill-black hover:fill-gray-400 duration-200"
                >
                  <path d="M6.2825 18.7499C13.83 18.7499 17.9587 12.4961 17.9587 7.08239C17.9587 6.90739 17.9587 6.72989 17.9513 6.55489C18.7551 5.973 19.4488 5.25258 20 4.42739C19.2491 4.75845 18.4535 4.97665 17.6388 5.07489C18.4969 4.56194 19.1397 3.75485 19.4475 2.80364C18.6412 3.28129 17.7588 3.61661 16.8387 3.79489C16.2202 3.13617 15.4018 2.69979 14.5101 2.55334C13.6185 2.40689 12.7034 2.55854 11.9067 2.98481C11.1099 3.41108 10.476 4.08818 10.1031 4.91122C9.73012 5.73425 9.63897 6.65731 9.84375 7.53739C8.21218 7.45558 6.61602 7.03172 5.1588 6.29332C3.70159 5.55491 2.41586 4.51844 1.385 3.25114C0.861675 4.15499 0.701967 5.22414 0.938308 6.24147C1.17465 7.2588 1.78932 8.14805 2.6575 8.72864C2.00692 8.70654 1.37065 8.53184 0.8 8.21864V8.27489C0.801122 9.22174 1.12913 10.1392 1.72859 10.8721C2.32805 11.605 3.16218 12.1085 4.09 12.2974C3.73783 12.3944 3.37404 12.4428 3.00875 12.4411C2.75123 12.4419 2.49423 12.4181 2.24125 12.3699C2.50348 13.185 3.01409 13.8976 3.70156 14.408C4.38903 14.9184 5.21892 15.201 6.075 15.2161C4.62069 16.3584 2.82425 16.9779 0.975 16.9749C0.649151 16.9763 0.323529 16.9575 0 16.9186C1.87689 18.1152 4.05662 18.7506 6.2825 18.7499Z" />
                </svg>
              </Link>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="fill-black hover:fill-gray-400 duration-200"
                >
                  <path d="M11.2812 10C11.2812 13.1063 8.75625 15.625 5.64 15.625C4.90033 15.626 4.16771 15.4813 3.48396 15.1991C2.80022 14.917 2.17875 14.5029 1.65502 13.9806C1.1313 13.4583 0.715587 12.8379 0.431617 12.1549C0.147648 11.4719 0.000984258 10.7397 0 10C0 6.89251 2.525 4.37501 5.64 4.37501C6.37978 4.37386 7.11253 4.51845 7.79642 4.80052C8.48031 5.0826 9.10193 5.49663 9.62579 6.01898C10.1496 6.54133 10.5655 7.16175 10.8495 7.84482C11.1336 8.52789 11.2803 9.26023 11.2812 10ZM17.4688 10C17.4688 12.925 16.2062 15.295 14.6488 15.295C13.0912 15.295 11.8288 12.9238 11.8288 10C11.8288 7.07501 13.0912 4.70501 14.6488 4.70501C16.2062 4.70501 17.4688 7.07626 17.4688 10ZM20 10C20 12.62 19.5562 14.7438 19.0075 14.7438C18.46 14.7438 18.0163 12.6188 18.0163 10C18.0163 7.38001 18.46 5.25626 19.0087 5.25626C19.5562 5.25626 20 7.38001 20 10Z" />
                </svg>
              </Link>
            </div>
          </div>
          {/* Links */}
          <div className="flex flex-col gap-2 md:text-right">
            <Link className="duration-200 hover:text-gray-400" href="/">
              Subscribe
            </Link>
            <Link className="duration-200 hover:text-gray-400" href="/">
              Categories
            </Link>
            <Link className="duration-200 hover:text-gray-400" href="/">
              Membership
            </Link>
            <Link className="duration-200 hover:text-gray-400" href="/">
              Resources
            </Link>
          </div>
        </div>
        {/* Copyright */}
        <div className="pt-10 pb-5 text-xs text-gray-400 md:text-sm">
          Copyright © 2023 Blog. Developed with TailwindCSS
        </div>
      </div>
    </section>
  );
}
