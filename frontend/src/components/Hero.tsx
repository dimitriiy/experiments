export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-1 place-items-center  gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Пишем
            </span>{' '}
            свои велосипеды
          </h1>{' '}
          и{' '}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              костыли
            </span>
          </h2>
        </main>
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
