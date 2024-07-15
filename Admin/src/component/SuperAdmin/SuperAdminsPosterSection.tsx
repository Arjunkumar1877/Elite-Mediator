import { useEffect, useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import app from "../../firebase/firebase";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

type PostersDataType = {
  _id: string;
  imageUrl: string;
};

const SuperAdminsPosterSection = () => {
  const [imageUploadProgress, setImageUploadProgress] = useState<{ [key: string]: number | null }>({});
  const [uploadingImage, setUploadingImage] = useState<{ [key: string]: string }>({});
  const [startUpload, setStartUpload] = useState<{ [key: string]: boolean }>({});
  const [startEdit, setStartEdit] = useState<{ [key: string]: boolean }>({});
  const [posters, setPosters] = useState<PostersDataType[]>([]);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0], id);
    }
  };

  const handleImageUpload = async (file: File, id: string) => {
    if (!file) {
      toast('No file available to upload.');
      return;
    }

    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setStartUpload(prev => ({ ...prev, [id]: true }));

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(prevProgress => ({ ...prevProgress, [id]: progress }));
        },
        (error: any) => {
          console.log(error);
          setImageUploadProgress(prevProgress => ({ ...prevProgress, [id]: null }));
          setStartUpload(prev => ({ ...prev, [id]: false }));
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(prevProgress => ({ ...prevProgress, [id]: null }));
            setUploadingImage(prevImages => ({ ...prevImages, [id]: downloadURL }));
            setStartUpload(prev => ({ ...prev, [id]: false }));
            toast('Image uploaded successfully.');
          });
        }
      );
    } catch (error) {
      setImageUploadProgress(prevProgress => ({ ...prevProgress, [id]: null }));
      setStartUpload(prev => ({ ...prev, [id]: false }));
      toast('Failed to upload image.');
    }
  };

  const handleSaveNewPoster = async (id: string) => {
    if (!uploadingImage[id]) {
      toast("No new image available.");
      return;
    }

    try {
      const response = await axios.post("/superAdmin/add_new_poster", {
        id: id,
        imageUrl: uploadingImage[id]
      });
      console.log(response);
      toast("Poster saved successfully.");
      handleFetchPosters();
      setStartEdit(prev => ({ ...prev, [id]: false }));
    } catch (error) {
      console.log(error);
      toast("Failed to save poster.");
    }
  };

  const handleFetchPosters = async () => {
    try {
      const response = await axios.get('/superAdmin/get_posters');
      setPosters(response.data);
    } catch (error) {
      console.log(error);
      toast("Failed to fetch posters.");
    }
  };

  useEffect(() => {
    handleFetchPosters();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="p-6">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold py-5">Posters</h1>
          <div className="flex flex-col gap-2 border-2 rounded p-4">
            <div className="flex justify-center border-2 rounded p-5">
              <div className="flex justify-center items-center h-4">
                <h1 className="font-bold text-2xl">CURRENT POSTERS</h1>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {posters.map((poster) => (
                <div key={poster._id} className="flex justify-between items-center px-10 border-2 rounded">
                  <div className="relative">
                    {uploadingImage[poster._id] ? (
                      <img src={uploadingImage[poster._id]} className="w-36 md:w-96" alt="Poster" />
                    ) : (
                      <img src={poster.imageUrl} className="w-36 md:w-96" alt="Poster" />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, poster._id)}
                      ref={(el) => (fileInputRefs.current[poster._id] = el)}
                      className="hidden"
                    />
                  
                    {startUpload[poster._id] && imageUploadProgress[poster._id] !== null && (
                      <div className="progress-bar">
                        Upload progress: {imageUploadProgress[poster._id]}%
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center md:flex-row gap-3 my-auto">
                    {startEdit[poster._id] ? (
                     <>

<FaUpload   className=" text-3xl md:text-5xl text-gray-600 hover:text-gray-800"
                      onClick={() => fileInputRefs.current[poster._id]?.click()}
                    />
                      <button
                        className="text-white text-xs md:text-sm bg-green-500 px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => handleSaveNewPoster(poster._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-white text-xs md:text-sm bg-green-500 px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => setStartEdit(prev => ({ ...prev, [poster._id]: false }))}
                      >
                       Cancel
                      </button>
                     </>
                    ) : (
                      <button
                        className="text-white text-xs md:text-sm bg-sky-500 px-3 py-1 rounded hover:bg-sky-700"
                        onClick={() => setStartEdit(prev => ({ ...prev, [poster._id]: true }))}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminsPosterSection;
