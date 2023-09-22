import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ImageCard from "../../components/Card/ImageCard";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageCard from "./ImageCard";

const Home = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filterImages = () => {
    if (query != "" && images.length > 0) {
      return images?.filter((image) =>
        image.user.name.toLowerCase().includes(query)
      );
    } else {
      return images;
    }
  };

  //   console.log(
  //     images?.filter((image) => image.user.name.toLowerCase().includes("m"))
  //   );

  let filteredImages = filterImages();

  const getImages = () => {
    axios
      .get(
        `https://api.unsplash.com/photos?client_id=_mS8dwVZAKCzu0RDpKqeaxF1CA4Mao5PjI2HMULIGBc`,
        {}
      )
      .then((response) => {
        // console.log(response);
        setImages(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to get Images, check your network");
        setLoading(false);
      });
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedImages = [...filteredImages];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedImage] = reorderedImages.splice(sourceIndex, 1);
      reorderedImages.splice(destinationIndex, 0, removedImage);

      return (filteredImages = reorderedImages);
    }

    // console.log(results);
  };

  const checkUser = () => {
    if (!user) {
      navigate("/");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    checkUser();
    getImages();
  }, []);

  return (
    <div className="bg-purple-900 min-h-screen bg-center p-5 flex flex-col items-center space-y-4">
      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-2 md:px-3">
            <p className="basis-1/3 font-semibold underline text-sm md:text-base underline-offset-4">
              {localStorage.getItem("user")}
            </p>
            <h1 className="basis-1/3 font-bold text-center text-xl md:text-5xl">
              Astro
            </h1>
            <div className="basis-1/3 flex flex-row-reverse items-center">
              <button
                onClick={handleLogout}
                className="bg-black hover:bg-gray-900 text-white text-sm md:text-base py-1 px-2 cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
          <form className="w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="block w-full md:w-3/4 lg:w-1/2 mx-auto outline-none py-1 px-2 border-2 border-black"
            />
          </form>
        </div>
        {loading ? (
          <div className="h-[80vh] flex flex-col items-center justify-center">
            Loading...
          </div>
        ) : error != "" ? (
          <div className="h-96 flex flex-col items-center justify-center space-y-4 text-center">
            <p className="text-xl">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black hover:bg-gray-900 text-white font-semibold py-1 px-2 cursor-pointer"
            >
              Reload
            </button>
          </div>
        ) : (
          <Droppable
            droppableId="Root"
            //   direction="horizontal"
            type="group"
            //   className="p-5 mx-auto grid grid-cols-3 gap-4"
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-5 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {filteredImages?.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <ImageCard key={image.id} {...image} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
            {/* {images?.map((image) => (
          <ImageCard key={image.id} {...image} />
        ))} */}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

export default Home;
