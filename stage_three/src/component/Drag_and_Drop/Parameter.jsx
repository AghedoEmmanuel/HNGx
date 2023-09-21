import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Search from './Search';
import Loading from './Loading';
import { XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
};

const thumb = {
    display: 'inline-flex',
    marginBottom: 8,
    marginRight: 8,
    width: 250,
    height: 300,
    padding: 7,
    boxSizing: 'border-box',
    position: 'relative',
    border: '1px solid #eaeaea',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};



function Parameter() {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                setFiles(acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file),
                    isLoading: false,
                    addedbyUser:true
                })));
            }, 1000)

            console.log(acceptedFiles)
        }
    });

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const response = await axios.get('https://api.unsplash.com/photos', {
              params: {
                client_id: '8BBd5Il3EZWqCLK4y-6M9mvFK7JdW1CXDJ12JdOmz8I',
                per_page: 20,
              },
            });
            console.log('Fetched images from Unsplash:', response.data);
            // setFiles(response.data);

            const filteredImages = response.data.filter(
                (image) =>
                  image.description && image.description.trim() !== ''
              );
            setFiles(filteredImages)
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching images from Unsplash:', error);
            setIsLoading(false);
          }
        };
    
        fetchImages();
      }, []);

    const removeFile = (fileToRemove) => {
        const updatedFiles = files.filter((file) => file !== fileToRemove);
        setFiles(updatedFiles);
        URL.revokeObjectURL(fileToRemove.preview);
    };

    const filteredFiles = files.filter((file) =>
        file.name?.includes(searchQuery) || files.tags?.include(searchQuery)
    );

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files])

    const searchUnsplashImages = async () => {
        try {
          const response = await axios.get(
            'https://api.unsplash.com/search/photos',
            {
              params: {
                client_id: '8BBd5Il3EZWqCLK4y-6M9mvFK7JdW1CXDJ12JdOmz8I',
                per_page: 10,
                query: searchQuery,
              },
            }
          );
    
          const unsplashImages = response.data.results;
    
          setFiles(unsplashImages);
        } catch (error) {
          console.error('Error fetching images from Unsplash:', error);
        }
      };

      useEffect(() => {
        if (searchQuery) {
          searchUnsplashImages();
        }
      }, [searchQuery]);

    return (
        <section className="container flex flex-col items-center justify-center space-y-7">
            <div className='text-2xl md:text-3xl text-sky-700 '>
                <p>Drag and Drop Image Uploading</p>
            </div>
            <div>
                <Search setSearchQuery={setSearchQuery} />
            </div>
            <div {...getRootProps({ className: 'dropzone' })} className='border-2 border-sky-700 border-dashed py-9 px-4 md:p-20 space-y-4 rounded-lg hover:shadow-xl hover:shadow-purple-700'>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className='text-xl md:text-3xl text-sky-700'>Drag images here .....</p>
                ) : (
                    <p className='text-xl md:text-3xl '>Drag and drop images here or <span className=' text-sky-700 cursor-pointer'>Browse</span></p>
                )}
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <aside style={thumbsContainer}>
                    {searchQuery ? (
                        filteredFiles.map((file, index) => (
                            <div style={thumb} key={index}>
                                <div style={thumbInner}>
                                    <img
                                        src={file.preview || file.urls.regular}
                                        style={img}
                                        alt={`uploaded ${index}`}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                            file.isLoaded = true;
                                        }}
                                        onError={(e) => {
                                            console.error(`Error loading image: ${file.preview || file.urls.random}`);
                                            e.target.src = 'placeholder.jpg'; 
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white ">
                                        <p className='truncate'> Tag: {file.name||file.description}</p>
                                    </div>
                                    {file.addedByUser && (
                                        <button
                                        className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
                                        onClick={() => removeFile(file)}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        files.map((file, index) => (
                            <div style={thumb} key={index}>
                                <div style={thumbInner}>
                                    <img
                                        src={file.preview || file.urls.regular}
                                        style={img}
                                        alt={`Image ${index}`}
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview || file.urls.random);
                                            file.isLoaded = true;
                                        }}
                                        onError={(e) => {
                                            console.error(`Error loading image: ${file.preview}`);
                                            e.target.src = 'placeholder.jpg'; 
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white ">
                                        <p className='truncate'> tag: {file.name|| file.description}</p>
                                    </div>
                                    {file.addedByUser && (
                                        <button
                                        className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
                                        onClick={() => removeFile(file)}
                                    >
                                        <XMarkIcon className="h-4 w-4" />
                                    </button>
                                    )}
                                </div>
                            </div>
                        )))}
                </aside>
            )}

        </section>
    )
}
export default Parameter