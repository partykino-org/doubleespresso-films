const getVods = async () => {
  const res = await fetch("http://localhost:8080/api/vods");

  if (!res.ok) {
    throw new Error("Failed to fetch VODs");
  }

  const data = await res.json();
  return data.data; // бо Strapi повертає { data: [...] }
};

const Wrapper = async () => {
  const vods = await getVods();
  console.log(vods);

  return (
    <div>
      <h2>Hello World</h2>
      {vods.map(({ video_url, id, title }) => {
        return (
          <div key={id}>
            <h3>{title}</h3>
            <video controls width="250">
              <source src={video_url} type="video/mp4" />
            </video>
          </div>
        );
      })}
    </div>
  );
};

export default Wrapper;
