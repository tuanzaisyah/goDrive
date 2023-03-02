import { useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { CgClose } from "react-icons/cg";

const UserRatings = ({ setOpen, userId }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(`/users/user/${userId}`);

  // // fetch user's rating
  // const [ratingData, setRatingData] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  // useEffect(() => {
  //   const fetchRating = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get(`/users/user/${data[0]._id}`);
  //       setRatingData(res.data);
  //     } catch (err) {
  //       setError(false);
  //     }
  //     setLoading(false);
  //   };
  //   fetchRating();
  // }, [ratingData]);

  return (
    <div className="overflow-y-scroll sticky scrollbar h-96  shadow-sm p-2 rounded-lg ">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">User's Rating & Review</h1>
        <CgClose
          className="cursor-pointer text-2xl text-main-color-alt"
          onClick={() => setOpen(false)}
        />
      </div>

      {data
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .map((rating) => {
          return (
            <div className="md:w-[400px] border-b border-grey-color p-4 my-1">
              <div className="flex items-center gap-4">
                <img
                  className=" w-8 h-8 rounded-lg text-center border border-grey-color"
                  src={
                    rating ? rating?.profilePic : "./assets/img/noAvatar.png"
                  }
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-light text-xs mb-2">@{rating?.username}</p>

                  <div className="flex gap-2 text-yellow-color text-lg">
                    <img
                      src="../../assets/emoji/bad.png"
                      alt=""
                      className={`w-8 [&.fair]:hidden [&.good]:hidden ${rating?.rating}`}
                    />
                    <img
                      src="../../assets/emoji/fair.png"
                      alt=""
                      className={`w-8 [&.bad]:hidden [&.good]:hidden ${rating?.rating}`}
                    />
                    <img
                      src="../../assets/emoji/good.png"
                      alt=""
                      className={`w-8 [&.fair]:hidden [&.bad]:hidden ${rating?.rating}`}
                    />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-justify text-sm">{rating?.comment}</p>
            </div>
          );
        })}
    </div>
  );
};

export default UserRatings;
