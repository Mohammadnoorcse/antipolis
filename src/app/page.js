


"use client";

import styles from "./home.module.css";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const [activeNavbar, setActiveNavbar] = useState("Land Animal");
  const [activeButton, setActiveButton] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const[title,setTitle] = useState("")

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);

const categoryHandler = async (e) => {
  e.preventDefault();

  if (!categoryName) {
    alert("Category name is required");
    return;
  }

  try {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName }),
    });

    const data = await res.json();
    
    if (res.ok && data.success) {
      alert("Category added!");
    } else {
      alert("Error adding category: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error in categoryHandler:", error);
    alert("An unexpected error occurred.");
  }
};

const [image,setImage] = useState(null);
const[animalName,setAnimalName]=useState("")
const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onloadend = () => {
    const base64String = reader.result;
    setImage(base64String);
  };

  reader.readAsDataURL(file);
};


 

const animalHandler = async (e) => {
  e.preventDefault();

  if (!animalName) {
    alert("animal name is required");
    return;
  }

  try {
    const res = await fetch("/api/animal/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title:title,name: animalName,image:image }),
    });

    const data = await res.json();
    
    if (res.ok && data.success) {
      alert("animal added!");
    } else {
      alert("Error adding animal: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("Error in animalHandler:", error);
    alert("An unexpected error occurred.");
  }
};

const [categories, setCategories] = useState([]);
const [error, setError] = useState(null);
const [animals, setAnimals] = useState([]);

 useEffect(() => {

  // get category
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          setCategories(data.data);
        } else {
          // setError(data.error);
          console.log(data.error)
        }
      } catch (error) {
        // setError(error.message);
        console.log(error)
      }
    };

    //get animal
    const fetchAnimals = async () => {
      try {
        const response = await fetch('/api/animal');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.success) {
          setAnimals(data.data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
    fetchAnimals();
    return () => {
      console.log("Component unmounted");
    };
  }, []);
  

  console.log(animals)

  return (
    <div className={styles.home}>
      <div className="container flex flex-col gap-5 h-full">
        <div className={styles.navbar}>
          <div className={styles.navbarleft}>
            {categories.map((value) => (
              <span
                key={value._id}
                className={
                  activeNavbar === value.name ? styles.active : styles.navbarspan
                }
                onClick={() => setActiveNavbar(value.name)}
              >
                {value.name}
              </span>
            ))}
          </div>
          <div className={styles.navbarright}>
            <div
              className={styles.navbarright1}
              onClick={() => setActiveButton("animal")}
            >
              <span>Add Animal</span>
            </div>
            <div
              className={styles.navbarright1}
              onClick={() => setActiveButton("category")}
            >
              <span>Add Category</span>
            </div>
          </div>
        </div>

        <div className={activeButton ? styles.animalbutton : styles.animalbuttonhide}>
          {activeButton === "animal" ? (
            <>
              <span>Add Animal</span>
              <form onSubmit={animalHandler}>
              <select onChange={(e) => setTitle(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate._id} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
              </select>
                <input type="text" placeholder="Animal Name" 
                value={animalName} onChange={(e)=>setAnimalName(e.target.value)} />
                <div className={styles.imageinput} onClick={handleImageClick}>
                  <span>Image</span>
                  <div className={styles.imageupload}>
                    <span>Upload</span>
                    <input 
                    type="file" 
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    // onChange={(e)=>setImage(e.target.value)}
                    accept="image/*"
                     />
                  </div>
                </div>
                <button type="submit">Create Animal</button>
              </form>
            </>
          ) : (
            <>
              <span>Add Category</span>
              <form onSubmit={categoryHandler}>
                <input
                  type="text"
                  placeholder="Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <button type="submit">Save</button>
              </form>
            </>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.carditem}>
            {
              animals.filter(item => item.title === activeNavbar).map((value)=>(
                <div className={styles.card} key={value._id}>
                  <img src={value.image.url} alt={value.name} className={styles.cardimg} />
                  <span>{value.name}</span>
              </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  );
}

